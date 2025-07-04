import React, { useState, useRef, useEffect } from "react";
import { useIntl } from "react-intl";
import { PageLink, PageTitle } from "../../Libs/Metronic/_metronic/layout/core";
import { ROUTES } from "@/Libs/Routes/config.jsx";
import { KTCard, KTCardBody } from "../../Libs/Metronic/_metronic/helpers";
import { Link } from "react-router-dom";
import { useProject } from "../../ServerSide/Hooks/useProject.jsx";
import { toast } from "react-toastify";
import "../../../sass/page/_detail.scss";

const projectsBreadCrumbs = [
    {
        title: "Ana Sayfa",
        path: ROUTES.UI.LANDING,
        isSeparator: false,
        isActive: false,
    },
];

const BrandListPage = () => {
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    // useProject hook'unu kullan - artık tüm state'ler buradan geliyor
    const {
        projects,
        loading,
        error,
        setProjects,
        approveProject,
        rejectProject,
        deleteProject,
    } = useProject();

    // Component mount olduğunda projects getir
    useEffect(() => {
        setProjects();
    }, []);

    // Function to get status badge class based on status
    const getStatusBadgeClass = (status) => {
        switch (status) {
            case "Completed":
            case "Tamamlandı":
                return "badge-light-success";
            case "In Progress":
            case "Devam Ediyor":
                return "badge-light-primary";
            case "Pending":
            case "Beklemede":
                return "badge-light-warning";
            default:
                return "badge-light-info";
        }
    };

    // Get current projects
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProjects = projects
        ? projects.slice(indexOfFirstItem, indexOfLastItem)
        : [];

    console.log("gelen projects: ", projects);
    console.log("su anki sayfadaki veriler: ", currentProjects);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Calculate total pages
    const totalPages = projects ? Math.ceil(projects.length / itemsPerPage) : 0;

    // Handle approve project
    const handleApprove = async (id) => {
        try {
            await approveProject(id);
            toast.success("Proje başarıyla onaylandı");
            // Refresh projects list
            setProjects();
        } catch (error) {
            console.error("Proje onaylanırken hata oluştu:", error);
        }
    };

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Handle reject project
    const handleReject = async (id) => {
        try {
            await rejectProject(id);
            toast.success("Proje başarıyla reddedildi");
            // Refresh projects list
            setProjects();
        } catch (error) {
            console.error("Proje reddedilirken hata oluştu:", error);
        }
    };

    // Handle delete project
    const handleDelete = async (id) => {
        // Show confirmation dialog
        if (
            window.confirm(
                "Bu projeyi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz."
            )
        ) {
            try {
                await deleteProject(id);
                toast.success("Proje başarıyla silindi");
                // Refresh projects list
                setProjects();
            } catch (error) {
                console.error("Proje silinirken hata oluştu:", error);
            }
        }
    };

    // Loading durumunu göster
    if (loading) {
        return (
            <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "400px" }}
            >
                <div className="spinner-border text-fsh-primary" role="status">
                    <span className="visually-hidden">Yükleniyor...</span>
                </div>
            </div>
        );
    }

    // Hata durumunu göster
    if (error) {
        return <div className="alert alert-danger">Hata: {error}</div>;
    }

    return (
        <>
            <KTCard className="mb-5 mb-xl-8">
                <div className="card-header border-0 pt-5">
                    <h3 className="card-title align-items-start flex-column">
                        <span className="card-label fw-bold fs-3 mb-1">
                            Markalar
                        </span>
                        <span className="text-muted mt-1 fw-semibold fs-7">
                            Toplam {projects ? projects.length : 0} Marka
                        </span>
                    </h3>
                    <div className="card-toolbar">
                        <a
                            href={ROUTES.UI.NEW_BRAND}
                            className="btn btn-sm btn-primary"
                        >
                            <i className="bi bi-plus-lg me-2"></i>
                            Yeni Marka Ekle
                        </a>
                    </div>
                </div>
                <KTCardBody className="py-3">
                    <div className="table-responsive">
                        <table className="table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3">
                            <thead>
                                <tr className="fw-bold text-muted">
                                    <th className="min-w-120px">Marka Adı</th>
                                    <th className="min-w-100px text-end">
                                        İşlem
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="text-dark fw-bold text-hover-primary fs-6">
                                        Mima
                                    </td>
                                    <td className="text-end">
                                        <div className="d-flex justify-content-end">
                                            <Link className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1">
                                                <i className="bi bi-pencil fs-4"></i>
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    handleDelete(project.id)
                                                }
                                                className="btn btn-icon btn-bg-light btn-active-color-danger btn-sm"
                                                title="Sil"
                                            >
                                                <i className="bi bi-trash fs-4"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {projects && projects.length > 0 && (
                        <div className="d-flex flex-stack flex-wrap pt-10">
                            <div className="fs-6 fw-bold text-gray-700">
                                Showing {indexOfFirstItem + 1} to{" "}
                                {Math.min(indexOfLastItem, projects.length)} of{" "}
                                {projects.length} entries
                            </div>

                            <ul className="pagination">
                                <li
                                    className={`page-item ${
                                        currentPage === 1
                                            ? "disabled"
                                            : "previous"
                                    }`}
                                >
                                    <a
                                        href="#"
                                        className="page-link"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (currentPage > 1)
                                                paginate(currentPage - 1);
                                        }}
                                    >
                                        <i className="previous"></i>
                                    </a>
                                </li>

                                {[...Array(totalPages)].map((_, index) => (
                                    <li
                                        key={index}
                                        className={`page-item ${
                                            currentPage === index + 1
                                                ? "active"
                                                : ""
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
                                    className={`page-item ${
                                        currentPage === totalPages
                                            ? "disabled"
                                            : "next"
                                    }`}
                                >
                                    <a
                                        href="#"
                                        className="page-link"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (currentPage < totalPages)
                                                paginate(currentPage + 1);
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

const Markalar = () => {
    const intl = useIntl();
    return (
        <>
            <PageTitle breadcrumbs={projectsBreadCrumbs}>Markalar</PageTitle>
            <BrandListPage />
        </>
    );
};

const menuItemStyle = {
    padding: "6px 10px",
    cursor: "pointer",
    whiteSpace: "nowrap",
    transition: "background 0.2s",
    color: "#333",
    fontSize: "13px",
};

export { Markalar };
export default Markalar;
