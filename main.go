package main

import (
	"github.com/gin-gonic/gin"
	"log"
	"yol-arkadasim/controllers"
	"yol-arkadasim/database"
)

func main() {
	// MongoDB'ye bağlanmak için bağlantı oluştur
	err := database.ConnectToMongoDB()
	if err != nil {
		log.Fatal("MongoDB'ye bağlanırken bir hata oluştu: ", err)
	}

	router := gin.Default()

	router.POST("/register", controllers.RegisterHandler)
	router.POST("/login", controllers.LoginHandler) // Yeni route ekledik

	// Kullanıcılarla ilgili HTTP işleyicileri
	userGroup := router.Group("/user")
	{
		userGroup.POST("/update", controllers.UpdateUserHandler)
		// Diğer kullanıcı ile ilgili HTTP işleyicileri buraya eklenebilir
	}

	err = router.Run(":8080")
	if err != nil {
		log.Fatal("Router başlatılırken bir hata oluştu: ", err)
	}
}
