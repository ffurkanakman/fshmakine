import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useBrand } from "../../ServerSide/hooks/useBrand";

const NewBrand = () => {
    const { createBrand } = useBrand();

    const initialValues = {
        name: "",
        logo: null,
    };

    const validationSchema = Yup.object({
        name: Yup.string().required("Marka adı zorunludur"),
        logo: Yup.mixed().required("Logo yüklemek zorunludur"),
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("logo", values.logo);

        try {
            await createBrand(formData);
            resetForm();
        } catch (err) {
            console.error("❌ Marka ekleme hatası:", err.response?.data || err.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="container mt-5">
            <h3 className="mb-4">Yeni Marka Ekle</h3>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue, values, isSubmitting }) => (
                    <Form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Marka</label>
                            <Field
                                name="name"
                                type="text"
                                className="form-control"
                            />
                            <div className="text-danger mt-1">
                                <ErrorMessage name="name" />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Marka Logosu</label>
                            <input
                                type="file"
                                accept="image/*"
                                className="form-control"
                                onChange={(e) =>
                                    setFieldValue("logo", e.currentTarget.files[0])
                                }
                            />
                            {values.logo && (
                                <div className="mt-2">
                                    <img
                                        src={URL.createObjectURL(values.logo)}
                                        alt="Önizleme"
                                        style={{
                                            maxHeight: "150px",
                                            borderRadius: "6px",
                                        }}
                                    />
                                </div>
                            )}
                            <div className="text-danger mt-1">
                                <ErrorMessage name="logo" />
                            </div>
                        </div>

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

export default NewBrand;
