"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import styles from './navMenu.module.css'

function NavMenu() {
    const [open, setOpen] = useState(false)

  return (
    <div className={styles.container}>
        <div className={styles.menu}>
            <Image onClick={() => setOpen(!open)} alt='menu' src={open ? `/close.png` : `/menu.png`} width={32} height={32} />
        </div>
        {open && (
          <div className={styles.links}>
            <Link href={`/`}>Ana Sayfa</Link>
            <Link href={`/`}>Keşfet</Link>
            <Link href={`/`}>İlanlar</Link>
            <Link href={`/`}>Çıkış Yap</Link>
          </div>
        )}
    </div>
  )
}

export default NavMenu