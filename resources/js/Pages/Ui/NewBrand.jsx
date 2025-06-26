import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const NewBrand = () => {
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
            <div className="step-tabs mb-6">
                {["Yeni Marka Ekle"].map((label, idx) => (
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
                                        typr="text"
                                        name="marka"
                                        className="form-select"
                                    ></Field>
                                    <div className="text-danger mt-1">
                                        <ErrorMessage name="marka" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">
                                        Marka Logosu
                                    </label>
                                    <Field name="photo">
                                        {({ form }) => (
                                            <>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="form-control"
                                                    onChange={(event) => {
                                                        const file =
                                                            event.currentTarget
                                                                .files[0];
                                                        form.setFieldValue(
                                                            "photo",
                                                            file
                                                        );
                                                    }}
                                                />
                                                {form.values.photo && (
                                                    <div className="mt-2">
                                                        <img
                                                            src={URL.createObjectURL(
                                                                form.values
                                                                    .photo
                                                            )}
                                                            alt="Önizleme"
                                                            style={{
                                                                maxHeight:
                                                                    "150px",
                                                                borderRadius:
                                                                    "6px",
                                                            }}
                                                        />
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </Field>
                                    <div className="text-danger mt-1">
                                        <ErrorMessage name="photo" />
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

export default NewBrand;
