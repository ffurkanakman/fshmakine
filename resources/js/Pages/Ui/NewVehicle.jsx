import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useBrand } from "../../ServerSide/Hooks/useBrand";
import { useVehicle } from "../../ServerSide/Hooks/useVehicle";
import {initialValues as values} from "@/Pages/Ui/YeniProjeWizardHelper.jsx";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/Libs/Routes/config.jsx";

const NewVehicle = () => {
    const { brands, fetchBrands } = useBrand();
    const { createVehicle } = useVehicle();
    const navigate = useNavigate();


    const [currentStep, setCurrentStep] = useState(0);

    // Tüm repeaterlar tek bir state içinde
    const categories = ["Standart", "Ağırlık", "Tekerlek", "Boyut", "Fonksiyon", "Sürüş"];
    const [generalInfoData, setGeneralInfoData] = useState(
        categories.reduce((acc, cat) => {
            acc[cat] = [{ title: "", value1: "", value2: "" }];
            return acc;
        }, {})
    );

    // Marka listesini yükle
    useEffect(() => {
        fetchBrands();
    }, []);

    const addRow = (category) => {
        setGeneralInfoData((prev) => ({
            ...prev,
            [category]: [...prev[category], { title: "", value1: "", value2: "" }],
        }));
    };

    const removeRow = (category, index) => {
        setGeneralInfoData((prev) => ({
            ...prev,
            [category]: prev[category].filter((_, i) => i !== index),
        }));
    };

    const updateRow = (category, index, field, value) => {
        setGeneralInfoData((prev) => {
            const updated = [...prev[category]];
            updated[index][field] = value;
            return { ...prev, [category]: updated };
        });
    };

    const initialValues = {
        brand: "",
        model: "",
        product: "",
        type: "",
        cover_image: null,
        images: [],
    };

    const validationSchemas = [
        Yup.object({
            brand: Yup.string().required("Marka zorunludur"),
            model: Yup.string().required("Model zorunludur"),
            product: Yup.string().required("Ürün zorunludur"),
            type: Yup.string().required("Tip zorunludur"),
        }),
        Yup.object({}),
        Yup.object({}),
    ];

    console.log("Seçilen marka değeri (brand):", values.brand);
    const handleSubmit = async (values) => {
        console.log("Submit edilen değerler:", values);
        if (currentStep < 2) {
            setCurrentStep((s) => s + 1);
        } else {
            const formData = new FormData();
            formData.append("brand_id", values.brand);
            formData.append("product", values.product);
            formData.append("model", values.model);
            formData.append("type", values.type);

            if (values.photo) {
                formData.append("cover_image", values.photo);
            }

            (values.gallery || []).forEach((file) => {
                formData.append("images[]", file);
            });

            // Specifications flatten
            const flattenedSpecs = [];
            Object.entries(generalInfoData).forEach(([category, items]) => {
                items.forEach((item) => {
                    if (item.title && (item.value1 || item.value2)) {
                        flattenedSpecs.push({
                            key: `${category} - ${item.title}`,
                            value: `${item.value1} ${item.value2}`.trim()
                        });
                    }
                });
            });

            flattenedSpecs.forEach((spec, index) => {
                formData.append(`specifications[${index}][key]`, spec.key);
                formData.append(`specifications[${index}][value]`, spec.value);
            });

            await createVehicle(formData);

            navigate("/AraclarListesi");
        }
    };


    return (
        <div className="container mt-5">
            <style>
                {`
          .step-tabs {
            display: flex;
            justify-content: center;
            gap: 3rem;
            margin-bottom: 2rem;
            border-bottom: 1px solid #eee;
            padding-bottom: 0.5rem;
          }
          .step-tab {
            position: relative;
            font-weight: 600;
            color: #0d1b39;
            cursor: pointer;
          }
          .step-tab.active {
            color: #28c76f;
          }
          .step-tab.active::after {
            content: "";
            position: absolute;
            left: 0;
            bottom: -6px;
            width: 100%;
            height: 2px;
            background-color: #28c76f;
          }
        `}
            </style>

            <div className="step-tabs">
                {["Araç Bilgileri", "Genel Bilgiler", "Galeri"].map((label, idx) => (
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
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, setFieldValue, values }) => (
                    <Form className="row g-3">
                        {currentStep === 0 && (
                            <>
                                <div className="col-md-6">
                                    <label className="form-label">Marka</label>
                                    <Field as="select" name="brand" className="form-select">
                                        <option value="">Marka Seçiniz</option>
                                        {brands?.map((b) => (
                                            <option key={b.id} value={b.id}>
                                                {b.name}
                                            </option>
                                        ))}
                                    </Field>
                                    <div className="text-danger mt-1">
                                        <ErrorMessage name="brand" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Ürün</label>
                                    <Field name="product" className="form-control" />
                                    <div className="text-danger mt-1">
                                        <ErrorMessage name="product" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Model</label>
                                    <Field name="model" className="form-control" />
                                    <div className="text-danger mt-1">
                                        <ErrorMessage name="model" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Tip</label>
                                    <Field name="type" className="form-control" />
                                    <div className="text-danger mt-1">
                                        <ErrorMessage name="type" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Araç Fotoğrafı</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="form-control"
                                        onChange={(e) =>
                                            setFieldValue("photo", e.currentTarget.files[0])
                                        }
                                    />
                                    {values.photo && (
                                        <div className="mt-2">
                                            <img
                                                src={URL.createObjectURL(values.photo)}
                                                alt="Önizleme"
                                                style={{ maxHeight: "150px", borderRadius: "6px" }}
                                            />
                                        </div>
                                    )}
                                </div>
                            </>
                        )}

                        {currentStep === 1 && (
                            <>
                                {categories.map((cat) => (
                                    <div key={cat} className="col-12">
                                        <h5 className="mt-4 mb-3">{cat}</h5>
                                        {generalInfoData[cat].map((item, idx) => (
                                            <div key={idx} className="row mb-3 align-items-center">
                                                <div className="col-md-4">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Başlık"
                                                        value={item.title}
                                                        onChange={(e) =>
                                                            updateRow(cat, idx, "title", e.target.value)
                                                        }
                                                    />
                                                </div>
                                                <div className="col-md-3">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Değer 1"
                                                        value={item.value1}
                                                        onChange={(e) =>
                                                            updateRow(cat, idx, "value1", e.target.value)
                                                        }
                                                    />
                                                </div>
                                                <div className="col-md-3">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Değer 2"
                                                        value={item.value2}
                                                        onChange={(e) =>
                                                            updateRow(cat, idx, "value2", e.target.value)
                                                        }
                                                    />
                                                </div>
                                                <div className="col-md-2 text-end">
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-danger"
                                                        onClick={() => removeRow(cat, idx)}
                                                    >
                                                        <i className="bi bi-trash"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-light-primary"
                                            onClick={() => addRow(cat)}
                                        >
                                            + Yeni Satır Ekle
                                        </button>
                                    </div>
                                ))}
                            </>
                        )}

                        {currentStep === 2 && (
                            <div className="col-12">
                                <label className="form-label fs-5">Galeri Fotoğrafları</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    className="form-control mb-3"
                                    onChange={(e) => {
                                        const files = Array.from(e.currentTarget.files);
                                        setFieldValue("gallery", [...(values.gallery || []), ...files]);
                                    }}
                                />
                                <div className="d-flex flex-wrap">
                                    {values.gallery?.map((file, idx) => (
                                        <div
                                            key={idx}
                                            className="position-relative d-inline-block m-2"
                                        >
                                            <img
                                                src={URL.createObjectURL(file)}
                                                alt="Önizleme"
                                                className="rounded"
                                                style={{
                                                    maxHeight: "150px",
                                                    maxWidth: "150px",
                                                    objectFit: "cover",
                                                }}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const updated = [...values.gallery];
                                                    updated.splice(idx, 1);
                                                    setFieldValue("gallery", updated);
                                                }}
                                                className="position-absolute top-0 end-0 translate-middle-x p-1 rounded-circle border-0"
                                                style={{
                                                    backgroundColor: "#ffffffdd",
                                                    color: "#dc3545",
                                                    width: "24px",
                                                    height: "24px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    fontSize: "16px",
                                                    boxShadow: "0 0 4px rgba(0,0,0,0.1)",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                &times;
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="col-12 text-end">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={isSubmitting}
                            >
                                {currentStep === 2 ? "Kaydet" : "İleri"}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default NewVehicle;
