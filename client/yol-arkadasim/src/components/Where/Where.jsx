"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./where.module.css";
import { iller } from "@/datas/İller";

const Where = ({ type, width, value, onChange }) => {
  const [il, setIl] = useState(value || "");
  const [goster, setGoster] = useState(false);
  const [seciliIndex, setSeciliIndex] = useState(0);
  const scrollRef = useRef(null);

  // Filtrelenen şehir listesini tutar
  const filtrelenmisIller = useMemo(
    () =>
      iller.filter(
        (tekIl) =>
          tekIl
            .toLocaleLowerCase()
            .replace(/i/g, "ı")
            .includes(il.toLocaleLowerCase().replace(/i/g, "ı")),
        setSeciliIndex(0),
      ),
    [il]
  );

  // otomatik scroll özelliği
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = seciliIndex * 18;
    }
  }, [seciliIndex]);

  // input üzerinde klavye işlemlerini yapar
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "ArrowDown" && seciliIndex < filtrelenmisIller.length - 1) {
        setSeciliIndex((prevIndex) => prevIndex + 1);
      } else if (e.key === "ArrowUp" && seciliIndex > 0) {
        setSeciliIndex((prevIndex) => prevIndex - 1);
      } else if (e.key === "Enter") {
        if (iller.includes(filtrelenmisIller[seciliIndex])) {
          setIl(filtrelenmisIller[seciliIndex]);
          onChange(type, filtrelenmisIller[seciliIndex]); // Seçilen değeri geri bildir
        }
        setGoster(false);
      } else if (e.key === "Escape") {
        setGoster(false);
      }
    };

    // il seçeneklerini mouse işlemine göre kapatma
    const handleClick = (e) => {
      if (scrollRef.current && !scrollRef.current.contains(e.target)) {
        setGoster(false);
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      document.removeEventListener("mousedown", handleClick);
    };
  }, [seciliIndex, filtrelenmisIller, type, onChange]);

  // input içeriğini dinamik olarak günceller
  const handleChange = (e) => {
    setIl(e.target.value);
    setGoster(true);
  };

  // il seçme işlemini yapar
  const handleChoose = (il) => {
    setIl(il);
    onChange(type, il); // Seçilen değeri geri bildir
    setGoster(false);
  };

  return (
    <div className={width === "noadvert" ? styles.advertContainer : styles.whereContainer}>
      <div className={styles.whereInput}>
        <label className={width === "advert" ? styles.advertLabel : styles.whereLabel} htmlFor={type}>
          {type === "from" ? "Nereden" : "Nereye"}
        </label>
        <input className={width === "advert" ? styles.advertInput : styles.whereInputSelect} type="text" id={type} value={il} onChange={handleChange} />
      </div>
      <div className={styles.scrollContainer} ref={scrollRef}>
        {goster &&
          filtrelenmisIller.map((il, index) => (
            <p
              className={index === seciliIndex ? styles.selected : ""}
              onClick={() => handleChoose(il)}
              key={il}
            >
              {il}
            </p>
          ))}
      </div>
    </div>
  );
};

export default Where;
