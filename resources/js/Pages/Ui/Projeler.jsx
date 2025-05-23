import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { PageLink, PageTitle } from '../../Libs/Metronic/_metronic/layout/core';
import { ROUTES } from "@/Libs/Routes/config.jsx";
import { KTCard, KTCardBody } from '../../Libs/Metronic/_metronic/helpers';

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

// Sample data for the projects table
const projectsData = [
    {
        id: 1,
        company: 'ABC Şirketi',
        authorizedPerson: 'Ahmet Yılmaz',
        machineInfo: 'CNC Torna Makinesi X-500',
        serviceDescription: 'Yıllık bakım ve onarım',
        totalFee: '₺5,000',
        status: 'Tamamlandı',
        salesRep: 'Mehmet Demir'
    },
    {
        id: 2,
        company: 'XYZ Holding',
        authorizedPerson: 'Ayşe Kaya',
        machineInfo: 'Freze Makinesi F-200',
        serviceDescription: 'Arıza giderme ve parça değişimi',
        totalFee: '₺3,500',
        status: 'Devam Ediyor',
        salesRep: 'Ali Yıldız'
    },
    {
        id: 3,
        company: 'Teknik Metal A.Ş.',
        authorizedPerson: 'Mustafa Öztürk',
        machineInfo: 'Hidrolik Pres HP-1000',
        serviceDescription: 'Kurulum ve eğitim',
        totalFee: '₺8,000',
        status: 'Beklemede',
        salesRep: 'Zeynep Çelik'
    },
    {
        id: 4,
        company: 'Yıldız Endüstri',
        authorizedPerson: 'Fatma Şahin',
        machineInfo: 'Lazer Kesim Makinesi LK-3000',
        serviceDescription: 'Yazılım güncellemesi',
        totalFee: '₺2,000',
        status: 'Tamamlandı',
        salesRep: 'Hakan Kara'
    },
    {
        id: 5,
        company: 'Anadolu Makine',
        authorizedPerson: 'Emre Yılmaz',
        machineInfo: 'Kaynak Robotu KR-500',
        serviceDescription: 'Arıza tespiti ve onarım',
        totalFee: '₺4,500',
        status: 'Devam Ediyor',
        salesRep: 'Selin Ak'
    },
    {
        id: 6,
        company: 'Marmara Üretim',
        authorizedPerson: 'Deniz Kaya',
        machineInfo: 'Taşlama Makinesi T-100',
        serviceDescription: 'Periyodik bakım',
        totalFee: '₺1,800',
        status: 'Tamamlandı',
        salesRep: 'Burak Demir'
    },
    {
        id: 7,
        company: 'Ege Teknoloji',
        authorizedPerson: 'Sevgi Öztürk',
        machineInfo: 'Otomasyon Sistemi OS-2000',
        serviceDescription: 'Sistem entegrasyonu',
        totalFee: '₺12,000',
        status: 'Beklemede',
        salesRep: 'Canan Yıldız'
    },
    {
        id: 8,
        company: 'Karadeniz Sanayi',
        authorizedPerson: 'Okan Şahin',
        machineInfo: 'Konveyör Sistemi KS-300',
        serviceDescription: 'Parça değişimi',
        totalFee: '₺3,200',
        status: 'Tamamlandı',
        salesRep: 'Murat Kara'
    },
    {
        id: 9,
        company: 'Akdeniz Metal',
        authorizedPerson: 'Gül Yılmaz',
        machineInfo: 'Plazma Kesim Makinesi PK-2000',
        serviceDescription: 'Arıza giderme',
        totalFee: '₺2,800',
        status: 'Devam Ediyor',
        salesRep: 'Serkan Ak'
    },
    {
        id: 10,
        company: 'İç Anadolu Üretim',
        authorizedPerson: 'Kemal Kaya',
        machineInfo: 'Bükme Makinesi BM-500',
        serviceDescription: 'Yıllık bakım',
        totalFee: '₺2,500',
        status: 'Tamamlandı',
        salesRep: 'Aylin Demir'
    },
    {
        id: 11,
        company: 'Doğu Teknoloji',
        authorizedPerson: 'Leyla Öztürk',
        machineInfo: 'CNC Router CR-1000',
        serviceDescription: 'Yazılım güncellemesi ve eğitim',
        totalFee: '₺4,000',
        status: 'Beklemede',
        salesRep: 'Tolga Yıldız'
    },
    {
        id: 12,
        company: 'Batı Sanayi',
        authorizedPerson: 'Hasan Şahin',
        machineInfo: 'Endüstriyel Robot ER-300',
        serviceDescription: 'Kurulum ve test',
        totalFee: '₺15,000',
        status: 'Devam Ediyor',
        salesRep: 'Ebru Kara'
    },
    {
        id: 13,
        company: 'Merkez Makine',
        authorizedPerson: 'Ayşe Demir',
        machineInfo: 'Kalite Kontrol Sistemi KKS-100',
        serviceDescription: 'Kalibrasyon',
        totalFee: '₺3,000',
        status: 'Tamamlandı',
        salesRep: 'Cem Ak'
    },
    {
        id: 14,
        company: 'Güney Metal',
        authorizedPerson: 'Ali Yılmaz',
        machineInfo: 'Pres Makinesi PM-2000',
        serviceDescription: 'Hidrolik sistem onarımı',
        totalFee: '₺5,500',
        status: 'Devam Ediyor',
        salesRep: 'Derya Demir'
    },
    {
        id: 15,
        company: 'Kuzey Teknoloji',
        authorizedPerson: 'Mehmet Kaya',
        machineInfo: 'Lazer Markalama Makinesi LMM-500',
        serviceDescription: 'Lens değişimi',
        totalFee: '₺1,500',
        status: 'Tamamlandı',
        salesRep: 'Ferhat Yıldız'
    },
    {
        id: 16,
        company: 'Orta Anadolu Sanayi',
        authorizedPerson: 'Zeynep Öztürk',
        machineInfo: 'Dilimleme Makinesi DM-300',
        serviceDescription: 'Bıçak değişimi ve bakım',
        totalFee: '₺2,200',
        status: 'Beklemede',
        salesRep: 'Gamze Kara'
    },
    {
        id: 17,
        company: 'Trakya Üretim',
        authorizedPerson: 'Serdar Şahin',
        machineInfo: 'Paketleme Makinesi PM-1000',
        serviceDescription: 'Sensör değişimi',
        totalFee: '₺1,800',
        status: 'Tamamlandı',
        salesRep: 'Hande Ak'
    },
    {
        id: 18,
        company: 'Ege Metal',
        authorizedPerson: 'Ceyda Yılmaz',
        machineInfo: 'Kaynak Makinesi KM-500',
        serviceDescription: 'Elektrik sistemi onarımı',
        totalFee: '₺2,700',
        status: 'Devam Ediyor',
        salesRep: 'İsmail Demir'
    },
    {
        id: 19,
        company: 'Marmara Teknoloji',
        authorizedPerson: 'Berk Kaya',
        machineInfo: 'CNC Freze CF-2000',
        serviceDescription: 'Motor değişimi',
        totalFee: '₺6,500',
        status: 'Beklemede',
        salesRep: 'Jale Yıldız'
    },
    {
        id: 20,
        company: 'Karadeniz Üretim',
        authorizedPerson: 'Seda Öztürk',
        machineInfo: 'Torna Makinesi TM-300',
        serviceDescription: 'Genel bakım ve onarım',
        totalFee: '₺3,800',
        status: 'Tamamlandı',
        salesRep: 'Kerem Kara'
    }
];

const ProjectsPage = () => {
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    // Function to get status badge class based on status
    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'Tamamlandı':
                return 'badge-light-success';
            case 'Devam Ediyor':
                return 'badge-light-primary';
            case 'Beklemede':
                return 'badge-light-warning';
            default:
                return 'badge-light-info';
        }
    };

    // Get current projects
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProjects = projectsData.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Calculate total pages
    const totalPages = Math.ceil(projectsData.length / itemsPerPage);

    return (
        <>
            <KTCard className='mb-5 mb-xl-8'>
                <div className='card-header border-0 pt-5'>
                    <h3 className='card-title align-items-start flex-column'>
                        <span className='card-label fw-bold fs-3 mb-1'>Proje Listesi</span>
                        <span className='text-muted mt-1 fw-semibold fs-7'>Toplam {projectsData.length} proje</span>
                    </h3>
                    <div className='card-toolbar'>
                        <a href={ROUTES.UI.NEW_PROJECT} className='btn btn-sm btn-primary'>
                            <i className='bi bi-plus-lg me-2'></i>
                            Yeni Proje Ekle
                        </a>
                    </div>
                </div>
                <KTCardBody className='py-3'>
                    <div className='table-responsive'>
                        <table className='table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3'>
                            <thead>
                                <tr className='fw-bold text-muted'>
                                    <th className='min-w-50px'>No</th>
                                    <th className='min-w-150px'>Firma Adı / Yetkili Adı</th>
                                    <th className='min-w-140px'>Makina Bilgileri</th>
                                    <th className='min-w-120px'>Servis Açıklaması</th>
                                    <th className='min-w-120px'>Toplam Ücret</th>
                                    <th className='min-w-120px'>Durum</th>
                                    <th className='min-w-120px'>Satış Yetkilisi</th>
                                    <th className='min-w-100px text-end'>İşlem</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentProjects.map((project) => (
                                    <tr key={project.id}>
                                        <td>
                                            <span className='text-dark fw-bold text-hover-primary d-block fs-6'>
                                                {project.id}
                                            </span>
                                        </td>
                                        <td>
                                            <div className='d-flex align-items-center'>
                                                <div className='d-flex justify-content-start flex-column'>
                                                    <span className='text-dark fw-bold text-hover-primary fs-6'>
                                                        {project.company}
                                                    </span>
                                                    <span className='text-muted fw-semibold text-muted d-block fs-7'>
                                                        {project.authorizedPerson}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className='text-dark fw-bold text-hover-primary d-block fs-6'>
                                                {project.machineInfo}
                                            </span>
                                        </td>
                                        <td>
                                            <span className='text-dark fw-bold text-hover-primary d-block fs-6'>
                                                {project.serviceDescription}
                                            </span>
                                        </td>
                                        <td>
                                            <span className='text-dark fw-bold text-hover-primary d-block fs-6'>
                                                {project.totalFee}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`badge ${getStatusBadgeClass(project.status)}`}>
                                                {project.status}
                                            </span>
                                        </td>
                                        <td>
                                            <span className='text-dark fw-bold text-hover-primary d-block fs-6'>
                                                {project.salesRep}
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

                    <div className='d-flex flex-stack flex-wrap pt-10'>
                        <div className='fs-6 fw-bold text-gray-700'>
                            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, projectsData.length)} of {projectsData.length} entries
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
