import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import UiLayout from './Layouts/Ui';
import { ROUTES } from '../../Libs/Routes/config';
// import AuthRouter from "./Router/AuthRouter";
import AuthLayout from "./Layouts/Auth";
import Login from "../../Pages/Auth/Login";
import Register from "../../Pages/Auth/Register";
import ForgotPassword from "../../Pages/Auth/ForgotPassword";
import ResetPassword from "../../Pages/Auth/ResetPassword";
import Home from '../../Pages/Front/Home/Home';
import Detail from '../../Pages/Front/Detail/Detail';
import Listing from '../../Pages/Front/Listing/Listing';
const MainRouter = () => {
    return (
        <Routes>

            <Route path={ROUTES.UI.USER} element={<AuthLayout />}>
                <Route path={ROUTES.AUTH.LOGIN} element={<Login />} />
                <Route path={ROUTES.AUTH.REGISTER} element={<Register />} />
                <Route path={ROUTES.AUTH.FORGOT_PASSWORD} element={<ForgotPassword />} />
                <Route path={ROUTES.AUTH.RESET_PASSWORD} element={<ResetPassword />} />
                {/*<Route path={ROUTES.AUTH.TWO_FACTOR} element={<TwoFactor />} />*/}


                {/* Index route ekleyiasdn */}
                <Route index element={<Navigate to="Giris" replace />} />
            </Route>

            <Route element={<UiLayout />}>
                {/* Ana Layout için default route */}
                <Route path={ROUTES.UI.LANDING} index element={<Home />} />
                <Route path={ROUTES.UI.DETAIL} element={<Detail />} />
                <Route path={ROUTES.UI.LISTING} element={<Listing />} />

            </Route>

            {/* Hatalı rota durumunda yönlendirme */}
            <Route path="*" element={<Navigate to={ROUTES.UI.LANDING} replace />} />
        </Routes>
    );
};

export default MainRouter;
