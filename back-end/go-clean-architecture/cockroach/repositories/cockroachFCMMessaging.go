package repositories

import (
	"go-clean-architecture/cockroach/entities"

	"github.com/labstack/gommon/log"
)

type cockroachFCMMessaging struct{}

func NewCockroachFCMMessaging() CockroachMessaging {
	return &cockroachFCMMessaging{}
}

func (m *cockroachFCMMessaging) PushNotification(n *entities.CockroachPushNotificationDto) error {
	log.Debugf("Pushed FCM notification with data: %v", n)
	return nil
}
