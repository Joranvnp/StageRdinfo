import React from "react";
import { Link } from "react-router-dom";
import './Menu.css';

function Menu() {

    return (
        <div className="Menu">
            <h4><Link className="link" to="/accueil">Accueil</Link></h4>
            <h4><Link className="link" to="/users">Liste </Link></h4>
            <h4><Link className="link" to="/commercial">Commercial</Link></h4>
            <h4><Link className="link" to="/Users/create">Crée un utilisateur</Link></h4>
            <h4><Link className="link" to="/logout">Se déconnecter</Link></h4>
            
        </div>
    )
}

export default Menu