package controllers

import (
	"context"
	"net/http"
	"yol-arkadasim/database"
	"yol-arkadasim/models"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func IsUsernameTaken(username string) bool {
	// Veritabanı bağlantısını al
	client := database.GetMongoClient()

	// Kullanıcı adına göre veritabanında arama yap
	collection := client.Database("mydatabase").Collection("users")
	filter := bson.M{"username": username}

	var user bson.M
	err := collection.FindOne(context.Background(), filter).Decode(&user)

	if err == mongo.ErrNoDocuments {
		// Kullanıcı bulunamadı, dolayısıyla kullanıcı adı kullanılmamıştır
		return false
	} else if err != nil {
		// Bir hata oluştu, bu durumda varsayılan olarak kullanıcı adının alınmadığını farz edelim
		return false
	}

	// Kullanıcı adı bulundu, dolayısıyla kullanıcı adı daha önce alınmıştır
	return true
}
func IsEmailTaken(email string) bool {
	// Veritabanı bağlantısını al
	client := database.GetMongoClient()

	// E-posta adresine göre veritabanında arama yap
	collection := client.Database("mydatabase").Collection("users")
	filter := bson.M{"email": email}

	// E-posta adresine sahip kullanıcı sayısını say
	count, err := collection.CountDocuments(context.Background(), filter)
	if err != nil {
		// Bir hata oluştu, bu durumda varsayılan olarak e-posta adresinin alınmadığını farz edelim
		return false
	}

	// Eğer e-posta adresine sahip kullanıcı varsa, alınmıştır
	return count > 0
}

func RegisterHandler(c *gin.Context) {
	// POST isteği olup olmadığını kontrol et
	if c.Request.Method != http.MethodPost {
		c.JSON(http.StatusMethodNotAllowed, gin.H{"error": "Method Not Allowed"})
		return
	}

	// Kullanıcı bilgilerini al
	var user models.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Kullanıcı adının daha önce alınıp alınmadığını kontrol et
	if IsUsernameTaken(*user.Username) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bu kullanıcı adı daha önce alınmış"})
		return
	}
	if IsEmailTaken(*user.Email) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bu e-posta adresi daha önce alınmış"})
		return
	}

	// Kullanıcıyı kaydet
	err := user.SaveToMongoDB(database.GetMongoClient(), "mydatabase", "users")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
		return
	}
	err = CreateProfileForUser(&user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create profile"})
		return
	}

	// Başarı durumunda, kullanıcıya yanıt gönderin veya başka bir işlem yapın
	c.JSON(http.StatusOK, gin.H{"message": "Kayıt başarıyla tamamlandı!", "user": user})
}
func CreateProfileForUser(user *models.User) error {
	profile := models.Profile{
		UserID: user.ID,
		// Diğer özelliklerin başlangıç değerlerini belirle
	}

	// Veritabanına profil kaydet
	err := profile.SaveToMongoDB(database.GetMongoClient(), "mydatabase", "profiles")
	if err != nil {
		return err
	}

	return nil
}
