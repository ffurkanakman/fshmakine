import React from "react";
import "../../../sass/_teklif.scss";

const SalesOfferForm = () => {
    return (
        <div className="teklif-wrapper">
            <header className="teklif-header">
                <div className="logo">
                    <img src="img/vector/mima-logo.png" alt="" />
                    <img src="img/vector/logo.png" alt="" />
                </div>
            </header>

            <section className="firma-info">
                <div className="firma-kolon">
                    <strong className="firma-adi">KENAN METALSS</strong>
                    <p>
                        <strong>Konu:</strong> AKÜLÜ FORKLİFT SATIŞ TEKLİFİ
                    </p>
                    <p>
                        <strong>Firma:</strong> EVDİZ
                    </p>
                    <p>
                        <strong>Yetkili:</strong> İBRAHİM BEY
                    </p>
                    <p>
                        <strong>Mail:</strong> info@kenanmetalss.com.tr
                    </p>
                </div>
            </section>

            <table className="teklif-table">
                <thead>
                    <tr>
                        <th>Marka</th>
                        <th>Ürün</th>
                        <th>Model</th>
                        <th>Adet</th>
                        <th>Peşin Biri Fiyat</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Mima</td>
                        <td>Akülü Forklift</td>
                        <td>Model</td>
                        <td>1</td>
                        <td>23.000 USD</td>
                    </tr>
                </tbody>
                <p className="mt-5 fw-bold fs-6">
                    *Peşin fiyatlara KDV dahil edilmemiştir. KDV oranı % 20’dir.
                </p>
            </table>

            <h1 className="table-header">MK1548 TEKNİK ÖZELLİKLER</h1>

            <table className="teklif-tables">
                <thead>
                    <tr>
                        <th colspan="3">Standart</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Güç Tipi</td>
                        <td> </td>
                        <td>AKÜ</td>
                    </tr>
                    <tr>
                        <td>Nominal Kapasite</td>
                        <td>Q(kg)</td>
                        <td>1500</td>
                    </tr>
                    <tr>
                        <td>Yük Merkezi</td>
                        <td>C(mm)</td>
                        <td>500</td>
                    </tr>
                    <tr>
                        <th colspan="3">Ağırlık</th>
                    </tr>
                    <tr>
                        <td>Servis Ağırlığı (pil dahil)</td>
                        <td>kg</td>
                        <td>2900</td>
                    </tr>
                    <tr>
                        <th colspan="3">Tekerlek</th>
                    </tr>
                    <tr>
                        <td>Yük Tekerleği</td>
                        <td>mm</td>
                        <td>5.00-8</td>
                    </tr>
                    <tr>
                        <td>Tahrik tekerleği</td>
                        <td>mm</td>
                        <td>18x7-8</td>
                    </tr>
                    <tr>
                        <td>Tekerlek sayısı, ön/arka (x=sürücü tekerlek)</td>
                        <td></td>
                        <td>2x/2</td>
                    </tr>
                    <tr>
                        <th colspan="3">Boyut</th>
                    </tr>
                    <tr>
                        <td>Dİrek kapalı yüksekliği</td>
                        <td>h1(mm)</td>
                        <td>2195</td>
                    </tr>
                    <tr>
                        <td>Serbest kaldırma yüksekliği</td>
                        <td>h2(mm)</td>
                        <td>1155</td>
                    </tr>
                    <tr>
                        <td>Kaldırma yüksekliği</td>
                        <td>h3(mm)</td>
                        <td>3000</td>
                    </tr>
                    <tr>
                        <td>Yük arkalığı ile uzatılmış direk yüksekliği</td>
                        <td>h4(mm)</td>
                        <td>5830</td>
                    </tr>
                    <tr>
                        <td>Baş üstü koruma yüksekliği</td>
                        <td>h6(mm)</td>
                        <td>2100</td>
                    </tr>
                    <tr>
                        <td>Koltuk yüksekliği</td>
                        <td>h7(mm)</td>
                        <td>1050</td>
                    </tr>
                    <tr>
                        <td>Toplam uzunluk</td>
                        <td>L1(mm)</td>
                        <td>3305</td>
                    </tr>
                    <tr>
                        <td>Çatal yüzüne kadar olan uzunluk</td>
                        <td>L2(mm)</td>
                        <td>2215</td>
                    </tr>
                    <tr>
                        <td>Toplam genişlik</td>
                        <td>B1(mm)</td>
                        <td>1110</td>
                    </tr>
                    <tr>
                        <td>Çatal boyutu</td>
                        <td>s/e/L(mm)</td>
                        <td>100/100/35</td>
                    </tr>
                    <tr>
                        <td>Palet için koridor genişliği 1000*1200</td>
                        <td>Ast(mm)</td>
                        <td>3580</td>
                    </tr>
                    <tr>
                        <td>Dönüş yarıçapı</td>
                        <td>Wa(mm)</td>
                        <td>2000</td>
                    </tr>
                    <tr>
                        <th colspan="3">Fonksiyon</th>
                    </tr>
                    <tr>
                        <td>Sürüş hızı (yükleme/boşaltma)</td>
                        <td>km/h</td>
                        <td>10/12</td>
                    </tr>
                    <tr>
                        <td>Kaldırma hızı (yükleme/boşaltma)</td>
                        <td>mm/s</td>
                        <td>300/480</td>
                    </tr>
                    <tr>
                        <td>Fren tipi</td>
                        <td></td>
                        <td>Hidrolik tip</td>
                    </tr>
                    <tr>
                        <th colspan="3">Sürüş</th>
                    </tr>
                    <tr>
                        <td>Sürüş motoru (S2-60min)</td>
                        <td>kw</td>
                        <td>AC6.8</td>
                    </tr>
                    <tr>
                        <td>Kaldırma motoru (S3-15%)</td>
                        <td>kw</td>
                        <td>AC8.2</td>
                    </tr>
                    <tr>
                        <td>Akü voltaj/kapasitesi</td>
                        <td>V/Ah</td>
                        <td>48/300</td>
                    </tr>
                    <tr>
                        <td>Direksiyon sistemi</td>
                        <td></td>
                        <td>Hidrolik tip</td>
                    </tr>
                </tbody>
            </table>

            <div className="gallery">
                <div className="gallery-item">
                    <img
                        src="img/vector/forklift-1.png"
                        alt="Forklift Fotoğrafı 1"
                    />
                </div>
                <div className="gallery-item">
                    <img src="img/forklift-2.jpg" alt="Forklift Fotoğrafı 2" />
                </div>
                <div className="gallery-item">
                    <img src="img/forklift-3.jpg" alt="Forklift Fotoğrafı 3" />
                </div>
            </div>

            <div className="footer-info">
                <div className="info-block">
                    <strong>İSTANBUL BÖLGE SERVİS</strong>
                    <p>0534 711 37 37 - 0212 299 97 51</p>
                    <p>Selahaddin Eyyübi Mah. 1613 Sk. Evren 2</p>
                    <p>Oto San Sit 25A Blok No:1 Esenyurt</p>
                    <p>İSTANBUL</p>
                </div>
                <div className="info-block">
                    <strong>SHOWROOM</strong>
                    <p>0532 471 37 87 - 0282 502 97 87</p>
                    <p>Veliköy Mah. Enönü Cad. AR Blok 7/13</p>
                    <p>Çerkezköy/TEKİRDAĞ</p>
                </div>
                <div className="info-block">
                    <strong>TRAKYA BÖLGE SERVİS</strong>
                    <p>0532 474 27 37 - 0282 502 97 87</p>
                    <p>Veliköy Mah. Enönü Cad. C21 Blok 24/29</p>
                    <p>Çerkezköy/TEKİRDAĞ</p>
                </div>
            </div>

            <div className="container">
                <div className="aa">
                    <div className="footer-mail">
                        www.fshmakina.com.tr | info@fshmakina.com.tr
                    </div>
                </div>

                <button className="external-button">
                    <i class="bi bi-cloud-download-fill"></i>PDF
                </button>
            </div>
        </div>
    );
};

export default SalesOfferForm;
