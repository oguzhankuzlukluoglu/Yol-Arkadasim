package models

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type User struct {
	ID               primitive.ObjectID `bson:"_id"`
	Name             *string            `json:"name" validate:"required,min=2,max=100"`
	Surname          *string            `json:"surname" validate:"required,min=2,max=100"`
	Email            *string            `json:"email"`
	DateOfBirth      *time.Time         `json:"date_of_birth"`
	RegistrationDate *time.Time         `json:"registration_date"`
	Username         *string            `json:"username"`
	Password         *string            `json:"password"`
	Phone            *string            `json:"phone"`
}

// UpdateableUser struct contains fields that can be updated by the user after login
// UpdateableUser struct contains fields that can be updated by the user after login
type UpdateableUser struct {
	Name        *string    `json:"name"`
	Surname     *string    `json:"surname"`
	Username    *string    `json:"username"`
	Password    *string    `json:"password"`
	DateOfBirth *time.Time `json:"date_of_birth"`
	Phone       *string    `json:"phone"`
}

func (user *User) SaveToMongoDB(client *mongo.Client, dbName, collectionName string) error {
	// Veritabanı koleksiyonu referansını al
	collection := client.Database(dbName).Collection(collectionName)

	// Kullanıcıya benzersiz bir _id atanması için MongoDB'ye belge ekle
	_, err := collection.InsertOne(context.Background(), user)
	if err != nil {
		if mongo.IsDuplicateKeyError(err) {
			user.ID = primitive.NewObjectID()                         // Yeni bir _id oluştur
			_, err = collection.InsertOne(context.Background(), user) // Yeniden deneyin
		}
		if err != nil {
			return err
		}
	}

	return nil
}
