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
		// Bu middleware, herhangi bir user grup işlemini gerçekleştirmeden önce, kullanıcının kimliğini kontrol eder.
		userGroup.Use(controllers.AuthMiddleware)

		userGroup.POST("/update", controllers.UpdateUserProfileHandler)
		// Diğer kullanıcı ile ilgili HTTP işleyicileri buraya eklenebilir
	}

	router.POST("/register", controllers.RegisterHandler)
	router.POST("/login", controllers.LoginHandler) // Yeni route ekledik
	userGroup.POST("/update_profile", controllers.UpdateUserProfileHandler)

	err = router.Run(":8080")
	if err != nil {
		log.Fatal("Router başlatılırken bir hata oluştu: ", err)
	}
}
