import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MenuFac from "../../MenuFac/MenuFac";
import './ListeFacture.css'

type Facture = {
    _id: string,
    client: string,
    type: string
}

function ListeFacture()
{

    const [listeFactures, setListeFactures] = useState<Array<Facture>>([])

    useEffect(()=> {
        axios.get("/api/facture/list").then(reponse => {
            setListeFactures(reponse.data)
        })

    }, [])

    return (
        <div className="ListeFacture">
            <MenuFac></MenuFac>
            <div className="listefacture-panel">
                <h1>Factures des clients</h1>
                <table className="listefacture-tab">
                    <thead className="listefacture-tab-entete">
                        <tr>
                            <td>Client</td>
                            <td>Type</td>
                            <td>Id</td>
                        </tr>
                    </thead>
                    <tbody className="listefacture-tab-body">
                        {listeFactures.map(facture =>
                            <tr>
                                <td>{facture.client}</td>
                                <td>{facture.type}</td>
                                <td><Link to={"/facture/edit/"+facture._id}>{facture._id}</Link></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ListeFacture