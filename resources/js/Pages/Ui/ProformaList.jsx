import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { KTCard, KTCardBody } from "../../Libs/Metronic/_metronic/helpers";
import { useProformaInvoice } from "../../ServerSide/Hooks/useProformaInvoice";
import { ROUTES } from "@/Libs/Routes/config.jsx";
import Swal from "sweetalert2";

const ProformaList = () => {
    const [proformas, setProformas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { fetchProformas, deleteProforma } = useProformaInvoice();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await fetchProformas();
                setProformas(data);
            } catch (err) {
                setError("Proformalar yüklenemedi");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Emin misiniz?",
            text: "Bu proformayı silmek istediğinizden emin misiniz?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Evet, sil",
            cancelButtonText: "Vazgeç",
        });

        if (result.isConfirmed) {
            try {
                await deleteProforma(id);
                const updated = await fetchProformas();
                setProformas(updated);
                Swal.fire("Silindi!", "Proforma silindi.", "success");
            } catch (err) {
                Swal.fire("Hata!", "Silinemedi.", "error");
            }
        }
    };

    return (
        <div className="container">
            <h1 className="fs-qx fw-bold mb-2">Proforma</h1>
            <div className="text-muted fs-6 mb-5">Ana Sayfa / Proforma</div>

            <KTCard>
                <div className="card-header border-0 pt-5 d-flex justify-content-between align-items-center">
                    <div>
                        <h3 className="card-title fw-bold">Proforma Listesi</h3>
                        <span className="text-muted fs-7">Toplam {proformas.length} Proforma</span>
                    </div>
                    <Link
                        to={ROUTES.UI.NEW_PROFORMA_INVOICE}
                        className="btn btn-primary btn-sm"
                    >
                        + Yeni Proforma Ekle
                    </Link>
                </div>

                <KTCardBody className="py-3">
                    <div className="table-responsive">
                        <table className="table table-row-bordered align-middle">
                            <thead>
                            <tr className="fw-bold text-muted">
                                <th>Firma Adı</th>
                                <th>Yetkili</th>
                                <th>Proforma No</th>
                                <th>Tutar</th>
                                <th className="text-end">İşlem</th>
                            </tr>
                            </thead>
                            <tbody>
                            {proformas.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-5">
                                        Kayıtlı proforma bulunamadı.
                                    </td>
                                </tr>
                            ) : (
                                proformas.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.company_name}</td>
                                        <td>{item.authorized_person}</td>
                                        <td>{item.proforma_no}</td>
                                        <td>₺{Number(item.total_price).toLocaleString("tr-TR")}</td>
                                        <td className="text-end">
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="btn btn-icon btn-bg-light btn-sm"
                                            >
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                            </tbody>
                        </table>
                    </div>
                </KTCardBody>
            </KTCard>
        </div>
    );
};

export default ProformaList;
