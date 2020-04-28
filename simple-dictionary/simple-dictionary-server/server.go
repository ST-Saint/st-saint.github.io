package main

import (
	// "bytes"
	// "archive/zip"
	"encoding/json"
	"fmt"

	// "os"
	// "io"
	"io/ioutil"
	"log"
	"net"
	"net/http"
	"net/url"
	"strings"

	"github.com/st-saint/st-saint.github.io/simple-dictionary-server/Postgres"
	"github.com/st-saint/st-saint.github.io/simple-dictionary-server/exdict"
)

const (
	XForwardedFor = "X-Forwarded-For"
	XRealIP       = "X-Real-IP"
	ROOT          = "/home/saint/Program/CryptoCrawler/data/HTML"
)

var ALLOWEDIP = [2]string{"127.0.0.1", "222.244.198.102"}

func GetBody(req *http.Request) string {
	body, _ := ioutil.ReadAll(req.Body)
	return string(body)
}

func RemoteIP(req *http.Request) string {
	remoteAddr := req.RemoteAddr
	if ip := req.Header.Get(XRealIP); ip != "" {
		remoteAddr = ip
	} else if ip = req.Header.Get(XForwardedFor); ip != "" {
		remoteAddr = ip
	} else {
		remoteAddr, _, _ = net.SplitHostPort(remoteAddr)
	}

	if remoteAddr == "::1" {
		remoteAddr = "127.0.0.1"
	}

	return remoteAddr
}

func DomainSplit(r rune) bool {
	return r == '/' || r == '(' || r == ')' || r == '[' || r == ']' || r == '\'' || r == '"' || r == ':' || r == '.' || r == '&'
}

func GetDomain(u string) string {
	up, err := url.Parse(u)
	fmt.Println(u)
	if err != nil {
		fmt.Println("error")
		return ""
	}
	h := strings.FieldsFunc(up.Host, DomainSplit)
	for idx, s := range h {
		if idx == 0 {
			continue
		}
		if s == "onion" && (len(h[idx-1]) == 16 || len(h[idx-1]) == 56) {
			return h[idx-1] + "." + s
		}
		fmt.Println(idx, s)
	}
	return up.Host
}

func BasicRequest(w http.ResponseWriter, req *http.Request, word string) {
	// pDict := SimpleRequest(word)
	pDict := exdict.BasicDictionary{Word: word}
	has, err := Postgres.Psql.Get(&pDict)
	// has, err := Postgres.Psql.Get(&pDict)

	if err != nil {
		fmt.Println(err)
		w.WriteHeader(403)
		return
	}
	if has {
		if pDict.Phonetic == "" || pDict.Explains == nil {
			pDict.Phonetic, pDict.Explains = exdict.RequestExplains(word)
		}
		if pDict.Wav == "" {
			pDict.Wav = exdict.RequestAudio(word)
		}
		data, err := json.Marshal(pDict)
		if err != nil {
			log.Println(err)
			w.WriteHeader(500)
			return
		}
		w.WriteHeader(200)
		w.Write(data)
	} else {
		log.Println(word, "not found")
		w.WriteHeader(403)
	}
}

func BasicAudioRequest(w http.ResponseWriter, req *http.Request, word string) {
	pDict := exdict.BasicDictionary{Word: word}
	has, err := Postgres.Psql.Get(&pDict)

	if err != nil {
		fmt.Println(err)
		w.WriteHeader(403)
		return
	}
	if has {
		if pDict.Wav == "" {
			pDict.Wav = exdict.RequestAudio(word)
		}
		wavData, err := ioutil.ReadFile(pDict.Wav)
		if err != nil {
			log.Println(err)
			w.WriteHeader(500)
			return
		}
		w.WriteHeader(200)
		w.Write(wavData)
	} else {
		w.WriteHeader(403)
	}
}

func ParseRequest(w http.ResponseWriter, req *http.Request) {
	fmt.Println()
	// fmt.Println(req.Form)
	// fmt.Println(req.Host)
	// fmt.Println(req.RequestURI)
	// fmt.Println(RemoteIP(req))
	// fmt.Println("path", req.URL.Path)
	// fmt.Println("scheme", req.URL.Scheme)
	// fmt.Println(req.Form["url_long"])

	remoteIP := RemoteIP(req)
	flag := true
	// flag := false
	// for _, IP := range ALLOWEDIP {
	// 	if IP == remoteIP {
	// 		flag = true
	// 		break
	// 	}
	// }

	if !flag {
		w.WriteHeader(403)
		return
	}

	method := ""
	word := ""
	// word := GetBody(req)

	req.ParseForm()
	if req.Form.Get("method") != "" {
		method = req.Form.Get("method")
	}
	if req.Form.Get("word") != "" {
		word = req.Form.Get("word")
	}
	log.Println("receive:", remoteIP, method, word)
	if method == "" || word == "" {
		w.WriteHeader(404)
	}
	if method == "basic" {
		BasicRequest(w, req, word)
	} else if method == "audio" {
		BasicAudioRequest(w, req, word)
	}
	// Response()
}

func main() {
	http.HandleFunc("/", ParseRequest)
	defer Postgres.Psql.Close()
	err := http.ListenAndServe(":6024", nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
