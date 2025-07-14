import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useBrand } from "../../ServerSide/hooks/useBrand";
import { ROUTES } from "@/Libs/Routes/config.jsx";
import { KTCard, KTCardBody } from "../../Libs/Metronic/_metronic/helpers";

const BrandList = () => {
    const { brands, fetchBrands, loading, error, deleteBrand, updateBrand } = useBrand();

    useEffect(() => {
        fetchBrands();
    }, []);

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Emin misiniz?",
            text: "Bu marka silinecek!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Evet, sil!",
            cancelButtonText: "Vazgeç",
        });

        if (result.isConfirmed) {
            try {
                await deleteBrand(id);
            } catch (error) {
                console.error("Silme hatası:", error);
            }
        }
    };

    const handleUpdate = async (brand) => {
        const { value: newName } = await Swal.fire({
            title: 'Marka Adını Güncelle',
            input: 'text',
            inputValue: brand.name,
            showCancelButton: true,
            confirmButtonText: 'Kaydet',
            cancelButtonText: 'Vazgeç',
            inputValidator: (value) => {
                if (!value) {
                    return 'Marka adı boş olamaz';
                }
            }
        });

        if (newName && newName !== brand.name) {
            const formData = new FormData();
            formData.append("name", newName);

            try {
                await updateBrand(brand.id, formData);
            } catch (err) {
                console.error("Güncelleme hatası:", err);
            }
        }
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

    if (error) {
        return <div className="alert alert-danger">Hata: {error}</div>;
    }

    return (
        <KTCard className="mb-5 mb-xl-8">
            <div className="card-header border-0 pt-5">
                <h3 className="card-title align-items-start flex-column">
                    <span className="card-label fw-bold fs-3 mb-1">Markalar</span>
                    <span className="text-muted mt-1 fw-semibold fs-7">
                        Toplam {brands ? brands.length : 0} Marka
                    </span>
                </h3>
                <div className="card-toolbar">
                    <Link to={ROUTES.UI.NEW_BRAND} className="btn btn-sm btn-primary">
                        <i className="bi bi-plus-lg me-2"></i>Yeni Marka Ekle
                    </Link>
                </div>
            </div>

            <KTCardBody className="py-3">
                <div className="table-responsive">
                    <table className="table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3">
                        <thead>
                        <tr className="fw-bold text-muted">
                            <th className="min-w-120px">Logo</th>
                            <th className="min-w-120px">Marka Adı</th>
                            <th className="min-w-100px text-end">İşlem</th>
                        </tr>
                        </thead>
                        <tbody>
                        {brands && brands.length > 0 ? (
                            brands.map((brand) => {
                                console.log("BRAND DATA:", brand);
                                return (
                                    <tr key={brand.id}>
                                        <td>
                                            {brand.logo_path ? (
                                                <>
                                                    <img
                                                        src={`${import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"}/storage/${brand.logo_path}`}
                                                        alt={brand.name}
                                                        style={{ maxHeight: "50px" }}
                                                    />
                                                </>
                                            ) : (
                                                "-"
                                            )}
                                        </td>

                                        <td className="text-dark fw-bold">{brand.name}</td>
                                        <td className="text-end">
                                            <button
                                                onClick={() => handleUpdate(brand)}
                                                className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-2"
                                                title="Düzenle"
                                            >
                                                <i className="bi bi-pencil fs-4"></i>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(brand.id)}
                                                className="btn btn-icon btn-bg-light btn-active-color-danger btn-sm"
                                                title="Sil"
                                            >
                                                <i className="bi bi-trash fs-4"></i>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="3">Hiç marka yok.</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </KTCardBody>
        </KTCard>
    );
};

export default BrandList;
