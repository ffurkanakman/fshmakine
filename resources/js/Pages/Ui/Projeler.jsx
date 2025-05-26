import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { PageLink, PageTitle } from '../../Libs/Metronic/_metronic/layout/core';
import { ROUTES } from "@/Libs/Routes/config.jsx";
import { KTCard, KTCardBody } from '../../Libs/Metronic/_metronic/helpers';
import { useServis } from '../../ServerSide/Hooks/useServis';

const projectsBreadCrumbs = [
    {
        title: 'Ana Sayfa',
        path: ROUTES.UI.LANDING,
        isSeparator: false,
        isActive: false,
    },
    {
        title: 'Projeler',
        path: ROUTES.UI.PROJECTS,
        isSeparator: false,
        isActive: true,
    }
];

const ProjectsPage = () => {
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    // useServis hook'unu kullan - artık tüm state'ler buradan geliyor
    const { servisler, loading, error, setServisler } = useServis();

    // Component mount olduğunda servisleri getir
    useEffect(() => {
        setServisler();
    }, []);

    // Function to get status badge class based on status
    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'Completed':
            case 'Tamamlandı':
                return 'badge-light-success';
            case 'In Progress':
            case 'Devam Ediyor':
                return 'badge-light-primary';
            case 'Pending':
            case 'Beklemede':
                return 'badge-light-warning';
            default:
                return 'badge-light-info';
        }
    };

    // Get current projects
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProjects = servisler ? servisler.slice(indexOfFirstItem, indexOfLastItem) : [];

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Calculate total pages
    const totalPages = servisler ? Math.ceil(servisler.length / itemsPerPage) : 0;

    // Loading durumunu göster
    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Yükleniyor...</span>
                </div>
            </div>
        );
    }

    // Hata durumunu göster
    if (error) {
        return (
            <div className="alert alert-danger">
                Hata: {error}
            </div>
        );
    }

    return (
        <>
            <KTCard className='mb-5 mb-xl-8'>
                <div className='card-header border-0 pt-5'>
                    <h3 className='card-title align-items-start flex-column'>
                        <span className='card-label fw-bold fs-3 mb-1'>Servis Listesi</span>
                        <span className='text-muted mt-1 fw-semibold fs-7'>
                            Toplam {servisler ? servisler.length : 0} servis
                        </span>
                    </h3>
                    <div className='card-toolbar'>
                        <a href={ROUTES.UI.NEW_PROJECT} className='btn btn-sm btn-primary'>
                            <i className='bi bi-plus-lg me-2'></i>
                            Yeni Servis Ekle
                        </a>
                    </div>
                </div>
                <KTCardBody className='py-3'>
                    <div className="table-responsive">
                        <table className="table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3">
                            <thead>
                            <tr className="fw-bold text-muted">
                                <th className="min-w-50px">No</th>
                                <th className="min-w-150px">Firma Adı / Yetkili Adı</th>
                                <th className="min-w-140px">Makina Bilgileri</th>
                                <th className="min-w-120px">Servis Açıklaması</th>
                                <th className="min-w-120px">Toplam Ücret</th>
                                <th className="min-w-120px">Durum</th>
                                <th className="min-w-120px">Satış Yetkilisi</th>
                                <th className="min-w-100px text-end">İşlem</th>
                            </tr>
                            </thead>
                            <tbody>
                            {currentProjects.map((servis) => (
                                <tr key={servis.id}>
                                    <td>
                                        <span className='text-dark fw-bold text-hover-primary d-block fs-6'>
                                            {servis.id}
                                        </span>
                                    </td>
                                    <td>
                                        <div className='d-flex align-items-center'>
                                            <div className='d-flex justify-content-start flex-column'>
                                                <span className='text-dark fw-bold text-hover-primary fs-6'>
                                                    {servis.company_name}
                                                </span>
                                                <span className='text-muted fw-semibold text-muted d-block fs-7'>
                                                    {servis.authorized_person}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className='text-dark fw-bold text-hover-primary d-block fs-6'>
                                            {servis.machine_info}
                                        </span>
                                    </td>
                                    <td>
                                        <span className='text-dark fw-bold text-hover-primary d-block fs-6'>
                                            {servis.notes}
                                        </span>
                                    </td>
                                    <td>
                                        <span className='text-dark fw-bold text-hover-primary d-block fs-6'>
                                            ₺{servis.price}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`badge ${getStatusBadgeClass(servis.status)}`}>
                                            {servis.status}
                                        </span>
                                    </td>
                                    <td>
                                        <span className='text-dark fw-bold text-hover-primary d-block fs-6'>
                                            {servis.sales_person}
                                        </span>
                                    </td>
                                    <td className='text-end'>
                                        <a
                                            href='#'
                                            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                                        >
                                            <i className='bi bi-eye fs-4'></i>
                                        </a>
                                        <a
                                            href='#'
                                            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                                        >
                                            <i className='bi bi-pencil fs-4'></i>
                                        </a>
                                        <a
                                            href='#'
                                            className='btn btn-icon btn-bg-light btn-active-color-danger btn-sm'
                                        >
                                            <i className='bi bi-trash fs-4'></i>
                                        </a>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    {servisler && servisler.length > 0 && (
                        <div className='d-flex flex-stack flex-wrap pt-10'>
                            <div className='fs-6 fw-bold text-gray-700'>
                                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, servisler.length)} of {servisler.length} entries
                            </div>

                            <ul className='pagination'>
                                <li className={`page-item ${currentPage === 1 ? 'disabled' : 'previous'}`}>
                                    <a
                                        href='#'
                                        className='page-link'
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (currentPage > 1) paginate(currentPage - 1);
                                        }}
                                    >
                                        <i className='previous'></i>
                                    </a>
                                </li>

                                {[...Array(totalPages)].map((_, index) => (
                                    <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                        <a
                                            href='#'
                                            className='page-link'
                                            onClick={(e) => {
                                                e.preventDefault();
                                                paginate(index + 1);
                                            }}
                                        >
                                            {index + 1}
                                        </a>
                                    </li>
                                ))}

                                <li className={`page-item ${currentPage === totalPages ? 'disabled' : 'next'}`}>
                                    <a
                                        href='#'
                                        className='page-link'
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (currentPage < totalPages) paginate(currentPage + 1);
                                        }}
                                    >
                                        <i className='next'></i>
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

const Projeler = () => {
    const intl = useIntl();
    return (
        <>
            <PageTitle breadcrumbs={projectsBreadCrumbs}>
                Projeler
            </PageTitle>
            <ProjectsPage />
        </>
    );
};

export { Projeler };
export default Projeler;
