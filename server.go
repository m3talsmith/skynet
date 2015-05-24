package main

import (
  "github.com/m3talsmith/meshblu/config" 
  "fmt"
  "log"
  "net/http"
  "encoding/json"
  "github.com/gorilla/mux"
)

type Message struct {
  Body string `json:"body"`
}

func EchoHandler (res http.ResponseWriter, req *http.Request) {
  res.Header().Set("content-type", "application/json")
  data, _ := json.Marshal(Message{"echo"})
  res.Write(data)
}

func main() {
  app, _ := config.NewApp()
  
  router := mux.NewRouter()
  router.HandleFunc("/echo", EchoHandler)
  
  http.Handle("/", router)
  
  log.Print("Loading Meshblu http")
  log.Fatal(http.ListenAndServe(fmt.Sprintf(":%v", app.Port), nil))
}