"use client"
import Image from 'next/image';
import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import styles from "./updateInterest.module.css"
const UpdateInterest = () => {
    const [showAlert, setShowAlert] = useState(false);
  const [formData, setFormData] = useState({
    İlgiAlanı: "",
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
    <div>
      <Image className={styles.add} alt='add' src="/plus.png"
        width={24}
        height={24}
        onClick={handleShow} 
      />
      Ekle
      <Modal
        size="xxl"
        show={show}
        onHide={handleClose}
        className={styles.modalContainer}
        dialogClassName={styles.modalDialog}
      >
        <Modal.Header closeButton>
          <Modal.Title>İlgi Alanı Ekle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={styles.container}>
            <div className={styles.interest}>
              <label htmlFor="ilgiAlanı">İlgi Alanı</label>
              <input
                type="text"
                id="ilgiAlanı"
                name="ilgiAlanı"
                value={formData.İlgiAlanı}
                onChange={handleInputChange}
              />
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
    </div>
  )
}

export default UpdateInterest