import React, {useState, useEffect} from "react";
import MenuComm from "../../MenuComm/MenuComm";
import './ListeDevis.css'
import axios, { AxiosResponse } from "axios";
import Devis from "../Devis";
import { Link } from "react-router-dom";

type tiers = {
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

type Devis = {
    _id: string,
    code: string,
    statut: string,
    client: tiers,
    date: string,
    dureevalid: string,
    conditionreg: string,
    modereglement: string,
    datelivraison: string
}

function ListeDevis() {

    const [devisList, setDevisList] = useState<Array<Devis>>([])

    useEffect(() => {
        axios.get("/api/devis/liste").then(reponse => {
            setDevisList(reponse.data)
        })
    }, [])

    const goEdit = (event: React.MouseEvent) => {
        let id : string | null = event.currentTarget.getAttribute("data-value")

        document.location.href = "/devis/edit/"+id
    }

    return (
        <div className="ListeDevis">
            <MenuComm></MenuComm>
            <div className="listedevis-data">
                <div className="listedevis-titre">
                    <h1>Liste Devis</h1>
                </div>
                <div className="listedevis-data-entete">
                    <p> Ref </p>
                    <p> Client </p>
                    <p> Date de Devis </p> 
                    <p> Durée de Validité </p>
                    <p> Mode de Réglement </p>
                    <p> Etat </p>
                </div>
                {devisList.map(devis =>
                    <div className="listedevis-data-ligne" key={devis._id}>
                        <p className="listedevis-data-ligne-link" data-value={devis._id} onClick={goEdit}> {devis.code} </p>
                        <p> {devis.client.nom} </p>
                        <p> {new Date(devis.date).toLocaleDateString()} </p>
                        <p> {devis.dureevalid} </p>
                        <p> {devis.modereglement} </p>
                        <p> {devis.statut} </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ListeDevis