import Link from "next/link";
import React from "react";
import styles from "./register.module.css";
import Image from "next/image";

const Register = () => {
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
        <div className={styles.registerForm}>
          <div className={styles.FormInfo}>
            <label htmlFor="isim">İsim</label>
            <input type="text" name="" id="isim" autoFocus/>
          </div>
          <div className={styles.FormInfo}>
            <label htmlFor="soyisim">Soyisim</label>
            <input type="text" name="" id="soyisim" />
          </div>
          <div className={styles.FormInfo}>
            <label htmlFor="nick">Kullanıcı Adı</label>
            <input type="text" name="" id="nick" />
          </div>
          <div className={styles.FormInfo}>
            <label htmlFor="eposta">E-mail</label>
            <input type="email" name="" id="eposta" />
          </div>
          <div className={styles.FormInfo}>
            <label htmlFor="şifre">Şifre</label>
            <input type="password" name="" id="şifre" />
          </div>
          <div className={styles.FormInfo}>
            <label htmlFor="şifre">Şifre Tekrar</label>
            <input type="password" name="" id="şifre" />
          </div>
        </div>
        <div className={styles.RegisterButton}>
          <button>Kayıt Ol</button>
        </div>
        <div className={styles.checkAccount}>
          <span>bir hesabın var mı?</span>
          <Link href="/login">giriş yap</Link>
        </div>
        <div className={styles.or}>
          <span> - ya da -</span>
        </div>
        <div className={styles.GoogleSection}>
          <Link href="/" className={styles.googleWrap}>
            <div className={styles.GoogleLink}>
              <Image alt="google" src="/google.png" width={32} height={32} />
              <span>Google</span>
            </div>
            <span>ile kayıt ol</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
