"use client";
import React, { useEffect, useState } from "react";
import { Modal, Button, Alert, Form } from "react-bootstrap";
import styles from "./advertise.module.css";
import Where from "../Where/Where";
import DatePicker from "../datepicker/DatePicker";
import TimePicker from "../datepicker/TimePicker";
import axiosInstance from "@/utils/axiosInstance";

const Advertise = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [formData, setFormData] = useState({
    From: "",
    To: "",
    journey_date: "",
    journey_time: "",
    transport_choice: "",
    phone_number: "",
    journey_description: "",
  });

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleWhereChange = (type, value) => {
    console.log("Type:", type, "Value:", value);
    setFormData({
      ...formData,
      [type === "from" ? "From" : "To"]: value,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      journey_date: date,
    });
  };

  const handleTimeChange = (time) => {
    setFormData({
      ...formData,
      journey_time: time,
    });
  };

  const handleSubmit = async () => {
    console.log(formData)
    try {
      const response = await axiosInstance.post("/create/advert", formData);
      console.log(response);
      console.log("Advert created successfully:", response.data);
      setShowAlert(true);
    } catch (error) {
      console.error("Error creating advert:", error);
    } finally {
      handleClose();
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow} className={styles.advertButton}>
        İlan Aç
      </Button>
      <Modal size="xxl" show={show} onHide={handleClose} className={styles.modalContainer} dialogClassName={styles.modalDialog}>
        <Modal.Header closeButton>
          <Modal.Title>İlan Oluştur</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={styles.container}>
            <div className={styles.advertContainer}>
              <div className={styles.advertInfos}>
                <div className={styles.route}>
                  <div className={styles.from}>
                    <Where type="from" width="advert" value={formData.From} onChange={handleWhereChange} />
                  </div>
                  <div className={styles.to}>
                    <Where type="to" width="advert" value={formData.To} onChange={handleWhereChange} />
                  </div>
                </div>
                <div className={styles.time}>
                  <div className={styles.date}>
                    <label htmlFor="JourneyDate">Tarih</label>
                    <DatePicker selected={formData.journey_date} onChange={handleDateChange} />
                  </div>
                  <div className={styles.clock}>
                    <label htmlFor="JourneyTime">Saat</label>
                    <TimePicker selected={formData.journey_time} onChange={handleTimeChange} />
                  </div>
                </div>
                <div className={styles.information}>
                  <div className={styles.transport}>
                    <label htmlFor="transport_choice">Ulaşım yolu</label>
                    <input
                      type="text"
                      id="transport_choice"
                      name="transport_choice"
                      placeholder="araba vs."
                      value={formData.transport_choice}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className={styles.tel}>
                    <label htmlFor="phone_number">Telefon</label>
                    <input
                      type="tel"
                      id="phone_number"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.routeInfos}>
                <div className={styles.desc}>
                  <div className={styles.routeDesc}>
                    <label htmlFor="journey_description">Açıklama</label>
                    <textarea
                      id="journey_description"
                      name="journey_description"
                      cols="30"
                      rows="8"
                      value={formData.journey_description}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Kapat
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Kaydet
          </Button>
        </Modal.Footer>
      </Modal>
      {showAlert && <Alert variant="success">İlan başarıyla oluşturuldu!</Alert>}
    </>
  );
};

export default Advertise;
