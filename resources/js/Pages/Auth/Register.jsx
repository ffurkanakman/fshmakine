import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { ROUTES } from "../../Libs/Routes/config";
import PasswordStrengthBar from 'react-password-strength-bar';

const Register = () => {
    const { t } = useTranslation();
    const initialValues = {
        name: "",
        surname: "",
        phone: "",
        email: "",
        password: "",
        password_confirmation: "",
        type: "user",
    };

    const validationSchema = Yup.object({
        name: Yup.string().required(t('Ad zorunludur')),
        surname: Yup.string().required(t('Soyad zorunludur')),
        phone: Yup.string().required(t('Telefon numarası zorunludur')),
        email: Yup.string()
            .email(t('Geçerli bir email adresi giriniz'))
            .required(t('Email adresi zorunludur')),
        city_id: Yup.string().required(t('Şehir seçimi zorunludur')),
        address: Yup.string(),
        password: Yup.string()
            .min(8, t('Şifre en az 8 karakter olmalıdır'))
            .matches(/[A-Z]/, t('Şifre en az 1 büyük harf içermelidir'))
            .matches(/[0-9]/, t('Şifre en az 1 rakam içermelidir'))
            .matches(/[\W_]/, t('Şifre en az 1 sembol içermelidir'))
            .required(t('Şifre zorunludur')),
        password_confirmation: Yup.string()
            .oneOf([Yup.ref('password'), null], t('Şifreler eşleşmiyor'))
            .required(t('Şifre zorunludur')),
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            console.log(values);
            const response = await register(values);
            if (response) {
                toast.success(t('Kayıt Başaralı. Yönlendiriliyorsunuz!'));
            }
        } catch (error) {
            toast.error(error.message || t('Kayıt işlemi başarısız'));
        } finally {
            setSubmitting(false);
        }
    };

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

    return (
        <div>
            <div className="auth-header">
                <h1>{t('Hesap Oluştur')}</h1>
            </div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched, values }) => (
                    <Form className="form-wrapper">
                        <div className="form-group d-flex">
                            <div className="me-2 w-100">
                                <label htmlFor="name">{t('Ad')}</label>
                                <Field
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder={t('Ad')}
                                    className={`form-control p-2 ${errors.name && touched.name ? 'is-invalid' : ''}`}
                                />
                                <ErrorMessage name="name" component="div" className="error-messages" />

                            </div>
                            <div className="w-100">
                                <label htmlFor="surname">{t('Soyad')}</label>
                                <Field
                                    id="surname"
                                    name="surname"
                                    type="text"
                                    placeholder={t('Soyad')}
                                    className={`form-control p-2 ${errors.surname && touched.surname ? 'is-invalid' : ''}`}
                                />
                                <ErrorMessage name="surname" component="div" className="error-messages" />
                            </div>
                        </div>
                        <div className="form-group d-flex">
                            <div className="me-2 w-100">
                                <label htmlFor="phone">{t('Telefon Numarası')}</label>
                                <Field
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    placeholder={t('Telefon Numarası')}
                                    className={`form-control p-2 ${errors.phone && touched.phone ? 'is-invalid' : ''}`}
                                />
                                <ErrorMessage name="phone" component="div" className="error-messages" />
                            </div>
                            <div className="w-100">
                                <label htmlFor="email">{t('E-posta Adresi')}</label>
                                <Field
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder={t('E-posta Adresi')}
                                    className={`form-control p-2 ${errors.email && touched.email ? 'is-invalid' : ''}`}
                                />
                                <ErrorMessage name="email" component="div" className="error-messages" />
                            </div>
                        </div>

                        <div className="form-group d-flex w-100">
                            <div className="me-2 w-100">
                                <label htmlFor="password">{t('Şifre')}</label>
                                <div className="pass-input">
                                    <Field
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder={t('Şifre')}
                                        className={`form-control p-2 ${errors.password && touched.password ? 'is-invalid' : ''}`}
                                    />
                                    <span
                                        onClick={() => setShowPassword(prev => !prev)}
                                        className="flex items-center"
                                    >
                                        <i className={`icon ${showPassword ? 'eye' : 'eye-slash'}`}></i>
                                    </span>
                                </div>
                                <ErrorMessage name="password" component="div" className="error-messages" />
                            </div>
                            <div className="w-100">
                                <label htmlFor="password_confirmation">{t('Şifre Tekrar')}</label>
                                <div className="pass-input">
                                    <Field
                                        name="password_confirmation"
                                        type={showPasswordConfirmation ? "text" : "password"}
                                        placeholder={t('Şifre Tekrar')}
                                        className={`form-control p-2 ${errors.password_confirmation && touched.password_confirmation ? 'is-invalid' : ''}`}
                                    />
                                    <span
                                        onClick={() => setShowPasswordConfirmation(prev => !prev)}
                                        className="d-flex align-items-center"
                                    >
                                        <i className={`icon ${showPasswordConfirmation ? 'eye' : 'eye-slash'}`}></i>
                                    </span>
                                </div>
                                <ErrorMessage name="password_confirmation" component="div" className="error-messages" />

                            </div>
                        </div>
                        <div className="my-2">
                            <PasswordStrengthBar className="pass-strength" password={values.password} />
                            <span className="pass-info">
                                {t('Lütfen en az 8 karakter, 1 büyük harf, 1 rakam ve 1 sembol içeren bir şifre giriniz.')}
                            </span>
                        </div>
                        <button type="submit" className="submit-button">
                            Kayıt Ol
                        </button>
                        <div className="auth-links">
                            <span className="separator">{t('Zaten hesabınız var mı?')}</span>
                            <Link to={ROUTES.AUTH.LOGIN}>
                                &nbsp; {t('Giriş yap')}
                            </Link>
                        </div>
                        <div className="home-links">
                            <Link to={ROUTES.ROOT.DASHBOARD}>{t('Anasayfa Dön')}</Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Register;
