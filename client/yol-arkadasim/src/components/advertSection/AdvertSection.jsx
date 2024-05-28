import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styles from "./advertSection.module.css";
import Menu from '../menu/Menu';
import axiosInstance from '@/utils/axiosInstance';

const AdvertSection = ({ advert }) => {

  const [userData, setUserData] = useState(null);
  
  
  if (!advert) {
    return <div>Loading...</div>;
  }

  const {from, to, transport_choice, journey_date, journey_time, posted_by_id } = advert;


  useEffect(() => {
    if (posted_by_id) {
      fetchUsername(posted_by_id);
    }
  }, [posted_by_id]);

  const fetchUsername = async (userId) => {
    try {
      const response = await axiosInstance.get(`/get-all-users`);
      const user = response.data.users.find(user => user.id === userId);
      if (user) {
        setUserData(user);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  // useEffect(() => {
  //   console.log(userData); // userData değiştiğinde konsola yazdır
  // }, [userData]);


  return (
    <div className={styles.advertSection}>
      <div className={styles.advertInfos}>
        <div className={styles.infoSection}>
          <div className={styles.travelInfo}>
            <div className={styles.cities}>
              <span>{from}</span>
              <Image
                alt="arrow"
                src="/arrowright.gif"
                width={20}
                height={20}
              />
              <span>{to}</span>
            </div>
            <span>Ulaşım Tercihi: {transport_choice}</span>
          </div>
          <div className={styles.travelInfo}>
            <span>{new Date(journey_date).toLocaleDateString()} {journey_time ? journey_time.substring(11, 16) : ''}</span>
          </div>
        </div>
        <div>
          <Menu type="advert" />
        </div>
      </div>
      <div className={styles.advertUser}>
        <div className={styles.advertUserInfo}>
          {userData && (
            <>
              <Image
                alt="profile-photo"
                src={userData.profile_picture || "/navbarLogo.png"}
                width={48}
                height={48}
              />
              <Link href={`/profile/${userData.username}`}>{userData.username}</Link>
            </>
          )}
        </div>
        <div className={styles.advertButton}>
          <Link href={`/advert/${advert.advert_id}`}>İlana Göz At</Link>
        </div>
      </div>
    </div>
  );
};

export default AdvertSection;
