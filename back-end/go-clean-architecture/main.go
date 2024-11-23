package main

import (
	"go-clean-architecture/config"
	"go-clean-architecture/database"
	"go-clean-architecture/server"
)

func main() {
	config := config.GetConfig()
	db := database.NewPostgresDatabase(config)
	server.NewEchoServer(config, db).Start()
}
