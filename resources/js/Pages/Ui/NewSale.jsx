import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useSalesOffer from "../../ServerSide/Hooks/useSalesOffer";
import useBrand from "../../ServerSide/Hooks/useBrand";
import useVehicle from "../../ServerSide/Hooks/useVehicle";

const NewSale = () => {
    const [currentStep, setCurrentStep] = useState(0);

    const addRow = (setFn, list) =>
        setFn([...list, { title: "", value1: "", value2: "" }]);

    const removeRow = (setFn, list, index) => {
        const updated = [...list];
        updated.splice(index, 1);
        setFn(updated);
    };

    const updateRow = (setFn, list, index, field, value) => {
        const updated = [...list];
        updated[index][field] = value;
        setFn(updated);
    };

    const initialValues = {
        brand: "",
        model: "",
        urun: "",
        customerName: "",
        plate: "",
        photo: null,
        gallery: [],
        fiyat: "",
    };

    const validationSchemas = [
        Yup.object({
            brand: Yup.string().required("Marka zorunludur"),
            model: Yup.string().required("Model zorunludur"),
            urun: Yup.string().required("Ürün zorunludur"),
        }),
        Yup.object({}), // ← validation kaldırıldı, ileri butonu artık çalışacak
        Yup.object({}), // Galeri
    ];

    const handleSubmit = (values) => {
        if (currentStep < 2) {
            setCurrentStep(currentStep + 1);
        } else {
            console.log("Tüm Form Değeri:", values);
            console.log("Genel Araç Bilgileri:", generalInfo);
            alert("Form başarıyla tamamlandı!");
        }
    };

    return (
        <div className="container mt-5">
            <div className="step-tabs">
                {["Satış Bilgileri"].map((label, idx) => (
                    <h3
                        key={idx}
                        className={`step-tab ${
                            currentStep === idx ? "active" : ""
                        }`}
                        onClick={() => setCurrentStep(idx)}
                    >
                        {label}
                    </h3>
                ))}
            </div>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchemas[currentStep]}
                onSubmit={(values) => {
                    if (currentStep < 2) {
                        setCurrentStep(currentStep + 1);
                    } else {
                        // En son adım: kaydet
                        console.log("Form tamamlandı:", values);
                        alert("Form başarıyla tamamlandı!");
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form className="row g-3">
                        {/* STEP 0: Araç Bilgileri */}
                        {currentStep === 0 && (
                            <>
                                <div className="col-md-6">
                                    <label className="form-label">Marka</label>
                                    <Field
                                        as="select"
                                        name="marka"
                                        className="form-select"
                                    >
                                        <option value="">Marka Seçiniz</option>
                                        <option value="Mima">Mima</option>
                                        <option value="Luigong">Luigong</option>
                                        <option value="Snoboom">Snoboom</option>
                                        <option value="Lifet">Lifet</option>
                                    </Field>
                                    <div className="text-danger mt-1">
                                        <ErrorMessage name="marka" />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Ürün</label>
                                    <Field
                                        as="select"
                                        name="urun"
                                        className="form-select"
                                    >
                                        <option value="">Ürün Seçiniz</option>
                                        <option value="Dizel Forklift">
                                            Dizel Forklift
                                        </option>
                                        <option value="Elektrikli Forklift">
                                            Elektrikli Forklift
                                        </option>
                                        <option value="Akülü Forklift">
                                            Akülü Forklift
                                        </option>
                                    </Field>
                                    <div className="text-danger mt-1">
                                        <ErrorMessage name="urun" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Model</label>
                                    <Field
                                        as="select"
                                        name="model"
                                        className="form-select"
                                    >
                                        <option value="">Model Seçiniz</option>
                                        <option value="CPCD30 - Standart Asansörlü">
                                            CPCD30 - Standart Asansörlü
                                        </option>
                                        <option value="CPCD30 - Tripleks Asansörlü">
                                            CPCD30 - Tripleks Asansörlü
                                        </option>
                                        <option value="CPCD35 - Standart Asansörlü">
                                            CPCD35 - Standart Asansörlü
                                        </option>
                                        <option value="CPCD35 - Tripleks Asansörlü">
                                            CPCD35 - Tripleks Asansörlü
                                        </option>
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
                                    ></Field>
                                    <div className="text-danger mt-1">
                                        <ErrorMessage name="adet" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">
                                        Ödeme Tipi
                                    </label>
                                    <Field
                                        as="select"
                                        name="odemetipi"
                                        className="form-select"
                                    >
                                        <option value="">Seçiniz</option>
                                        <option value="Havale">Havale</option>
                                        <option value="Kart">Kart</option>
                                    </Field>
                                    <div className="text-danger mt-1">
                                        <ErrorMessage name="odemetipi" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">
                                       Fiyat
                                    </label>
                                    <Field
                                        type="text"
                                        name="fiyat"
                                        className="form-control"
                                    ></Field>
                                    <div className="text-danger mt-1">
                                        <ErrorMessage name="fiyat" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">
                                        Firma Adı
                                    </label>
                                    <Field
                                        type="text"
                                        name="firmaadi"
                                        className="form-control"
                                    ></Field>
                                    <div className="text-danger mt-1">
                                        <ErrorMessage name="firmaadi" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">
                                        Yetkili
                                    </label>
                                    <Field
                                        type="text"
                                        name="yetkili"
                                        className="form-control"
                                    ></Field>
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
                                    ></Field>
                                    <div className="text-danger mt-1">
                                        <ErrorMessage name="konu" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Mail</label>
                                    <Field
                                        type="mail"
                                        name="mail"
                                        className="form-control"
                                    ></Field>
                                    <div className="text-danger mt-1">
                                        <ErrorMessage name="mail" />
                                    </div>
                                </div>
                            </>
                        )}

                        <div className="col-12 text-end">
                            <button type="submit" className="btn btn-primary">
                                {"Kaydet"}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default NewSale;
