package utils

import (
	"time"

	"github.com/dgrijalva/jwt-go"
)

// JWTKey JWT anahtarını temsil eder
var JWTKey = []byte("gizli_anahtar")

// Claims JWT taleplerini temsil eder
type Claims struct {
	UserID string `json:"user_id"`
	jwt.StandardClaims
}

// GenerateToken, belirli bir kullanıcı için JWT oluşturur.
func GenerateToken(userID string) (string, error) {
	expirationTime := time.Now().Add(24 * time.Hour) // Token geçerlilik süresi 24 saat olarak ayarlandı.
	claims := &Claims{
		UserID: userID,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(JWTKey)
	if err != nil {
		return "", err
	}
	return tokenString, nil
}
