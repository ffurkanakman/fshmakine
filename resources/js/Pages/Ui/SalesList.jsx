import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { KTCard, KTCardBody } from "../../Libs/Metronic/_metronic/helpers";
import { useSalesOffer } from "../../ServerSide/Hooks/useSalesOffer";
import { ROUTES } from "@/Libs/Routes/config.jsx";
import Swal from "sweetalert2";

const SalesList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [salesOffers, setSalesOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { fetchSalesOffers, deleteSalesOffer } = useSalesOffer();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await fetchSalesOffers();
                setSalesOffers(data);
            } catch (err) {
                setError("Satış teklifleri yüklenemedi");
                console.error("fetchSalesOffers error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = salesOffers.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(salesOffers.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Emin misiniz?",
            text: "Bu satışı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Evet, sil",
            cancelButtonText: "Vazgeç",
        });

        if (result.isConfirmed) {
            try {
                await deleteSalesOffer(id);
                const updated = await fetchSalesOffers();
                setSalesOffers(updated);
                Swal.fire("Silindi!", "Satış teklifi silindi.", "success");
            } catch (err) {
                console.error("Silme hatası:", err);
                Swal.fire("Hata!", "Silinemedi.", "error");
            }
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "400px" }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Yükleniyor...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
        <KTCard className="mb-5 mb-xl-8">
            <div className="card-header border-0 pt-5">
                <h3 className="card-title align-items-start flex-column">
                    <span className="card-label fw-bold fs-3 mb-1">Satış Teklifleri</span>
                    <span className="text-muted mt-1 fw-semibold fs-7">
            Toplam {salesOffers.length} Teklif
          </span>
                </h3>
                <div className="card-toolbar">
                    <Link to={ROUTES.UI.NEW_SALE} className="btn btn-sm btn-primary">
                        <i className="bi bi-plus-lg me-2"></i>
                        Yeni Satış Ekle
                    </Link>
                </div>
            </div>
            <KTCardBody className="py-3">
                <div className="table-responsive">
                    <table className="table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3">
                        <thead>
                        <tr className="fw-bold text-muted">
                            <th className="min-w-50px">ID</th>
                            <th className="min-w-150px">Firma</th>
                            <th className="min-w-150px">Yetkili</th>
                            <th className="min-w-120px">Ürün</th>
                            <th className="min-w-120px">Model</th>
                            <th className="min-w-80px">Adet</th>
                            <th className="min-w-100px">Fiyat</th>
                            <th className="min-w-120px">Ödeme Tipi</th>
                            <th className="min-w-150px text-end">İşlem</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentItems.length === 0 && (
                            <tr>
                                <td colSpan="9" className="text-center py-5">
                                    Hiç teklif bulunamadı.
                                </td>
                            </tr>
                        )}
                        {currentItems.map((offer) => (
                            <tr key={offer.id}>
                                <td className="text-dark fw-bold text-hover-primary fs-6">
                                    {offer.id}
                                </td>
                                <td className="text-dark fw-bold text-hover-primary fs-6">
                                    {offer.client_name}
                                </td>
                                <td className="text-dark fw-bold text-hover-primary fs-6">
                                    {offer.client_authorized}
                                </td>
                                <td className="text-dark fw-bold text-hover-primary fs-6">
                                    {offer.vehicle?.product}
                                </td>
                                <td className="text-dark fw-bold text-hover-primary fs-6">
                                    {offer.vehicle?.model}
                                </td>
                                <td className="text-dark fw-bold text-hover-primary fs-6">
                                    {offer.quantity}
                                </td>
                                <td className="text-dark fw-bold text-hover-primary fs-6">
                                    ₺{offer.price}
                                </td>
                                <td className="text-dark fw-bold text-hover-primary fs-6">
                                    {offer.payment_type}
                                </td>
                                <td className="text-end">
                                    <div className="d-flex justify-content-end">
                                        <Link
                                            to={`${ROUTES.UI.SALES_OFFER_FORM}/${offer.id}`}
                                            className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                                            title="Satış Formu"
                                        >
                                            <i className="bi bi-file-earmark-text fs-4"></i>
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(offer.id)}
                                            className="btn btn-icon btn-bg-light btn-active-color-danger btn-sm"
                                            title="Sil"
                                        >
                                            <i className="bi bi-trash fs-4"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {salesOffers.length > 0 && (
                    <div className="d-flex flex-stack flex-wrap pt-10">
                        <div className="fs-6 fw-bold text-gray-700">
                            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, salesOffers.length)} of {salesOffers.length} entries
                        </div>
                        <ul className="pagination">
                            <li className={`page-item ${currentPage === 1 ? "disabled" : "previous"}`}>
                                <a
                                    href="#"
                                    className="page-link"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (currentPage > 1) paginate(currentPage - 1);
                                    }}
                                >
                                    <i className="previous"></i>
                                </a>
                            </li>
                            {[...Array(totalPages)].map((_, index) => (
                                <li
                                    key={index}
                                    className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                                >
                                    <a
                                        href="#"
                                        className="page-link"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            paginate(index + 1);
                                        }}
                                    >
                                        {index + 1}
                                    </a>
                                </li>
                            ))}
                            <li className={`page-item ${currentPage === totalPages ? "disabled" : "next"}`}>
                                <a
                                    href="#"
                                    className="page-link"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (currentPage < totalPages) paginate(currentPage + 1);
                                    }}
                                >
                                    <i className="next"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                )}
            </KTCardBody>
        </KTCard>
    );
};

export default SalesList;
