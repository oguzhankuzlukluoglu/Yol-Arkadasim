"use client"
import React, { useState } from "react";
import styles from "./login.module.css";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import axiosInstance from "@/utils/axiosInstance";
import { Alert } from "react-bootstrap";
import { useRouter } from "next/navigation";
import Error from "next/error";

const Login = () => {
  const [showAlert,setShowAlert] = useState(false)
  const [showError,setShowError] = useState(false)

  const [data,setData] = useState({
    Username:"",
    Password:""
  })

  const router = useRouter()

  const handleChange = (e) => {
    const {id , value} = e.target;
    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      Username: data.Username,
      Password: data.Password
    }

    try {
      const response = await axiosInstance.post("/login", user);
      if(response.status === 200){
        setShowAlert(true)
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token); // Token'ı localStorage'a kaydet
        router.push("/")
      }
    } catch (err) {
      setShowError(true)
      console.error(err);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.loginImage}>
        <Image alt="register" src="/loginbg.png" width={800} height={800} />
      </div>
      <form action="" onSubmit={handleSubmit} className={styles.form}>
        <h1>Giriş Yap</h1>
        <div className={styles.loginForm}>
          <div className={styles.FormInfo}>
            <label htmlFor="Username">Kullanıcı Adı</label>
            <input type="text" name="" id="Username" autoFocus onChange={handleChange} />
          </div>
          <div className={styles.FormInfo}>
            <label htmlFor="Password">Şifre</label>
            <input type="password" name="" id="Password" onChange={handleChange}/>
          </div>
        </div>
        <div className={styles.loginButton}>
          <button type="submit">Giriş Yap</button>
        </div>
        <div className={styles.checkAccount}>
          <span>bir hesabın yok mu ?</span>
          <Link href="/register">Kayıt Ol</Link>
        </div>
      {showAlert && <Alert variant="success">Giriş Başarılı </Alert>}
      {showError && <Alert variant="danger">Tekrar deneyin!</Alert>}  
      </form>
    </div>
  );
};

export default Login;
