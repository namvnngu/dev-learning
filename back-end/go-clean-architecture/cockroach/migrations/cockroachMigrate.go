package main

import (
	"go-clean-architecture/cockroach/entities"
	"go-clean-architecture/config"
	"go-clean-architecture/database"
)

func main() {
	config := config.GetConfig()
	db := database.NewPostgresDatabase(config)
	cockroachMigrate(db)
}

func cockroachMigrate(db database.Database) {
	db.GetDb().Migrator().CreateTable(&entities.Cockroach{})
	db.GetDb().CreateInBatches([]entities.Cockroach{
		{Amount: 1},
		{Amount: 2},
		{Amount: 2},
		{Amount: 5},
		{Amount: 3},
	}, 10)
}
