package main

import (
	"log"
	"yol-arkadasim/controllers"
	"yol-arkadasim/database"

	"github.com/gin-gonic/gin"
)

func main() {
	err := database.ConnectToMongoDB()
	if err != nil {
		log.Fatal("MongoDB'ye bağlanırken bir hata oluştu: ", err)
	}

	router := gin.Default()

	router.POST("/register", controllers.RegisterHandler)
	router.POST("/login", controllers.LoginHandler)

	userGroup := router.Group("/user")
	{
		userGroup.Use(controllers.AuthMiddleware)
		userGroup.PUT("/update_profile", controllers.UpdateUserProfileHandler)
	}

	router.POST("/advert", controllers.CreateAdvertHandler)

	err = router.Run(":8080")
	if err != nil {
		log.Fatal("Router başlatılırken bir hata oluştu: ", err)
	}
}
