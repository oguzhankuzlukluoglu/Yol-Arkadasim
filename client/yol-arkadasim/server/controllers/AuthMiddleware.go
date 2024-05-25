package controllers

import (
	"net/http"
	"strings"
	"yol-arkadasim/utils"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

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

	token, err := jwt.ParseWithClaims(tokenString, &utils.Claims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte("gizli_anahtar"), nil // JWT'yi imzalayan gizli anahtarınızı buraya yerleştirin
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

	c.Set("userID", claims.UserID)
	c.Next()
}