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
		log.Fatal("white list'e ip adresin eklenmemiş olabilir atlas üzerinden ekle")

	}

	router := gin.Default()

	// CORS ayarları
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000"}
	config.AllowHeaders = []string{"Authorization", "Content-Type", "id"} // "Content-Type" başlığını ekleyin
	config.AllowCredentials = true
	router.Use(cors.New(config))

	router.POST("/register", controllers.RegisterHandler)
	router.POST("/login", controllers.LoginHandler)
	router.POST("/logout", controllers.LogoutHandler)

	router.GET("/get-all-adverts", controllers.GetAllAdvertsHandler)
	router.GET("/adverts/user/:userid", controllers.GetAdvertsByUserIDHandler)
	router.GET("/adverts/:username", controllers.GetAdvertsByUsernameHandler)

	router.POST("/create/advert", controllers.AuthMiddleware, controllers.CreateAdvertHandler)
	router.PUT("advert/update/:id", controllers.AuthMiddleware, controllers.UpdateAdvertHandler)
	router.DELETE("/advert/:advert_id", controllers.AuthMiddleware, controllers.DeleteAdvertHandler)

	router.GET("/get-all-users", controllers.GetAllUsersHandler)
	router.DELETE("/users/:userID", controllers.AuthMiddleware, controllers.DeleteUserHandler)
	router.PUT("/user/update_profile", controllers.AuthMiddleware, controllers.UpdateUserProfileHandler)

	router.GET("/profile/:username", controllers.GetUserProfileByUsernameHandler)

	err = router.Run(":8080")
	if err != nil {
		log.Fatal("Router başlatılırken bir hata oluştu: ", err)
	}
}