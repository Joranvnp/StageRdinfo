import React, { useState, useEffect, useContext } from "react";
import axios, { AxiosResponse } from "axios";
import './Users.css';
import { userContext } from "../Contexte/Contexte";

type Users = {
    _id: number,
    nom: string,
    prenom: string,
    email: string,
    login: string,
    password: number|string
}

function Users() {

    const [usersList, setUsersList] = useState<Array<Users>>([])
    const userData = useContext(userContext)

    useEffect(() => {
        axios.get("/api/user/list").then(reponse => {
            setUsersList(reponse.data)
        })
    }, [])

    console.log(userData)

    const modifyUser = async (event: React.MouseEvent<HTMLButtonElement>) => {
        const { value } = event.target as HTMLButtonElement

        document.location.href = "/users/modify/"+value
    }

    const deleteUser = async (event: React.MouseEvent<HTMLButtonElement>) => {
        const { value } = event.target as HTMLButtonElement

        let reponse = await axios.post("/api/user/deletebyid", {
            id : value
        })

        // await axios.post("/api/user/delete", {
        //     id : value
        // })

        if(reponse.data === "ok")
        {
            document.location.href = "/users"
        }
    }

    return (
        <div className="Users">
            <h1>Liste des utilisateurs : </h1>
            {usersList.map(user => 
                <div>
                    <ul>
                        {/* Utilisateur : {user._id} */}
                        <li>Prenom : {user.prenom}</li>
                        <li>Nom : {user.nom}</li>
                        <li>Email : {user.email}</li>
                        <li>Login : {user.login}</li>
                        <li>Password hash : {user.password}</li>
                        <button onClick={modifyUser}>Modifier</button>
                        <button onClick={deleteUser} value={user._id}>Supprimer</button>
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Users