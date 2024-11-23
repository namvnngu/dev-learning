package database

import (
	"fmt"
	"go-clean-architecture/config"
	"sync"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type postgresDatabase struct {
	Db *gorm.DB
}

var once sync.Once
var dbInstance *postgresDatabase

func NewPostgresDatabase(config *config.Config) Database {
	once.Do(func() {
		dsn := fmt.Sprintf(
			"host=%s user=%s password=%s dbname=%s port=%d sslmode=%s timezone=%s",
			config.Db.Host,
			config.Db.User,
			config.Db.Password,
			config.Db.DbName,
			config.Db.Port,
			config.Db.SSLMode,
			config.Db.TimeZone,
		)

		db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
		if err != nil {
			panic("failed to connect database")
		}

		dbInstance = &postgresDatabase{Db: db}
	})
	return dbInstance
}

func (p *postgresDatabase) GetDb() *gorm.DB {
	return dbInstance.Db
}
