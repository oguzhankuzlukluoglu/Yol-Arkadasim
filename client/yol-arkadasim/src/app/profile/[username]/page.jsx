"use client"
import React, { useState, useEffect } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import styles from "./profilePage.module.css"
import AdvertSection from "@/components/advertSection/AdvertSection";
import ProfileUpdate from "@/components/updateProfile/ProfileUpdate";
import UpdateInterest from "@/components/updateInterest/UpdateInterest";
import Menu from "@/components/menu/Menu";

const ProfilePage = () => {
  const [username, setUsername] = useState(useParams().username)
  const [userData, setUserData] = useState(null);


  useEffect(() => {
    if (username) {
      // Kullanıcı verilerini API'den çek
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/profile/${username}`);
          console.log(response)
          setUserData(response.data.profile);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, [username]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  const { name, surname, about, location, interests,comments, profilePicture } = userData;

  return (
    <div className={styles.container}>
      <div className={styles.userInfos}>
        {/* Profil resmi ve bilgiler */}
        <div className={styles.profile}>
          <div className={styles.profileImage}>
            <Image alt="profile-photo" src={profilePicture || "/navbarLogo.png"} width={300} height={300}/>
          </div>
          <div className={styles.profileBio}>
            <div className={styles.settings}>
              <span>{username}</span>
              <ProfileUpdate/>
            </div>
            <span className={styles.userName}>{`${name} ${surname}`}</span>
            <span className={styles.userDesc}>{about}</span>
            <div className={styles.userLocation}>
              <Image alt="location" src="/location.png" width={16} height={16}/>
              <span>{location}</span>
            </div>
          </div>
        </div>
      </div>
      {/* İlgi alanları */}
      <div className={styles.interests}>
        <h1 className={styles.interestTitle}>İlgi Alanlarım</h1>
        <div className={styles.interestInfo}>
          {interests?.map((interest, index) => (
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
          {comments?.map((comment, index) => (
                 <p key={index}> {comment}</p>
            ))}
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
