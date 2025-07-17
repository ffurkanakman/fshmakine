import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProject } from '../../ServerSide/Hooks/useProject';
import { useClient } from '../../ServerSide/Hooks/useClient';
import { useUser } from '../../ServerSide/Hooks/useUser';
import '../../../sass/_teklif.scss';

const formatCurrency = (value) =>
    Number(value).toLocaleString('tr-TR', {
        style: 'currency',
        currency: 'TRY',
    });

const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('tr-TR');
};

const calculateValidUntil = (dateStr) => {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + 7);
    return date.toLocaleDateString('tr-TR');
};

const TeklifSayfasi = () => {
    const { id } = useParams();
    const { getProjectById } = useProject();
    const { getClient } = useClient();
    const { getUserById } = useUser();

    const [project, setProject] = useState(null);
    const [client, setClient] = useState(null);
    const [salesPerson, setSalesPerson] = useState(null);
    const [parts, setParts] = useState([]);
    const [vehicleInfo, setVehicleInfo] = useState(null);

    useEffect(() => {
        const fetchAll = async () => {
            const proj = await getProjectById(id);
            setProject(proj);
            setParts(proj.parts || []);
            setVehicleInfo(proj.vehicle_information);

            if (proj.client_id) {
                const cli = await getClient(proj.client_id);
                setClient(cli);
            }
            if (proj.sales_person_id) {
                const user = await getUserById(proj.sales_person_id);
                setSalesPerson(user);
            }
        };
        fetchAll();
    }, [id]);

    const total = parts.reduce((sum, p) => sum + Number(p.total_price), 0);
    const labor = Number(project?.labor_cost || 0);
    const discount = Number(project?.discount || 0);
    const subtotal = total + labor - discount;
    const vat = subtotal * 0.2;
    const grandTotal = subtotal + vat;

    return (
        <div className="teklif-wrapper">
            <header className="teklif-header">
                <div className="logo">
                    <img src="/img/vector/logo.png" alt="" />
                </div>
            </header>

            <section className="firma-info">
                <div className="firma-kolon">
                    <strong className="firma-adi">{client?.company_name}</strong>
                    <p><strong>Yetkili:</strong> {client?.authorized_person}</p>
                    <p><strong>Telefon:</strong> {client?.phone}</p>
                    <p><strong>E-Posta:</strong> {client?.email}</p>
                </div>

                <div className="firma-kolon text-right">
                    <p><strong>Teklif No:</strong> {project?.name}</p>
                    <p><strong>Teklif Tarihi:</strong> {formatDate(project?.created_at)}</p>
                    <p><strong>Yetkili:</strong> {salesPerson?.name} {salesPerson?.surname}</p>
                    <p><strong>Telefon:</strong> {salesPerson?.phone_number}</p>
                    <p><strong>E-Posta:</strong> {salesPerson?.email}</p>
                </div>
            </section>

            <table className="teklif-table">
                <thead>
                <tr>
                    <th>Makina Marka</th>
                    <th>Seri No</th>
                    <th>Konu</th>
                    <th>Teklif Geçerlilik Tarihi</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{vehicleInfo?.brand || '/'}</td>
                    <td>{vehicleInfo?.serial_number || '/'}</td>
                    <td>{project?.notes || 'FİYAT TEKLİFİ'}</td>
                    <td>{calculateValidUntil(project?.created_at)}</td>
                </tr>
                </tbody>
            </table>

            <table className="urun-table">
                <thead>
                <tr>
                    <th>Sıra</th>
                    <th>Açıklama</th>
                    <th>Adet</th>
                    <th>Birim Fiyat</th>
                    <th>Toplam</th>
                </tr>
                </thead>
                <tbody>
                {parts.map((part, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{part.name}</td>
                        <td>{part.quantity}</td>
                        <td>{formatCurrency(part.unit_price)}</td>
                        <td>{formatCurrency(part.total_price)}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div className="bottom-section">
                <section className="kosullar">
                    <p>1. Müşteri, bu teklifin kabul edildiğini yazılı bir şekilde belirttikten sonra işlemler başlatılacaktır.</p>
                    <p>2. Ödeme, hizmet ve malların tesliminden sonra havale ile yapılacaktır.</p>
                    <p>3. Birim fiyatlarımızda %20 KDV hariçtir.</p>
                    <p>4. Fiyatlarımız fatura tarihinde TCMB Efektif satış kuru alınarak TL'ye çevrilip fatura kesilecektir.</p>
                </section>

                <section className="toplam">
                    <p><strong>Toplam:</strong> {formatCurrency(total)}</p>
                    <p><strong>İşçilik:</strong> {formatCurrency(labor)}</p>
                    <p className='ara-toplam'><strong>Ara Toplam:</strong> {formatCurrency(subtotal)}</p>
                    <p><strong>KDV (20%):</strong> {formatCurrency(vat)}</p>
                    <p className="genel-toplam"><strong>Genel Toplam:</strong> {formatCurrency(grandTotal)}</p>
                </section>
            </div>

            <div className="imza"></div>

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

                <button className="external-button"><i className="bi bi-cloud-download-fill"></i>PDF</button>
            </div>
        </div>
    );
};

export default TeklifSayfasi;
