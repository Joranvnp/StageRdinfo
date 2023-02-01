import React, {useState} from "react";
import { Link } from "react-router-dom";
import './Menu.css';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import user from "../../Images/compte.png"

function Menu() {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <div className="Menu">
            <h4><Link className="link" to="/accueil">Accueil</Link></h4>
            <h4><Link className="link" to="/tiers">Tiers</Link></h4>
            <h4><Link className="link" to="/commercial">Commercial</Link></h4>
            <h4><Link className="link" to="/facture">Facture</Link></h4>
            {/* <h4><Link className="link" to="/users">Liste </Link></h4> */}
            <h4 className="link">
                <Dropdown isOpen={dropdownOpen} toggle={() => setDropdownOpen(!dropdownOpen)}>
                    <DropdownToggle caret>
                        <div className="menu-cadre-user">
                            {/* <img className="menu-cadre-user" alt="login-user" src={user}></img> */}
                        </div>

                        <h4 className="link">Mon compte</h4> 
                    </DropdownToggle>
                    {dropdownOpen && 
                    <DropdownMenu>
                        <DropdownItem><Link to="/fiche">Fiche utilisateur</Link></DropdownItem>
                        <DropdownItem>Modifier mes informations</DropdownItem>
                        <DropdownItem><Link className="link" to="/Users/create">Crée un utilisateur</Link></DropdownItem>
                        <DropdownItem><Link className="link" to="/logout">Se déconnecter</Link></DropdownItem>
                    </DropdownMenu>}
                </Dropdown>
            </h4>
        </div>
    )
}

export default Menu
