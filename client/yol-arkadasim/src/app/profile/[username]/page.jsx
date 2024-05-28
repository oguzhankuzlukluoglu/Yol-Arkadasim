"use client"
import React, { useState, useEffect } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import styles from "./profilePage.module.css"
import AdvertSection from "@/components/advertSection/AdvertSection";
import ProfileUpdate from "@/components/updateProfile/ProfileUpdate";
import UpdateInterest from "@/components/updateInterest/UpdateInterest";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "@/utils/axiosInstance";
import UpdateComment from "@/components/updateComment/UpdateComment";

const ProfilePage = () => {
  const [username, setUsername] = useState(useParams().username)
  const [userData, setUserData] = useState({});
  const [userAdverts, setUserAdverts] = useState([])

  useEffect(() => {
    if (username) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/profile/${username}`);
          setUserData(response.data.profile);
          console.log(userData)
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchUserData();
    }
  }, [username]);

  useEffect(() => {
    if (username) {
      console.log(userData)
      const fetchUserAdverts = async () => {
        try {
          const response = await axiosInstance.get(`http://localhost:8080/adverts/${username}`);
          setUserAdverts(response.data.adverts);
        } catch (error) {
          console.error("Error fetching user adverts:", error);
        }
      };
      fetchUserAdverts();
    }
  }, [username]);



  if (!userData) {
    return <div>Loading...</div>;
  }

  const { name, surname, about, location, interests, comments, profile_picture } = userData;
  console.log(userData)
  const getUserIdFromToken = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.user_id;
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  };

  const token = localStorage.getItem('token');
  const controluserId = getUserIdFromToken(token);



  return (
    <div className={styles.container}>
      <div className={styles.userInfos}>
        {/* Profil resmi ve bilgiler */}
        <div className={styles.profile}>
          <div className={styles.profileImage}>
            <Image alt="profile-photo" src={profile_picture || "/user.png"} width={300} height={300}/>
          </div>
          <div className={styles.profileBio}>
            <div className={styles.settings}>
              <span>{username}</span>
              {userData.id === controluserId && 
                  <ProfileUpdate user={userData}/>
              }
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
            {userData.id === controluserId &&      
            <UpdateInterest username={username} userData={userData} setUserData={setUserData} />
            }
        </div>
      </div>
      {/* Anılar kısmı */}
      <div className={styles.memorySection}>
        <h1 className={styles.memoryTitle}>Yorumlar</h1>
        <div className={styles.memoryDesc}>
            {comments?.map((comment, index) => (
                  <span key={index}>{comment}</span>
              ))}
          {userData.id === controluserId && 
          <UpdateComment username={username} userData={userData} setUserData={setUserData}/>
          }
        </div>
      </div>
      {/* Güncel İlanlar Kısmı */}
      <div className={styles.adverts}>
        <h1 className={styles.advertsTitle}>Aktif İlanlar</h1>
        {userAdverts.map((advert) => (
          <AdvertSection key={advert.advert_id} advert={advert} />
        ))}       
      </div>

    </div>
  );
};

export default ProfilePage;
