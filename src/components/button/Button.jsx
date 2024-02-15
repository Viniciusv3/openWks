import React from "react";
import "./Button.css";

export default function Button({ className, nameButton, click }) {
    return (
        <button className={className} onClick={click}>
            {nameButton}
        </button>
    )
}