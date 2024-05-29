"use client"
import Image from 'next/image';
import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import styles from "./updateInterest.module.css"
import axiosInstance from '@/utils/axiosInstance';
import { useRouter } from 'next/navigation';
const UpdateInterest = ({username,userData,setUserData}) => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({ İlgiAlanı: "" });
  const route = useRouter()

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
      console.log(userData)
  };

  const handleAddInterest = async (e) => {
    e.preventDefault();
    const updatedInterests = userData.interests ? [...userData.interests, formData.İlgiAlanı] : [formData.İlgiAlanı];
    try {
      const response = await axiosInstance.put(`http://localhost:8080/user/update_profile`, {
        ...userData,
        interests: updatedInterests
      });
      console.log(response.data.updated_user);
      if(response.status === 200){
        setUserData(response.data.updated_user);  // Update the user data with the new interests
        setFormData({ İlgiAlanı: "" });
        setShow(false);
        route.refresh()
      }
      
    } catch (error) {
      console.error("Error adding interest:", error);
    } finally {
      setShow(false);
    }
  };
  
  return (
    <div>
      <div style={{display:"flex", alignItems:"center",cursor:"pointer"}} onClick={handleShow}>
      <Image className={styles.add} alt='add' src="/plus.png"
        width={24}
        height={24} 
        />
      Ekle
        </div>
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
              <label htmlFor="interests">İlgi Alanı</label>
              <input
                type="text"
                id="interests"
                name="İlgiAlanı"
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
          <Button variant="primary" onClick={handleAddInterest}>
            Kaydet
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default UpdateInterest