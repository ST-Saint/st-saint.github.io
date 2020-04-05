package Postgres

import (
	"fmt"
	_ "github.com/lib/pq"
	"log"
	"xorm.io/xorm"
)

const (
	host     = "47.95.112.59"
	port     = 5432
	dbname   = "dictionary"
	user     = "dictionary"
	password = "simple_dictionary"
)

var Psql xorm.Engine

func init() {
	psqlSource := fmt.Sprintf("host=%s port=%d user=%s "+"password=%s dbname=%s sslmode=disable", host, port, user, password, dbname)
	Psql, err := xorm.NewEngine("postgres", psqlSource)
	Psql.ShowSQL(true)
	defer Psql.Close()
	if err != nil {
		log.Fatal("Connect to postgres: ", err)
	}
}
