import React, { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import { PageTitle } from "../../Libs/Metronic/_metronic/layout/core";
import { ROUTES } from "@/Libs/Routes/config.jsx";
import { KTCard, KTCardBody } from "../../Libs/Metronic/_metronic/helpers";
import { Link } from "react-router-dom";
import { useVehicle } from "../../ServerSide/Hooks/useVehicle";
import "../../../sass/page/_detail.scss";
import Swal from "sweetalert2";

const vehiclesBreadCrumbs = [
    {
        title: "Ana Sayfa",
        path: ROUTES.UI.LANDING,
        isSeparator: false,
        isActive: false,
    },
];

const VehiclePage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    const { vehicles, loading, error, fetchVehicles, deleteVehicle } = useVehicle();

    useEffect(() => {
        fetchVehicles();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentVehicles = vehicles
        ? vehicles.slice(indexOfFirstItem, indexOfLastItem)
        : [];

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const totalPages = vehicles ? Math.ceil(vehicles.length / itemsPerPage) : 0;

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Emin misiniz?",
            text: "Bu aracı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Evet, sil",
            cancelButtonText: "Vazgeç",
        });

        if (result.isConfirmed) {
            try {
                await deleteVehicle(id);
                await fetchVehicles();
                Swal.fire("Silindi!", "Araç başarıyla silindi.", "success");
            } catch (error) {
                console.error("Araç silinirken hata oluştu:", error);
                Swal.fire("Hata!", "Araç silinirken bir hata oluştu.", "error");
            }
        }
    };

    if (loading) {
        return (
            <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "400px" }}
            >
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Yükleniyor...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return <div className="alert alert-danger">Hata: {error}</div>;
    }

    return (
        <>
            <KTCard className="mb-5 mb-xl-8">
                <div className="card-header border-0 pt-5">
                    <h3 className="card-title align-items-start flex-column">
                        <span className="card-label fw-bold fs-3 mb-1">Araçlar Listesi</span>
                        <span className="text-muted mt-1 fw-semibold fs-7">
              Toplam {vehicles ? vehicles.length : 0} Araç
            </span>
                    </h3>
                    <div className="card-toolbar">
                        <Link
                            to={ROUTES.UI.NEW_VEHICLE}
                            className="btn btn-sm btn-primary"
                        >
                            <i className="bi bi-plus-lg me-2"></i>
                            Yeni Araç Ekle
                        </Link>
                    </div>
                </div>
                <KTCardBody className="py-3">
                    <div className="table-responsive">
                        <table className="table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3">
                            <thead>
                            <tr className="fw-bold text-muted">
                                <th className="min-w-120px">Marka Adı</th>
                                <th className="min-w-120px">Ürün</th>
                                <th className="min-w-120px">Model</th>
                                <th className="min-w-100px text-end">İşlem</th>
                            </tr>
                            </thead>
                            <tbody>
                            {currentVehicles.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="text-center py-5">
                                        Hiç araç bulunamadı.
                                    </td>
                                </tr>
                            )}
                            {currentVehicles.map((vehicle) => (
                                <tr key={vehicle.id}>
                                    <td className="text-dark fw-bold text-hover-primary fs-6">
                                        {vehicle.brand?.name || "-"}
                                    </td>
                                    <td className="text-dark fw-bold text-hover-primary fs-6">
                                        {vehicle.product}
                                    </td>
                                    <td className="text-dark fw-bold text-hover-primary fs-6">
                                        {vehicle.model}
                                    </td>
                                    <td className="text-end">
                                        <div className="d-flex justify-content-end">
                                            <Link
                                                to={`/AracDuzenle/${vehicle.id}`}
                                                className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                                                title="Düzenle"
                                            >
                                                <i className="bi bi-pencil fs-4"></i>
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(vehicle.id)}
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

                    {vehicles && vehicles.length > 0 && (
                        <div className="d-flex flex-stack flex-wrap pt-10">
                            <div className="fs-6 fw-bold text-gray-700">
                                Showing {indexOfFirstItem + 1} to{" "}
                                {Math.min(indexOfLastItem, vehicles.length)} of{" "}
                                {vehicles.length} entries
                            </div>

                            <ul className="pagination">
                                <li
                                    className={`page-item ${currentPage === 1 ? "disabled" : "previous"}`}
                                >
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
                                        className={`page-item ${
                                            currentPage === index + 1 ? "active" : ""
                                        }`}
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

                                <li
                                    className={`page-item ${currentPage === totalPages ? "disabled" : "next"}`}
                                >
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
        </>
    );
};

const VehicleList = () => {
    const intl = useIntl();
    return (
        <>
            <PageTitle breadcrumbs={vehiclesBreadCrumbs}>Araçlar</PageTitle>
            <VehiclePage />
        </>
    );
};

export { VehicleList };
export default VehicleList;
