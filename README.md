# Yol-Arkadasim-Golang-

Yol-Arkadasim, BlaBlaCar benzeri bir platformdur ve kullanıcıların şehir içi veya şehir dışı yolculuklarında paylaşım yaparak seyahat arkadaşları bulmalarını sağlar. Bu proje, **Next.js**, **TailwindCSS**, **MongoDB**, **Go**, **Gin**, **Axios** gibi modern teknolojileri kullanarak geliştirilmiştir.

## Proje Özeti

Bu uygulama, sürücülerin araçlarında boş koltuklarını paylaşmalarını ve yolculuk yapacak kişilerin bu koltukları rezerve etmelerini sağlar. Kullanıcılar, gitmek istedikleri rota için ilanlar oluşturabilir ya da mevcut ilanlara başvurabilirler.

### Teknolojiler

- **Next.js**: React tabanlı modern bir frontend framework'ü.
- **TailwindCSS**: Hızlı ve esnek CSS tasarımı için kullanıldı.
- **MongoDB**: Veritabanı yönetimi için NoSQL veritabanı.
- **Go**: Backend API'yi oluşturmak için kullanıldı.
- **Gin**: Go için hafif bir HTTP web framework'ü.
- **Axios**: Frontend ve backend arasında veri alışverişi için kullanıldı.

## Kurulum ve Kullanım

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyin:

1. **Depoyu klonlayın:**

   ```bash
   git clone https://github.com/oguzhankuzulukluoglu/Yol-Arkadasim.git
   cd Yol-Arkadasim

2. **Gerekli bağımlılıkları yükleyin:**
   cd client/yol-arkadasim
   npm install
   npm run dev
   cd server
   go mod tidy
   go run main.go
   
3. ***ENV dosyası oluşturun
  MONGO_URI=your_mongodb_uri
  PORT=5000



![Login](login.jpeg)
![Home Page](homepage.jpeg)
![App](ici.jpeg)
![Creator](creator.jpeg)
![App](content.jpeg)

