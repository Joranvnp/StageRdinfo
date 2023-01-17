import React, { useState } from "react"
import axios, { AxiosResponse } from "axios"
import './Login.css'
import logo from "../../Images/logoweb.png"
import cle from '../../Images/cle-de-la-maison.png'
import user from "../../Images/compte.png"

function Login () 
{
    const [userLogin, setuserLogin] = useState<string>("")
    const [userPassword, setuserPassword] = useState<string>("")

    const handleUserLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
        setuserLogin(event.target.value)
    }

    const handleUserPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setuserPassword(event.target.value)
    }

    const connectUser = async () => {
        let reponse : AxiosResponse = await axios.post('/api/login/check', {
            login : userLogin,
            password : userPassword,
        })

        if(reponse.data === "ok")
        {
            document.location.href = "/accueil"
        }
        else
        {
            alert("Mauvais Login/Motdepasse")
        }

    }

    return (
        <div className="Login">
            <div className="login-cadre">
                <img alt="logo-accueil" className="logo-accueil" src={logo}></img>
                <div className="login-cadre-user">
                    <img alt="login-cle" src={user}></img>
                    <input type="text" onChange={handleUserLogin} placeholder="Entrer un nom d'utilisateur"></input>
                </div>
                <hr className="login-ligne"></hr>
                <div className="login-cadre-pwd">
                    <img alt="login-user" src={cle}></img>
                    <input type="secure" onChange={handleUserPassword} placeholder="Entrer un mot de passe"></input>   
                </div>
                <hr className="login-ligne"></hr>
                <button onClick={connectUser}> Se Connecter</button> 
            </div>
        </div>
    )
}

export default Login
