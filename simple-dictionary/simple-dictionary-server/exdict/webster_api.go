package exdict

import (
	"fmt"

	"github.com/PuerkitoBio/goquery"
	"github.com/st-saint/st-saint.github.io/simple-dictionary-server/Postgres"

	"io/ioutil"
	"os"
	"strconv"
	"strings"

	"log"
	"net/http"
)

func WrapWord(wavfile string) string {
	if strings.HasPrefix(wavfile, "bix") {
		return "bix/" + wavfile
	} else if strings.HasPrefix(wavfile, "gg") {
		return "gg/" + wavfile
	} else if _, err := strconv.Atoi(wavfile[0:1]); err == nil {
		return "number/" + wavfile
	} else {
		return wavfile[0:1] + "/" + wavfile
	}
}

func CheckFileExist(fileName string) bool {
	_, err := os.Stat(fileName)
	if os.IsNotExist(err) {
		return false
	}
	return true
}

func WriteToWavFile(resp *http.Response, path string, fileName string) {
	body, _ := ioutil.ReadAll(resp.Body)

	err := os.MkdirAll(path, os.ModePerm)
	if err != nil {
		log.Println(err)
	}

	if !CheckFileExist(path + "/" + fileName) {
		f, err := os.Create(path + "/" + fileName) //创建文件
		if err != nil {
			fmt.Println(err)
		}
		f.Write(body)
		f.Close()
	}
}

func UpdatePostgresWav(word string, wavFile string) {
	pDict := BasicDictionary{Word: word}
	has, err := Postgres.Psql.Get(&pDict)
	if err != nil {
		fmt.Println(err)
		return
	}
	if pDict.Wav == "" {
		pDict.Wav = wavFile
	}
	if has {
		Postgres.Psql.Update(&pDict, &BasicDictionary{Word: word})
	} else {
		Postgres.Psql.Insert(&pDict)
	}
}

func RequestAudio(word string) string {
	baseURL := "https://www.dictionaryapi.com/api/v1/references/collegiate/xml/"
	key := "fcd21bf9-2c02-4223-be22-a8d3fe9bf6a2"
	URL := baseURL + word + "?key=" + key

	req, _ := http.NewRequest("POST", URL, nil)
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		fmt.Println(err)
		return ""
	}
	defer resp.Body.Close()
	// body, _ := ioutil.ReadAll(resp.Body)
	// fmt.Println(string(body))
	doc, err := goquery.NewDocumentFromReader(resp.Body)
	if err != nil {
		log.Fatal(err)
	}
	audioURL := ""
	wavFile := ""
	doc.Find("entry").EachWithBreak(func(i int, s *goquery.Selection) bool {
		// For each item found, get the band and title
		ew := s.Find("ew").Text()
		if ew == word {
			wavFile = s.Find("sound").Find("wav").First().Text()
			audioURL = "https://media.merriam-webster.com/soundc11/" + WrapWord(wavFile)
			return false
		}
		return true
	})
	//
	req, _ = http.NewRequest("GET", audioURL, nil)
	resp, err = http.DefaultClient.Do(req)
	if err != nil {
		fmt.Println(err)
		return ""
	}
	defer resp.Body.Close()
	WriteToWavFile(resp, "wav/"+word, wavFile)
	UpdatePostgresWav(word, "wav/"+word+"/"+wavFile)
	return "wav/" + word + "/" + wavFile
}
