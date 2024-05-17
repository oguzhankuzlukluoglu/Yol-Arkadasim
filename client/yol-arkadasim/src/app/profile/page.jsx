import Image from "next/image";
import React from "react";
import Link from "next/link"
import styles from "./profilePage.module.css";

const ProfilePage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.userInfos}>
        {/*kapak fotoğrafı kısmı  */}
        <div className={styles.coverImage}>
          <Image alt="profile-cover-photo" src="/navbarLogo.png" fill/>
        </div>
        {/* Profil resmi ve bilgiler */}
        <div className={styles.profile}>
          <div className={styles.profileImage}>
            <Image alt="profile-photo" src="/navbarLogo.png" width={300} height={300}/>
          </div>
          <div className={styles.profileBio}>
            <span className={styles.userName}>Deniz Ök</span>
            <span className={styles.userDesc}>{"I'm a Frontend developer from Turkey."}</span>
            <div className={styles.userLocation}>
              <Image alt="location" src="/location.png" width={16} height={16}/>
              <span>Denizli</span>
            </div>
          </div>
        </div>
      </div>
      {/* İlgi alanları */}
      <div className={styles.interests}>
        <h1 className={styles.interestTitle}>İlgi Alanlarım</h1>
        <div className={styles.interestInfo}>
          <span>Futbol</span>
          <span>Kültür</span>
          <span>Kitap Okumak</span>
          <span>Fitness</span>
        </div>
      </div>
      {/* Anılar kısmı */}
      <div className={styles.memorySection}>
        <h1 className={styles.memoryTitle}>Önceki Seyahatlerden Anılar</h1>
        <div className={styles.memoryImage}>
          <Image alt="anı" src="/navbarLogo.png" width={300} height={300}/>
          <Image alt="anı" src="/navbarLogo.png" width={300} height={300}/>
          <Image alt="anı" src="/navbarLogo.png" width={300} height={300}/>
          <Image alt="anı" src="/navbarLogo.png" width={300} height={300}/>
        </div>
      </div>
      {/* Güncel İlanlar Kısmı */}
      <div className={styles.adverts}>
        <h1 className={styles.advertsTitle}>Güncel İlanlar</h1>
        <div className={styles.advertSection}>
          <div className={styles.advertInfos}>
            <div className={styles.travelInfo}>
              <span>Güzergah: Ankara &#8658; İstanbul</span>
              <span>Ulaşım Tercihi: Araba</span>
            </div>
            <div className={styles.travelInfo}>
              <span>Tarih: 08.04.2024 14:00</span>
            </div>
          </div>
          <div className={styles.advertUser}>
            <div className={styles.advertUserInfo}>
              <Image alt="profile-photo" src="/navbarLogo.png" width={48} height={48}/>
              <span>Deniz Ök</span>
            </div>
            <div className={styles.advertButton}>
              <Link href={`/`}>İlana Göz At</Link>
            </div>
          </div>
        </div>
        <div className={styles.advertSection}>
          <div className={styles.advertInfos}>
            <div className={styles.travelInfo}>
              <span>Güzergah: Ankara &#8658; İstanbul</span>
              <span>Ulaşım Tercihi: Araba</span>
            </div>
            <div className={styles.travelInfo}>
              <span>Tarih: 08.04.2024 14:00</span>
            </div>
          </div>
          <div className={styles.advertUser}>
            <div className={styles.advertUserInfo}>
              <Image alt="profile-photo" src="/navbarLogo.png" width={48} height={48}/>
              <span>Deniz Ök</span>
            </div>
            <div className={styles.advertButton}>
              <Link href={`/`}>İlana Göz At</Link>
            </div>
          </div>
        </div>
      </div>
      

    </div>
  );
};

export default ProfilePage;
