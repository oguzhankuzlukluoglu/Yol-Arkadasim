import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from "./navbar.module.css"
import NavMenu from '../navMenu/NavMenu'

const Navbar = () => {
  return (
    <div className={styles.container}>
        <div className={styles.logo}>
          <Image alt='' src={"/navbarLogo.png"} width={32} height={32}/>
        </div>
        <div className={styles.title}>
          <Link href={'/'}>yol arkadaşım</Link>
        </div>
        <div className={styles.links}>
          <Link href={`/`}>Ana Sayfa</Link>
          <Link href={`/about`}>Hakkımızda</Link>
          <Link href={`/advert`}>İlanlar</Link>
          <Link href={`/login`}>Giriş Yap</Link>
        </div>
        <div className={styles.navmenu}>
          <NavMenu/>
        </div>
    </div>
  )
}

export default Navbar