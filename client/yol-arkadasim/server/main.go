package main

import (
	"context"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"yol-arkadasim/models"
)

func main() {
	// MongoDB'ye bağlanmak için bağlantı dizesi oluşturun
	clientOptions := options.Client().ApplyURI("mongodb+srv://oguzhankuzlukluoglu:LDsaJ3xgKoenjIF9@cluster0.16jwgbi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

	// Bağlantı oluştur
	client, err := mongo.Connect(context.Background(), clientOptions)
	if err != nil {
		log.Fatal(err)
	}

	// MongoDB istemcisini kapatın
	defer func() {
		if err := client.Disconnect(context.Background()); err != nil {
			log.Fatal(err)
		}
	}()

	// MongoDB'ye başarılı bir şekilde bağlandığınızı kontrol edin
	err = client.Ping(context.Background(), nil)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("MongoDB'ye başarıyla bağlandı!")

	var name, surname, email, password string

	// Kullanıcıdan isim, soyisim, e-posta ve şifreyi al
	fmt.Println("Kayıt olmak için aşağıdaki bilgileri girin:")
	fmt.Print("İsim: ")
	_, err = fmt.Scanln(&name)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Print("Soyisim: ")
	_, err = fmt.Scanln(&surname)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Print("E-posta adresi: ")
	_, err = fmt.Scanln(&email)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Print("Şifre: ")
	_, err = fmt.Scanln(&password)
	if err != nil {
		log.Fatal(err)
	}

	// Kullanıcıyı MongoDB'ye eklemek için UserModel oluştur
	user := &models.User{
		Name:     &name,
		Surname:  &surname,
		Email:    &email,
		Password: &password, // Şifreyi düz metin olarak sakla
	}

	// UserModel'i MongoDB'ye kaydet
	err = user.SaveToMongoDB(client, "mydatabase", "users")
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Kayıt başarıyla tamamlandı!")
}
