package models

import (
	"context"
	"errors"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type Profile struct {
	UserID            primitive.ObjectID `bson:"user_id"`
	Name              *string            `json:"name" validate:"required,min=2,max=100"`
	Surname           *string            `json:"surname" validate:"required,min=2,max=100"`
	Phone             *string            `json:"phone"`
	Comments          []string           `json:"comments"`
	Interests         []string           `json:"interests"`
	About             *string            `json:"about"` //biyografi aynı zamanda
	Location          *string            `json:"location"`
	TravelPreferences []string           `json:"travel_preferences"`
	ProfilePicture    *string            `json:"profile_picture"`
	TravelPhotos      []string           `json:"travel_photos"`
}

func (p *Profile) SaveToMongoDB(client *mongo.Client, databaseName, collectionName string) error {
	collection := client.Database(databaseName).Collection(collectionName)

	// Profili MongoDB'ye ekle
	result, err := collection.InsertOne(context.Background(), p)
	if err != nil {
		log.Printf("MongoDB'ye profil eklenirken hata oluştu: %v\n", err)
		return err
	}

	// Eklenen belgenin ID'sini al
	insertedID, ok := result.InsertedID.(primitive.ObjectID)
	if !ok {
		return errors.New("InsertedID type assertion failed")
	}

	// Profil ID'sini güncelle
	p.UserID = insertedID

	fmt.Println("Profil başarıyla MongoDB'ye kaydedildi.")

	return nil
}
