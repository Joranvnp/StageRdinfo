import { useEffect, useState } from "react";
import React from "react";
import axios, { AxiosResponse } from 'axios';
import './Login.css'
import Admin from "../Admin/Admin";

function Login() {

    const [userLogin, setUserLogin] = useState<string>("")
    const [userPassword, setUserPassword] = useState<string>("")
    const [userIsLogged, setUserIsLogged] = useState<boolean>(false)

    type User = {
        login: string,
        password: string
    }

    const handleLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserLogin(event.target.value)
    }

    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserPassword(event.target.value)
    }

    const connectUser = async () => {

        let reponse : AxiosResponse = await axios.post('/api/login/check', {
            login: userLogin,
            password: userPassword
        })

        if(reponse.data === "ok")
        {
            document.location.href = "/admin"
        }
        else 
        {
            alert("Mauvais utilisateur / mot de passe")
        }

    }

    useEffect(() => {
        axios.get('/api/user/islogged').then(reponse => {
            setUserIsLogged(reponse.data)
        })
    }, [userIsLogged])

    if(userIsLogged)
    {
        return (
            <Admin></Admin>
        )
    }
    else
    {
        return (
            <div className="Login">
                <h1>Se connecter : </h1>
                <input type="text" onChange={handleLogin} placeholder="Entrez un login"></input>
                <input type="password" onChange={handlePassword} placeholder="Entrez un password"></input>
                <button onClick={connectUser}>Se connecter</button>
            </div>
        )
    }
   
}

export default Login