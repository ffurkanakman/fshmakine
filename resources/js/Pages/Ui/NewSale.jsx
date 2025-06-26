import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

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
                                        <option value="2020">
                                            Peşin Fiyat
                                        </option>
                                        <option value="2021">Havale</option>
                                        <option value="2022">Kart</option>
                                    </Field>
                                    <div className="text-danger mt-1">
                                        <ErrorMessage name="odemetipi" />
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

                        {currentStep === 2 && (
                            <div className="col-12">
                                <label className="form-label fs-3">
                                    Galeri Fotoğrafları
                                </label>
                                <Field name="gallery">
                                    {({ form }) => (
                                        <>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                multiple
                                                className="form-control mb-3"
                                                onChange={(event) => {
                                                    const files = Array.from(
                                                        event.currentTarget
                                                            .files
                                                    );
                                                    const prev =
                                                        form.values.gallery ||
                                                        [];
                                                    form.setFieldValue(
                                                        "gallery",
                                                        [...prev, ...files]
                                                    );
                                                }}
                                            />
                                            <div className="d-flex flex-wrap">
                                                {form.values.gallery?.map(
                                                    (photo, idx) => (
                                                        <div
                                                            key={idx}
                                                            className="position-relative d-inline-block m-2"
                                                        >
                                                            <img
                                                                src={URL.createObjectURL(
                                                                    photo
                                                                )}
                                                                alt="Önizleme"
                                                                className="rounded"
                                                                style={{
                                                                    maxHeight:
                                                                        "150px",
                                                                    maxWidth:
                                                                        "150px",
                                                                    objectFit:
                                                                        "cover",
                                                                }}
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    const updated =
                                                                        [
                                                                            ...form
                                                                                .values
                                                                                .gallery,
                                                                        ];
                                                                    updated.splice(
                                                                        idx,
                                                                        1
                                                                    );
                                                                    form.setFieldValue(
                                                                        "gallery",
                                                                        updated
                                                                    );
                                                                }}
                                                                className="position-absolute top-0 end-0 translate-middle-x p-1 rounded-circle border-0"
                                                                style={{
                                                                    backgroundColor:
                                                                        "#ffffffdd",
                                                                    color: "#dc3545",
                                                                    width: "24px",
                                                                    height: "24px",
                                                                    display:
                                                                        "flex",
                                                                    alignItems:
                                                                        "center",
                                                                    justifyContent:
                                                                        "center",
                                                                    fontSize:
                                                                        "16px",
                                                                    boxShadow:
                                                                        "0 0 4px rgba(0,0,0,0.1)",
                                                                    cursor: "pointer",
                                                                }}
                                                                onMouseEnter={(
                                                                    e
                                                                ) => {
                                                                    e.currentTarget.style.backgroundColor =
                                                                        "#dc3545";
                                                                    e.currentTarget.style.color =
                                                                        "#fff";
                                                                }}
                                                                onMouseLeave={(
                                                                    e
                                                                ) => {
                                                                    e.currentTarget.style.backgroundColor =
                                                                        "#ffffffdd";
                                                                    e.currentTarget.style.color =
                                                                        "#dc3545";
                                                                }}
                                                            >
                                                                &times;
                                                            </button>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </>
                                    )}
                                </Field>

                                <div className="text-danger mt-1">
                                    <ErrorMessage name="gallery" />
                                </div>
                            </div>
                        )}

                        <div className="col-12 text-end">
                            <button type="submit" className="btn btn-primary">
                                {currentStep === 2 ? "Kaydet" : "İleri"}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default NewSale;
