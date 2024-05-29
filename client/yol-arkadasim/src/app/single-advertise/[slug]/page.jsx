"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "./singleAdvertise.module.css";
import Link from "next/link";
import { useParams } from "next/navigation";
import axiosInstance from '@/utils/axiosInstance';

const SingleAdvertise = () => {
  const { slug } = useParams();

  const [advert, setAdvert] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      const fetchAdvert = async () => {
        try {
          const response = await axiosInstance.get(`/adverts/${slug}`);
          console.log(response)
          setAdvert(response.data);
          const userResponse = await axiosInstance.get(`/get-all-users`);
          console.log(userResponse)
          const fetchedUser = userResponse.data.users.find(user => user.id === response.data.posted_by_id);
          setUser(fetchedUser);
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setIsLoading(false);
        }
      };
      fetchAdvert();
  }, [slug]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log(advert)
  console.log(user)

  if (!advert || !user) {
    return <div>No advert or user found</div>;
  }

  const { from, to, transport_choice, journey_date, journey_time, journey_description } = advert;

  return (
    <div className={styles.container}>
      <div className={styles.containerElements}>
        <div className={styles.advertContainer}>
          <h1 className={styles.advertTitle}>İlan Detayları</h1>
          <div className={styles.advertInfos}>
            <div className={styles.generalInfos}>
              <div className={styles.userAndRoad}>
                <div className={styles.user}>
                  <Image alt="" src={user.profile_picture || "/navbarLogo.png"} width={64} height={64} />
                  <span>{user.username}</span>
                </div>
                <div className={styles.roadInfos}>
                  <span>Tarih: {journey_date} {journey_time ? journey_time.substring(11, 16) : ''}</span>
                  <div className={styles.cities}>
                    <span>{from}</span>
                    <Image alt="arrow" src="/arrowright.gif" width={20} height={20} />
                    <span>{to}</span>
                  </div>
                  <span>Ulaşım Tercihi: {transport_choice}</span>
                </div>
              </div>
              <div className={styles.advertDesc}>
                <div className={styles.descContent}>
                  <span>{journey_description}</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.communicate}>
            <div className={styles.communicateDesc}>
              <span>Hemen İlan sahibiyle iletişime geçin!</span>
            </div>
            <div className={styles.communicateSection}>
              <Link href={`https://wa.me/${user.whatsapp}`}>
                <div className={styles.whatsapp}>
                  <Image alt="whatsapp" src="/whatsapp.png" width={64} height={64} />
                  <span>Whatsapp</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.contactSection}>
        <div className={styles.contact}>
          <Image alt="mail" src="/mail.png" width={36} height={36} />
          <span>Soru ve Şikayetler</span>
        </div>
      </div>
    </div>
  );
};

export default SingleAdvertise;
