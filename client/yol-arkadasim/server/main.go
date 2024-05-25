package main

import (
	"log"
	"yol-arkadasim/controllers"
	"yol-arkadasim/database"

	"github.com/gin-contrib/cors"
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

	// CORS ayarları
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000"}
	config.AllowCredentials = true
	router.Use(cors.New(config))

	router.POST("/register", controllers.RegisterHandler)                                                 //aktif
	router.POST("/login", controllers.LoginHandler)                                                       //aktif
	router.POST("/user/update_profile", controllers.AuthMiddleware, controllers.UpdateUserProfileHandler) //bakılmalı
	router.POST("/logout", controllers.LogoutHandler)                                                     //aktif
	router.POST("/create/advert", controllers.AuthMiddleware, controllers.CreateAdvertHandler)            //aktif

	router.PUT("advert/update/:id", controllers.AuthMiddleware, controllers.UpdateAdvertHandler) //silinebilir

	router.GET("/get-all-adverts", controllers.GetAllAdvertsHandler)              //aktif
	router.GET("/get-all-users", controllers.GetAllUsersHandler)                  //aktif
	router.GET("/profile/:username", controllers.GetUserProfileByUsernameHandler) //aktif bakılmalı

	router.DELETE("/users/:userID", controllers.AuthMiddleware, controllers.DeleteAdvertHandler)     //aktif
	router.DELETE("/advert/:advert_id", controllers.AuthMiddleware, controllers.DeleteAdvertHandler) //aktif

	err = router.Run(":8080")
	if err != nil {
		log.Fatal("Router başlatılırken bir hata oluştu: ", err)
	}
}
