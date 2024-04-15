import React from "react";
import styles from "./advertise.module.css";
import Where from "../Where/Where";

const Advertise = () => {
  return (
    <div className={styles.container}>
      <div className={styles.advertContainer}>
        <div className={styles.route}>
          <div className={styles.from}>
            <Where type="from"/>
          </div>
          <div className={styles.to}>
            <Where type="to"/>
          </div>
        </div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Advertise;
