package controllers

import (
	"context"
	"fmt"
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
	var userID any
	var ok bool

	if userID, ok = c.Get("userID"); !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User ID not found"})
		return
	}

	// userID'yi string türüne dönüştürün
	userIDStr, ok := userID.(string)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid user ID"})
		return
	}

	if c.Request.Method != http.MethodPost { // Yöntemi HTTP POST olarak kontrol edin
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
	advert.PostedByID = userIDStr             // Kullanıcı kimliğini ata

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
	var userID, _ = c.Get("userID")

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

	var advert models.AdvertModel
	err = collection.FindOne(context.Background(), bson.M{"advert_id": advertID}).Decode(&advert)

	fmt.Println(userID, advert.PostedByID)

	if userID != advert.PostedByID {

		c.JSON(http.StatusForbidden, gin.H{"error": "bu ilana erişiminiz yok"})
		return
	}

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
		c.JSON(http.StatusBadRequest, gin.H{"error": "veritabanına bağlanılamıyor"})
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

	var userID, _ = c.Get("userID")

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

	var advert models.AdvertModel
	err = collection.FindOne(context.Background(), bson.M{"advert_id": advertID}).Decode(&advert)

	fmt.Println(advert.PostedByID, userID)
	if advert.PostedByID != userID {
		c.JSON(http.StatusForbidden, gin.H{"error": "You can't access this source!"})
		return
	}

	// İlanı sil
	filter := bson.M{"advert_id": advertID}
	_, err = collection.DeleteOne(context.Background(), filter)
	if err != nil {
		fmt.Println(err.Error())
		c.JSON(http.StatusBadRequest, gin.H{"error": "Advert silinirken bir hata oluştu."})
		return
	}

	// Başarılı silme yanıtı
	c.JSON(http.StatusOK, gin.H{"message": "Advert deleted successfully"})
}
