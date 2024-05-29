"use client"
import Link from "next/link";
import React, { useState } from "react";
import styles from "./register.module.css";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Alert } from "react-bootstrap";

const Register = () => {
  const [showAlert,setShowAlert] = useState(false)
  const [showError,setShowError] = useState(false)

  const [data,setData] = useState({
    Name:"",
    Surname: "",
    Username: "",
    Email: "",
    Password: "",
    PasswordAgain:"",
    Phone:""
  })

  const router = useRouter()


  const handleChange = (e) => {
    const { id, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.Password !== data.PasswordAgain) {
      alert("Şifreler eşleşmiyor");
      return;
    }

  const user = {
    Name: data.Name,
    Surname: data.Surname,
    Username: data.Username,
    Email: data.Email,
    Password: data.Password,
    Phone: data.Phone
  };

  try{
    const response = await axios.post("http://localhost:8080/register",user);
    if(response.status === 200){
      setShowAlert(true)
      router.push("/login")
    }
    console.log(response.data)
  }catch (err){
    setShowError(true)
    console.error()
  }}
  return (
    <div className={styles.container}>
      <div className={styles.registerImage}>
        <Image
          alt="register"
          src="/yolArkadasim.png"
          width={800}
          height={800}
        />
      </div>
      <div className={styles.registerContainer}>
        <h1 className={styles.registerTitle}>Kayıt Ol</h1>
        <form className={styles.registerForm} onSubmit={handleSubmit}>
          <div className={styles.FormInfo}>
            <label htmlFor="Name">İsim</label>
            <input type="text" name="" id="Name" value={data.Name} onChange={handleChange} />
          </div>
          <div className={styles.FormInfo}>
            <label htmlFor="Surname">Soyisim</label>
            <input type="text" name="" id="Surname" value={data.Surname} onChange={handleChange}/>
          </div>
          <div className={styles.FormInfo}>
            <label htmlFor="Username">Kullanıcı Adı</label>
            <input type="text" name="" id="Username" value={data.Username} onChange={handleChange}/>
          </div>
          <div className={styles.FormInfo}>
            <label htmlFor="Email">E-mail</label>
            <input type="email" name="" id="Email" value={data.Email} onChange={handleChange}/>
          </div>
          <div className={styles.FormInfo}>
            <label htmlFor="Password">Şifre</label>
            <input type="password" name="" id="Password" value={data.Password} onChange={handleChange}/>
          </div>
          <div className={styles.FormInfo}>
            <label htmlFor="PasswordAgain">Şifre Tekrar</label>
            <input type="password" name="" id="PasswordAgain" value={data.PasswordAgain} onChange={handleChange}/>
          </div>
          <div className={styles.FormInfo}>
            <label htmlFor="Phone">Telefon</label>
            <input type="text" name="" id="Phone" value={data.Phone} onChange={handleChange}/>
          </div>
          <div className={styles.RegisterButton}>
          <button type="submit">Kayıt Ol</button>
        </div>
        </form>
        <div className={styles.checkAccount}>
          <span>bir hesabın var mı?</span>
          <Link href="/login">giriş yap</Link>
        </div>
        {showAlert && <Alert variant="success">Kayıt Başarılı </Alert>}
        {showError && <Alert variant="danger">Tekrar deneyin!</Alert>}
      </div>
    </div>
  );
};

export default Register;
