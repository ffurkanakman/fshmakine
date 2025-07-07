import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useBrand } from "../../ServerSide/Hooks/useBrand";
import { useVehicle } from "../../ServerSide/Hooks/useVehicle";
import { useParams, useNavigate } from "react-router-dom";
import { ROUTES } from "@/Libs/Routes/config.jsx";

const EditVehicle = () => {
    const { id } = useParams();
    const { brands, fetchBrands } = useBrand();
    const { getVehicleById, updateVehicle, loading } = useVehicle();
    const navigate = useNavigate();

    const [initialValues, setInitialValues] = useState(null);

    useEffect(() => {
        const loadVehicle = async () => {
            const vehicle = await getVehicleById(id);
            setInitialValues({
                brand: vehicle.brand?.id || "",
                model: vehicle.model || "",
                product: vehicle.product || "",
                type: vehicle.type || "",
                photo: null,
                gallery: [],
            });
        };

        fetchBrands();
        loadVehicle();
    }, [id]);

    const validationSchema = Yup.object({
        brand: Yup.string().required("Marka zorunludur"),
        model: Yup.string().required("Model zorunludur"),
        product: Yup.string().required("Ürün zorunludur"),
        type: Yup.string().required("Tip zorunludur"),
    });

    if (!initialValues) {
        return <div>Yükleniyor...</div>;
    }

    const handleSubmit = async (values) => {
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

        await updateVehicle(id, formData);
        navigate(ROUTES.UI.VEHICLES);
    };

    return (
        <div className="container mt-5">
            <h2>Araç Güncelle</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize
            >
                {({ setFieldValue, values, isSubmitting }) => (
                    <Form className="row g-3">
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
                            <label className="form-label">Kapak Fotoğrafı</label>
                            <input
                                type="file"
                                accept="image/*"
                                className="form-control"
                                onChange={(e) => setFieldValue("photo", e.currentTarget.files[0])}
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

                        <div className="col-12 text-end">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={isSubmitting || loading}
                            >
                                Güncelle
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default EditVehicle;
