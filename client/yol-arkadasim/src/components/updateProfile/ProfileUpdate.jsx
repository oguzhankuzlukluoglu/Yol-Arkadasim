"use client";
import React, { useEffect, useState } from "react";
import { Modal, Button, Alert, Form } from "react-bootstrap";
import styles from "./profileUpdate.module.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "@/utils/firebase";

const storage = getStorage(app);

const ProfileUpdate = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [file, setFile] = useState(null);
  const [media, setMedia] = useState("");
  const [formData, setFormData] = useState({
    isim: "",
    soyisim: "",
    kullanıcıAdı: "",
    bio: "",
    konum: "",
    telefon: "",
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

  useEffect(() => {
    const upload = () => {
      const uniqueName = new Date().getTime % file.name
      const storageRef = ref(storage,uniqueName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setMedia(downloadURL)
          });
        }
      );
    };

    file && upload;
  }, [file]);

  return (
    <div>
      <Button
        variant="primary"
        onClick={handleShow}
        className={styles.updateButton}
      >
        Profili Düzenle
      </Button>
      <Modal
        size="xxl"
        show={show}
        onHide={handleClose}
        className={styles.modalContainer}
        dialogClassName={styles.modalDialog}
      >
        <Modal.Header closeButton>
          <Modal.Title>Profili Düzenle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={styles.container}>
            <div className={styles.profilePhoto}>
              <label htmlFor="image">Profil Resmi</label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={(e) => setFile(e.target.files[0])}
                autoFocus
              />
            </div>
            <div className={styles.name}>
              <label htmlFor="isim">İsim</label>
              <input
                type="text"
                id="isim"
                name="isim"
                value={formData.isim}
                onChange={handleInputChange}
                autoFocus
              />
            </div>
            <div className={styles.surname}>
              <label htmlFor="isim">Soy İsim</label>
              <input
                type="text"
                id="soyisim"
                name="soyisim"
                value={formData.soyisim}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.nickname}>
              <label htmlFor="kullanıcıadı">Kullanıcı Adı</label>
              <input
                type="text"
                id="kullanıcıadı"
                name="kullanıcıadı"
                value={formData.kullanıcıAdı}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.bio}>
              <label htmlFor="bio">Biyografi</label>
              <input
                type="text"
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.location}>
              <label htmlFor="konum">Konum</label>
              <input
                type="text"
                id="konum"
                name="konum"
                value={formData.konum}
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
  );
};

export default ProfileUpdate;
