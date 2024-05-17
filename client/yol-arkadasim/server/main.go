package main

import (
	"log"
	"yol-arkadasim/controllers"
	"yol-arkadasim/database"

	"github.com/gin-gonic/gin"
)

func main() {
	// MongoDB'ye bağlanmak için bağlantı oluştur
	err := database.ConnectToMongoDB()
	if err != nil {
		log.Fatal("MongoDB'ye bağlanırken bir hata oluştu: ", err)
	}

	router := gin.Default()
	// Kullanıcılarla ilgili HTTP işleyicileri
	userGroup := router.Group("/user")
	{
		userGroup.Use(controllers.AuthMiddleware)

		userGroup.POST("/update", controllers.UpdateUserProfileHandler)
	}

	router.POST("/register", controllers.RegisterHandler)
	router.POST("/login", controllers.LoginHandler)
	userGroup.POST("/update_profile", controllers.UpdateUserProfileHandler)
	router.POST("/advert", controllers.CreateAdvertHandler)

	err = router.Run(":8080")
	if err != nil {
		log.Fatal("Router başlatılırken bir hata oluştu: ", err)
	}
}
