import React, {useState, useEffect} from "react";
import MenuComm from "../../MenuComm/MenuComm";
import './ListeDevis.css'
import axios, { AxiosResponse } from "axios";
import Devis from "../Devis";

type Devis = {
    _id: string,
    code: string,
    status: string,
    client: string
    date: string,
    dureeValid: string,
    conditionReg: string,
    modeReglement: string,
    dateLivraison: string
}

function ListeDevis() {

    const [devisList, setDevisList] = useState<Array<Devis>>([])

    useEffect(() => {
        axios.get("/api/devis/liste").then(reponse => {
            setDevisList(reponse.data)
        })
    }, [])

    return (
        <div className="ListeDevis">
            <MenuComm></MenuComm>
            <div className="listedevis-panel">
                <h1>Liste Devis</h1>
                <table className="listedevis-tab">
                    <thead className="listedevis-tab-entete">
                        <tr>
                            <th>Ref</th>
                            <th>Client</th>
                            <th>Date de Devis</th>
                            <th>Conditions Règlement</th>
                            <th>Mode de Règlement</th>
                            <th>Date de Livraison</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody className="listedevis-tab-body">
                        {devisList.map(devis => 
                            <tr key={devis._id}>
                                <td>{devis.code}</td>
                                <td>{devis.client}</td>
                                <td>{new Date(devis.date).toLocaleDateString()}</td>
                                <td>{devis.conditionReg}</td>
                                <td>{devis.modeReglement}</td>
                                <td>{devis.dateLivraison}</td>
                                <td>{devis.status}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ListeDevis