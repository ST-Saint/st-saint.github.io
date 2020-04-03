package main

import (
//  "encoding/json"
// "fmt"
// "github.com/google/uuid"
// _ "github.com/lib/pq"
// "io/ioutil"
// _ "log"
// "net/http"
// "net/url"
// "strconv"
// "strings"
// "time"
// "xorm.io/xorm"
)

type BasicDictionary struct {
	Word       string  `xorm:"word"`
	Phonetic   string  `xorm:"phonetic"`
	Wav        string  `xorm:"wav"`
	Expains    []byte  `xorm:"explains"`
	Memorize   int     `xorm:"memorize"`
	Importance int     `xorm:"importance"`
	Priority   float32 `xorm:"priority"`
}

func UpdateDictionary(dict *BasicDictionary) error {
	return nil
}
