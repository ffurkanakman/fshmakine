import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import UiLayout from "./Layouts/Misc/Ui";
import { ROUTES } from "../../Libs/Routes/config";
import AuthLayout from "./Layouts/Auth";
import Login from "../../Pages/Auth/Login";
import Register from "../../Pages/Auth/Register";
import ForgotPassword from "../../Pages/Auth/ForgotPassword";
import ResetPassword from "../../Pages/Auth/ResetPassword";
import Home from "../../Pages/Ui/Home/ServisList";
import Projeler from "../../Pages/Ui/Projeler";
import YeniProje from "../../Pages/Ui/YeniProje";
import ProjeGuncelle from "../../Pages/Ui/ProjeGuncelle";
import ProjeGoruntule from "../../Pages/Ui/ProjeGoruntule";
import Kullanicilar from "../../Pages/Ui/Kullanicilar";
import KullaniciGoruntule from "../../Pages/Ui/KullaniciGoruntule";
import KullaniciDuzenle from "../../Pages/Ui/KullaniciDuzenle";
import YeniKullanici from "../../Pages/Ui/YeniKullanici";
import Musteriler from "../../Pages/Ui/Musteriler";
import YeniMusteri from "../../Pages/Ui/YeniMusteri";
import MusteriGoruntule from "../../Pages/Ui/MusteriGoruntule";
import MusteriDuzenle from "../../Pages/Ui/MusteriDuzenle";
import ProtectedRoute from "../../Components/Auth/ProtectedRoute";

import { ErrorsPage } from "../../Libs/Metronic/app/modules/errors/ErrorsPage";
import { PagesLoad } from "../../Pages/Load.jsx";
import TeklifSayfasi from "@/Pages/Ui/TeklifSayfasi";
import SalesList from "@/Pages/Ui/SalesList";
import SalesRoute from "@/Components/Auth/SalesRoutes";
import YeniSatis from "@/Pages/Ui/NewSale";
import NewVehicle from "@/Pages/Ui/NewVehicle";
import VehicleList from "@/Pages/Ui/VehicleList";
import VehicleEdit from "@/Pages/Ui/VehicleEdit.jsx";
import VehicleRoute from "@/Components/Auth/VehicleRoutes";
import NewBrand from "@/Pages/Ui/NewBrand";
import SalesOfferForm from "@/Pages/Ui/SalesOfferForm";
import BrandList from "@/Pages/Ui/BrandsList";
import ProformaRoute from "@/Components/Auth/ProformaRoute";
import ProformaList from "@/Pages/Ui/ProformaList";
import NewProforma from "@/Pages/Ui/NewProforma";
import ProformaInvoice from "@/Pages/Ui/ProformaInvoice";

const MainRouter = () => {
    return (
        <Routes>
            <Route path={ROUTES.UI.USER} element={<AuthLayout />}>
                <Route path={ROUTES.AUTH.LOGIN} element={<Login />} />
                <Route path={ROUTES.AUTH.REGISTER} element={<Register />} />
                <Route
                    path={ROUTES.AUTH.FORGOT_PASSWORD}
                    element={<ForgotPassword />}
                />
                <Route
                    path={ROUTES.AUTH.RESET_PASSWORD}
                    element={<ResetPassword />}
                />
                {/*<Route path={ROUTES.AUTH.TWO_FACTOR} element={<TwoFactor />} />*/}
                <Route index element={<Navigate to="Giris" replace />} />
            </Route>

            <Route element={<PagesLoad />}>
                <Route element={<UiLayout />}>
                    {/* Protected routes - require authentication */}
                    <Route
                        path={ROUTES.UI.LANDING}
                        index
                        element={
                            <ProtectedRoute>
                                <Home />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={ROUTES.UI.PROJECTS}
                        element={
                            <ProtectedRoute>
                                <Projeler />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={ROUTES.UI.NEW_PROJECT}
                        element={
                            <ProtectedRoute>
                                <YeniProje />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={ROUTES.UI.EDIT_PROJECT}
                        element={
                            <ProtectedRoute>
                                <ProjeGuncelle />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={ROUTES.UI.VIEW_PROJECT}
                        element={
                            <ProtectedRoute>
                                <ProjeGoruntule />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={ROUTES.UI.USERS}
                        element={
                            <ProtectedRoute>
                                <Kullanicilar />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={ROUTES.UI.VIEW_USER}
                        element={
                            <ProtectedRoute>
                                <KullaniciGoruntule />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={ROUTES.UI.EDIT_USER}
                        element={
                            <ProtectedRoute>
                                <KullaniciDuzenle />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={ROUTES.UI.NEW_USER}
                        element={
                            <ProtectedRoute>
                                <YeniKullanici />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={ROUTES.UI.CLIENTS}
                        element={
                            <ProtectedRoute>
                                <Musteriler />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={ROUTES.UI.NEW_CLIENT}
                        element={
                            <ProtectedRoute>
                                <YeniMusteri />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={ROUTES.UI.VIEW_CLIENT}
                        element={
                            <ProtectedRoute>
                                <MusteriGoruntule />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={ROUTES.UI.EDIT_CLIENT}
                        element={
                            <ProtectedRoute>
                                <MusteriDuzenle />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={ROUTES.UI.SALESLIST}
                        element={
                            <SalesRoute>
                                <SalesList />
                            </SalesRoute>
                        }
                    />
                    <Route
                        path={ROUTES.UI.NEW_SALE}
                        element={
                            <SalesRoute>
                                <YeniSatis />
                            </SalesRoute>
                        }
                    />
                    <Route
                        path={ROUTES.UI.VEHICLELIST}
                        element={
                            <VehicleRoute>
                                <VehicleList />
                            </VehicleRoute>
                        }
                    />
                    <Route
                        path={ROUTES.UI.NEW_VEHICLE}
                        element={
                            <VehicleRoute>
                                <NewVehicle />
                            </VehicleRoute>
                        }
                    />
                    <Route
                        path={ROUTES.UI.VEHICLE_EDIT}
                        element={
                            <VehicleRoute>
                                <VehicleEdit/>
                            </VehicleRoute>
                        }
                    />
                    <Route
                        path={ROUTES.UI.BRAND_LIST}
                        element={
                            <VehicleRoute>
                                <BrandList />
                            </VehicleRoute>
                        }
                    />
                    <Route
                        path={ROUTES.UI.NEW_BRAND}
                        element={
                            <VehicleRoute>
                                <NewBrand />
                            </VehicleRoute>
                        }
                    />
                    <Route
                        path={ROUTES.UI.PROFORMA_INVOICE_LIST}
                        element={
                            <ProformaRoute>
                                <ProformaList />
                            </ProformaRoute>
                        }
                    />
                    <Route
                        path={ROUTES.UI.NEW_PROFORMA_INVOICE}
                        element={
                            <ProformaRoute>
                                <NewProforma />
                            </ProformaRoute>
                        }
                    />
                </Route>

                <Route path={`${ROUTES.UI.ERROR}/*`} element={<ErrorsPage />} />
                <Route
                    path={ROUTES.UI.OFFER_PAGE}
                    element={<TeklifSayfasi />}
                />
                <Route
                    path={`${ROUTES.UI.PROFPORMA_INVOICE}/:id`} // Dinamik id buraya
                    element={<ProformaInvoice />}
                />
                <Route
                    path={`${ROUTES.UI.SALES_OFFER_FORM}/:id`}
                    element={<SalesOfferForm />}
                />
            </Route>

            {/* Hatalı rota durumunda yönlendirme */}
            <Route
                path="*"
                element={<Navigate to={ROUTES.UI.LANDING} replace />}
            />
        </Routes>
    );
};

export default MainRouter;
