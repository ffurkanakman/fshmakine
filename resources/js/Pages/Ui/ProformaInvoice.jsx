import React from "react";
import "../../../sass/_teklif.scss";

const ProformaInvoice = () => {
    return (
        <div className="teklif-wrapper">
            <header className="teklif-header">
                <div className="logo">
                    <img src="img/vector/logo.png" alt="" />
                </div>
            </header>

            <h2 style={{ textAlign: "right" }}>PROFORMA FATURA</h2>

            <table
                border="1"
                cellspacing="0"
                cellpadding="5"
                style={{
                    borderCollapse: "collapse",
                    width: "100%",
                    marginTop: "1rem",
                    fontFamily: "Arial, sans-serif",
                }}
            >
                <tbody>
                    <tr>
                        <th style={{ width: "25%" }}>PROFORMA NO:</th>
                        <td>FSH-2024-006</td>
                    </tr>
                    <tr>
                        <th>FİRMA ADI:</th>
                        <td>ERDEM SEPETÇİOĞLU</td>
                    </tr>
                    <tr>
                        <th>ADRES:</th>
                        <td>
                            İNÖNÜ MAH. KÖMÜRKARA SOK. ZİRVA AVM ZEMİN KAT
                            NO:31/1-MERKEZ / KASTAMONU
                        </td>
                    </tr>
                    <tr>
                        <th>VERGİ DAİRESİ:</th>
                        <td>KASTAMONU &nbsp;&nbsp; 345 038 0139</td>
                    </tr>
                    <tr>
                        <th>YETKİLİ:</th>
                        <td>FATİH BEY</td>
                    </tr>
                    <tr>
                        <th>E-mail:</th>
                        <td>satis1@fshmakina.com; omer@fshmakina.com</td>
                    </tr>
                </tbody>
            </table>

            <table
                style={{
                    borderCollapse: "collapse",
                    width: "100%",
                    fontFamily: "Arial, sans-serif",
                }}
            >
                <thead>
                    <tr style={{ backgroundColor: "red", color: "white" }}>
                        <th
                            style={{
                                border: "1px solid black",
                                padding: "5px",
                            }}
                        >
                            ADET
                        </th>
                        <th
                            style={{
                                border: "1px solid black",
                                padding: "5px",
                            }}
                        >
                            AÇIKLAMA
                        </th>
                        <th
                            style={{
                                border: "1px solid black",
                                padding: "5px",
                            }}
                        >
                            B.FİYAT
                        </th>
                        <th
                            style={{
                                border: "1px solid black",
                                padding: "5px",
                            }}
                        >
                            SATIŞ TOPLAMI
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td
                            style={{
                                border: "1px solid black",
                                padding: "5px",
                            }}
                        >
                            6
                        </td>
                        <td
                            style={{
                                border: "1px solid black",
                                padding: "5px",
                            }}
                        >
                            MANUEL TRANSPALET 2.5 TON DÖKÜM POMPA
                        </td>
                        <td
                            style={{
                                border: "1px solid black",
                                padding: "5px",
                            }}
                        >
                            ₺9.000,00
                        </td>
                        <td
                            style={{
                                border: "1px solid black",
                                padding: "5px",
                            }}
                        >
                            ₺54.000,00
                        </td>
                    </tr>
                </tbody>
            </table>

            {/* Sağ alttaki toplam tablosu */}
            <table
                style={{
                    borderCollapse: "collapse",
                    fontFamily: "Arial, sans-serif",
                    marginTop: "1rem",
                    marginLeft: "auto",
                    width: "30%",
                }}
            >
                <tbody>
                    <tr>
                        <th
                            style={{
                                border: "1px solid black",
                                padding: "5px",
                                textAlign: "left",
                            }}
                        >
                            TUTAR
                        </th>
                        <td
                            style={{
                                border: "1px solid black",
                                padding: "5px",
                            }}
                        >
                            ₺54.000,00
                        </td>
                    </tr>
                    <tr>
                        <th
                            style={{
                                border: "1px solid black",
                                padding: "5px",
                                textAlign: "left",
                            }}
                        >
                            KDV %20
                        </th>
                        <td
                            style={{
                                border: "1px solid black",
                                padding: "5px",
                            }}
                        >
                            TEŞVİKLİ
                        </td>
                    </tr>
                    <tr>
                        <th
                            style={{
                                border: "1px solid black",
                                padding: "5px",
                                textAlign: "left",
                            }}
                        >
                            TOPLAM
                        </th>
                        <td
                            style={{
                                border: "1px solid black",
                                padding: "5px",
                            }}
                        >
                            ₺54.000,00
                        </td>
                    </tr>
                </tbody>
            </table>

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "1rem",
                }}
            >
                {/* Sol taraftaki tablo */}
                <table
                    style={{
                        borderCollapse: "collapse",
                        width: "65%",
                        fontFamily: "Arial, sans-serif",
                    }}
                >
                    <tbody>
                        <tr>
                            <th
                                style={{
                                    border: "1px solid black",
                                    textAlign: "left",
                                    padding: "5px",
                                    width: "30%",
                                }}
                            >
                                TESLİM SÜRESİ:
                            </th>
                            <td
                                style={{
                                    border: "1px solid black",
                                    padding: "5px",
                                }}
                            >
                                STOKTAN DERHAL TESLİM
                            </td>
                        </tr>
                        <tr>
                            <th
                                style={{
                                    border: "1px solid black",
                                    textAlign: "left",
                                    padding: "5px",
                                }}
                            >
                                TESLİM YERİ:
                            </th>
                            <td
                                style={{
                                    border: "1px solid black",
                                    padding: "5px",
                                }}
                            >
                                MÜŞTERİ İŞLETMESİ
                            </td>
                        </tr>
                        <tr>
                            <th
                                style={{
                                    border: "1px solid black",
                                    textAlign: "left",
                                    padding: "5px",
                                }}
                            >
                                ÖDEME:
                            </th>
                            <td
                                style={{
                                    border: "1px solid black",
                                    padding: "5px",
                                }}
                            >
                                PEŞİN
                            </td>
                        </tr>
                        <tr>
                            <th
                                style={{
                                    border: "1px solid black",
                                    textAlign: "left",
                                    padding: "5px",
                                }}
                            >
                                GARANTİ:
                            </th>
                            <td
                                style={{
                                    border: "1px solid black",
                                    padding: "5px",
                                }}
                            >
                                1 (BİR) YIL
                            </td>
                        </tr>
                        <tr>
                            <th
                                style={{
                                    border: "1px solid black",
                                    textAlign: "left",
                                    padding: "5px",
                                }}
                            >
                                MENŞEİ:
                            </th>
                            <td
                                style={{
                                    border: "1px solid black",
                                    padding: "5px",
                                }}
                            >
                                ÇİN
                            </td>
                        </tr>
                        <tr>
                            <th
                                style={{
                                    border: "1px solid black",
                                    textAlign: "left",
                                    padding: "5px",
                                }}
                            >
                                G.T.İ.P. NO:
                            </th>
                            <td
                                style={{
                                    border: "1px solid black",
                                    padding: "5px",
                                }}
                            >
                                8427900090
                            </td>
                        </tr>
                        <tr>
                            <th
                                style={{
                                    border: "1px solid black",
                                    textAlign: "left",
                                    padding: "5px",
                                }}
                            >
                                BANKA HESAP BİLGİSİ:
                            </th>
                            <td
                                style={{
                                    border: "1px solid black",
                                    padding: "5px",
                                }}
                            >
                                KUVEYT TÜRK BANKASI - HADIMKÖY YOLU ŞUBESİ
                            </td>
                        </tr>
                        <tr>
                            <th
                                style={{
                                    border: "1px solid black",
                                    textAlign: "left",
                                    padding: "5px",
                                }}
                            >
                                HESAP ADI:
                            </th>
                            <td
                                style={{
                                    border: "1px solid black",
                                    padding: "5px",
                                }}
                            >
                                FSH FORKLİFT VE İSTİF MAK.SAN.TİC.LTD.ŞTİ.
                            </td>
                        </tr>
                        <tr>
                            <th
                                style={{
                                    border: "1px solid black",
                                    textAlign: "left",
                                    padding: "5px",
                                }}
                            >
                                İBAN:
                            </th>
                            <td
                                style={{
                                    border: "1px solid black",
                                    padding: "5px",
                                }}
                            >
                                TR36 0020 5000 0975 0827 0000 01
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* Sağ taraftaki ödenecek tutar bloğu */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        fontFamily: "Arial, sans-serif",
                        width: "30%",
                        justifyContent:"center",
                        marginTop:"1rem",
                        
                    }}
                >
                    <div
                        style={{
                            fontWeight: "bold",
                            marginBottom: "0.5rem",
                            textDecoration: "underline",
                        }}
                    >
                        ÖDENECEK TUTAR
                    </div>
                    <div style={{ marginBottom: "0.5rem", fontWeight:"bold" }}>YALNIZ;</div>
                    <div
                        style={{
                            fontWeight: "bold",
                            marginBottom: "0.5rem",
                            fontSize: "1.1rem",
                        }}
                    >
                        54.000 TL
                    </div>
                    <div style={{ fontWeight: "bold" }}>#ELLI DÖRTBİN TL #</div>
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
                    <i className="bi bi-cloud-download-fill"></i>PDF
                </button>
            </div>
        </div>
    );
};

export default ProformaInvoice;
