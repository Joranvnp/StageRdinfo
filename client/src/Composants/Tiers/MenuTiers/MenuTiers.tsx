import React from "react";
import './MenuTiers.css'
import { Link } from "react-router-dom";

function MenuTiers() {

    return (
        <div className="MenuTiers">
            <div className="MenuTiers-navbar">
                <h2>Nouveau tiers (prospect, client, fournisseur)</h2>
                <Link className="link" to="/nouveautiers"><p className="p">Nouveau Tiers</p></Link>
                <Link className="link" to="/listetiers"><p className="p">Liste</p></Link>
                {/* <Link className="link" to="/EditDevis"><p className="p">Edition des devis</p></Link> */}
            </div>
           
        </div>
    )
}

export default MenuTiers