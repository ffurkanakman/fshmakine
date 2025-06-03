import React from 'react';
import '../../../sass/_teklif.scss';

const TeklifSayfasi = () => {
    return (
        <div className="teklif-wrapper">
            <header className="teklif-header">
                <div className="logo">
                    <img src="img/vector/logo.png" alt="" />
                </div>
            </header>

            <section className="firma-info">
                <div className="firma-kolon">
                    <strong className="firma-adi">KENAN METAL</strong>
                    <p><strong>Yetkili:</strong> MERVE HANIM</p>
                    <p><strong>Telefon:</strong> 0534 798 63 35</p>
                    <p><strong>E-Posta:</strong> satinalma1@kenanmetal.com</p>
                </div>

                <div className="firma-kolon text-right">
                    <p><strong>Teklif No:</strong> #FSH-3168</p>
                    <p><strong>Teklif Tarihi:</strong> 02.06.2025</p>
                    <p><strong>Yetkili:</strong> BAHAR ERSOY</p>
                    <p><strong>Telefon:</strong> 0533 322 98 37</p>
                    <p><strong>E-Posta:</strong> satis1@fshmakina.com</p>
                </div>
            </section>


            <table className="teklif-table">
                <thead>
                    <tr>
                        <th>Makina Marka</th>
                        <th>Seri No</th>
                        <th>Konu</th>
                        <th>Teklif Geçerlilik Tarihi</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>/</td>
                        <td>/</td>
                        <td>FİYAT TEKLİFİ</td>
                        <td>09.06.2025</td>
                    </tr>
                </tbody>
            </table>

            <table className="urun-table">
                <thead>
                    <tr>
                        <th>Sıra</th>
                        <th>Açıklama</th>
                        <th>Adet</th>
                        <th>Birim Fiyat</th>
                        <th>Toplam</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>FREN TABLASI</td>
                        <td>2</td>
                        <td>12.500,00 ₺</td>
                        <td>25.000,00 ₺</td>
                    </tr>
                </tbody>
            </table>

            <div className="bottom-section">
                <section className="kosullar">
                    <p>1. Müşteri, bu teklifin kabul edildiğini yazılı bir şekilde belirttikten sonra işlemler başlatılacaktır.</p>
                    <p>2. Ödeme, hizmet ve malların tesliminden sonra havale ile yapılacaktır.</p>
                    <p>3. Birim fiyatlarımızda %20 KDV hariçtir.</p>
                    <p>4. Fiyatlarımız fatura tarihinde TCMB Efektif satış kuru alınarak TL'ye çevrilip fatura kesilecektir.</p>
                </section>

                <section className="toplam">
                    <p><strong>Toplam:</strong> 25.000,00 ₺</p>
                    <p><strong>İşçilik:</strong> 0,00 ₺</p>
                    <p className='ara-toplam'><strong>Ara Toplam:</strong> 25.000,00 ₺</p>
                    <p><strong>KDV (20%):</strong> 5.000,00 ₺</p>
                    <p className="genel-toplam"><strong>Genel Toplam:</strong> 30.000,00 ₺</p>
                </section>
            </div>

            <div className="imza"></div>

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

                <button className="external-button"><i class="bi bi-cloud-download-fill"></i>PDF</button>
            </div>


        </div>
    );
};

export default TeklifSayfasi;
