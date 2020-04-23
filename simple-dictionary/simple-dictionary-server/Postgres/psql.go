package Postgres

import (
	"fmt"
	"log"

	_ "github.com/lib/pq"
	"xorm.io/xorm"
)

const (
	host     = "47.95.112.59"
	port     = 5432
	dbname   = "dictionary"
	user     = "dictionary"
	password = "simple_dictionary"
)

var Psql *xorm.Engine

func init() {
	psqlSource := fmt.Sprintf("host=%s port=%d user=%s "+"password=%s dbname=%s sslmode=disable", host, port, user, password, dbname)
	var err error
	Psql, err = xorm.NewEngine("postgres", psqlSource)

	// Psql.ShowSQL(true)
	// Psql.SetMaxIdleConns(5)
	// Psql.SetMaxOpenConns(5)

	// defer Psql.Close()
	if err != nil {
		log.Fatal("Connect to postgres: ", err)
	}
}
