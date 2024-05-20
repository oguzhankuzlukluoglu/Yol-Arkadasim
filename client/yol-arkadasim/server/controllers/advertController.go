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


)

// CreateAdvertHandler HTTP POST isteği ile yeni bir ilan oluşturur.
func CreateAdvertHandler(c *gin.Context) {
	// POST isteği olup olmadığını kontrol et
	if c.Request.Method != http.MethodPost {
		c.JSON(http.StatusMethodNotAllowed, gin.H{"error": "Method Not Allowed"})
		return
	}

	var advert models.AdvertModel
	if err := c.ShouldBindJSON(&advert); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// İlan tarihini ayarla
	now := time.Now()
	advert.AdvertDate = &now

	// İlanı veritabanına kaydet
	if err := SaveAdvertToDB(&advert); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Advert created successfully", "advert": advert})
}

// SaveAdvertToDB, advert modelini MongoDB'ye kaydeder.
func SaveAdvertToDB(advert *models.AdvertModel) error {
	client := database.GetMongoClient()

	collection := client.Database("mydatabase").Collection("adverts")

	_, err := collection.InsertOne(context.Background(), advert)
	if err != nil {
		return err
	}

	return nil
}

// UpdateAdvertHandler HTTP PUT isteği ile var olan bir ilanı günceller.
// UpdateAdvertHandler HTTP PUT isteği ile var olan bir ilanı günceller.
func UpdateAdvertHandler(c *gin.Context) {
	// PUT isteği olup olmadığını kontrol et
	if c.Request.Method != http.MethodPut {
		c.JSON(http.StatusMethodNotAllowed, gin.H{"error": "Method Not Allowed"})
		return
	}

	// İlan ID'sini URL parametrelerinden al
	advertIDParam := c.Param("id")
	if advertIDParam == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Advert ID is required"})
		return
	}

	// İlan ID'sini ObjectID tipine çevir
	advertID, err := primitive.ObjectIDFromHex(advertIDParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Advert ID"})
		return
	}

	// Güncellenmiş ilan verilerini al
	var updatedAdvert models.AdvertModel
	if err := c.ShouldBindJSON(&updatedAdvert); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Veritabanı bağlantısını al
	client := database.GetMongoClient()
	collection := client.Database("mydatabase").Collection("adverts")

	// İlanı güncelle
	filter := bson.M{"advert_id": advertID}
	update := bson.M{
		"$set": bson.M{
			"from":                updatedAdvert.From,
			"to":                  updatedAdvert.To,
			"transport_choice":    updatedAdvert.TransportChoice,
			"journey_description": updatedAdvert.JourneyDescription,
			// Diğer güncellenebilir alanları buraya ekleyin
		},
	}

	_, err = collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
		return
	}

	// Başarılı güncelleme yanıtı
	c.JSON(http.StatusOK, gin.H{"message": "Advert updated successfully"})
}


// GetAllAdvertsHandler tüm ilanları getiren bir HTTP GET isteği işleyicisi.
func GetAllAdvertsHandler(c *gin.Context) {
	// Veritabanı bağlantısını al
	client := database.GetMongoClient()

	// Collection belirle
	collection := client.Database("mydatabase").Collection("adverts")

	// Tüm ilanları bul
	cursor, err := collection.Find(context.Background(), bson.M{})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
		return
	}
	defer cursor.Close(context.Background())

	// İlanları bir dilimde depolamak için boş bir dilim oluştur
	var adverts []models.AdvertModel

	// Tüm ilanları döngü ile al
	for cursor.Next(context.Background()) {
		var advert models.AdvertModel
		if err := cursor.Decode(&advert); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
			return
		}
		adverts = append(adverts, advert)
	}

	// İlanları başarıyla aldıktan sonra, JSON olarak yanıt ver
	c.JSON(http.StatusOK, gin.H{"adverts": adverts})
}
