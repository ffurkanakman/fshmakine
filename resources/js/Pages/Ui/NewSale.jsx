import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSalesOffer } from "../../ServerSide/Hooks/useSalesOffer";
import { useBrand } from "../../ServerSide/Hooks/useBrand";
import { useVehicle } from "../../ServerSide/Hooks/useVehicle";

const NewSale = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const { brands, fetchBrands } = useBrand();
    const { vehicles, fetchVehicles } = useVehicle();
    const { createSalesOffer } = useSalesOffer();
    const [selectedBrandId, setSelectedBrandId] = useState(null);

    useEffect(() => {
        fetchBrands();
        fetchVehicles();
    }, []);

    const initialValues = {
        brand: "",
        urun: "",
        model: "",
        adet: "",
        odemetipi: "",
        fiyat: "",
        firmaadi: "",
        yetkili: "",
        konu: "",
        mail: "",
    };

    const validationSchemas = [
        Yup.object({
            brand: Yup.string().required("Marka zorunludur"),
            model: Yup.string().required("Model zorunludur"),
            urun: Yup.string().required("Ürün zorunludur"),
        }),
        Yup.object({}),
        Yup.object({}),
    ];

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        console.log("==> handleSubmit başladı", values);
        try {
            const payload = {
                vehicle_id: values.urun,
                quantity: values.adet,
                price: values.fiyat,
                payment_type: values.odemetipi,
                client_name: values.firmaadi,
                client_authorized: values.yetkili,
                subject: values.konu,
                mail: values.mail,
            };

            console.log("==> API'ye gönderilecek payload:", payload);

            const response = await createSalesOffer(payload);

            console.log("==> API cevabı:", response);

            toast.success("Satış teklifi başarıyla oluşturuldu!");
            resetForm();
        } catch (err) {
            console.error("==> API Hatası:", err);
            toast.error("Satış teklifi oluşturulamadı.");
        } finally {
            setSubmitting(false);
        }
    };


    // Debug log
    console.log("TÜM VEHICLES:", vehicles);
    console.log("Seçili Marka ID:", selectedBrandId);

    const filteredVehicles = vehicles?.filter(
        (v) => selectedBrandId !== null && v.brand?.id === selectedBrandId
    );

    console.log("Filtrelenen Vehicles:", filteredVehicles);

    return (
        <div className="container mt-5">
            <div className="step-tabs">
                {["Satış Bilgileri"].map((label, idx) => (
                    <h3
                        key={idx}
                        className={`step-tab ${currentStep === idx ? "active" : ""}`}
                        onClick={() => setCurrentStep(idx)}
                    >
                        {label}
                    </h3>
                ))}
            </div>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchemas[currentStep]}
                onSubmit={(values, helpers) => {
                    console.log("formik submit çalıştı", values);
                    if (currentStep < 2) {
                        setCurrentStep(currentStep + 1);
                    } else {
                        handleSubmit(values, helpers);
                    }
                }}
            >
                {({ isSubmitting, setFieldValue }) => (
                    <Form className="row g-3">
                        {currentStep === 0 && (
                            <>
                                <div className="col-md-6">
                                    <label className="form-label">Marka</label>
                                    <Field
                                        as="select"
                                        name="brand"
                                        className="form-select"
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            const selected = val ? parseInt(val) : null;
                                            setSelectedBrandId(selected);
                                            setFieldValue("brand", selected);
                                            setFieldValue("urun", "");
                                            setFieldValue("model", "");
                                        }}
                                    >
                                        <option value="">Marka Seçiniz</option>
                                        {brands.map((brand) => (
                                            <option key={brand.id} value={brand.id}>
                                                {brand.name}
                                            </option>
                                        ))}
                                    </Field>
                                    <div className="text-danger mt-1">
                                        <ErrorMessage name="brand" />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Ürün</label>
                                    <Field as="select" name="urun" className="form-select">
                                        <option value="">Ürün Seçiniz</option>
                                        {filteredVehicles?.map((vehicle) => (
                                            <option key={vehicle.id} value={vehicle.id}>
                                                {vehicle.product}
                                            </option>
                                        ))}
                                    </Field>
                                    <div className="text-danger mt-1">
                                        <ErrorMessage name="urun" />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Model</label>
                                    <Field as="select" name="model" className="form-select">
                                        <option value="">Model Seçiniz</option>
                                        {filteredVehicles?.map((vehicle) => (
                                            <option key={vehicle.id} value={vehicle.model}>
                                                {vehicle.model}
                                            </option>
                                        ))}
                                    </Field>
                                    <div className="text-danger mt-1">
                                        <ErrorMessage name="model" />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Adet</label>
                                    <Field
                                        type="number"
                                        name="adet"
                                        className="form-control"
                                    />
                                    <div className="text-danger mt-1">
                                        <ErrorMessage name="adet" />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Ödeme Tipi</label>
                                    <Field as="select" name="odemetipi" className="form-select">
                                        <option value="">Seçiniz</option>
                                        <option value="Havale">Havale</option>
                                        <option value="Kart">Kart</option>
                                    </Field>
                                    <div className="text-danger mt-1">
                                        <ErrorMessage name="odemetipi" />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Fiyat</label>
                                    <Field
                                        type="text"
                                        name="fiyat"
                                        className="form-control"
                                    />
                                    <div className="text-danger mt-1">
                                        <ErrorMessage name="fiyat" />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Firma Adı</label>
                                    <Field
                                        type="text"
                                        name="firmaadi"
                                        className="form-control"
                                    />
                                    <div className="text-danger mt-1">
                                        <ErrorMessage name="firmaadi" />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Yetkili</label>
                                    <Field
                                        type="text"
                                        name="yetkili"
                                        className="form-control"
                                    />
                                    <div className="text-danger mt-1">
                                        <ErrorMessage name="yetkili" />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Konu</label>
                                    <Field
                                        as="textarea"
                                        name="konu"
                                        className="form-control"
                                        rows="1"
                                    />
                                    <div className="text-danger mt-1">
                                        <ErrorMessage name="konu" />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Mail</label>
                                    <Field
                                        type="email"
                                        name="mail"
                                        className="form-control"
                                    />
                                    <div className="text-danger mt-1">
                                        <ErrorMessage name="mail" />
                                    </div>
                                </div>
                            </>
                        )}

                        <div className="col-12 text-end">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={isSubmitting}
                            >
                                Kaydet
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default NewSale;
