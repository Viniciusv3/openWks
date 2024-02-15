import React from "react";
import "./Login.css";
import logo from "../../assets/logo-removebg.png"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../../components/button/Button";

export default function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState([]);
    var credential;
    async function tryLogin() {
        try{
        const apikey = form.apikey;
        const email = form.email;
        if (email === "lumera@cxpbrasil.com.br") {
            converter(apikey)
            sessionStorage.setItem('apikey', credential);
            navigate("/home");
        } else {
            alert('Credenciais incorretas!')
            //Alterar para popUp
        }
        }catch(error){
            console.log("Erro ao autenticar! " + error);
        }

    }
    function converter(apikey) {
        credential = btoa(`apikey:${apikey}`);  
    }

    function onChange(event) {
        setForm({
          ...form,
          [event.target.name]: event.target.value,
        });
      }
    return (
        <>
            <div className="background">
                <div className="containe">
                    <div className="login">
                        <div className="image">
                            <img src={logo} alt="Logo OpenWks" />
                        </div>
                        <div className="infos">
                            <label >Email:</label>
                            <input type="text" name="email" onChange={onChange}/>
                            <label >ApiKey:</label>
                            <input type="password" name="apikey" onChange={onChange}/>
                            <div className="action">
                                <Button className={"btnLogin"} click={tryLogin} nameButton={"Entrar"}></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

