package controllers

import (
	"context"
	"net/http"
	"time"
	"yol-arkadasim/database"
	"yol-arkadasim/models"

	"github.com/gin-gonic/gin"
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
func UpdateAdvertHandler(c *gin.Context) {
	// Bu kısımda güncelleme işlemleri yapılacak
	// Eksik olduğu için şu anlık bir işlem gerçekleştirilmiyor
	c.JSON(http.StatusOK, gin.H{"message": "UpdateAdvertHandler endpoint is under construction"})
}
