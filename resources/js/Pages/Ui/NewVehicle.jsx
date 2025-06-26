import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const NewVehicle = () => {
    const [currentStep, setCurrentStep] = useState(0);

    const [generalInfo, setGeneralInfo] = useState([
        { title: "", value1: "", value2: "" },
    ]);

    const [generalInfo1, setGeneralInfo1] = useState([
        { title: "", value1: "", value2: "" },
    ]);
    const [generalInfo2, setGeneralInfo2] = useState([
        { title: "", value1: "", value2: "" },
    ]);
    const [generalInfo3, setGeneralInfo3] = useState([
        { title: "", value1: "", value2: "" },
    ]);
    const [generalInfo4, setGeneralInfo4] = useState([
        { title: "", value1: "", value2: "" },
    ]);
    const [generalInfo5, setGeneralInfo5] = useState([
        { title: "", value1: "", value2: "" },
    ]);
    const [generalInfo6, setGeneralInfo6] = useState([
        { title: "", value1: "", value2: "" },
    ]);

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
                {["Araç Bilgileri", "Genel Araç Bilgileri", "Galeri"].map(
                    (label, idx) => (
                        <h3
                            key={idx}
                            className={`step-tab ${
                                currentStep === idx ? "active" : ""
                            }`}
                            onClick={() => setCurrentStep(idx)}
                        >
                            {label}
                        </h3>
                    )
                )}
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
                                        name="brand"
                                        type="text"
                                        className="form-control"
                                    />
                                    <div className="text-danger mt-1">
                                        <ErrorMessage name="brand" />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Ürün</label>
                                    <Field
                                        name="urun"
                                        type="text"
                                        className="form-control"
                                    />
                                    <div className="text-danger mt-1">
                                        <ErrorMessage name="urun" />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Model</label>
                                    <Field
                                        name="model"
                                        type="text"
                                        className="form-control"
                                    />
                                    <div className="text-danger mt-1">
                                        <ErrorMessage name="model" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">
                                        Araç Fotoğrafı
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

                        {/* STEP 1: Genel Araç Bilgileri */}
                        {currentStep === 1 && (
                            <>
                                {/* Repeater 1 */}
                                <div className="col-12">
                                    <h5 className="mt-4 mb-3">Standart</h5>
                                    {generalInfo1.map((item, index) => (
                                        <div
                                            className="row mb-3 align-items-center"
                                            key={index}
                                        >
                                            <div className="col-md-4">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Başlık"
                                                    value={item.title}
                                                    onChange={(e) =>
                                                        updateRow(
                                                            setGeneralInfo1,
                                                            generalInfo1,
                                                            index,
                                                            "title",
                                                            e.target.value
                                                        )
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
                                                        updateRow(
                                                            setGeneralInfo1,
                                                            generalInfo1,
                                                            index,
                                                            "value1",
                                                            e.target.value
                                                        )
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
                                                        updateRow(
                                                            setGeneralInfo1,
                                                            generalInfo1,
                                                            index,
                                                            "value2",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className="col-md-2 text-end">
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() =>
                                                        removeRow(
                                                            setGeneralInfo1,
                                                            generalInfo1,
                                                            index
                                                        )
                                                    }
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-light-primary"
                                        onClick={() =>
                                            addRow(
                                                setGeneralInfo1,
                                                generalInfo1
                                            )
                                        }
                                    >
                                        + Yeni Satır Ekle
                                    </button>
                                </div>
                                {/* Repeater 2 */}
                                <div className="col-12">
                                    <h5 className="mt-4 mb-3">Ağırlık</h5>
                                    {generalInfo2.map((item, index) => (
                                        <div
                                            className="row mb-3 align-items-center"
                                            key={index}
                                        >
                                            <div className="col-md-4">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Başlık"
                                                    value={item.title}
                                                    onChange={(e) =>
                                                        updateRow(
                                                            setGeneralInfo2,
                                                            generalInfo2,
                                                            index,
                                                            "title",
                                                            e.target.value
                                                        )
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
                                                        updateRow(
                                                            setGeneralInfo2,
                                                            generalInfo2,
                                                            index,
                                                            "value1",
                                                            e.target.value
                                                        )
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
                                                        updateRow(
                                                            setGeneralInfo2,
                                                            generalInfo2,
                                                            index,
                                                            "value2",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className="col-md-2 text-end">
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() =>
                                                        removeRow(
                                                            setGeneralInfo2,
                                                            generalInfo2,
                                                            index
                                                        )
                                                    }
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-light-primary"
                                        onClick={() =>
                                            addRow(
                                                setGeneralInfo2,
                                                generalInfo2
                                            )
                                        }
                                    >
                                        + Yeni Satır Ekle
                                    </button>
                                </div>
                                {/* Repeater 3 */}
                                <div className="col-12">
                                    <h5 className="mt-4 mb-3">Tekerlek</h5>
                                    {generalInfo3.map((item, index) => (
                                        <div
                                            className="row mb-3 align-items-center"
                                            key={index}
                                        >
                                            <div className="col-md-4">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Başlık"
                                                    value={item.title}
                                                    onChange={(e) =>
                                                        updateRow(
                                                            setGeneralInfo3,
                                                            generalInfo3,
                                                            index,
                                                            "title",
                                                            e.target.value
                                                        )
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
                                                        updateRow(
                                                            setGeneralInfo3,
                                                            generalInfo3,
                                                            index,
                                                            "value1",
                                                            e.target.value
                                                        )
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
                                                        updateRow(
                                                            setGeneralInfo3,
                                                            generalInfo3,
                                                            index,
                                                            "value2",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className="col-md-2 text-end">
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() =>
                                                        removeRow(
                                                            setGeneralInfo3,
                                                            generalInfo3,
                                                            index
                                                        )
                                                    }
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-light-primary"
                                        onClick={() =>
                                            addRow(
                                                setGeneralInfo3,
                                                generalInfo3
                                            )
                                        }
                                    >
                                        + Yeni Satır Ekle
                                    </button>
                                </div>
                                {/* Repeater 4 */}
                                <div className="col-12">
                                    <h5 className="mt-4 mb-3">Boyut</h5>
                                    {generalInfo4.map((item, index) => (
                                        <div
                                            className="row mb-3 align-items-center"
                                            key={index}
                                        >
                                            <div className="col-md-4">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Başlık"
                                                    value={item.title}
                                                    onChange={(e) =>
                                                        updateRow(
                                                            setGeneralInfo4,
                                                            generalInfo4,
                                                            index,
                                                            "title",
                                                            e.target.value
                                                        )
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
                                                        updateRow(
                                                            setGeneralInfo4,
                                                            generalInfo4,
                                                            index,
                                                            "value1",
                                                            e.target.value
                                                        )
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
                                                        updateRow(
                                                            setGeneralInfo4,
                                                            generalInfo4,
                                                            index,
                                                            "value2",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className="col-md-2 text-end">
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() =>
                                                        removeRow(
                                                            setGeneralInfo4,
                                                            generalInfo4,
                                                            index
                                                        )
                                                    }
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-light-primary"
                                        onClick={() =>
                                            addRow(
                                                setGeneralInfo4,
                                                generalInfo4
                                            )
                                        }
                                    >
                                        + Yeni Satır Ekle
                                    </button>
                                </div>
                                {/* Repeater 5 */}
                                <div className="col-12">
                                    <h5 className="mt-4 mb-3">Fonksiyon</h5>
                                    {generalInfo5.map((item, index) => (
                                        <div
                                            className="row mb-3 align-items-center"
                                            key={index}
                                        >
                                            <div className="col-md-4">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Başlık"
                                                    value={item.title}
                                                    onChange={(e) =>
                                                        updateRow(
                                                            setGeneralInfo5,
                                                            generalInfo5,
                                                            index,
                                                            "title",
                                                            e.target.value
                                                        )
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
                                                        updateRow(
                                                            setGeneralInfo5,
                                                            generalInfo5,
                                                            index,
                                                            "value1",
                                                            e.target.value
                                                        )
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
                                                        updateRow(
                                                            setGeneralInfo5,
                                                            generalInfo5,
                                                            index,
                                                            "value2",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className="col-md-2 text-end">
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() =>
                                                        removeRow(
                                                            setGeneralInfo5,
                                                            generalInfo5,
                                                            index
                                                        )
                                                    }
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-light-primary"
                                        onClick={() =>
                                            addRow(
                                                setGeneralInfo5,
                                                generalInfo5
                                            )
                                        }
                                    >
                                        + Yeni Satır Ekle
                                    </button>
                                </div>
                                {/* Repeater 6 */}
                                <div className="col-12">
                                    <h5 className="mt-4 mb-3">Sürüş</h5>
                                    {generalInfo6.map((item, index) => (
                                        <div
                                            className="row mb-3 align-items-center"
                                            key={index}
                                        >
                                            <div className="col-md-4">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Başlık"
                                                    value={item.title}
                                                    onChange={(e) =>
                                                        updateRow(
                                                            setGeneralInfo6,
                                                            generalInfo6,
                                                            index,
                                                            "title",
                                                            e.target.value
                                                        )
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
                                                        updateRow(
                                                            setGeneralInfo6,
                                                            generalInfo6,
                                                            index,
                                                            "value1",
                                                            e.target.value
                                                        )
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
                                                        updateRow(
                                                            setGeneralInfo6,
                                                            generalInfo6,
                                                            index,
                                                            "value2",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className="col-md-2 text-end">
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() =>
                                                        removeRow(
                                                            setGeneralInfo6,
                                                            generalInfo6,
                                                            index
                                                        )
                                                    }
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-light-primary"
                                        onClick={() =>
                                            addRow(
                                                setGeneralInfo6,
                                                generalInfo6
                                            )
                                        }
                                    >
                                        + Yeni Satır Ekle
                                    </button>
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

export default NewVehicle;
