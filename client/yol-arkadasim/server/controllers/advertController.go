package controllers

import (
	"context"
	"fmt"
	"net/http"
	"strconv"
	"time"
	"yol-arkadasim/database"
	"yol-arkadasim/models"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func CreateAdvertHandler(c *gin.Context) {
	var userID any
	var ok bool

	if userID, ok = c.Get("userID"); !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User ID not found"})
		return
	}

	// Debug için userID'yi yazdır
	fmt.Println("userID (interface{}):", userID)

	// userID'yi string türüne dönüştür
	userIDStr, ok := userID.(string)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid user ID"})
		return
	}

	// Debug için userIDStr'yi yazdır
	fmt.Println("userIDStr (string):", userIDStr)

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

	// Debug için advert'i yazdır
	fmt.Printf("Advert: %+v\n", advert)

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
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error 2"})
		return
	}
	defer cursor.Close(context.Background())

	// İlanları bir dilimde depolamak için boş bir dilim oluştur
	var adverts []models.AdvertModel

	// Tüm ilanları döngü ile al
	for cursor.Next(context.Background()) {
		var advert models.AdvertModel
		if err := cursor.Decode(&advert); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error 3", "message": err.Error()})
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

// ////////////////////////////////////////////////////////////////////////////////////
func GetAdvertsByUsernameHandler(c *gin.Context) {
	// URL parametresinden username'i al
	username := c.Param("username")
	if username == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Username is required"})
		return
	}

	// username'e göre userID'yi al
	userID, err := GetUserIDByUsername(username)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
		return
	}
	if userID == "" {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	// Debug: userID'yi yazdır
	fmt.Println("userID:", userID)

	// Veritabanı bağlantısını al
	client := database.GetMongoClient()
	collection := client.Database("mydatabase").Collection("adverts")

	// İlanları userID'ye göre sorgula
	cursor, err := collection.Find(context.Background(), bson.M{"posted_by_id": userID})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
		return
	}
	defer cursor.Close(context.Background())

	// İlanları bir dilimde depolamak için boş bir dilim oluştur
	adverts := []models.AdvertModel{}

	// Tüm ilanları döngü ile al
	for cursor.Next(context.Background()) {
		var advert models.AdvertModel
		if err := cursor.Decode(&advert); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
			return
		}
		adverts = append(adverts, advert)
	}

	if err := cursor.Err(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
		return
	}

	// Debug: adverts'i yazdır
	fmt.Printf("Adverts: %+v\n", adverts)

	// İlanları başarıyla aldıktan sonra, JSON olarak yanıt ver
	c.JSON(http.StatusOK, gin.H{"adverts": adverts})
}

// GetAdvertsByUserIDHandler HTTP GET isteği ile bir kullanıcının ilanlarını alır.
func GetAdvertsByUserIDHandler(c *gin.Context) {
	// URL parametresinden userID'yi alın
	userID := c.Param("userid") // Burada "userid" parametresini alıyoruz
	if userID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User ID is required"})
		return
	}

	// MongoDB bağlantısını alın
	client := database.GetMongoClient()
	collection := client.Database("mydatabase").Collection("adverts")

	// Belirli bir postedbyid değerine sahip belgeleri sorgulayın
	filter := bson.M{"posted_by_id": userID}
	cursor, err := collection.Find(context.Background(), filter)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
		return
	}
	defer cursor.Close(context.Background())

	// Belgeleri bir dilimde depolamak için boş bir dilim oluşturun
	var adverts []models.AdvertModel

	// Tüm belgeleri döngü ile alın
	for cursor.Next(context.Background()) {
		var advert models.AdvertModel
		if err := cursor.Decode(&advert); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
			return
		}
		adverts = append(adverts, advert)
	}

	// İşlem sırasında herhangi bir hata olup olmadığını kontrol edin
	if err := cursor.Err(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
		return
	}

	// Sonuçları JSON formatında yanıtlayın
	c.JSON(http.StatusOK, gin.H{"adverts": adverts})
}
func GetFilteredAdvertsHandler(c *gin.Context) {
	from := c.Query("from")
	to := c.Query("to")
	journeyDateStr := c.Query("journeyDate")

	var journeyDate time.Time
	var err error
	if journeyDateStr != "" {
		journeyDate, err = time.Parse("02.01.2006", journeyDateStr)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid journeyDate format. Use DD.MM.YYYY"})
			return
		}
	}

	client := database.GetMongoClient()
	collection := client.Database("mydatabase").Collection("adverts")

	filter := bson.M{}
	if from != "" {
		filter["from"] = from
	}
	if to != "" {
		filter["to"] = to
	}
	if !journeyDate.IsZero() {
		// Filter for a specific journey date
		filter["journey_date"] = journeyDate
	}

	// Sayfalama değişkenlerini tanımla ve varsayılan değerleri atama
	page, err := strconv.Atoi(c.Query("page"))
	if err != nil || page <= 0 {
		page = 1
	}
	limit, err := strconv.Atoi(c.Query("limit"))
	if err != nil || limit <= 0 {
		limit = 10 // Varsayılan olarak 10 ilan göster
	}
	skip := (page - 1) * limit

	// İlanları belirli sayfa ve limit ile getir
	cursor, err := collection.Find(context.Background(), filter, options.Find().SetSkip(int64(skip)).SetLimit(int64(limit)))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
		return
	}
	defer cursor.Close(context.Background())

	var adverts []models.AdvertModel
	for cursor.Next(context.Background()) {
		var advert models.AdvertModel
		if err := cursor.Decode(&advert); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
			return
		}
		adverts = append(adverts, advert)
	}

	if err := cursor.Err(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
		return
	}

	// Toplam ilan sayısını al
	totalAdverts, err := collection.CountDocuments(context.Background(), filter)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
		return
	}

	// Sayfalama verilerini JSON formatında yanıtla
	c.JSON(http.StatusOK, gin.H{"adverts": adverts, "totalAdverts": totalAdverts})
}

// GetAdvertByIDHandler fetches advert details by advert ID.
func GetAdvertByIDHandler(c *gin.Context) {
	// Get the advert ID from the URL parameter
	advertIDParam := c.Param("advert_id")
	if advertIDParam == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Advert ID is required"})
		return
	}

	// Convert advert ID to ObjectID type
	advertID, err := primitive.ObjectIDFromHex(advertIDParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Advert ID"})
		return
	}

	// Get the database connection
	client := database.GetMongoClient()
	collection := client.Database("mydatabase").Collection("adverts")

	// Find the advert by its ID
	var advert models.AdvertModel
	err = collection.FindOne(context.Background(), bson.M{"advert_id": advertID}).Decode(&advert)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			c.JSON(http.StatusNotFound, gin.H{"error": "Advert not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
		}
		return
	}

	// Return the advert details as JSON
	c.JSON(http.StatusOK, gin.H{"advert": advert})
}
