import React, { useState, useEffect } from "react";
import axios, {AxiosResponse } from 'axios';
import './UsersCreate.css';

function UsersCreate() {

    const [userNom, setUserNom] = useState<string>("")
    const [userPrenom, setUserPrenom] = useState<string>("")
    const [userEmail, setUserEmail] = useState<string>("") 
    const [userLogin, setUserLogin] = useState<string>("")
    const [userPassword, setUserPassword] = useState<string>("")

    type User = {
        nom: string,
        prenom: string,
        email: string,
        login: string,
        password: string
    }

    useEffect(() =>{
        if(userPrenom) {
            setUserLogin(userPrenom[0]+"."+userNom)
        }

    }, [userNom, userPrenom])

    const handleNom = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserNom(event.target.value)
    }

    const handlePrenom = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserPrenom(event.target.value)
    }

    const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserEmail(event.target.value)
    }

    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserPassword(event.target.value)
    }

    const createUser = async () => {

        let requete : User = {
            nom: userNom,
            prenom: userPrenom,
            email: userEmail,
            login: userLogin,
            password: userPassword
        }

        let reponse : AxiosResponse = await axios.post("/api/user/create", {
            data : requete
        })
        console.log(reponse.data)

        if (reponse.data === "ok")
        {
            document.location.href = "/"
        }
    }

    return (
        <div className="UsersCreate">
            <div className="usersCreate-form">
                <h1>Créer un utilisateur : </h1>
                <input className="usersCreate-input" type="text" onChange={handlePrenom} placeholder="Entrez un Prenom"></input>
                <input className="usersCreate-input" type="text" onChange={handleNom} placeholder="Entrez un nom"></input>
                <p>Login : {userLogin}</p>
                <input className="usersCreate-input" type="text" onChange={handleEmail} placeholder="Entrez un Email"></input>
                <input className="usersCreate-input" type="password" onChange={handlePassword} placeholder="Entrez un mot de passe"></input>
            </div>
            <button onClick={createUser}>Créer</button>
        </div>
    )
}

export default UsersCreate