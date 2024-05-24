import Image from "next/image";
import React from "react";
import styles from "./singleAdvertise.module.css";
import Link from "next/link";

const singleAdvertise = () => {
  return (
    <div className={styles.container}>
      <div className={styles.containerElements}>
        <div className={styles.advertContainer}>
          <h1 className={styles.advertTitle}>İlan Detayları</h1>
          <div className={styles.advertInfos}>
            <div className={styles.generalInfos}>
              <div className={styles.userAndRoad}>
                <div className={styles.user}>
                  <Image alt="" src="/navbarLogo.png" width={64} height={64} />
                  <span>Deniz Ök</span>
                </div>
                <div className={styles.roadInfos}>
                  <span>Tarih: 21.03.2024 14:00</span>
                  <span>Ankara &rarr; İstanbul</span>
                  <span>Ulaşım Tercihi: Araba</span>
                </div>
              </div>
              <div className={styles.advertDesc}>
                <div className={styles.descContent}>
                  <span>
                    Yolculukta çok mola veren insanım. Başvuranların dikkat
                    etmesini isterim.
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.communicate}>
            <div className={styles.communicateDesc}>
              <span>Hemen İlan sahibiyle iletişime geçin!</span>
            </div>
            <div className={styles.communicateSection}>
                <Link href="https://wa.me/" >

                <div className={styles.whatsapp}>
                <Image
                  alt="whatsapp"
                  src="/whatsapp.png"
                  width={64}
                  height={64}
                  />
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

export default singleAdvertise;
