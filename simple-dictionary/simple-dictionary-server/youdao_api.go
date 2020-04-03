package main

import (
	"encoding/json"
	"fmt"
	"github.com/google/uuid"
	_ "github.com/lib/pq"
	"io/ioutil"
	_ "log"
	"net/http"
	"net/url"
	"strconv"
	"strings"
	"time"
	"xorm.io/xorm"
)

const (
	host     = "47.95.112.59"
	port     = 5432
	dbname   = "dictionary"
	user     = "dictionary"
	password = "simple_dictionary"
)

type YouDaoBasic struct {
	Exam_Type   []string `json:"exam_type"`
	US_Phonetic string   `json:"us-phonetic"`
	Phonetic    string   `json:"phonetic"`
	Explains    []string `json:"explains"`
}

type YoudaoDict struct {
	Basic YouDaoBasic `json:"basic"`
}

func Truncate(word string) string {
	if word == "" {
		return ""
	}
	size := len(word)
	if size <= 20 {
		return word
	} else {
		return word[0:10] + string(size) + word[size-10:size]
	}
}

func RequestExplains(word string) {
	basic_url := "https://openapi.youdao.com/api"
	appKey := "37ddc7564c10f775"
	key := "mDI8ZDIVAVlLD5mCeaVa6ktwEyLvw1xh"

	curtime := strconv.FormatInt(time.Now().Unix(), 10)
	salt := uuid.New().String()
	signStr := appKey + Truncate(word) + salt + curtime + key
	sign := HashHexDigest(signStr)
	data := url.Values{
		"from":     {"en"},
		"to":       {"zh-CHS"},
		"signType": {"v3"},
		"curtime":  {curtime},
		"appKey":   {appKey},
		"q":        {word},
		"salt":     {salt},
		"sign":     {sign},
	}
	req, _ := http.NewRequest("POST", basic_url, strings.NewReader(data.Encode()))
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		fmt.Println(err)
		return
	}
	defer resp.Body.Close()
	body, _ := ioutil.ReadAll(resp.Body)
	// log.Println(string(body))

	var ydDict YoudaoDict
	json.Unmarshal(body, &ydDict)

	psqlSource := fmt.Sprintf("host=%s port=%d user=%s "+"password=%s dbname=%s sslmode=disable", host, port, user, password, dbname)

	psql, err := xorm.NewEngine("postgres", psqlSource)
	psql.ShowSQL(true)
	if err != nil {
		return
	}
	pDict := BasicDictionary{Word: word}
	has, err := psql.Get(&pDict)
	if err != nil {
		fmt.Println(err)
		return
	}
	if pDict.Phonetic == "" {
		if ydDict.Basic.US_Phonetic != "" {
			pDict.Phonetic = ydDict.Basic.US_Phonetic
		} else if ydDict.Basic.Phonetic != "" {
			pDict.Phonetic = ydDict.Basic.Phonetic
		}
	}
	if pDict.Expains == nil {
		pDict.Expains, err = json.Marshal(ydDict.Basic.Explains)
	}
	if has {
		psql.Update(&pDict, &BasicDictionary{Word: word})
	} else {
		psql.Insert(&pDict)
	}
}
