import React, { useEffect, useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { apiService } from "../../ServerSide/Load";
import { ROUTES } from "@/Libs/Routes/config";
import { useProformaInvoice } from "../../ServerSide/Hooks/useProformaInvoice";
import {API_CONFIG} from "../../ServerSide/Endpoints.jsx";

const NewProformaInvoice = () => {
    const navigate = useNavigate();
    const { createProforma } = useProformaInvoice();
    const [parts, setParts] = useState([]);

    useEffect(() => {
        const fetchParts = async () => {
            try {
                const response = await apiService.get(API_CONFIG.ENDPOINTS.PROJECT_PARTS.PROJECT_PARTS);
                console.log("✅ API RESPONSE:", response); // Tüm response'u gör

                const data = response?.data?.data || [];
                console.log("📦 Gelen project_parts:", data);

                setParts(data);
            } catch (error) {
                console.error("❌ Parçalar yüklenemedi", error);
                toast.error("Parçalar yüklenemedi");
            }
        };

        fetchParts();
    }, []);


    const initialValues = {
        proforma_no: "",
        company_name: "",
        address: "",
        tax_office: "",
        authorized_person: "",
        email: "",
        delivery_time: "",
        delivery_place: "",
        payment: "",
        warranty: "",
        origin: "",
        gtip_no: "",
        bank_info: "",
        account_name: "",
        iban: "",
        part_ids: [],
    };

    const validationSchema = Yup.object().shape({
        proforma_no: Yup.string().required("Proforma No zorunlu"),
        company_name: Yup.string().required("Firma adı zorunlu"),
        part_ids: Yup.array().min(1, "En az bir parça seçmelisiniz").required("Zorunlu alan"),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await createProforma(values);
            toast.success("Proforma oluşturuldu");
            navigate(ROUTES.UI.PROFORMA_INVOICE_LIST);
        } catch (error) {
            toast.error("Oluşturma başarısız");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="container mt-5">
            <h3>Yeni Proforma Faturası Oluştur</h3>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, handleChange, setFieldValue, isSubmitting }) => (
                    <Form className="row g-3">
                        {[
                            ["proforma_no", "Proforma No"],
                            ["company_name", "Firma Adı"],
                            ["authorized_person", "Yetkili Kişi"],
                            ["email", "Email"],
                            ["address", "Adres"],
                            ["tax_office", "Vergi Dairesi"],
                            ["delivery_time", "Teslim Süresi"],
                            ["delivery_place", "Teslim Yeri"],
                            ["payment", "Ödeme Şekli"],
                            ["warranty", "Garanti Süresi"],
                            ["origin", "Menşei"],
                            ["gtip_no", "GTIP No"],
                            ["bank_info", "Banka Bilgisi"],
                            ["account_name", "Hesap Adı"],
                            ["iban", "IBAN"],
                        ].map(([name, label]) => (
                            <div className="col-md-6" key={name}>
                                <label className="form-label">{label}</label>
                                <input
                                    type="text"
                                    name={name}
                                    className="form-control"
                                    value={values[name]}
                                    onChange={handleChange}
                                />
                                <ErrorMessage name={name} component="div" className="text-danger" />
                            </div>
                        ))}

                        <div className="col-md-12">
                            <label className="form-label">Parçalar</label>
                            <select
                                name="part_ids"
                                multiple
                                className="form-control"
                                value={values.part_ids}
                                onChange={(e) => {
                                    const selected = Array.from(e.target.selectedOptions).map(o => parseInt(o.value));
                                    setFieldValue("part_ids", selected);
                                }}
                            >
                                {parts.map(part => (
                                    <option key={part.id} value={part.id}>
                                        {part.name} ({part.quantity} x ₺{Number(part.unit_price).toLocaleString("tr-TR")})
                                    </option>
                                ))}
                            </select>
                            <ErrorMessage name="part_ids" component="div" className="text-danger" />
                        </div>

                        <div className="col-12">
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

export default NewProformaInvoice;
