import Image from "next/image";
import React from "react";
import Link from "next/link"
import styles from "./profilePage.module.css";
import AdvertSection from "@/components/advertSection/AdvertSection";
import ProfileUpdate from "@/components/updateProfile/ProfileUpdate";
import UpdateInterest from "@/components/updateInterest/UpdateInterest";
import Menu from "@/components/menu/Menu";

const ProfilePage = () => {

  const interests = ['Futbol', 'Kültür', 'Kitap Okumak', 'Fitness'];

  return (
    <div className={styles.container}>
      <div className={styles.userInfos}>
        {/* Profil resmi ve bilgiler */}
        <div className={styles.profile}>
          <div className={styles.profileImage}>
            <Image alt="profile-photo" src="/navbarLogo.png" width={300} height={300}/>
          </div>
          <div className={styles.profileBio}>
            <div className={styles.settings}>
              <span>denizok2020</span>
              <ProfileUpdate/>
            </div>
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
          {interests.map((interest, index) => (
                <span key={index} style={{ '--index': index }}>
                {interest}
            </span>
                ))}
           <Menu type="interest"/>
        </div>
      </div>
      {/* Anılar kısmı */}
      <div className={styles.memorySection}>
        <h1 className={styles.memoryTitle}>Yorumlar</h1>
        <div className={styles.memoryDesc}>
          <div className={styles.desc}>
            <p> Bu uygulamayı kullanarak çok iyi arkadaşlar edindim.
                  Kesinlikle bu uygulamayı tavsiye ediyorum. Hem güvenli, hem
                  kullanışlı.</p>
          </div>
          <Menu type="comment"/>
        </div>
      </div>
      {/* Güncel İlanlar Kısmı */}
      <div className={styles.adverts}>
        <h1 className={styles.advertsTitle}>Aktif İlanlar</h1>
        <AdvertSection/>
        <AdvertSection/>        
      </div>

    </div>
  );
};

export default ProfilePage;
