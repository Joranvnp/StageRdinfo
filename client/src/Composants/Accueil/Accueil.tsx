import React from "react";
import './Accueil.css'
import { useEffect, useContext } from "react";
import { userContext } from "../Contexte/Contexte";

function Accueil() {

    const userData = useContext(userContext)

    console.log(userData)
    return (
        <div className="Accueil">
            <h1>Infos : </h1>
        </div>
    )
}

export default Accueil