import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProformaInvoice } from "@/ServerSide/Hooks/useProformaInvoice";
import "../../../sass/_teklif.scss";

const formatCurrency = (value) =>
    Number(value).toLocaleString("tr-TR", {
        style: "currency",
        currency: "TRY",
    });

const ProformaInvoice = () => {
    const { id } = useParams();
    const { getProformaById } = useProformaInvoice();
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await getProformaById(id);
                setData(response);
            } catch (err) {
                console.error("Proforma verisi çekilemedi", err);
            }
        };
        fetch();
    }, [id]);

    if (!data) return <div>Yükleniyor...</div>;

    return (
        <div className="teklif-wrapper">
            <header className="teklif-header">
                <div className="logo">
                    <img src="/img/vector/logo.png" alt="" />
                </div>
            </header>

            <h2 style={{ textAlign: "right" }}>PROFORMA FATURA</h2>

            <table border="1" cellSpacing="0" cellPadding="5" style={{ borderCollapse: "collapse", width: "100%", marginTop: "1rem", fontFamily: "Arial, sans-serif" }}>
                <tbody>
                <tr><th style={{ width: "25%" }}>PROFORMA NO:</th><td>{data.proforma_no}</td></tr>
                <tr><th>FİRMA ADI:</th><td>{data.company_name}</td></tr>
                <tr><th>ADRES:</th><td>{data.address}</td></tr>
                <tr><th>VERGİ DAİRESİ:</th><td>{data.tax_office}</td></tr>
                <tr><th>YETKİLİ:</th><td>{data.authorized_person}</td></tr>
                <tr><th>E-mail:</th><td>{data.email}</td></tr>
                </tbody>
            </table>

            <table style={{ borderCollapse: "collapse", width: "100%", fontFamily: "Arial, sans-serif" }}>
                <thead>
                <tr style={{ backgroundColor: "red", color: "white" }}>
                    <th style={{ border: "1px solid black", padding: "5px" }}>ADET</th>
                    <th style={{ border: "1px solid black", padding: "5px" }}>AÇIKLAMA</th>
                    <th style={{ border: "1px solid black", padding: "5px" }}>B.FİYAT</th>
                    <th style={{ border: "1px solid black", padding: "5px" }}>SATIŞ TOPLAMI</th>
                </tr>
                </thead>
                <tbody>
                {data.parts.map((part, index) => (
                    <tr key={index}>
                        <td style={{ border: "1px solid black", padding: "5px" }}>{part.quantity}</td>
                        <td style={{ border: "1px solid black", padding: "5px" }}>{part.name}</td>
                        <td style={{ border: "1px solid black", padding: "5px" }}>{formatCurrency(part.unit_price)}</td>
                        <td style={{ border: "1px solid black", padding: "5px" }}>{formatCurrency(part.total_price)}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <table style={{ borderCollapse: "collapse", fontFamily: "Arial, sans-serif", marginTop: "1rem", marginLeft: "auto", width: "30%" }}>
                <tbody>
                <tr><th style={{ border: "1px solid black", padding: "5px", textAlign: "left" }}>TUTAR</th><td style={{ border: "1px solid black", padding: "5px" }}>{formatCurrency(data.total_price)}</td></tr>
                <tr><th style={{ border: "1px solid black", padding: "5px", textAlign: "left" }}>KDV %20</th><td style={{ border: "1px solid black", padding: "5px" }}>TEŞVİKLİ</td></tr>
                <tr><th style={{ border: "1px solid black", padding: "5px", textAlign: "left" }}>TOPLAM</th><td style={{ border: "1px solid black", padding: "5px" }}>{formatCurrency(data.total_price)}</td></tr>
                </tbody>
            </table>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}>
                <table style={{ borderCollapse: "collapse", width: "65%", fontFamily: "Arial, sans-serif" }}>
                    <tbody>
                    <tr><th style={thStyle}>TESLİM SÜRESİ:</th><td style={tdStyle}>{data.delivery_time}</td></tr>
                    <tr><th style={thStyle}>TESLİM YERİ:</th><td style={tdStyle}>{data.delivery_place}</td></tr>
                    <tr><th style={thStyle}>ÖDEME:</th><td style={tdStyle}>{data.payment}</td></tr>
                    <tr><th style={thStyle}>GARANTİ:</th><td style={tdStyle}>{data.warranty}</td></tr>
                    <tr><th style={thStyle}>MENŞEİ:</th><td style={tdStyle}>{data.origin}</td></tr>
                    <tr><th style={thStyle}>G.T.İ.P. NO:</th><td style={tdStyle}>{data.gtip_no}</td></tr>
                    <tr><th style={thStyle}>BANKA HESAP BİLGİSİ:</th><td style={tdStyle}>{data.bank_info}</td></tr>
                    <tr><th style={thStyle}>HESAP ADI:</th><td style={tdStyle}>{data.account_name}</td></tr>
                    <tr><th style={thStyle}>İBAN:</th><td style={tdStyle}>{data.iban}</td></tr>
                    </tbody>
                </table>

                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", fontFamily: "Arial, sans-serif", width: "30%", justifyContent:"center", marginTop:"1rem" }}>
                    <div style={{ fontWeight: "bold", marginBottom: "0.5rem", textDecoration: "underline" }}>ÖDENECEK TUTAR</div>
                    <div style={{ marginBottom: "0.5rem", fontWeight:"bold" }}>YALNIZ;</div>
                    <div style={{ fontWeight: "bold", marginBottom: "0.5rem", fontSize: "1.1rem" }}>{formatCurrency(data.total_price)}</div>
                    <div style={{ fontWeight: "bold" }}>#{formatCurrency(data.total_price).replace("₺", "").replace(",00", "")} TL #</div>
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
                    <div className="footer-mail">www.fshmakina.com.tr | info@fshmakina.com.tr</div>
                </div>

                <button className="external-button">
                    <i className="bi bi-cloud-download-fill"></i>PDF
                </button>
            </div>
        </div>
    );
};

const thStyle = {
    border: "1px solid black",
    textAlign: "left",
    padding: "5px",
    width: "30%",
};

const tdStyle = {
    border: "1px solid black",
    padding: "5px",
};

export default ProformaInvoice;
