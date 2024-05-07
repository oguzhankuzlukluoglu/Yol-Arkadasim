import Link from 'next/link'
import React from 'react'
import styles from './register.module.css'

const Register = () => {
  return (
    <div className={styles.container}>
        <div className={styles.registerContainer}>
            <h1 className={styles.registerTitle}>Kayıt Ol</h1>
            <div className={styles.registerForm}>
                <div className={styles.FormInfo}>
                    <label htmlFor="isim">İsim</label>
                    <input type="text" name="" id="isim" />
                </div>
                <div className={styles.FormInfo}>
                    <label htmlFor="soyisim">Soyisim</label>
                    <input type="text" name="" id="soyisim" />
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
            <div className={styles.GoogleSection}>
                <Link href="/" className={styles.GoogleLink}>
                    {/* <Image/> */}
                    <span>GOOGLE</span>
                </Link>
                <span>ile giriş yap</span>
            </div>
        </div>     
    </div>
  )
}

export default Register