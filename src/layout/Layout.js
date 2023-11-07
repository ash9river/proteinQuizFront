import { Outlet } from "react-router-dom";
import React from "react";

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