import React from "react";
import styles from "./aboutPage.module.css";
import Image from "next/image";

const aboutPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.contents}>
        <div className={styles.teamDesc}>
          <div className={styles.desc}>
            <h1>Ekibimizle Tanışın</h1>
            <p>
              Ekibimizin bütün üyeleri yazılımcılardan<br></br> oluşmakla
              beraber projemizi her geçen <br></br>gün ileriye taşımaya gayret
              ediyoruz.
            </p>
          </div>
          <div></div>
        </div>
        <div className={styles.aboutImg}>
          <Image
            alt="team"
            src="/slide1.jpg"
            className={styles.Image}
            width={500}
            height={500}
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.column}>
          <Image alt="user" src="/DenizOk.jpeg" width={120} height={120} />
          <h4>Deniz Ök</h4>
          <p>Frontend Developer</p>
        </div>
        <div className={styles.column}>
          <Image alt="user" src="/MehmetFatih.jpeg" width={120} height={120} />
          <h4>Mehmet Fatih Kavala</h4>
          
          <p>Database Developer</p>
        </div>
        <div className={styles.column}>
          <Image alt="user" src="/MertSancar.jpeg" width={120} height={120} />
          <h4>Mert Sancar</h4>
          
          <p>Backend Developer</p>
        </div>
        <div className={styles.column}>
          <Image alt="user" src="/OguzhanKuzlukluoglu.jpeg" width={120} height={120} />
          <h4>Oğuzhan Kuzlukluoğlu</h4>
          
          <p>Backend Developer</p>
        </div>
        <div className={styles.column}>
          <Image alt="user" src="/TugbaBicer.jpeg" width={120} height={120} />
          <h4>Tuğba Biçer</h4>
          
          <p>Frontend Developer</p>
        </div>
      </div>

    
      <div className={styles.text}>
        <h2>Misyonumuz</h2>
        <p>
          Yol Arkadaşım Projesi, insanların seyahat ederken yeni arkadaşlıklar
          kurmalarını teşvik etmek ve toplulukları bir araya getirmek için bir
          platform sağlamayı hedefler. Bu proje, yolculuk yapan bireylerin
          yalnızlığı azaltmayı, farklı kültürler arasında anlayışı artırmayı ve
          güvenli bir iletişim ortamı sağlayarak insanları birbirine bağlamayı
          amaçlar.
        </p>
      </div>
      <div className={styles.text}>
        <h2>Vizyonumuz</h2>
        <p>
          Yol Arkadaşım Projesinin vizyonu, seyahat eden herkesin, gidecekleri
          yerlere ulaşırken yanlarında güvenilir ve dostça bir yol arkadaşı
          bulabilmesidir. Bu proje, insanların dünyayı keşfederken tek başına
          değil, birlikte deneyimlemelerini sağlayarak daha zengin ve anlamlı
          seyahat deneyimleri yaşamalarını hedefler. Aynı zamanda, farklı
          kültürler arasında köprüler kurarak insanların birbirini anlaması ve
          küresel bir topluluk oluşturması için bir platform sağlar. Yol
          Arkadaşım, sadece bir seyahat aracı değil, aynı zamanda bir arkadaşlık
          ve kültürel değişim platformu olarak önemli bir rol oynamayı amaçlar.
        </p>
      </div>

      <div className={styles.mailText}>
        <p>Öneri ve görüşleriniz için bize ulaşın</p>
        <Image alt="mail" src="/mail.png" width={32} height={32}/>
      </div>

    </div>
  );
};

export default aboutPage;
