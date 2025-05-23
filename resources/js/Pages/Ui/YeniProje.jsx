import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { PageLink, PageTitle } from '../../Libs/Metronic/_metronic/layout/core';
import { ROUTES } from "@/Libs/Routes/config.jsx";
import { KTCard, KTCardBody } from '../../Libs/Metronic/_metronic/helpers';

const newProjectBreadCrumbs = [
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
        isActive: false,
    },
    {
        title: 'Yeni Proje',
        path: ROUTES.UI.NEW_PROJECT,
        isSeparator: false,
        isActive: true,
    }
];

// Wizard component for new project creation
const ProjectWizard = () => {
    // State for current step
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        // Step 1: Service Information
        tasksToBeDone: '',
        tasksDone: '',

        // Step 2: Customer and Vehicle Information
        customer: '',
        isNewCustomer: false,
        companyName: '',
        authorizedPerson: '',
        phoneNumber: '',
        email: '',

        // Vehicle Information
        brand: '',
        model: '',
        serialNumber: '',
        chassisNumber: '',
        hours: '',
        modelYear: '',
        vehiclePhotos: [],

        // Step 3: Material Information and Pricing
        extraNotes: '',
        laborCost: '',
        discount: '',
        debt: '',
        parts: [{ name: '', quantity: '', unitPrice: '', totalPrice: '' }]
    });

    // Calculate total price
    const calculateTotal = () => {
        let total = parseFloat(formData.laborCost || 0);
        formData.parts.forEach(part => {
            total += parseFloat(part.totalPrice || 0);
        });
        return total - parseFloat(formData.discount || 0);
    };

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle customer type change
    const handleCustomerTypeChange = (e) => {
        const isNewCustomer = e.target.value === 'new';
        setFormData(prevState => ({
            ...prevState,
            isNewCustomer,
            customer: isNewCustomer ? 'new' : ''
        }));
    };

    // Handle part field changes
    const handlePartChange = (index, e) => {
        const { name, value } = e.target;
        const updatedParts = [...formData.parts];
        updatedParts[index] = {
            ...updatedParts[index],
            [name]: value
        };

        // Calculate total price if quantity or unit price changes
        if (name === 'quantity' || name === 'unitPrice') {
            const quantity = name === 'quantity' ? value : updatedParts[index].quantity;
            const unitPrice = name === 'unitPrice' ? value : updatedParts[index].unitPrice;

            if (quantity && unitPrice) {
                updatedParts[index].totalPrice = (parseFloat(quantity) * parseFloat(unitPrice)).toFixed(2);
            }
        }

        setFormData(prevState => ({
            ...prevState,
            parts: updatedParts
        }));
    };

    // Add new part row
    const addPart = () => {
        setFormData(prevState => ({
            ...prevState,
            parts: [...prevState.parts, { name: '', quantity: '', unitPrice: '', totalPrice: '' }]
        }));
    };

    // Remove part row
    const removePart = (index) => {
        const updatedParts = [...formData.parts];
        updatedParts.splice(index, 1);
        setFormData(prevState => ({
            ...prevState,
            parts: updatedParts
        }));
    };

    // Handle file uploads for vehicle photos
    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        setFormData(prevState => ({
            ...prevState,
            vehiclePhotos: [...prevState.vehiclePhotos, ...files]
        }));
    };

    // Remove uploaded photo
    const removePhoto = (index) => {
        const updatedPhotos = [...formData.vehiclePhotos];
        updatedPhotos.splice(index, 1);
        setFormData(prevState => ({
            ...prevState,
            vehiclePhotos: updatedPhotos
        }));
    };

    // Navigate to next step
    const nextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    // Navigate to previous step
    const prevStep = () => {
        setCurrentStep(currentStep - 1);
    };

    // Submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the data to your backend
        console.log('Form submitted:', formData);
        // Redirect to projects page or show success message
        alert('Proje başarıyla oluşturuldu!');
        window.location.href = ROUTES.UI.PROJECTS;
    };

    // Render step content based on current step
    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="step-content">
                        <h3 className="mb-5">Servis Bilgileri</h3>
                        <div className="mb-10">
                            <label className="form-label required">Yapılacak İşlemler</label>
                            <textarea
                                className="form-control"
                                name="tasksToBeDone"
                                rows="4"
                                value={formData.tasksToBeDone}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                        <div className="mb-10">
                            <label className="form-label required">Yapılan İşlemler</label>
                            <textarea
                                className="form-control"
                                name="tasksDone"
                                rows="4"
                                value={formData.tasksDone}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="step-content">
                        <h3 className="mb-5">Müşteri ve Araç Bilgileri</h3>

                        {/* Customer Information */}
                        <div className="mb-10">
                            <label className="form-label required">Müşteri</label>
                            <select
                                className="form-select"
                                name="customerType"
                                onChange={handleCustomerTypeChange}
                                value={formData.isNewCustomer ? 'new' : 'existing'}
                                required
                            >
                                <option value="">Müşteri Seçiniz</option>
                                <option value="new">Yeni Müşteri</option>
                                <option value="existing">Mevcut Müşteri 1</option>
                                <option value="existing">Mevcut Müşteri 2</option>
                                <option value="existing">Mevcut Müşteri 3</option>
                            </select>
                        </div>

                        {/* Conditional fields for new customer */}
                        {formData.isNewCustomer && (
                            <div className="new-customer-fields">
                                <div className="mb-10">
                                    <label className="form-label required">Firma Adı</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="companyName"
                                        value={formData.companyName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-10">
                                    <label className="form-label required">Yetkili Adı Soyadı</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="authorizedPerson"
                                        value={formData.authorizedPerson}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-10">
                                    <label className="form-label required">Telefon Numarası</label>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <i className="bi bi-telephone"></i>
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                            placeholder="0 (___) ___ __ __"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mb-10">
                                    <label className="form-label required">E-Posta</label>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <i className="bi bi-envelope"></i>
                                        </span>
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Vehicle Information */}
                        <h4 className="mt-10 mb-5">Araç Bilgileri</h4>
                        <div className="row">
                            <div className="col-md-6 mb-10">
                                <label className="form-label required">Marka</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="brand"
                                    value={formData.brand}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-md-6 mb-10">
                                <label className="form-label required">Model</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="model"
                                    value={formData.model}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-10">
                                <label className="form-label">Seri No</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="serialNumber"
                                    value={formData.serialNumber}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-md-6 mb-10">
                                <label className="form-label">Şasi No</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="chassisNumber"
                                    value={formData.chassisNumber}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-10">
                                <label className="form-label">Saat</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="hours"
                                    value={formData.hours}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-md-6 mb-10">
                                <label className="form-label">Model Yılı</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="modelYear"
                                    value={formData.modelYear}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Vehicle Photos */}
                        <div className="mb-10">
                            <label className="form-label">Araç Fotoğrafları</label>
                            <div className="dropzone-container border rounded p-4">
                                <div className="dz-message needsclick text-center mb-3">
                                    <i className="bi bi-file-earmark-image fs-3x text-primary"></i>
                                    <div className="ms-4">
                                        <h3 className="fs-5 fw-bold text-gray-900 mb-1">Fotoğrafları buraya sürükleyin veya tıklayın</h3>
                                        <span className="fs-7 fw-semibold text-gray-400">En fazla 10 fotoğraf yükleyebilirsiniz</span>
                                    </div>
                                </div>
                                <input
                                    type="file"
                                    className="form-control"
                                    multiple
                                    accept="image/*"
                                    onChange={handleFileUpload}
                                />
                            </div>

                            {/* Display uploaded photos */}
                            {formData.vehiclePhotos.length > 0 && (
                                <div className="mt-5">
                                    <h6>Yüklenen Fotoğraflar</h6>
                                    <div className="d-flex flex-wrap gap-3 mt-3">
                                        {formData.vehiclePhotos.map((photo, index) => (
                                            <div key={index} className="position-relative">
                                                <img
                                                    src={URL.createObjectURL(photo)}
                                                    alt={`Vehicle photo ${index + 1}`}
                                                    className="img-thumbnail"
                                                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                                />
                                                <button
                                                    type="button"
                                                    className="btn btn-icon btn-sm btn-danger position-absolute top-0 end-0"
                                                    onClick={() => removePhoto(index)}
                                                >
                                                    <i className="bi bi-x"></i>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="step-content">
                        <h3 className="mb-5">Malzeme Bilgileri ve Fiyatlandırma</h3>

                        <div className="mb-10">
                            <label className="form-label">Ekstra Not</label>
                            <textarea
                                className="form-control"
                                name="extraNotes"
                                rows="3"
                                value={formData.extraNotes}
                                onChange={handleChange}
                            ></textarea>
                        </div>

                        <div className="row">
                            <div className="col-md-4 mb-10">
                                <label className="form-label required">İşçilik Tutarı</label>
                                <div className="input-group">
                                    <span className="input-group-text">₺</span>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="laborCost"
                                        value={formData.laborCost}
                                        onChange={handleChange}
                                        step="0.01"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-md-4 mb-10">
                                <label className="form-label">İskonto</label>
                                <div className="input-group">
                                    <span className="input-group-text">₺</span>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="discount"
                                        value={formData.discount}
                                        onChange={handleChange}
                                        step="0.01"
                                    />
                                </div>
                            </div>
                            <div className="col-md-4 mb-10">
                                <label className="form-label">Borç</label>
                                <div className="input-group">
                                    <span className="input-group-text">₺</span>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="debt"
                                        value={formData.debt}
                                        onChange={handleChange}
                                        step="0.01"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Parts Repeater */}
                        <div className="parts-repeater mt-5">
                            <div className="d-flex justify-content-between align-items-center mb-5">
                                <h4 className="mb-0">Parça Bilgileri</h4>
                                <button
                                    type="button"
                                    className="btn btn-sm btn-light-primary"
                                    onClick={addPart}
                                >
                                    <i className="bi bi-plus"></i> Parça Ekle
                                </button>
                            </div>

                            {formData.parts.map((part, index) => (
                                <div key={index} className="part-item card mb-5 p-6">
                                    <div className="d-flex justify-content-between mb-3">
                                        <h5 className="card-title">Parça #{index + 1}</h5>
                                        {index > 0 && (
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-icon btn-light-danger"
                                                onClick={() => removePart(index)}
                                            >
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        )}
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label required">Parça Adı</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="name"
                                                value={part.name}
                                                onChange={(e) => handlePartChange(index, e)}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-2 mb-3">
                                            <label className="form-label required">Adet</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                name="quantity"
                                                value={part.quantity}
                                                onChange={(e) => handlePartChange(index, e)}
                                                step="0.01"
                                                required
                                            />
                                        </div>
                                        <div className="col-md-2 mb-3">
                                            <label className="form-label required">Birim Fiyat</label>
                                            <div className="input-group">
                                                <span className="input-group-text">₺</span>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    name="unitPrice"
                                                    value={part.unitPrice}
                                                    onChange={(e) => handlePartChange(index, e)}
                                                    step="0.01"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-2 mb-3">
                                            <label className="form-label">Toplam</label>
                                            <div className="input-group">
                                                <span className="input-group-text">₺</span>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={part.totalPrice || '0.00'}
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Total */}
                        <div className="d-flex justify-content-end mt-5">
                            <div className="border rounded p-6" style={{ width: '300px' }}>
                                <div className="d-flex justify-content-between mb-3">
                                    <span className="fw-bold">İşçilik:</span>
                                    <span>₺{parseFloat(formData.laborCost || 0).toFixed(2)}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-3">
                                    <span className="fw-bold">Parçalar:</span>
                                    <span>₺{formData.parts.reduce((sum, part) => sum + parseFloat(part.totalPrice || 0), 0).toFixed(2)}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-3">
                                    <span className="fw-bold">İskonto:</span>
                                    <span>₺{parseFloat(formData.discount || 0).toFixed(2)}</span>
                                </div>
                                <div className="separator my-3"></div>
                                <div className="d-flex justify-content-between">
                                    <span className="fw-bolder fs-5">TOPLAM:</span>
                                    <span className="fw-bolder fs-5 text-primary">₺{calculateTotal().toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="step-content">
                        <h3 className="mb-5">Önizleme</h3>

                        <div className="card mb-5">
                            <div className="card-header">
                                <h4 className="card-title">Servis Bilgileri</h4>
                            </div>
                            <div className="card-body">
                                <div className="mb-5">
                                    <h5 className="text-gray-800">Yapılacak İşlemler</h5>
                                    <p className="text-gray-600">{formData.tasksToBeDone || 'Belirtilmedi'}</p>
                                </div>
                                <div>
                                    <h5 className="text-gray-800">Yapılan İşlemler</h5>
                                    <p className="text-gray-600">{formData.tasksDone || 'Belirtilmedi'}</p>
                                </div>
                            </div>
                        </div>

                        <div className="card mb-5">
                            <div className="card-header">
                                <h4 className="card-title">Müşteri Bilgileri</h4>
                            </div>
                            <div className="card-body">
                                {formData.isNewCustomer ? (
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <h5 className="text-gray-800">Firma Adı</h5>
                                            <p className="text-gray-600">{formData.companyName || 'Belirtilmedi'}</p>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <h5 className="text-gray-800">Yetkili Adı Soyadı</h5>
                                            <p className="text-gray-600">{formData.authorizedPerson || 'Belirtilmedi'}</p>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <h5 className="text-gray-800">Telefon Numarası</h5>
                                            <p className="text-gray-600">{formData.phoneNumber || 'Belirtilmedi'}</p>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <h5 className="text-gray-800">E-Posta</h5>
                                            <p className="text-gray-600">{formData.email || 'Belirtilmedi'}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-gray-600">Mevcut Müşteri</p>
                                )}
                            </div>
                        </div>

                        <div className="card mb-5">
                            <div className="card-header">
                                <h4 className="card-title">Araç Bilgileri</h4>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-3 mb-3">
                                        <h5 className="text-gray-800">Marka</h5>
                                        <p className="text-gray-600">{formData.brand || 'Belirtilmedi'}</p>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <h5 className="text-gray-800">Model</h5>
                                        <p className="text-gray-600">{formData.model || 'Belirtilmedi'}</p>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <h5 className="text-gray-800">Seri No</h5>
                                        <p className="text-gray-600">{formData.serialNumber || 'Belirtilmedi'}</p>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <h5 className="text-gray-800">Şasi No</h5>
                                        <p className="text-gray-600">{formData.chassisNumber || 'Belirtilmedi'}</p>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <h5 className="text-gray-800">Saat</h5>
                                        <p className="text-gray-600">{formData.hours || 'Belirtilmedi'}</p>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <h5 className="text-gray-800">Model Yılı</h5>
                                        <p className="text-gray-600">{formData.modelYear || 'Belirtilmedi'}</p>
                                    </div>
                                </div>

                                {formData.vehiclePhotos.length > 0 && (
                                    <div className="mt-3">
                                        <h5 className="text-gray-800">Araç Fotoğrafları</h5>
                                        <div className="d-flex flex-wrap gap-3 mt-3">
                                            {formData.vehiclePhotos.map((photo, index) => (
                                                <img
                                                    key={index}
                                                    src={URL.createObjectURL(photo)}
                                                    alt={`Vehicle photo ${index + 1}`}
                                                    className="img-thumbnail"
                                                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="card mb-5">
                            <div className="card-header">
                                <h4 className="card-title">Malzeme Bilgileri ve Fiyatlandırma</h4>
                            </div>
                            <div className="card-body">
                                {formData.extraNotes && (
                                    <div className="mb-5">
                                        <h5 className="text-gray-800">Ekstra Not</h5>
                                        <p className="text-gray-600">{formData.extraNotes}</p>
                                    </div>
                                )}

                                <div className="row mb-5">
                                    <div className="col-md-4">
                                        <h5 className="text-gray-800">İşçilik Tutarı</h5>
                                        <p className="text-gray-600">₺{parseFloat(formData.laborCost || 0).toFixed(2)}</p>
                                    </div>
                                    <div className="col-md-4">
                                        <h5 className="text-gray-800">İskonto</h5>
                                        <p className="text-gray-600">₺{parseFloat(formData.discount || 0).toFixed(2)}</p>
                                    </div>
                                    <div className="col-md-4">
                                        <h5 className="text-gray-800">Borç</h5>
                                        <p className="text-gray-600">₺{parseFloat(formData.debt || 0).toFixed(2)}</p>
                                    </div>
                                </div>

                                <h5 className="text-gray-800 mb-3">Parça Listesi</h5>
                                <div className="table-responsive">
                                    <table className="table table-row-bordered table-row-gray-100">
                                        <thead>
                                            <tr className="fw-bold text-gray-800">
                                                <th>Parça Adı</th>
                                                <th>Adet</th>
                                                <th>Birim Fiyat</th>
                                                <th>Toplam</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {formData.parts.map((part, index) => (
                                                <tr key={index}>
                                                    <td>{part.name || '-'}</td>
                                                    <td>{part.quantity || '0'}</td>
                                                    <td>₺{parseFloat(part.unitPrice || 0).toFixed(2)}</td>
                                                    <td>₺{parseFloat(part.totalPrice || 0).toFixed(2)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="d-flex justify-content-end mt-5">
                                    <div className="border rounded p-6" style={{ width: '300px' }}>
                                        <div className="d-flex justify-content-between mb-3">
                                            <span className="fw-bold">İşçilik:</span>
                                            <span>₺{parseFloat(formData.laborCost || 0).toFixed(2)}</span>
                                        </div>
                                        <div className="d-flex justify-content-between mb-3">
                                            <span className="fw-bold">Parçalar:</span>
                                            <span>₺{formData.parts.reduce((sum, part) => sum + parseFloat(part.totalPrice || 0), 0).toFixed(2)}</span>
                                        </div>
                                        <div className="d-flex justify-content-between mb-3">
                                            <span className="fw-bold">İskonto:</span>
                                            <span>₺{parseFloat(formData.discount || 0).toFixed(2)}</span>
                                        </div>
                                        <div className="separator my-3"></div>
                                        <div className="d-flex justify-content-between">
                                            <span className="fw-bolder fs-5">TOPLAM:</span>
                                            <span className="fw-bolder fs-5 text-primary">₺{calculateTotal().toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <KTCard className="mb-5 mb-xl-8">
            <div className="card-header border-0 pt-5">
                <h3 className="card-title align-items-start flex-column">
                    <span className="card-label fw-bold fs-3 mb-1">Yeni Proje Ekle</span>
                </h3>
            </div>
            <KTCardBody className="py-3">
                <form onSubmit={handleSubmit}>
                    {/* Wizard Steps */}
                    <div className="stepper-nav mb-10">
                        <div className="stepper-item current" data-kt-stepper-element="nav">
                            <div className={`stepper-line w-40px ${currentStep >= 1 ? 'bg-primary' : ''}`}></div>
                            <div className={`stepper-icon w-40px h-40px ${currentStep >= 1 ? 'bg-primary' : ''}`}>
                                <i className={`stepper-check fas fa-check ${currentStep > 1 ? 'text-white' : 'd-none'}`}></i>
                                <span className={`stepper-number ${currentStep > 1 ? 'd-none' : ''}`}>1</span>
                            </div>
                            <div className="stepper-label">
                                <h3 className={`stepper-title ${currentStep >= 1 ? 'text-primary' : ''}`}>Servis Bilgileri</h3>
                            </div>
                        </div>
                        <div className={`stepper-item ${currentStep >= 2 ? 'current' : ''}`} data-kt-stepper-element="nav">
                            <div className={`stepper-line w-40px ${currentStep >= 2 ? 'bg-primary' : ''}`}></div>
                            <div className={`stepper-icon w-40px h-40px ${currentStep >= 2 ? 'bg-primary' : ''}`}>
                                <i className={`stepper-check fas fa-check ${currentStep > 2 ? 'text-white' : 'd-none'}`}></i>
                                <span className={`stepper-number ${currentStep > 2 ? 'd-none' : ''}`}>2</span>
                            </div>
                            <div className="stepper-label">
                                <h3 className={`stepper-title ${currentStep >= 2 ? 'text-primary' : ''}`}>Müşteri ve Araç Bilgileri</h3>
                            </div>
                        </div>
                        <div className={`stepper-item ${currentStep >= 3 ? 'current' : ''}`} data-kt-stepper-element="nav">
                            <div className={`stepper-line w-40px ${currentStep >= 3 ? 'bg-primary' : ''}`}></div>
                            <div className={`stepper-icon w-40px h-40px ${currentStep >= 3 ? 'bg-primary' : ''}`}>
                                <i className={`stepper-check fas fa-check ${currentStep > 3 ? 'text-white' : 'd-none'}`}></i>
                                <span className={`stepper-number ${currentStep > 3 ? 'd-none' : ''}`}>3</span>
                            </div>
                            <div className="stepper-label">
                                <h3 className={`stepper-title ${currentStep >= 3 ? 'text-primary' : ''}`}>Malzeme Bilgileri ve Fiyatlandırma</h3>
                            </div>
                        </div>
                        <div className={`stepper-item ${currentStep >= 4 ? 'current' : ''}`} data-kt-stepper-element="nav">
                            <div className="stepper-icon w-40px h-40px">
                                <i className={`stepper-check fas fa-check ${currentStep > 4 ? 'text-white' : 'd-none'}`}></i>
                                <span className={`stepper-number ${currentStep > 4 ? 'd-none' : ''}`}>4</span>
                            </div>
                            <div className="stepper-label">
                                <h3 className={`stepper-title ${currentStep >= 4 ? 'text-primary' : ''}`}>Önizleme</h3>
                            </div>
                        </div>
                    </div>

                    {/* Step Content */}
                    <div className="flex-row-fluid py-lg-5 px-lg-15">
                        {renderStepContent()}

                        {/* Form Actions */}
                        <div className="d-flex flex-stack pt-10">
                            <div className="me-2">
                                {currentStep > 1 && (
                                    <button
                                        type="button"
                                        className="btn btn-lg btn-light-primary me-3"
                                        onClick={prevStep}
                                    >
                                        <i className="ki-duotone ki-arrow-left fs-3 me-1"></i> Geri
                                    </button>
                                )}
                            </div>
                            <div>
                                {currentStep < 4 ? (
                                    <button
                                        type="button"
                                        className="btn btn-lg btn-primary"
                                        onClick={nextStep}
                                    >
                                        İleri <i className="ki-duotone ki-arrow-right fs-3 ms-1"></i>
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        className="btn btn-lg btn-primary"
                                    >
                                        Kaydet <i className="ki-duotone ki-check fs-3 ms-1"></i>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </form>
            </KTCardBody>
        </KTCard>
    );
};

const YeniProje = () => {
    const intl = useIntl();
    return (
        <>
            <PageTitle breadcrumbs={newProjectBreadCrumbs}>
                Yeni Proje Ekle
            </PageTitle>
            <ProjectWizard />
        </>
    );
};

export { YeniProje };
export default YeniProje;
