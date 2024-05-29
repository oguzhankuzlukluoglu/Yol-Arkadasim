"use client"
import React, { useEffect, useState } from "react";
import styles from "./advertPage.module.css";
import Advertise from "@/components/advertiseTravel/Advertise";
import Where from "@/components/Where/Where";
import Image from "next/image";
import { Button } from "react-bootstrap";
import DatePicker from "@/components/datepicker/DatePicker";
import Writer from "@/components/typeWriter/Writer";
import Pagination from "@/components/pagination/Pagination";
import AdvertSection from "@/components/advertSection/AdvertSection";
import axiosInstance from "@/utils/axiosInstance";

const AdvertPage = () => {
  const [adverts, setAdverts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    from: "",
    to: "",
    journey_date: ""
  });

  const fetchAdverts = async (page = 1, filters) => {
    try {
      const response = await axiosInstance.get("/filter", {
        params: {
          page: page,
          limit: 3, // Adjust as needed
          from: filters.from,
          to: filters.to,
          journey_date: filters.journey_date,
        }
      });
      console.log(response)
      setAdverts(response.data.adverts);
      console.log(adverts)
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching adverts:", error);
    }
  };

  useEffect(() => {
    fetchAdverts(currentPage, filters);
    console.log(filters)
  }, [currentPage, filters]);

  const handleSearch = () => {
    setCurrentPage(1);
    fetchAdverts(1, filters);
  };

  const handlePageChange = (direction) => {
    const newPage = direction === "next" ? currentPage + 1 : currentPage - 1;
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

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
              <Where type="from" width="noadvert" value={filters.from} onChange={(type, value) => setFilters(prev => ({ ...prev, from: value }))}  />
            </div>
            <div className={styles.to}>
              <Image
                alt="location"
                src="/location.png"
                width={28}
                height={26}
              />
              <Where type="to" width="noadvert" value={filters.to} onChange={(type, value) => setFilters(prev => ({ ...prev, to: value }))}  />
            </div>
            <div className={styles.date}>
              <Image alt="date" src="/date.png" width={32} height={26} />
              <label>Tarih</label>
              <DatePicker width="advert" onChange={(value) => setFilters(prev => ({ ...prev, journey_date: value }))} />
            </div>
          </div>

          <div className={styles.searchButton}>
            <Button variant="primary" onClick={handleSearch}>İlan Ara</Button>
          </div>
        </div>

        <div className={styles.advertPage}>
          <div className={styles.adverts}>
            <h1>Aktif İlanlar</h1>
            {adverts?.map(advert => (
              <AdvertSection key={advert.advert_id} advert={advert} />
            ))}
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
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

export default AdvertPage;
