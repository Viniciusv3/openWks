import React from "react";
import logo from "../../assets/logo-cxp.png"
import "./Header.css"
import Menu from "../menu/Menu";

export default function Header() {
    return (
        <>
            <div className="header">
                <div className="container">
                    <img src={logo} alt="Logo CXP" />
                </div>
                <div>
                    <Menu></Menu>
                    </div>
            </div>
        </>
    )
}
