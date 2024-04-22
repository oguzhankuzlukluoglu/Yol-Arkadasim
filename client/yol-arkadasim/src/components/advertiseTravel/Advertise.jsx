import React from "react";
import styles from "./advertise.module.css";
import Where from "../Where/Where";
import { system } from "nodemon/lib/config";

const Advertise = () => {
  return (
    <div className={styles.container}>
      <div className={styles.advertContainer}>
        <div className={styles.advertInfos}>
          <div className={styles.route}>
            <div className={styles.from}>
              <Where type="from" />
            </div>
            <div className={styles.to}>
              <Where type="to" />
            </div>
          </div>
          <div className={styles.time}>
            <div className={styles.date}>
              <label htmlFor="tarih">Tarih</label>
              <input type="date" id="tarih" />
            </div>
            <div className={styles.clock}>
              <label htmlFor="saat">Saat</label>
              <input type="time" id="saat" />
            </div>
          </div>
          <div className={styles.information}>
            <div className={styles.transport}>
              <label htmlFor="ulaşım">Ulaşım yolu</label>
              <input type="text" id="ulaşım" placeholder="araba vs." />
            </div>
            <div className={styles.tel}>
              <label htmlFor="telefon">Telefon</label>
              <input type="tel" id="telefon" />
            </div>
          </div>
        </div>
        <div className={styles.routeInfos}>
          <div className={styles.desc}>
            <div className={styles.routeDesc}>
              <label htmlFor="acıklama">Açıklama</label>
              <textarea id="acıklama" cols="30" rows="8"></textarea>
            </div>
            <div className={styles.advertButton}>
              <button>İlanı Aç</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Advertise;
