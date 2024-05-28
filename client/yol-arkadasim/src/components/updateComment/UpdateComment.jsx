"use client"
import Image from 'next/image';
import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import styles from "./updateComment.module.css"
import axiosInstance from '@/utils/axiosInstance';

const UpdateComment = ({username,userData,setUserData}) => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({ Yorum: "" });


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
      console.log(userData)
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    const updatedComments = userData.comments ? [...userData.comments, formData.Yorum] : [formData.Yorum];
  
    try {
      const response = await axiosInstance.put(`http://localhost:8080/user/update_profile`, {
        ...userData,
        comments: updatedComments
      });
      console.log(response.data.profile);
      setUserData(response.data.profile);  // Update the user data with the new interests
      setFormData({ Yorum: "" });
      setShow(false);
    } catch (error) {
      console.error("Error adding comments:", error);
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
          <Modal.Title>Yorum Ekle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={styles.container}>
            <div className={styles.interest}>
              <label htmlFor="comments">Yorum</label>
              <input
                type="text"
                id="comments"
                name="Yorum"
                value={formData.Yorum}
                onChange={handleInputChange}
              />
        
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Kapat
          </Button>
          <Button variant="primary" onClick={handleAddComment}>
            Kaydet
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default UpdateComment