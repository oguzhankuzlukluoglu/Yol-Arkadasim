import React from "react";
import styles from "./advertPage.module.css";
import Link from "next/link";
import Advertise from "@/components/advertiseTravel/Advertise";
import Where from "@/components/Where/Where";
import Image from "next/image";
import { Button } from "react-bootstrap";
import DatePicker from "@/components/datepicker/DatePicker";
import Writer from "@/components/typeWriter/Writer";
import Pagination from "@/components/pagination/Pagination";
import AdvertSection from "@/components/advertSection/AdvertSection";

const advertPage = () => {
  
  return (
    <div className={styles.container}>
      <div className={styles.advertContainer}>
        <div className={styles.searchSection}>
          <div className={styles.route}>
            <div className={styles.from}>
              <Image
                alt="location"
                src="/location.png"
                width={28}
                height={26}
              />
              <Where type="from" width="advert" />
            </div>
            <div className={styles.to}>
              <Image
                alt="location"
                src="/location.png"
                width={28}
                height={26}
              />
              <Where type="to" width="advert" />
            </div>
            <div className={styles.date}>
              <Image alt="date" src="/date.png" width={32} height={26} />
              <label>Tarih</label>
              <DatePicker width="advert" />
            </div>
          </div>

          <div className={styles.searchButton}>
            <Button variant="primary">İlan Ara</Button>
          </div>
        </div>

        <div className={styles.advertPage}>
          <div className={styles.adverts}>
            <h1>Aktif İlanlar</h1>
            <AdvertSection/>
            <AdvertSection/>
            <AdvertSection/>
            
            <Pagination/>
          </div>

          <div className={styles.ingredient}>
            <h3>Kendi İlanını Oluşturmak İster Misin?</h3>
            <div>
              <p>Yol Arkadaşımda ilan açmak</p>
              <div className={styles.verySection}>
                  <Writer/>
              </div>
            </div>
            <div className={styles.btns}>
              <Advertise/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default advertPage;
