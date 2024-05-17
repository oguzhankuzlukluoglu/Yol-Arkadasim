package controllers

import (
	"net/http"
	"strings"
	"yol-arkadasim/models"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

func AuthMiddleware(c *gin.Context) {
	// Authorization başlığını al
	authHeader := c.GetHeader("Authorization")
	if authHeader == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Yetkisiz erişim"})
		c.Abort()
		return
	}

	// Bearer token kontrolü yap
	authHeaderParts := strings.Split(authHeader, " ")
	if len(authHeaderParts) != 2 || authHeaderParts[0] != "Bearer" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Yetkisiz erişim"})
		c.Abort()
		return
	}

	// JWT token'ı al
	tokenString := authHeaderParts[1]

	// Token'ı doğrula ve içeriğini al
	token, err := jwt.ParseWithClaims(tokenString, &models.Claims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte("gizli_anahtar"), nil // JWT'yi imzalayan gizli anahtarınızı buraya yerleştirin
	})
	if err != nil || !token.Valid {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Geçersiz token"})
		c.Abort()
		return
	}

	// Token'ın içeriğini doğru türde al
	claims, ok := token.Claims.(*models.Claims)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Geçersiz token"})
		c.Abort()
		return
	}

	// Kullanıcı kimliğini context'e ekle
	c.Set("userID", claims.UserID)

	// İşlemi devam ettir
	c.Next()
}
