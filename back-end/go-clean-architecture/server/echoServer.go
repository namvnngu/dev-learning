package server

import (
	"fmt"
	cockroachHandlers "go-clean-architecture/cockroach/handlers"
	cockroachRepositories "go-clean-architecture/cockroach/repositories"
	cockroachUsecases "go-clean-architecture/cockroach/usecases"
	"go-clean-architecture/config"
	"go-clean-architecture/database"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/labstack/gommon/log"
)

type echoServer struct {
	app    *echo.Echo
	db     database.Database
	config *config.Config
}

func NewEchoServer(config *config.Config, db database.Database) Server {
	echoApp := echo.New()
	echoApp.Logger.SetLevel(log.DEBUG)

	return &echoServer{
		app:    echoApp,
		db:     db,
		config: config,
	}
}

func (s *echoServer) Start() {
	s.app.Use(middleware.Recover())
	s.app.Use(middleware.Logger())

	s.app.GET("/v1/health", func(c echo.Context) error {
		return c.String(200, "OK")
	})

	s.initializeCockroachHttpHandler()

	serverUrl := fmt.Sprintf(":%d", s.config.Server.Port)
	s.app.Logger.Fatal(s.app.Start(serverUrl))
}

func (s *echoServer) initializeCockroachHttpHandler() {
	cockroachPostgresRepository := cockroachRepositories.NewCockroachPostgresRepository(s.db)
	cockroachFCMMessaging := cockroachRepositories.NewCockroachFCMMessaging()
	cockroachUsecase := cockroachUsecases.NewCockroachUsecaseImpl(
		cockroachPostgresRepository,
		cockroachFCMMessaging,
	)
	cockroachHttpHandler := cockroachHandlers.NewCockroachHttpHandler(cockroachUsecase)

	cockroachRouters := s.app.Group("v1/cockroach")
	cockroachRouters.POST("", cockroachHttpHandler.DetectCockroach)
}
