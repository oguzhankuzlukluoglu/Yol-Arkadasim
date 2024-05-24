package models

import (
	"github.com/dgrijalva/jwt-go"
)

type Claims struct {
	jwt.StandardClaims        // jwt-go paketindeki StandartClaims yapısını alıyoruz
	UserID             string `json:"user_id"`
	// Diğer özel talepleri buraya ekleyebilirsiniz
}