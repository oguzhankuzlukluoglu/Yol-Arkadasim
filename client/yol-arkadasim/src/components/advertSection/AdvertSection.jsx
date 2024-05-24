import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from "./advertSection.module.css"
import Menu from '../menu/Menu'

const AdvertSection = () => {
  return (
    <div className={styles.advertSection}>
              <div className={styles.advertInfos}>
                <div className={styles.infoSection}>
                  <div className={styles.travelInfo}>
                    <div className={styles.cities}>
                      <span>Ankara</span>
                      <Image
                        alt="arrow"
                        src="/arrowright.gif"
                        width={20}
                        height={20}
                      />
                      <span>İstanbul</span>
                    </div>
                    <span>Ulaşım Tercihi: Araba</span>
                  </div>
                  <div className={styles.travelInfo}>
                    <span>08.04.2024 14:00</span>
                  </div>
                </div>
                <div>
                  <Menu type="advert"/>
                </div>
              </div>
              <div className={styles.advertUser}>
                <div className={styles.advertUserInfo}>
                  <Image
                    alt="profile-photo"
                    src="/navbarLogo.png"
                    width={48}
                    height={48}
                  />
                  <span>Deniz Ök</span>
                </div>
                <div className={styles.advertButton}>
                  <Link href={`/`}>İlana Göz At</Link>
                </div>
              </div>
            </div>
  )
}

export default AdvertSection