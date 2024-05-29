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
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";

const storage = getStorage(app);

const ProfileUpdate = ({user}) => {
  const [showAlert, setShowAlert] = useState(false);
  const [file, setFile] = useState(null);
  const [media, setMedia] = useState(user.ProfilePicture || "");
  const [formData, setFormData] = useState({
    Name:  user.name,
    Surname: user.surname,
    Username: user.username,
    About:  user.about,
    Location:  user.location,
    Phone: user.phone,
  });
  const [show, setShow] = useState(false);

  const router = useRouter();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };


  useEffect(() => {
    const upload = () => {
      const uniqueName = new Date().getTime() + file.name;
      const storageRef = ref(storage, uniqueName);

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
        (error) => {
          console.error("Error during file upload:", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setMedia(downloadURL);
          });
        }
      );
    };

    if (file) {
      upload();
    }
  }, [file]);

  // useEffect(() => {
  //   console.log(media)
  // },[media])

// useEffect(() => {
//   const img = {
//     ProfilePicture: media,
//   }
// },[media])
  const handleSubmit = async (e) => {
    console.log(media)
    e.preventDefault();
    try {
      const profileData = {
        Name: formData.Name !== user.name ? formData.Name : user.name,
        Surname: formData.Surname !== user.surname ? formData.Surname : user.surname,
        Username: formData.Username !== user.username ? formData.Username : user.username,
        About: formData.About !== user.about ? formData.About : user.about,
        Location: formData.Location !== user.location ? formData.Location : user.location,
        Phone: formData.Phone !== user.phone ? formData.Phone : user.phone,
        Profile_picture: media !== user.profile_picture ? media : user.profile_picture,
      };
  
      const response = await axiosInstance.put("/user/update_profile", profileData);
      console.log(response)
      if (response.status === 200) {
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
        handleClose();
        formData.Username !== user.username &&
        router.push(`/profile/${formData.Username || user.username}`);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

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
          <form className={styles.container} onSubmit={handleSubmit}>
            <div className={styles.profilePhoto}>
              <label htmlFor="profile_picture">Profil Resmi</label>
              <input
                type="file"
                id="profile_picture"
                name="profile_picture"
                onChange={(e) => setFile(e.target.files[0])}
                autoFocus
              />
            </div>
            <div className={styles.name}>
              <label htmlFor="Name">İsim</label>
              <input
                type="text"
                id="Name"
                name="Name"
                value={formData.Name}
                onChange={handleInputChange}
                autoComplete={formData.Name}
                autoFocus
              />
            </div>
            <div className={styles.surname}>
              <label htmlFor="Surname">Soy İsim</label>
              <input
                type="text"
                id="Surname"
                name="Surname"
                value={formData.Surname}
                onChange={handleInputChange}
                autoComplete={formData.Surname}
              />
            </div>
            <div className={styles.nickname}>
              <label htmlFor="Username">Kullanıcı Adı</label>
              <input
                type="text"
                id="Username"
                name="Username"
                value={formData.Username}
                onChange={handleInputChange}
                autoComplete={formData.Username}
              />
            </div>
            <div className={styles.bio}>
              <label htmlFor="About">Biyografi</label>
              <input
                type="text"
                id="About"
                name="About"
                value={formData.About}
                onChange={handleInputChange}
                autoComplete={formData.About}
              />
            </div>
            <div className={styles.location}>
              <label htmlFor="Location">Konum</label>
              <input
                type="text"
                id="Location"
                name="Location"
                value={formData.Location}
                onChange={handleInputChange}
                autoComplete={formData.Location}
              />
            </div>
            <div className={styles.bio}>
              <label htmlFor="Phone">Telefon</label>
              <input
                type="text"
                id="Phone"
                name="Phone"
                value={formData.Phone}
                onChange={handleInputChange}
                autoComplete={formData.Phone}
              />
            </div>
            <Button variant="secondary" onClick={handleClose}>
            Kapat
          </Button>
          <Button variant="primary" onClick={handleClose} type="submit">
            Kaydet
          </Button>
          </form>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProfileUpdate;
