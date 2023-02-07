import React from "react";
import { Link } from "react-router-dom";
import './MenuFac.css'

function MenuFac()
{

    return (
        <div className="MenuFac">
            <div>
                <h2>Espace facturation et paiement</h2>
                <Link className="link" to="/facture/creer"><p className="p">Nouvelle Facture</p></Link>
                <Link className="link" to="/facture/liste"><p className="p">Liste des Factures</p></Link>
            </div>
        </div>
    )
}

export default MenuFac