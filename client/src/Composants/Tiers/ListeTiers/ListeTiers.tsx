import React, { useEffect, useState } from "react";
import MenuTiers from "../MenuTiers/MenuTiers";
import axios from "axios";
import "./ListeTiers.css"

type Tiers = {
    _id: string,
    code: string,
    nom: string,
    prenom: string,
    adresse: string,
    adresse2: string,
    codepostal: string,
    ville: string,
    pays: string,
    departement: string,
    telephone:string,
    email:string,
    type: string,
    commercial: string
}

function ListeTiers() {

    const [tiersList, setTiersList] = useState<Array<Tiers>>([])

    useEffect(() => {
        axios.get("/api/tiers/listetiers").then(reponse => {
            setTiersList(reponse.data)
        })
    }, [])

    return (
        <div className="ListeTiers">
            <MenuTiers></MenuTiers>
            <div className="listetiers-panel">
                <h1>Liste tiers</h1>
                <div className="listetierssearch">
                    {/* <h4>Recherche de Tiers</h4>
                    <input type="text" placeholder="Nom"/>
                    <input type="text" placeholder="Prenom"/>
                    <input type="text" placeholder="Adresse"/>
                    <input type="text" placeholder="Seconde adresse"/>
                    <input type="text" placeholder="Code postal"/>
                    <input type="text" placeholder="Ville"/>
                    <input type="text" placeholder="Pays"/>
                    <input type="text" placeholder="Departement"/>
                    <input type="text" placeholder="Telephone"/>
                    <input type="text" placeholder="Email"/> */}
                    {/* <select value="type">
                        <option value="client">Client</option>
                        <option value="association">Association</option>
                        <option value="entreprise">Entreprise</option>
                    </select> */}
                </div>
                <table className="listetiers-tab">
                    <thead className="listetiers-tab-entete">
                        <tr>
                            <th>Nom</th>
                            <th>Prenom</th>
                            <th>Adresse</th>
                            <th>Seconde adresse</th>
                            <th>Code Postal</th>
                            <th>Ville</th>
                            <th>Pays</th>
                            <th>Departement</th>
                            <th>Telephone</th>
                            <th>Email</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody className="listetiers-tab-body">
                        {tiersList.map(tiers => 
                            <tr key={tiers._id}>
                                <td>{tiers.nom}</td>
                                <td>{tiers.prenom}</td>
                                <td>{tiers.adresse}</td>
                                <td>{tiers.adresse2}</td>
                                <td>{tiers.codepostal}</td>
                                <td>{tiers.ville}</td>
                                <td>{tiers.pays}</td>
                                <td>{tiers.departement}</td>
                                <td>{tiers.telephone}</td>
                                <td>{tiers.email}</td>
                                <td>{tiers.type}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ListeTiers