import { Outlet } from "react-router-dom";
import React from "react";
import Header from "./Header"
import Footer from "./footer";


const Layout=()=>{
    return (
        <>
            <Header/>
            <Outlet/>
            <Footer/>
        </>
    )
}

export default Layout