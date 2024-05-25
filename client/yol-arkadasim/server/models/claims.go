package models

import (
	"time"

	"github.com/dgrijalva/jwt-go"
)

type Claims struct {
	jwt.StandardClaims           // jwt-go paketindeki StandartClaims yapısını alıyoruz
	UserID             string    `json:"user_id"`
	ExpiredAt          time.Time `json"expired_at"`
	// Diğer özel talepleri buraya ekleyebilirsiniz
}
