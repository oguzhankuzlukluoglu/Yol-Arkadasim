package database

import (
	"context"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var client *mongo.Client

func ConnectToMongoDB() error {
	clientOptions := options.Client().ApplyURI("database baglantisini girin")

	c, err := mongo.Connect(context.Background(), clientOptions)
	if err != nil {
		return err
	}

	client = c
	return nil
}

func GetMongoClient() *mongo.Client {
	return client
}
