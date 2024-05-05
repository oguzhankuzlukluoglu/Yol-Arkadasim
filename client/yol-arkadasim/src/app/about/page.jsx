import React from 'react'
import styles from "./aboutPage.module.css"
import Image from 'next/image'

const aboutPage = () => {
    return (
        <div className={styles.container}>
    <div className={styles.contents}>
            <Image src="images/resim4.jpg" className={styles.Image} />
            <h1>Ekibimizle Tanışın</h1>
            <br /><br /><br />
            <p>Ekibimizin bütün üyeleri yazılımcılardan<br></br> oluşmakla beraber projemizi her geçen <br></br>gün ileriye taşımaya gayret ediyoruz.</p>
        </div>
        <br /><br /><br /><br />
        <div className={styles.row}>
                <div className={styles.column}>
                    <Image src="images/resim5.jpg" style="width:100%" />
                    <h4>Deniz Ök</h4>
                    <br />
                    <p>Frontend Developer</p>
                </div>
                <div className={styles.column}>
                    <Image src="images/resim5.jpg" style="width:100%" />
                    <h4>Mehmet Fatih Kavala</h4>
                    <br />
                    <p>Veritabanı Geliştiricisi</p>
                </div>
                <div className={styles.column}>
                    <Image src="images/resim5.jpg" style="width:100%" />
                    <h4>Mert Sancar</h4>
                    <br />
                    <p>Backend Developer</p>
                </div>
            </div><div className={styles.row}>
                <div className={styles.column}>
                    <Image src="images/resim5.jpg" style="width:100%" />
                    <h4>Oğuzhan Kuzlukluoğlu</h4>
                    <br />
                    <p>Backend Developer</p>
                </div>
                <div className={styles.column}>
                    <Image src="images/resim5.jpg" style="width:100%" />
                    <h4>Tuğba Biçer</h4>
                    <br />
                    <p>Frontend Developer</p>
                </div>
            </div>
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            <div className={styles.text}>
                <h2>Misyonumuz</h2>
                <p>Yol Arkadaşım Projesi, insanların seyahat ederken yeni arkadaşlıklar kurmalarını teşvik etmek ve toplulukları bir araya getirmek için bir platform sağlamayı hedefler. Bu proje, yolculuk yapan bireylerin yalnızlığı azaltmayı, farklı kültürler arasında anlayışı artırmayı ve güvenli bir iletişim ortamı sağlayarak insanları birbirine bağlamayı amaçlar.</p>
            </div>
            <br /><br /><br /><br /><br /><br /><br />
            <div className={styles.text}>
                <h2>Vizyonumuz</h2>
                <p>Yol Arkadaşım Projesinin vizyonu, seyahat eden herkesin, gidecekleri yerlere ulaşırken yanlarında güvenilir ve dostça bir yol arkadaşı bulabilmesidir. Bu proje, insanların dünyayı keşfederken tek başına değil, birlikte deneyimlemelerini sağlayarak daha zengin ve anlamlı seyahat deneyimleri yaşamalarını hedefler. Aynı zamanda, farklı kültürler arasında köprüler kurarak insanların birbirini anlaması ve küresel bir topluluk oluşturması için bir platform sağlar. Yol Arkadaşım, sadece bir seyahat aracı değil, aynı zamanda bir arkadaşlık ve kültürel değişim platformu olarak önemli bir rol oynamayı amaçlar.</p>
            </div>
            <br /><br /><br /><br /><br /><br /><br />
            <div className={styles.text}>
                <p style="font-size: x-large;text-align: center;">Öneri ve görüşleriniz için bize ulaşın </p>
                <div className="icon">
                    <i className="fa-regular fa-envelope"></i>
                </div>
            </div>
            <br /><br /><br /><br /><br /><br /><br /><br />
            </div>
    )
}

export default aboutPage