import React from "react";
import './MenuComm.css'
import { Link } from "react-router-dom";

function MenuComm() {

    return (
        <div className="MenuComm">
            <div className="Menucomm-navbar">
                <h2>Proposition commerciale </h2>
                <Link className="link" to="/devis/creer"><p className="p">Nouvelle Proposition</p></Link>
                <Link className="link" to="/devis/liste"><p className="p">Liste des Devis</p></Link>
                {/* <Link className="link" to="/EditDevis"><p className="p">Edition des devis</p></Link> */}
            </div>
           
        </div>
    )
}

export default MenuComm