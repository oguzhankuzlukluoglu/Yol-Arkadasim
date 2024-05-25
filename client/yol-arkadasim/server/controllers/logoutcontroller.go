package controllers

import (
	"net/http"
	"strings"
	"time"
	"yol-arkadasim/utils"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

func LogoutHandler(c *gin.Context) {
	authHeader := c.GetHeader("Authorization")
	if authHeader == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Yetkisiz erişim"})
		return
	}

	authHeaderParts := strings.Split(authHeader, " ")
	if len(authHeaderParts) != 2 || authHeaderParts[0] != "Bearer" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Yetkisiz erişim"})
		return
	}

	tokenString := authHeaderParts[1]

	// Token'ı parse et ve geçerlilik süresini al
	token, err := jwt.ParseWithClaims(tokenString, &utils.Claims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte("gizli_anahtar"), nil
	})
	if err != nil || !token.Valid {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Geçersiz token"})
		return
	}

	claims, ok := token.Claims.(*utils.Claims)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Geçersiz token"})
		return
	}

	// Token'ı blacklist'e ekle
	utils.AddTokenToBlacklist(tokenString, time.Unix(claims.ExpiresAt, 0))

	c.JSON(http.StatusOK, gin.H{"message": "Logout successful"})
}
