package controllers

import (
	"context"
	"net/http"
	"strings"
	"time"
	"yol-arkadasim/database"
	"yol-arkadasim/models"
	"yol-arkadasim/utils"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// CreateAdvertHandler HTTP POST isteği ile yeni bir ilan oluşturur.
func CreateAdvertHandler(c *gin.Context) {
	tokenString := c.GetHeader("Authorization")
	userID, _, err := utils.ExtractUserIDAndExpirationFromToken(tokenString)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}
	//userID := c.GetString("userID") // Kullanıcı kimliğini middleware'den al

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
	advert.AdvertID = primitive.NewObjectID() // Yeni ilan ID'si oluştur
	advert.PostedByID = userID                // Kullanıcı kimliğini ata

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
func UpdateAdvertHandler(c *gin.Context) {
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
			"journey_date":        updatedAdvert.JourneyDate,
			"journey_time":        updatedAdvert.JourneyTime,
			"phone_number":        updatedAdvert.PhoneNumber,
			"journey_description": updatedAdvert.JourneyDescription,
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
	client := database.GetMongoClient()
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

// DeleteAdvertHandler HTTP DELETE isteği ile bir ilanı siler.
func DeleteAdvertHandler(c *gin.Context) {
	authHeader := c.GetHeader("Authorization")
	if authHeader == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Yetkisiz erişim"})
		c.Abort()
		return
	}

	authHeaderParts := strings.Split(authHeader, " ")
	if len(authHeaderParts) != 2 || authHeaderParts[0] != "Bearer" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Yetkisiz erişim"})
		c.Abort()
		return
	}

	//tokenString := authHeaderParts[1]

	if c.Request.Method != http.MethodDelete {
		c.JSON(http.StatusMethodNotAllowed, gin.H{"error": "Method Not Allowed"})
		return
	}

	// İlan ID'sini URL parametrelerinden al
	advertIDParam := c.Param("advert_id")
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

	// Veritabanı bağlantısını al
	client := database.GetMongoClient()
	collection := client.Database("mydatabase").Collection("adverts")

	// İlanı sil
	filter := bson.M{"advert_id": advertID}
	_, err = collection.DeleteOne(context.Background(), filter)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "777777777777Internal Server Error"})
		return
	}

	// Başarılı silme yanıtı
	c.JSON(http.StatusOK, gin.H{"message": "Advert deleted successfully"})
}
