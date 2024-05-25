package controllers

import (
	"context"
	"net/http"
	"yol-arkadasim/database"
	"yol-arkadasim/models"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

func GetUserProfileByUsernameHandler(c *gin.Context) {
	username := c.Param("username")

	user, err := findUserByUsername(username)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
		return
	}
	if user == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	profile, err := findProfileByUserID(user.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
		return
	}
	if profile == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Profile not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"profile": profile})
}

func findProfileByUserID(userID primitive.ObjectID) (*models.Profile, error) {
	client := database.GetMongoClient()

	filter := bson.M{"user_id": userID}
	var profile models.Profile
	err := client.Database("mydatabase").Collection("profiles").FindOne(context.Background(), filter).Decode(&profile)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, nil
		}
		return nil, err
	}

	return &profile, nil
}

func UpdateUserProfileHandler(c *gin.Context) {
	var updateUser models.UpdateableUser
	if err := c.ShouldBindJSON(&updateUser); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
		return
	}

	userID := c.GetString("userID")

	existingUser, err := findUserByID(userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
		return
	}
	if existingUser == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	// Update user fields
	if updateUser.Name != nil {
		existingUser.Name = updateUser.Name
	}
	if updateUser.Surname != nil {
		existingUser.Surname = updateUser.Surname
	}
	if updateUser.Username != nil {
		existingUser.Username = updateUser.Username
	}
	if updateUser.Password != nil {
		existingUser.Password = updateUser.Password
	}
	if updateUser.DateOfBirth != nil {
		existingUser.DateOfBirth = updateUser.DateOfBirth
	}
	if updateUser.Phone != nil {
		existingUser.Phone = updateUser.Phone
	}

	// Save updated user to MongoDB
	err = existingUser.SaveToMongoDB(database.GetMongoClient(), "mydatabase", "users")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
		return
	}

	// Update profile
	profile, err := findProfileByUserID(existingUser.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
		return
	}
	if profile == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Profile not found"})
		return
	}

	if updateUser.Name != nil {
		profile.Name = updateUser.Name
	}
	if updateUser.Surname != nil {
		profile.Surname = updateUser.Surname
	}
	if updateUser.Phone != nil {
		profile.Phone = updateUser.Phone
	}
	if updateUser.Location != nil {
		profile.Location = updateUser.Location
	}
	if updateUser.Interests != nil {
		profile.Interests = updateUser.Interests
	}
	if updateUser.About != nil {
		profile.About = updateUser.About
	}

	// Save updated profile to MongoDB
	err = profile.SaveToMongoDB(database.GetMongoClient(), "mydatabase", "profiles")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Profile updated successfully"})
}

func findUserByID(userID string) (*models.User, error) {
	client := database.GetMongoClient()
	objID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		return nil, err
	}

	filter := bson.M{"_id": objID}
	var user models.User
	err = client.Database("mydatabase").Collection("users").FindOne(context.Background(), filter).Decode(&user)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, nil
		}
		return nil, err
	}

	return &user, nil
}

func GetAllUsersHandler(c *gin.Context) {
	client := database.GetMongoClient()
	collection := client.Database("mydatabase").Collection("users")

	cursor, err := collection.Find(context.Background(), bson.M{})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
		return
	}
	defer cursor.Close(context.Background())

	var users []models.User
	for cursor.Next(context.Background()) {
		var user models.User
		if err := cursor.Decode(&user); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
			return
		}
		users = append(users, user)
	}

	c.JSON(http.StatusOK, gin.H{"users": users})
}

func DeleteUserHandler(c *gin.Context) {
	userID := c.Param("userID")

	// Silinecek kullanıcıyı bul
	user, err := findUserByID(userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
		return
	}
	if user == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	// Kullanıcıyı veritabanından sil
	err = deleteUserByID(user.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
		return
	}

	// Kullanıcıya ait profili veritabanından sil
	err = deleteProfileByUserID(user.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User and profile deleted successfully"})
}

func deleteUserByID(userID primitive.ObjectID) error {
	client := database.GetMongoClient()

	filter := bson.M{"_id": userID}
	_, err := client.Database("mydatabase").Collection("users").DeleteOne(context.Background(), filter)
	return err
}

func deleteProfileByUserID(userID primitive.ObjectID) error {
	client := database.GetMongoClient()

	filter := bson.M{"user_id": userID}
	_, err := client.Database("mydatabase").Collection("profiles").DeleteOne(context.Background(), filter)
	return err
}
