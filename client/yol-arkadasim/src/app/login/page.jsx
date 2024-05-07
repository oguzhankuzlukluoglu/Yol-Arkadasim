import React from 'react'
import styles from "./login.module.css"

const Login = () => {
  return (
    <div className={styles.container}>
    <form action="" className={styles.form}>
      <h3>Giriş Yap</h3>
      <input type="text" name="eposta" placeholder="E-posta" autocomplete="false"/>
      <input type="password" name="şifre" placeholder="Parola"/>
      <input type="submit" value="Giriş Yap"/>
    </form>
    </div>
  )
}

export default Login