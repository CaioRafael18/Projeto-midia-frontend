import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Cadastro from "../pages/Cadastro";

const RoutesApp = () => {
    return(
        <BrowserRouter>
            <Fragment>
                <Routes>
                    <Route path="/Home" element={<Home/>}/>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/Cadastro" element={<Cadastro/>}/>
                    <Route path="/Cadastro/:id" element={<Cadastro/>}/>
                </Routes>
            </Fragment>
        </BrowserRouter>
    )
}

export default RoutesApp