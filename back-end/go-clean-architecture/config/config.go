package config

import (
	"strings"
	"sync"

	"github.com/spf13/viper"
)

type Config struct {
	Server *Server
	Db     *Db
}

type Server struct {
	Port int
}

type Db struct {
	Host     string
	Port     int
	User     string
	Password string
	DbName   string
	SSLMode  string
	TimeZone string
}

var once sync.Once
var configInstance *Config

func GetConfig() *Config {
	once.Do(func() {
		viper.SetConfigName("config")
		viper.SetConfigType("yaml")
		viper.AddConfigPath("./")
		viper.AutomaticEnv()
		viper.SetEnvKeyReplacer(strings.NewReplacer(".", "_"))

		if err := viper.ReadInConfig(); err != nil {
			panic(err)
		}

		if err := viper.Unmarshal(&configInstance); err != nil {
		  panic(err)
		}
	})

	return configInstance
}
