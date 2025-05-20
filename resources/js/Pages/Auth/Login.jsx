import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { ROUTES } from "../../Libs/Routes/config";
import { toast } from "react-toastify";

const Login = () => {
    const { t } = useTranslation();
    const initialValues = {
        email: "",
        password: "",
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .email(t('Geçerli bir email adresi giriniz'))
            .required(t('Email adresi zorunludur')),
        password: Yup.string()
            .required(t('Şifre zorunludur'))
            .min(6, t('Şifre en az 6 karakter olmalıdır'))
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const response = await login(values);
            if (response)
                toast.success(t('Giriş Yapıldı. Yönlendiriliyorsunuz'));
        } catch (error) {
            console.error("Giriş hatası:", error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div>
            <div className="auth-header">
                <h1>{t('Üye Girişi')}</h1>
            </div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched }) => (
                    <Form className="form-wrapper">
                        <div className="form-group">
                            <label htmlFor="email">{t('E-posta Adresi')}</label>
                            <Field
                                id="email"
                                name="email"
                                type="email"
                                placeholder="ornek@email.com"
                                className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`}
                            />
                            <ErrorMessage name="email" component="div" className="error-messages" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">{t('Şifre')}</label>
                            <Field
                                id="password"
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                className={`form-control ${errors.password && touched.password ? 'is-invalid' : ''}`}
                            />
                            <ErrorMessage name="password" component="div" className="error-messages" />
                            <Link to={ROUTES.AUTH.FORGOT_PASSWORD} className="mt-2">
                                {t('Şifremi Unuttum')}
                            </Link>
                        </div>

                        <button type="submit" className="submit-button" >
                            {t('Giriş Yap')}
                        </button>

                        <div className="auth-links">
                            <span className="separator">{t('Henüz hesabın yok mu?')}&nbsp;</span>
                            <Link to={ROUTES.AUTH.REGISTER}>{t('Hesap Oluştur')}</Link>
                        </div>

                        <div className="home-links">
                            <Link to={ROUTES.UI.LANDING}>{t('Anasayfa Dön')}</Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Login;
