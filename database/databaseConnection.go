package database

import (
	"context"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var client *mongo.Client

func ConnectToMongoDB() error {
	// MongoDB'ye bağlanmak için bağlantı dizesi oluşturun
	clientOptions := options.Client().ApplyURI("mongodb+srv://msmertsancar:<k8FyU09hElNtPQ82>@cluster0.sp42u3p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

	// Bağlantı oluştur
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
