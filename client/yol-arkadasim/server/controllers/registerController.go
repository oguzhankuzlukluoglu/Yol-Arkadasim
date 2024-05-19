package controllers

import (
	"context"
	"net/http"
	"yol-arkadasim/database"
	"yol-arkadasim/models"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func IsUsernameTaken(username string) bool {
	client := database.GetMongoClient()
	collection := client.Database("mydatabase").Collection("users")
	filter := bson.M{"username": username}

	var user bson.M
	err := collection.FindOne(context.Background(), filter).Decode(&user)
	return err != mongo.ErrNoDocuments
}

func IsEmailTaken(email string) bool {
	client := database.GetMongoClient()
	collection := client.Database("mydatabase").Collection("users")
	filter := bson.M{"email": email}

	count, err := collection.CountDocuments(context.Background(), filter)
	return err == nil && count > 0
}

func RegisterHandler(c *gin.Context) {
	var user models.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if IsUsernameTaken(*user.Username) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "This username is already taken"})
		return
	}
	if IsEmailTaken(*user.Email) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "This email is already taken"})
		return
	}

	err := user.SaveToMongoDB(database.GetMongoClient(), "mydatabase", "users")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Registration successful", "user": user})
}
