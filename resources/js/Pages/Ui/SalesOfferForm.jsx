import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../../sass/_teklif.scss";
import { useSalesOffer } from "../../ServerSide/Hooks/useSalesOffer";
import { useVehicle } from "../../ServerSide/Hooks/useVehicle";
import html2pdf from "html2pdf.js";

const SalesOfferForm = () => {
    const { id } = useParams();
    const { getSalesOfferById } = useSalesOffer();
    const { getVehicleById } = useVehicle();

    const [offer, setOffer] = useState(null);
    const [vehicle, setVehicle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const offerData = await getSalesOfferById(id);
                console.log("OFFER DATA:", offerData);
                setOffer(offerData);

                if (offerData?.vehicle?.id) {
                    const vehicleData = await getVehicleById(offerData.vehicle.id, true);
                    console.log("VEHICLE DATA:", vehicleData);
                    setVehicle(vehicleData);
                }
            } catch (error) {
                console.error("Veriler yüklenirken hata oluştu:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleDownloadPdf = () => {
        const element = document.getElementById("pdf-content");
        const opt = {
            margin: 0,
            filename: `${offer?.client_name || "satis-teklifi"}.pdf`,
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        };
        html2pdf().from(element).set(opt).save();
    };

    if (loading) {
        return (
            <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "300px" }}
            >
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Yükleniyor...</span>
                </div>
            </div>
        );
    }

    if (!offer || !vehicle) {
        return (
            <div className="alert alert-danger">
                Satış teklifi veya araç verisi bulunamadı.
            </div>
        );
    }

    const groupedSpecs = {};
    vehicle.specifications?.forEach((spec) => {
        const [group, rest] = spec.key.split("-", 2);
        if (!groupedSpecs[group]) groupedSpecs[group] = [];
        groupedSpecs[group].push({
            key: rest ? rest.trim() : spec.key,
            value: spec.value,
        });
    });

    return (
        <div>
            <div id="pdf-content" className="teklif-wrapper">
                <header className="teklif-header d-flex justify-content-between align-items-center">
                    <div className="logo">
                        {vehicle.brand?.logo && (
                            <img
                                src={vehicle.brand.logo}
                                alt={vehicle.brand.name}
                                style={{ maxHeight: "60px", objectFit: "contain" }}
                            />
                        )}
                    </div>
                    <div>
                        <img src="/img/vector/logo.png" alt="FSH Logo" />
                    </div>
                </header>

                <section className="firma-info">
                    <div className="firma-kolon">
                        <strong className="firma-adi">{offer.client_name}</strong>
                        <p>
                            <strong>Konu:</strong> {offer.subject}
                        </p>
                        <p>
                            <strong>Firma:</strong> {offer.client_name}
                        </p>
                        <p>
                            <strong>Yetkili:</strong> {offer.client_authorized}
                        </p>
                        <p>
                            <strong>Mail:</strong> {offer.mail}
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
                        <th>Peşin Birim Fiyat</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{vehicle.brand?.name || "-"}</td>
                        <td>{vehicle.product}</td>
                        <td>{vehicle.model}</td>
                        <td>{offer.quantity}</td>
                        <td>{offer.price} ₺</td>
                    </tr>
                    </tbody>
                </table>

                <p className="mt-5 fw-bold fs-6">
                    *Peşin fiyatlara KDV dahil edilmemiştir. KDV oranı % 20’dir.
                </p>

                {vehicle.specifications && vehicle.specifications.length > 0 && (
                    <>
                        <h1 className="table-header">{vehicle.model} TEKNİK ÖZELLİKLER</h1>
                        <table className="teklif-tables">
                            <tbody>
                            {Object.entries(groupedSpecs).map(([groupName, specs]) => (
                                <React.Fragment key={groupName}>
                                    <tr>
                                        <th
                                            colSpan="3"
                                            style={{
                                                textAlign: "center",
                                                backgroundColor: "#c9302c",
                                                color: "white",
                                            }}
                                        >
                                            {groupName}
                                        </th>
                                    </tr>
                                    {specs.map((s, idx) => {
                                        const [value1, ...rest] = s.value.split(" ");
                                        const value2 = rest.join(" ");
                                        return (
                                            <tr key={idx}>
                                                <td style={{ width: "45%", padding: "8px 10px" }}>
                                                    {s.key}
                                                </td>
                                                <td style={{ width: "20%", padding: "8px 10px" }}>
                                                    {value1}
                                                </td>
                                                <td style={{ width: "35%", padding: "8px 10px" }}>
                                                    {value2}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </React.Fragment>
                            ))}
                            </tbody>
                        </table>
                    </>
                )}

                {vehicle.images && vehicle.images.length > 0 && (
                    <div className="gallery">
                        {vehicle.images.map((img) => (
                            <div key={img.id} className="gallery-item">
                                <img src={img.url} alt="Forklift Fotoğrafı" />
                            </div>
                        ))}
                    </div>
                )}

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
            </div>

            <div className="container">
                <div className="aa">
                    <div className="footer-mail">
                        www.fshmakina.com.tr | info@fshmakina.com.tr
                    </div>
                </div>
                <div className="button-wrapper">
                    <button className="external-button" onClick={handleDownloadPdf}>
                        <i className="bi bi-cloud-download-fill"></i> PDF
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SalesOfferForm;
