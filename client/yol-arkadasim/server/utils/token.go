package utils

import (
	"errors"
	"fmt"
	"strings"
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

// VerifyToken, verilen JWT token'ı doğrular ve talepleri döner.
func VerifyToken(tokenString string) (*Claims, error) {

	fmt.Println(tokenString)
	token1, err := ExtractTokenFromHeader(tokenString)

	claims := &Claims{}

	token, err := jwt.ParseWithClaims(token1, claims, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("invalid signing method")
		}
		return JWTKey, nil
	})

	if err != nil {
		return nil, err
	}

	if !token.Valid {
		return nil, errors.New("invalid token")
	}

	return claims, nil
}

// ExtractToken, Authorization header'dan token'ı çıkarır.
func ExtractTokenFromHeader(authHeader string) (string, error) {
	parts := strings.Split(authHeader, " ")
	if len(parts) != 2 || parts[0] != "Bearer" {
		return "", errors.New("invalid authorization header format")
	}

	return parts[1], nil
}

func ExtractUserIDAndExpirationFromToken(tokenString string) (string, int64, error) {
	claims, err := VerifyToken(tokenString)
	if err != nil {
		return "", 5, err
	}

	return claims.UserID, claims.ExpiresAt, nil
}
