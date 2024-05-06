import React from "react";
import styles from "./homePage.module.css";
import Slider from "@/components/slider/Slider";

const HomePage = () => {
  return (
    <div>
      <Slider/>
      
      <div className={styles.ingredient}>
        <h3>Uygulamayı kullananlardan okuyun</h3>
      </div>

      <section className={styles.products}>
        <div className={styles.boxContainer}>
          <div className={styles.box}>
            <div className={styles.boxHead}>
              <h3 className={styles.title}>Kullanıcı</h3>
              <p className={styles.name}>
                Bu uygulamayı kullanarak çok iyi arkadaşlar edindim. <br />{" "}
                Kesinlikle bu uygulamayı tavsiye ediyorum. <br /> Hem güvenli,
                hem kullanışlı.
              </p>
            </div>
          </div>
          <div className={styles.box}>
            <div className={styles.boxHead}>
              <h3 className={styles.title}>Kullanıcı 2</h3>
              <p className={styles.name}>
                Bu uygulamayı kullanarak çok iyi arkadaşlar edindim. <br />{" "}
                <br />
                Kesinlikle bu uygulamayı tavsiye ediyorum.Hem güvenli, hem
                kullanışlı.
              </p>
            </div>
          </div>
          <div className={styles.box}>
            <div className={styles.boxHead}>
              <h3 className={styles.title}>Kullanıcı 3</h3>
              <p className={styles.name}>
                Bu uygulamayı kullanarak çok iyi arkadaşlar edindim. <br />{" "}
                Kesinlikle bu uygulamayı tavsiye ediyorum. <br /> Hem güvenli,
                hem kullanışlı.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.ingredient}>
        <h3>Neden Yol Arkadaşımı seçmelisin</h3>
      </div>

      <div className={styles.buto}>
        <i className="fa-solid fa-shield-halved"></i>
        <i className="fa-solid fa-user-group"></i>
        <i className="fa-solid fa-rocket"></i>
      </div>
      <div
        className={styles.buto}
        style={{ height: "15%", fontSize: "medium" }}
      >
        <p>Güvenilir</p>
        <p>Kullanıcı Dostu</p>
        <p style={{ width: "50px" }}>Hızlı</p>
      </div>

      <div className={styles.ingredient}>
        <h3>Nereye gitmek istersiniz?</h3>
      </div>

      <div className={styles.ingredient}>
        <div>
          <h3 style={{ width: "45rem", backgroundColor: "#cdc9cd" }}>
            <p style={{ marginRight: "auto", backgroundColor: "#cdc9cd" }}>
              Nereden:
            </p>

            <div className={styles.select} style={{ marginRight: "60%" }}>
              <select name="slct" id="slct">
                <option selected disabled>
                  Seçiniz
                </option>
                <option value="1">Adana</option>
                <option value="2">Adıyaman</option>
                <option value="3">Afyonkarahisar</option>
                <option value="4">Ağrı</option>
                <option value="5">Amasya</option>
                <option value="6">Ankara</option>
                <option value="7">Antalya</option>
                <option value="8">Artvin</option>
                <option value="9">Aydın</option>
                <option value="10">Balıkesir</option>
                <option value="11">Bilecik</option>
                <option value="12">Bingöl</option>
                <option value="13">Bitlis</option>
                <option value="14">Bolu</option>
                <option value="15">Burdur</option>
                <option value="16">Bursa</option>
                <option value="17">Çanakkale</option>
                <option value="18">Çankırı</option>
                <option value="19">Çorum</option>
                <option value="20">Denizli</option>
                <option value="21">Diyarbakır</option>
                <option value="22">Edirne</option>
                <option value="23">Elazığ</option>
                <option value="24">Erzincan</option>
                <option value="25">Erzurum</option>
                <option value="26">Eskişehir</option>
                <option value="27">Gaziantep</option>
                <option value="28">Giresun</option>
                <option value="29">Gümüşhane</option>
                <option value="30">Hakkâri</option>
                <option value="31">Hatay</option>
                <option value="32">Isparta</option>
                <option value="33">Mersin</option>
                <option value="34">İstanbul</option>
                <option value="35">İzmir</option>
                <option value="36">Kars</option>
                <option value="37">Kastamonu</option>
                <option value="38">Kayseri</option>
                <option value="39">Kırklareli</option>
                <option value="40">Kırşehir</option>
                <option value="41">Kocaeli</option>
                <option value="42">Konya</option>
                <option value="43">Kütahya</option>
                <option value="44">Malatya</option>
                <option value="45">Manisa</option>
                <option value="46">Kahramanmaraş</option>
                <option value="47">Mardin</option>
                <option value="48">Muğla</option>
                <option value="49">Muş</option>
                <option value="50">Nevşehir</option>
                <option value="51">Niğde</option>
                <option value="52">Ordu</option>
                <option value="53">Rize</option>
                <option value="54">Sakarya</option>
                <option value="55">Samsun</option>
                <option value="56">Siirt</option>
                <option value="57">Sinop</option>
                <option value="58">Sivas</option>
                <option value="59">Tekirdağ</option>
                <option value="60">Tokat</option>
                <option value="61">Trabzon</option>
                <option value="62">Tunceli</option>
                <option value="63">Şanlıurfa</option>
                <option value="64">Uşak</option>
                <option value="65">Van</option>
                <option value="66">Yozgat</option>
                <option value="67">Zonguldak</option>
                <option value="68">Aksaray</option>
                <option value="69">Bayburt</option>
                <option value="70">Karaman</option>
                <option value="71">Kırıkkale</option>
                <option value="72">Batman</option>
                <option value="73">Şırnak</option>
                <option value="74">Bartın</option>
                <option value="75">Ardahan</option>
                <option value="76">Iğdır</option>
                <option value="77">Yalova</option>
                <option value="78">Karabük</option>
                <option value="79">Kilis</option>
                <option value="80">Osmaniye</option>
                <option value="81">Düzce</option>
              </select>
            </div>
          </h3>
        </div>
        <div className={styles.button}>
          <button className={styles.btn}>Ara</button>
          <a href="#" className={styles.btn}>
            <i className="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
          </a>
        </div>
        <div>
          <h3 style={{ width: "45rem", backgroundColor: "#cdc9cd" }}>
            <p style={{ marginRight: "auto", backgroundColor: "#cdc9cd" }}>
              Nereye:
            </p>

            <div className={styles.select} style={{ marginRight: "60%" }}>
              <select name="slct" id="slct">
                <option selected disabled>
                  Seçiniz
                </option>
                <option value="1">Adana</option>
                <option value="2">Adıyaman</option>
                <option value="3">Afyonkarahisar</option>
                <option value="4">Ağrı</option>
                <option value="5">Amasya</option>
                <option value="6">Ankara</option>
                <option value="7">Antalya</option>
                <option value="8">Artvin</option>
                <option value="9">Aydın</option>
                <option value="10">Balıkesir</option>
                <option value="11">Bilecik</option>
                <option value="12">Bingöl</option>
                <option value="13">Bitlis</option>
                <option value="14">Bolu</option>
                <option value="15">Burdur</option>
                <option value="16">Bursa</option>
                <option value="17">Çanakkale</option>
                <option value="18">Çankırı</option>
                <option value="19">Çorum</option>
                <option value="20">Denizli</option>
                <option value="21">Diyarbakır</option>
                <option value="22">Edirne</option>
                <option value="23">Elazığ</option>
                <option value="24">Erzincan</option>
                <option value="25">Erzurum</option>
                <option value="26">Eskişehir</option>
                <option value="27">Gaziantep</option>
                <option value="28">Giresun</option>
                <option value="29">Gümüşhane</option>
                <option value="30">Hakkâri</option>
                <option value="31">Hatay</option>
                <option value="32">Isparta</option>
                <option value="33">Mersin</option>
                <option value="34">İstanbul</option>
                <option value="35">İzmir</option>
                <option value="36">Kars</option>
                <option value="37">Kastamonu</option>
                <option value="38">Kayseri</option>
                <option value="39">Kırklareli</option>
                <option value="40">Kırşehir</option>
                <option value="41">Kocaeli</option>
                <option value="42">Konya</option>
                <option value="43">Kütahya</option>
                <option value="44">Malatya</option>
                <option value="45">Manisa</option>
                <option value="46">Kahramanmaraş</option>
                <option value="47">Mardin</option>
                <option value="48">Muğla</option>
                <option value="49">Muş</option>
                <option value="50">Nevşehir</option>
                <option value="51">Niğde</option>
                <option value="52">Ordu</option>
                <option value="53">Rize</option>
                <option value="54">Sakarya</option>
                <option value="55">Samsun</option>
                <option value="56">Siirt</option>
                <option value="57">Sinop</option>
                <option value="58">Sivas</option>
                <option value="59">Tekirdağ</option>
                <option value="60">Tokat</option>
                <option value="61">Trabzon</option>
                <option value="62">Tunceli</option>
                <option value="63">Şanlıurfa</option>
                <option value="64">Uşak</option>
                <option value="65">Van</option>
                <option value="66">Yozgat</option>
                <option value="67">Zonguldak</option>
                <option value="68">Aksaray</option>
                <option value="69">Bayburt</option>
                <option value="70">Karaman</option>
                <option value="71">Kırıkkale</option>
                <option value="72">Batman</option>
                <option value="73">Şırnak</option>
                <option value="74">Bartın</option>
                <option value="75">Ardahan</option>
                <option value="76">Iğdır</option>
                <option value="77">Yalova</option>
                <option value="78">Karabük</option>
                <option value="79">Kilis</option>
                <option value="80">Osmaniye</option>
                <option value="81">Düzce</option>
              </select>
            </div>
          </h3>
        </div>
      </div>

      <div className={styles.ingredient}>
        <h3>Aradığın yolculuk yok mu?</h3>
      </div>
      <p className={styles.name}>
        Aradığın yolculuk ilanı yoksa ve yol arkadaşı arıyorsan hemen bir ilan
        paylaş!
      </p>
      <div className={styles.button} style={{ left: "50%" }}>
        <button className={styles.btn}>İlan Ver</button>
      </div>
    </div>
  );
};
export default HomePage;

