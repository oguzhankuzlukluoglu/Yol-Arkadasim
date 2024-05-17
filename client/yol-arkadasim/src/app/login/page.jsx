import React from "react";
import styles from "./login.module.css";
import Image from "next/image";
import Link from "next/link";

const Login = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loginImage}>
        <Image alt="register" src="/loginbg.png" width={800} height={800} />
      </div>
      <form action="" className={styles.form}>
        <h1>Giriş Yap</h1>
        <div className={styles.loginForm}>
          <div className={styles.FormInfo}>
            <label htmlFor="email">E-posta</label>
            <input type="email" name="" id="email" autoFocus />
          </div>
          <div className={styles.FormInfo}>
            <label htmlFor="password">Şifre</label>
            <input type="password" name="" id="password" />
          </div>
        </div>
        <div className={styles.loginButton}>
          <button>Giriş Yap</button>
        </div>
        <div className={styles.checkAccount}>
          <span>bir hesabın yok mu ?</span>
          <Link href="/login">Kayıt Ol</Link>
        </div>
        <div className={styles.or}>
          <span> - ya da -</span>
        </div>
        <div className={styles.GoogleSection}>
          <Link href="/" className={styles.googleWrap}>
            <div href="/" className={styles.GoogleLink}>
              <Image alt="google" src="/google.png" width={32} height={32} />
              <span>Google</span>
            </div>
            <span>ile giriş yap</span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
