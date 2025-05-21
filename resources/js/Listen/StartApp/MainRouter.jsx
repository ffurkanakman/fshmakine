import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import UiLayout from './Layouts/Misc/Ui';
import { ROUTES } from '../../Libs/Routes/config';
import AuthLayout from "./Layouts/Auth";
import Login from "../../Pages/Auth/Login";
import Register from "../../Pages/Auth/Register";
import ForgotPassword from "../../Pages/Auth/ForgotPassword";
import ResetPassword from "../../Pages/Auth/ResetPassword";
import Home from '../../Pages/Ui/Home/ServisList';

import {ErrorsPage} from '../../Libs/Metronic/app/modules/errors/ErrorsPage';
import {PagesLoad} from "../../Pages/Load.jsx";

const MainRouter = () => {

    return (
        <Routes>

            <Route path={ROUTES.UI.USER} element={<AuthLayout />}>
                <Route path={ROUTES.AUTH.LOGIN} element={<Login />} />
                <Route path={ROUTES.AUTH.REGISTER} element={<Register />} />
                <Route path={ROUTES.AUTH.FORGOT_PASSWORD} element={<ForgotPassword />} />
                <Route path={ROUTES.AUTH.RESET_PASSWORD} element={<ResetPassword />} />
                {/*<Route path={ROUTES.AUTH.TWO_FACTOR} element={<TwoFactor />} />*/}
                <Route index element={<Navigate to="Giris" replace />} />
            </Route>

            <Route element={<PagesLoad />}>
                <Route element={<UiLayout />} >
                    {/* Ana Layout için default route */}
                    <Route path={ROUTES.UI.LANDING} index element={<Home />} />
                </Route>


                <Route path={`${ROUTES.UI.ERROR}/*`} element={<ErrorsPage />} />

            </Route>

            {/* Hatalı rota durumunda yönlendirme */}
            <Route path="*" element={<Navigate to={ROUTES.UI.LANDING} replace />} />
        </Routes>
    );
};

export default MainRouter;
