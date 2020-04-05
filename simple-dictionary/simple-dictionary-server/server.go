package main

import (
	// "bytes"
	// "archive/zip"
	"crypto/sha256"
	"encoding/hex"
	// "encoding/json"
	"fmt"
	// "os"
	// "io"
	"io/ioutil"
	"log"
	"net"
	"net/http"
	"net/url"
	"strings"
)

const (
	XForwardedFor = "X-Forwarded-For"
	XRealIP       = "X-Real-IP"
	ROOT          = "/home/saint/Program/CryptoCrawler/data/HTML"
)

var ALLOWEDIP = [2]string{"127.0.0.1", "222.247.92.177"}

func GetBody(req *http.Request) string {
	body, _ := ioutil.ReadAll(req.Body)
	return string(body)
}

func HashHexDigest(s string) string {
	hx := sha256.Sum256([]byte(s))
	hxByte := make([]byte, 0, len(hx))
	for _, b := range hx {
		hxByte = append(hxByte, byte(b))
	}
	hashDigest := hex.EncodeToString(hxByte)
	return hashDigest
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
	// req.Write
}

func ParseRequest(w http.ResponseWriter, req *http.Request) {
	fmt.Println()
	// req.ParseForm()
	// fmt.Println(req.Form)
	// fmt.Println(req.Host)
	// fmt.Println(req.RequestURI)
	// fmt.Println(RemoteIP(req))
	// fmt.Println("path", req.URL.Path)
	// fmt.Println("scheme", req.URL.Scheme)
	// fmt.Println(req.Form["url_long"])

	remoteIP := RemoteIP(req)
	flag := false
	for _, IP := range ALLOWEDIP {
		if IP == remoteIP {
			flag = true
			break
		}
	}

	if !flag {
		w.WriteHeader(403)
		return
	}

	method := ""

	if req.Form.Get("method") != "" {
		method = req.Form.Get("method")
	}

	word := GetBody(req)
	if method == "basic" {
		BasicRequest(w, req, word)
	} else if method == "audio" {
	}
	// Response()
}

func main() {
	http.HandleFunc("/", ParseRequest)
	err := http.ListenAndServe(":6024", nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
