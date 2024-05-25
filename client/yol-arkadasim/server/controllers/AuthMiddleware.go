package controllers

import (
	"log"
	"net/http"
	"strings"
	"yol-arkadasim/utils"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

// AuthMiddleware, gelen isteklerin yetkilendirilmesini sağlar.
func AuthMiddleware(c *gin.Context) {
	authHeader := c.GetHeader("Authorization")
	if authHeader == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Yetkisiz erişim"})
		c.Abort()
		return
	}

	authHeaderParts := strings.Split(authHeader, " ")
	if len(authHeaderParts) != 2 || authHeaderParts[0] != "Bearer" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Yetkisiz erişim"})
		c.Abort()
		return
	}

	tokenString := authHeaderParts[1]

	if utils.IsTokenBlacklisted(tokenString) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Geçersiz token"})
		c.Abort()
		return
	}

	token, err := jwt.ParseWithClaims(tokenString, &utils.Claims{}, func(token *jwt.Token) (interface{}, error) {
		return utils.JWTKey, nil // Token anahtarını utils paketinden al
	})
	if err != nil || !token.Valid {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Geçersiz token"})
		c.Abort()
		return
	}

	claims, ok := token.Claims.(*utils.Claims)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Geçersiz token"})
		c.Abort()
		return
	}

	log.Println("Authenticated userID:", claims.UserID) // Kullanıcı ID'sini logla

	c.Set("userID", claims.UserID)
	c.Next()
}
