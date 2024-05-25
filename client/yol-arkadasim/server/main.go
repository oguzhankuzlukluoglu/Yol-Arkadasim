package main

import (
	"log"
	"yol-arkadasim/controllers"
	"yol-arkadasim/database"

	"github.com/gin-gonic/gin"
)

//var store *sessions.CookieStore

func main() {
	// MongoDB'ye bağlanmak için bağlantı oluştur
	err := database.ConnectToMongoDB()
	if err != nil {
		log.Fatal("MongoDB'ye bağlanırken bir hata oluştu: ", err)
	}

	router := gin.Default()
	// Kullanıcılarla ilgili HTTP işleyicileria
	userGroup := router.Group("/user")
	{
		userGroup.Use(controllers.AuthMiddleware)
		userGroup.PUT("/update_profile", controllers.UpdateUserProfileHandler)
	}
	advertGroup := router.Group("/create")
	{
		advertGroup.Use(controllers.AuthMiddleware)
		advertGroup.POST("/advert", controllers.CreateAdvertHandler)
		router.PUT("/advert/update/:id", controllers.UpdateAdvertHandler)
	}
	advertGroupD := router.Group("/delete")
	{
		advertGroupD.Use(controllers.AuthMiddleware)
		advertGroupD.DELETE("/advert/:id", controllers.DeleteAdvertHandler)
	}
	router.POST("/register", controllers.RegisterHandler)
	router.POST("/login", controllers.LoginHandler)
	router.POST("/logout", controllers.LogoutHandler)

	router.GET("/get-all-adverts", controllers.GetAllAdvertsHandler)
	router.GET("/get-all-users", controllers.GetAllUsersHandler)
	router.GET("/profile/:username", controllers.GetUserProfileByUsernameHandler)

	err = router.Run(":8080")
	if err != nil {
		log.Fatal("Router başlatılırken bir hata oluştu: ", err)
	}
}
