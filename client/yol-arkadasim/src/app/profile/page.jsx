import Image from "next/image";
import React from "react";
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
    </div>
  );
};

export default ProfilePage;
