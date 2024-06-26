package models

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// User struct represents the user model
type User struct {
	ID                primitive.ObjectID `bson:"_id,omitempty"`
	Name              *string            `json:"name" validate:"required,min=2,max=100"`
	Surname           *string            `json:"surname" validate:"required,min=2,max=100"`
	Email             *string            `json:"email"`
	RegistrationDate  time.Time          `json:"registration_date"`
	Username          *string            `json:"username"`
	Password          *string            `json:"password"`
	Token             *string            `json:"token"`
	DateOfBirth       *time.Time         `json:"date_of_birth"`
	Phone             *string            `json:"phone"`
	Location          *string            `json:"location"`
	Interests         []string           `json:"interests"`
	About             *string            `json:"about"`
	Comments          []string           `json:"comments"`
	TravelPreferences []string           `json:"travel_preferences"`
	ProfilePicture    *string            `json:"profile_picture"`
	TravelPhotos      []string           `json:"travel_photos"`
}

// UpdateableUser struct contains fields that can be updated by the user after login
type UpdateableUser struct {
	Name              string    `json:"name"`
	Surname           string    `json:"surname"`
	Username          string    `json:"username"`
	DateOfBirth       *time.Time `json:"date_of_birth"`
	Phone             *string    `json:"phone"`
	Location          *string    `json:"location"`
	Interests         []string   `json:"interests"`
	About             *string    `json:"about"`
	Comments          []string   `json:"comments"`
	TravelPreferences []string   `json:"travel_preferences"`
	ProfilePicture    *string    `json:"profile_picture"`
	TravelPhotos      []string   `json:"travel_photos"`
}

// SaveToMongoDB saves the user to the MongoDB database
func (user *User) SaveToMongoDB(client *mongo.Client, dbName, collectionName string) error {
	collection := client.Database(dbName).Collection(collectionName)

	if user.ID.IsZero() {
		user.ID = primitive.NewObjectID() // Generate a new ObjectID if it's not set
	}

	// Eğer kullanıcı zaten mevcutsa, onu güncelle
	filter := primitive.M{"_id": user.ID}
	update := primitive.M{"$set": user}
	opts := options.Update().SetUpsert(true)

	_, err := collection.UpdateOne(context.Background(), filter, update, opts)
	return err
}

// UserIDHex returns the User's ID as a hex string
func (user *User) UserIDHex() string {
	return user.ID.Hex()
}