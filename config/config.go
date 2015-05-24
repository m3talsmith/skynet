package config

import (
  "flag"
  "encoding/json"
  "io/ioutil"
  "errors"
)

type Mongo struct {
  Url string `json:"url"`
}

type Redis struct {
  Host string `json:"host"`
  Port int `json:"port"`
  Password string `json:"password"`
}

type App struct {
  Mongo
  Redis
  Port  int `json:"port"`
  ConfigFile string
}

func NewApp() (app App, err error) {
  app = App{}
  
  if err = app.CheckOptions(); err != nil {
    return app, err
  }
  return app, nil
}

func (app *App) CheckOptions() error {
  flag.StringVar(&app.Mongo.Url, "mongo-url", "mongodb://localhost/meshblu", "Mongodb Database Url")
  flag.StringVar(&app.Redis.Host, "redis-host", "127.0.0.1", "Redis Host")
  flag.IntVar(&app.Redis.Port, "redis-port", 6379, "Redis Port")
  flag.StringVar(&app.Redis.Password, "redis-password", "", "Redis Password")
  flag.IntVar(&app.Port, "port", 8080, "Meshblu Port")
  flag.StringVar(&app.ConfigFile, "config", "", "Meshblu Configuration (optional)")
  
  flag.Parse()
  
  if app.ConfigFile != "" {
    if err := app.LoadConfig(); err != nil {
      return err
    }
  }
  
  return nil
}

func (app *App) LoadConfig() error {
  if app.ConfigFile == "" {
    return errors.New("No configuration file found")
  }
  
  var settings []byte
  
  settings, err := ioutil.ReadFile(app.ConfigFile)
  
  if err != nil {
    return err
  }
  
  if err := json.Unmarshal(settings, &app); err != nil {
    return err
  }
  
  return nil
}