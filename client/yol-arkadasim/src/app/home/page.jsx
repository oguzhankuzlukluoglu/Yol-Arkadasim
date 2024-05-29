"use client"
import React, { useEffect, useState } from "react";
import styles from "./homePage.module.css";
import Slider from "@/components/slider/Slider";
import Image from "next/image";
import Where from "@/components/Where/Where";
import Link from "next/link";
import Advertise from "@/components/advertiseTravel/Advertise";
import { Button } from "react-bootstrap";
import axiosInstance from "@/utils/axiosInstance";


const HomePage = () => {

  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchCommentsAndUserDetails = async () => {
      try {
        const commentsResponse = await axiosInstance.get("/comments");
        console.log(commentsResponse)
        const fetchedComments = commentsResponse.data.comments.slice(-3); // Son 3 yorumu alın
        console.log(fetchedComments)

        // Kullanıcı bilgilerini çekmek için kullanıcı adlarıyla yeni istekler yapın
        const userDetailsPromises = fetchedComments.map(comment =>
          axiosInstance.get(`profile/${comment.username}`)
        );

        const userDetailsResponses = await Promise.all(userDetailsPromises);
        console.log(userDetailsResponses)
        // Yorumlara kullanıcı bilgilerini ekleyin
        const commentsWithUserDetails = fetchedComments.map((comment, index) => ({
          ...comment,
          userProfilePhoto: userDetailsResponses[index].data.profile.profile_picture
        }));
        console.log(commentsWithUserDetails)

        setComments(commentsWithUserDetails);
      } catch (error) {
        console.error("Error fetching comments and user details:", error);
      }
    };

    fetchCommentsAndUserDetails();
  }, []);


  return (
    <div>
      <Slider/>
      
      <div className={styles.commentSection}>
        <div className={styles.ingredient}>
          <h3>Uygulamayı kullananlardan okuyun !</h3>
        </div>

        <section className={styles.products}>
          <div className={styles.boxContainer}>
          {comments.map((comment, index) => (
              <div key={index} className={styles.box}>
                <div className={styles.boxHead}>
                  <div className={styles.userInfo}>
                    <Image alt="user" src={comment.userProfilePhoto || "/user.png"} width={32} height={32} />
                    <Link href={`/profile/${comment.username}`} className={styles.commentUser}>{comment.username}</Link>
                  </div>
                  <p className={styles.name}>{comment.comment}</p>
                </div>
              </div>
            ))}
            {comments.length === 0 && (
              <div className={styles.box}>
                <p>Henüz yorum yok.</p>
              </div>
            )}            
          </div>
        </section>
      </div>
      <div className={styles.ingredient}>
        <h3>Neden Yol Arkadaşımı seçmelisin ?</h3>
      </div>

      <div className={styles.buto}>
        <div className={styles.icon}>
          <Image alt="safe" src="/safe.png" width={32} height={32}/>
          <p>Güvenilir</p>
        </div>
        <div className={styles.icon}>
          <Image alt="safe" src="/friendly.png" width={32} height={32}/>
          <p>Kullanıcı Dostu</p>
        </div>
        <div className={styles.icon}>
          <Image alt="safe" src="/fast.png" width={32} height={32}/>
          <p>Hızlı</p>
        </div>
      </div>


      <div className={styles.findAdvertSection}>
      <div className={styles.whereTitle}>
        <h3>Nereye gitmek istersiniz ?</h3>
      </div>

      <div className={styles.findAdvert}>
        {/* <div className={styles.city}>
              <Where type="from" width="advert"/>
             <Where type="to" width="advert"/>
        </div> */}
        <div className={styles.chooseAdvert}>
          <p>Güncel ilanlar arasından senin için en uygun olanını seç ve İletişime geç!</p>
        </div>
        <div className={styles.button}>
          <Link href="/advert" className={styles.buttonLink}>
          <Button variant="primary">
            İlan ara
          </Button>
          </Link>
        </div>
      </div>
      </div>

      <div className={styles.toPublish}>
      <div className={styles.findAdvertTitle}>
        <h3>Aradığın yolculuk yok mu?</h3>
      </div>
      <div className={styles.createAdvert}>
        <p className={styles.name}>
          Aradığın yolculuk ilanı yoksa ve yol arkadaşı arıyorsan hemen bir ilan
          paylaş!
        </p>
        <div className={styles.button}>
          <Advertise className={styles.advertPublish}/>
        </div>
      </div>
      </div>
    </div>
  );
};
export default HomePage;
