package controllers

import (
	"context"
	"fmt"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"net/http"
	"yol-arkadasim/database"
	"yol-arkadasim/models"
)

var client *mongo.Client

func LoginHandler(c *gin.Context) {
	// POST isteği olup olmadığını kontrol et
	if c.Request.Method != http.MethodPost {
		c.JSON(http.StatusMethodNotAllowed, gin.H{"error": "Method Not Allowed"})
		return
	}

	// Kullanıcı bilgilerini al
	var login models.Login
	if err := c.ShouldBindJSON(&login); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
		return
	}

	// Kullanıcıyı veritabanında bul
	user, err := findUserByUsername(login.Username)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
		return
	}

	// Kullanıcı adı doğrulama
	if user == nil || *user.Password != login.Password {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid username or password"})
		return
	}

	// Giriş başarılı uyarısı
	c.JSON(http.StatusOK, gin.H{"message": "Login successful"})
}
func findUserByUsername(username string) (*models.User, error) {
	// Kullanıcıyı veritabanından kullanıcı adına göre bul
	collection := database.GetMongoClient().Database("mydatabase").Collection("users")
	var user models.User
	err := collection.FindOne(context.Background(), bson.M{"username": username}).Decode(&user)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			// Kullanıcı bulunamadı
			return nil, nil
		}
		// Diğer hatalar için
		fmt.Println("Error finding user by username:", err)
		return nil, err
	}
	return &user, nil
}
