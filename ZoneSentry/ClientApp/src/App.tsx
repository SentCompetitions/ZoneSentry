import logo from './logo.svg'
import {useState} from 'react'
import {Link, Navigate, Outlet, Route, Routes, useLocation} from "react-router-dom";

import {AnimatePresence} from "framer-motion";
import AuthProvider from "./components/AuthProvider";
import LoginPage from "./pages/LoginPage";
import AuthSwitch from "./components/AuthSwitch";
import LogoutPage from "./pages/LogoutPage";
import TypeSwitch from "./components/TypeSwitch";
import UserLayout from "./pages/user/UserLayout";
import UserIndexPage from "./pages/user/UserIndexPage";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminIndexPage from "./pages/admin/AdminIndexPage";

import "./styles/global.scss"
import RealtyDetailsPage from "./pages/user/RealtyDetailsPage";
import SearchPage from "./pages/user/SearchPage";

function App() {
    const location = useLocation();

    return (
        <AuthProvider>
            <AnimatePresence exitBeforeEnter>
                <Routes key={location.pathname} location={location}>
                    <Route path="/" element={
                        <TypeSwitch
                            user={<UserLayout/>}
                            constructionCompanyAdmin={<AdminLayout/>}
                            serviceProvider={<></>}
                            nonAuntificated={<Navigate to={"/login"}/>}/>}
                    >
                        <Route path={""} element={
                            <TypeSwitch
                                user={<UserIndexPage/>}
                                constructionCompanyAdmin={<AdminIndexPage/>}
                                serviceProvider={<></>}
                                nonAuntificated={<Navigate to={'login'}/>}/>
                        }/>
                        <Route path={"realties/:realtyId"} element={
                            <TypeSwitch
                                user={<RealtyDetailsPage/>}
                                constructionCompanyAdmin={<></>}
                                serviceProvider={<></>}
                                nonAuntificated={<Navigate to={'login'}/>}/>
                        }/>
                        <Route path={"search"} element={
                            <TypeSwitch
                                user={<SearchPage/>}
                                constructionCompanyAdmin={<></>}
                                serviceProvider={<></>}
                                nonAuntificated={<Navigate to={'login'}/>}/>
                        }/>
                    </Route>
                    <Route path="login" element={<LoginPage/>}/>
                    <Route path="logout" element={<LogoutPage/>}/>
                </Routes>
            </AnimatePresence>
        </AuthProvider>
    )
}

export default App
