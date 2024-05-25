"use client";
import React, { useState } from "react";
import { Modal, Button, Alert, Form } from "react-bootstrap";
import styles from "./advertise.module.css";
import Where from "../Where/Where";
import DatePicker from "../datepicker/DatePicker";
import TimePicker from "../datepicker/TimePicker";

const Advertise = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: "",
    time: "",
    transportation: "",
    phone: "",
    description: "",
  });
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
                    <Where type="from" />
                  </div>
                  <div className={styles.to}>
                    <Where type="to" />
                  </div>
                </div>
                <div className={styles.time}>
                  <div className={styles.date}>
                    <label htmlFor="date">Tarih</label>
                    <DatePicker/>
                  </div>
                  <div className={styles.clock}>
                    <label htmlFor="time">Saat</label>
                    <TimePicker/>
                  </div>
                </div>
                <div className={styles.information}>
                  <div className={styles.transport}>
                    <label htmlFor="transportation">Ulaşım yolu</label>
                    <input
                      type="text"
                      id="transportation"
                      name="transportation"
                      placeholder="araba vs."
                      value={formData.transportation}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className={styles.tel}>
                    <label htmlFor="phone">Telefon</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.routeInfos}>
                <div className={styles.desc}>
                  <div className={styles.routeDesc}>
                    <label htmlFor="description">Açıklama</label>
                    <textarea
                      id="description"
                      name="description"
                      cols="30"
                      rows="8"
                      value={formData.description}
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
          <Button variant="primary" onClick={handleClose}>
            Kaydet
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Advertise;