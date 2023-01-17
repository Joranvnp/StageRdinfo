import { type } from "@testing-library/user-event/dist/type";
import axios from "axios";
import React, { useState } from "react";
import { useEffect, useContext } from "react";
import { userContext } from "../Contexte/Contexte";


type User = {
    nom: string,
    prenom: string,
    email: string,
    login: string,
} | null

function Admin() {

    const userData: any = useContext(userContext)

    return (
        <div className="Admin">
           <h1>Admin :</h1>
           {userData &&
             <p>{userData.nom}</p>
           }
        </div>
    )
}

export default Admin