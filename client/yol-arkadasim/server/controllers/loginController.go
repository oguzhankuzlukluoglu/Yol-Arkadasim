package controllers

import (
	"context"
	"net/http"
	"yol-arkadasim/database"
	"yol-arkadasim/models"
	"yol-arkadasim/utils"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func LoginHandler(c *gin.Context) {
	var login models.Login

	if err := c.ShouldBindJSON(&login); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
		return
	}

	user, err := findUserByUsername(login.Username)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	if user == nil || *user.Password != login.Password {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid username or password"})
		return
	}

	token, err := utils.GenerateToken(user.UserIDHex())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}

	user.Token = &token

	err = user.SaveToMongoDB(database.GetMongoClient(), "mydatabase", "users")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "there is a problem occured in database"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Login successful", "token": token})
}

func findUserByUsername(username string) (*models.User, error) {
	collection := database.GetMongoClient().Database("mydatabase").Collection("users")
	var user models.User
	err := collection.FindOne(context.Background(), bson.M{"username": username}).Decode(&user)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, nil
		}
		return nil, err
	}
	return &user, nil
}
