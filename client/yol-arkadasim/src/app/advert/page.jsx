import React from 'react'
import styles from "./advertPage.module.css"
import Link from 'next/link'
import Advertise from '@/components/advertiseTravel/Advertise'
import Where from '@/components/Where/Where'
import Image from "next/image";

const advertPage = () => {

    return (
        <div className={styles.container}>

            <div className={styles.advertContainer}>
                <div className={styles.advertInfos}>
                    <div className={styles.route}>
                        <div className={styles.from}>
                            <Where type="from" />
                        </div>
                        <div className={styles.to}>
                            <Where type="to" />
                        </div>
                    </div>
                    <div className={styles.time}>
                        <div className={styles.date}>
                            <label htmlFor="tarih">Tarih</label>
                            <input type="date" id="tarih" />
                        </div>
                        <div className={styles.clock}>
                            <label htmlFor="saat">Saat</label>
                            <input type="time" id="saat" />
                        </div>
                    </div>
                    <div className={styles.information}>
                        <div className={styles.transport}>
                            <label htmlFor="ulaşım">Ulaşım yolu</label>
                            <input type="text" id="ulaşım" placeholder="araba vs." />
                        </div>
                    </div>
                </div>
                <div className={styles.routeInfos}>
                    <div className={styles.desc}>
                        <div className={styles.advertButton}>
                            <button>İlan Ara</button>
                        </div>
                    </div>
                </div>

            </div>
            <br /><br /><br /><br />
            <div className={styles.ingredient}>
                <h3>Kendi İlanını Oluşturmak İster Misin?</h3>
                <div className={styles.btns}>
                    <Link href="/advertise-travel" className={styles.btn}>İlan Aç</Link>
                </div>
            </div>
            <br /><br /><br />
            <div className={styles.adverts}>
                <div className={styles.advertSection}>
                    <div className={styles.advertInfos}>
                        <div className={styles.travelInfo}>
                            <span>Güzergah: Ankara &#8658; İstanbul</span>
                            <span>Ulaşım Tercihi: Araba</span>
                        </div>
                        <div className={styles.travelInfo}>
                            <span>Tarih: 08.04.2024 14:00</span>
                        </div>
                    </div>
                    <div className={styles.advertUser}>
                        <div className={styles.advertUserInfo}>
                            <Image alt="profile-photo" src="/navbarLogo.png" width={48} height={48} />
                            <span>Deniz Ök</span>
                        </div>
                        <div className={styles.advertButton}>
                            <Link href={`/`}>İlana Göz At</Link>
                        </div>
                    </div>
                </div>
                <div className={styles.advertSection}>
                    <div className={styles.advertInfos}>
                        <div className={styles.travelInfo}>
                            <span>Güzergah: Ankara &#8658; İstanbul</span>
                            <span>Ulaşım Tercihi: Araba</span>
                        </div>
                        <div className={styles.travelInfo}>
                            <span>Tarih: 08.04.2024 14:00</span>
                        </div>
                    </div>
                    <div className={styles.advertUser}>
                        <div className={styles.advertUserInfo}>
                            <Image alt="profile-photo" src="/navbarLogo.png" width={48} height={48} />
                            <span>Deniz Ök</span>
                        </div>
                        <div className={styles.advertButton}>
                            <Link href={`/`}>İlana Göz At</Link>
                        </div>
                    </div>
                </div>
                <div className={styles.advertSection}>
                    <div className={styles.advertInfos}>
                        <div className={styles.travelInfo}>
                            <span>Güzergah: Ankara &#8658; İstanbul</span>
                            <span>Ulaşım Tercihi: Araba</span>
                        </div>
                        <div className={styles.travelInfo}>
                            <span>Tarih: 08.04.2024 14:00</span>
                        </div>
                    </div>
                    <div className={styles.advertUser}>
                        <div className={styles.advertUserInfo}>
                            <Image alt="profile-photo" src="/navbarLogo.png" width={48} height={48} />
                            <span>Deniz Ök</span>
                        </div>
                        <div className={styles.advertButton}>
                            <Link href={`/`}>İlana Göz At</Link>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default advertPage