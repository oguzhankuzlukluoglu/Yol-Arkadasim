package controllers

import (
	"context"
	"net/http"
	"time"
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

	userResponse := UserResponse{
		ID:                user.ID,
		Name:              user.Name,
		Surname:           user.Surname,
		Username:          user.Username,
		Phone:             user.Phone,
		Email:             user.Email,
		RegistrationDate:  user.RegistrationDate,
		DateOfBirth:       user.DateOfBirth,
		Location:          user.Location,
		Interests:         user.Interests,
		About:             user.About,
		Comments:          user.Comments,
		TravelPreferences: user.TravelPreferences,
		ProfilePicture:    user.ProfilePicture,
		TravelPhotos:      user.TravelPhotos,
	}

	c.JSON(http.StatusOK, gin.H{"profile": userResponse})
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
	if updateUser.Name != nil {
		existingUser.Name = updateUser.Name
	}
	if updateUser.Surname != nil {
		existingUser.Surname = updateUser.Surname
	}
	if updateUser.Username != nil {
		existingUser.Username = updateUser.Username
	}
	if updateUser.DateOfBirth != nil {
		existingUser.DateOfBirth = updateUser.DateOfBirth
	}
	if updateUser.Phone != nil {
		existingUser.Phone = updateUser.Phone
	}
	if updateUser.Location != nil {
		existingUser.Location = updateUser.Location
	}
	if updateUser.Interests != nil {
		existingUser.Interests = updateUser.Interests
	}
	if updateUser.About != nil {
		existingUser.About = updateUser.About
	}
	if updateUser.TravelPreferences != nil {
		existingUser.TravelPreferences = updateUser.TravelPreferences
	}
	if updateUser.ProfilePicture != nil {
		existingUser.ProfilePicture = updateUser.ProfilePicture
	}
	if updateUser.TravelPhotos != nil {
		existingUser.TravelPhotos = updateUser.TravelPhotos
	}
	if updateUser.Comments != nil {
		existingUser.Comments = updateUser.Comments
	}

	// Save updated user to MongoDB
	err = existingUser.SaveToMongoDB(database.GetMongoClient(), "mydatabase", "users")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
		return
	}

	// Profile güncellemeleri
	existingProfile, err := findProfileByUserID(existingUser.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
		return
	}
	if existingProfile == nil {
		existingProfile = &models.Profile{UserID: existingUser.ID}
	}
	if updateUser.Name != nil {
		existingProfile.Name = updateUser.Name
	}
	if updateUser.Surname != nil {
		existingProfile.Surname = updateUser.Surname
	}
	if updateUser.Phone != nil {
		existingProfile.Phone = updateUser.Phone
	}
	if updateUser.Location != nil {
		existingProfile.Location = updateUser.Location
	}
	if updateUser.Interests != nil {
		existingProfile.Interests = updateUser.Interests
	}
	if updateUser.About != nil {
		existingProfile.About = updateUser.About
	}
	if updateUser.TravelPreferences != nil {
		existingProfile.TravelPreferences = updateUser.TravelPreferences
	}
	if updateUser.ProfilePicture != nil {
		existingProfile.ProfilePicture = updateUser.ProfilePicture
	}
	if updateUser.TravelPhotos != nil {
		existingProfile.TravelPhotos = updateUser.TravelPhotos
	}
	if updateUser.Comments != nil {
		existingProfile.Comments = updateUser.Comments
	}

	err = existingProfile.SaveToMongoDB(database.GetMongoClient(), "mydatabase", "profiles")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
		return
	}

	userResponse := UserResponse{
		ID:                existingUser.ID,
		Name:              existingUser.Name,
		Surname:           existingUser.Surname,
		Username:          existingUser.Username,
		Phone:             existingUser.Phone,
		Email:             existingUser.Email,
		RegistrationDate:  existingUser.RegistrationDate,
		DateOfBirth:       existingUser.DateOfBirth,
		Location:          existingUser.Location,
		Interests:         existingUser.Interests,
		About:             existingUser.About,
		Comments:          existingUser.Comments,
		TravelPreferences: existingUser.TravelPreferences,
		ProfilePicture:    existingUser.ProfilePicture,
		TravelPhotos:      existingUser.TravelPhotos,
	}

	c.JSON(http.StatusOK, gin.H{"message": "Profile updated successfully", "updated_user": userResponse})
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

// UserResponse, parolanın dahil edilmediği kullanıcı bilgilerini temsil eder
type UserResponse struct {
	ID                primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	Name              *string            `json:"name" bson:"name"`
	Surname           *string            `json:"surname" bson:"surname"`
	Username          *string            `json:"username" bson:"username"`
	Phone             *string            `json:"phone" bson:"phone"`
	Email             *string            `json:"email" bson:"email"`
	RegistrationDate  time.Time          `json:"registration_date" bson:"registration_date"`
	DateOfBirth       *time.Time         `json:"date_of_birth"`
	Location          *string            `json:"location"`
	Interests         []string           `json:"interests"`
	About             *string            `json:"about"`
	Comments          []string           `json:"comments"`
	TravelPreferences []string           `json:"travel_preferences"`
	ProfilePicture    *string            `json:"profile_picture"`
	TravelPhotos      []string           `json:"travel_photos"`
}
type UserResponse1 struct {
	Comments []string `json:"comments"`
}
type UserResponse2 struct {
	Interests []string `json:"interests"`
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

	var users []UserResponse
	for cursor.Next(context.Background()) {
		var user models.User
		if err := cursor.Decode(&user); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
			return
		}

		// Parola alanı hariç tutularak kullanıcıyı UserResponse'a dönüştür
		userResponse := UserResponse{
			ID:               user.ID,
			Name:             user.Name,
			Surname:          user.Surname,
			Username:         user.Username,
			Email:            user.Email,
			RegistrationDate: user.RegistrationDate,
		}

		users = append(users, userResponse)
	}

	if err := cursor.Err(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
		return
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
func GetUserIDByUsername(username string) (string, error) {
	client := database.GetMongoClient()
	collection := client.Database("mydatabase").Collection("users")

	var user models.User
	err := collection.FindOne(context.Background(), bson.M{"username": username}).Decode(&user)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return "", nil
		}
		return "", err
	}
	return user.ID.Hex(), nil
}
func GetCommentsByUsername(c *gin.Context) {
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
	userResponse1 := UserResponse1{
		Comments: user.Comments,
	}
	c.JSON(http.StatusOK, gin.H{"userComments": userResponse1})
}
func GetInterestsByUsername(c *gin.Context) {
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
	userResponse2 := UserResponse2{
		Interests: user.Interests,
	}
	c.JSON(http.StatusOK, gin.H{"userInterests": userResponse2})
}
