import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { ROUTES } from "../../Libs/Routes/config";
import { toast } from "react-toastify";
import { useAuth } from "../../ServerSide/Hooks/Auth/useAuth";

const Login = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { login, isAuthenticated, loading, loginError } = useAuth();

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

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate(ROUTES.UI.DASHBOARD);
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const success = await login(values);
            if (success) {
                // Force navigation to dashboard after successful login
                setTimeout(() => {
                    navigate(ROUTES.UI.LANDING);
                }, 100);
            }
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

                        <button
                            type="submit"
                            className="submit-button"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    {t('Giriş Yapılıyor...')}
                                </>
                            ) : (
                                t('Giriş Yap')
                            )}
                        </button>

                        {loginError && (
                            <div className="alert alert-danger mt-3">
                                {loginError}
                            </div>
                        )}

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
