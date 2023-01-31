import React from "react";
import MenuFac from "./MenuFac/MenuFac";
import { Link } from "react-router-dom";
import './Facturation.css'

function Facturation() {

    return (
        <div className="Facturation">
            <MenuFac></MenuFac>
            <div className="facture-link-tab">
               <h1>Factures</h1>
            </div>
        </div>
    )
}

export default Facturation