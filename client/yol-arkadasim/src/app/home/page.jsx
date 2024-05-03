import React from 'react'
import styles from "./homePage.module.css"
import Image from 'next/image'

const HomePage = () => {
    
    var mainimg=document.querySelector('img')
    var images=['images/resim1.jpg','images/resim2.jpg','images/resim3.jpg']
    var num=0;
    const auto=true
    const IntervalTime=5000;
    let slideInterval
    
    function next(){
        num++
        if(num>=images.length){
            num=0;
            mainimg.src=images[num]
        }
        else{
            mainimg.src=images[num]
        }
    }
    
    function back(){
        num--
        if(num<0){
            num=images.length-1
            mainimg.src=images[num]
        }
        else{
            mainimg.src=images[num]
        }
    }
    if(auto){
        slideInterval=setInterval(next,IntervalTime)
    }
    
    return (
        <div>
            <div className="main">
                <div className="slider">
                    <Image src="images/resim1.jpg" alt="resim1" width={50} height={50}/>
                        <div className="buton">
                            <i className="fa-solid fa-arrow-left fa-2x" onclick="next()"></i>
                            <i className="fa-solid fa-arrow-right fa-2x" onclick="back()"></i>
                        </div>
                </div>

                <div className="content">
                    <h2>Hemen bir yol arkadaşı bulun!</h2>
                    <p>Yolculuklarınızı unutulmaz kılacak yol arkadaşınızı bulun!
                        <br /> Yolculuklarınızı daha eğlenceli ve güvenli hale getirin.
                            <br />Yol Arkadaşım size eşlik etsin!</p>
                        </div>
                </div>
                <div className="ingredient">
                    <h3>Uygulamayı kullananlardan okuyun</h3>
                </div>
                <br /><br /><br />
                <section className="products">
                    <div className="box-container">

                        <div className="box">
                            <div className="box-head">
                                <h3 className="title">Kullanıcı</h3>
                                <p className="name">Bu uygulamayı kullanarak çok iyi arkadaşlar edindim. <br /> Kesinlikle bu uygulamayı tavsiye ediyorum. <br /> Hem güvenli, hem kullanışlı.</p>
                                </div>
                            </div>
                            <div className="box">
                                <div className="box-head">
                                    <h3 className="title">Kullanıcı 2</h3>
                                    <p className="name">Bu uygulamayı kullanarak çok iyi arkadaşlar edindim. <br /> <br />Kesinlikle bu uygulamayı tavsiye ediyorum.Hem güvenli, hem kullanışlı.</p>
                                </div>
                            </div>
                            <div className="box">
                                <div className="box-head">
                                    <h3 className="title">Kullanıcı 3</h3>
                                    <p className="name">Bu uygulamayı kullanarak çok iyi arkadaşlar edindim. <br /> Kesinlikle bu uygulamayı tavsiye ediyorum. <br /> Hem güvenli, hem kullanışlı.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <br /><br /><br /><br /><br /><br />
                        <div className="ingredient">
                            <h3>Neden Yol Arkadaşımı seçmelisin</h3>
                        </div>

                        <br /><br /><br />
                        <div className="buto">
                            <i className="fa-solid fa-shield-halved"></i>
                            <i className="fa-solid fa-user-group"></i>
                            <i className="fa-solid fa-rocket"></i>
                        </div>
                        <div className="buto" style="height: 15%;font-size:medium;">
                            <p>Güvenilir</p>
                            <p>Kullanıcı Dostu</p>
                            <p style="width: 50px;">Hızlı</p>
                        </div>

                        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                        <div className="ingredient">
                            <h3>Nereye gitmek istersiniz?</h3>
                        </div>

                        <br /><br /><br />
                        <div className="ingredient">
                            <div>
                                <h3 style="width: 45rem;background-color:#cdc9cd;" >
                                    <p style="margin-right: auto;background-color: #cdc9cd;">Nereden:</p>

                                    <div className="select" style="margin-right:60%;">
                                        <select name="slct" id="slct">
                                            <option selected disabled>Seçiniz</option>
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
                            <div className="button">
                                <button className="btn">Ara</button>
                                <a href="#" className="btn">
                                    <i className="fa-solid fa-magnifying-glass" aria-hidden="true" ></i>
                                </a>
                            </div>
                            <div>
                                <h3 style="width: 45rem;background-color: #cdc9cd;">
                                    <p style="margin-right: auto;background-color: #cdc9cd;">Nereye:</p>

                                    <div className="select" style="margin-right:60%;">
                                        <select name="slct" id="slct">
                                            <option selected disabled>Seçiniz</option>
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

                        <br /><br /><br /><br /><br /><br /><br />
                        <div className="ingredient">
                            <h3>Aradığın yolculuk yok mu?</h3>
                        </div>
                        <br /><br /><br />
                        <p className="name">Aradığın yolculuk ilanı yoksa ve yol  <br />  arkadaşı arıyorsan hemen bir ilan paylaş!</p>
                        <br /><br /><br />
                        <div className="button" style="left: 50%;">
                            <button className="btn" >İlan Ver</button>
                        </div>
                        <br /><br /><br /><br />
                    </div>
                    )
}
export default HomePage
