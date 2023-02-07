import axios, {AxiosResponse} from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MenuComm from "../../MenuComm/MenuComm";
import './EditDevis.css'
import { useSelector} from "react-redux"
import { RootState } from "../../../Redux/store";
import logo from "../../../../Images/logoweb.png"
import edit from '../../../../Images/devis.png'
import Corps from "../../../Corps/Corps";
import CorpsFuncButton from "../../../Corps/CorpsFuncButton/CorpsFuncButton";
import CorpsLigneAdd from "../../../Corps/CorpsLigneAdd/CorpsLigneAdd";
import DocGen from "../../../Docgen/DocGen";
import Totaux from "../../../Totaux/Totaux";

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

function EditDevis() 
{
    const { id } = useParams()

    const devis = useSelector((state: RootState) => state.devis.data)

    const [devisRef, setDevisRef] = useState<string>()
    const [devisClient, setDevisClient] = useState<tiers>()
    const [devisStatus, setDevisStatus] = useState<string>("")
    const [devisDate, setdevisDate] = useState<string>("")
    const [devisDureeValid, setdevisDureeValid] = useState<string>("")
    const [devisConditionReg, setdevisConditionReg] = useState<string>("")
    const [devisModReg, setdevisModReg] = useState<string>("")
    const [devisDateLivraison, setdevisDateLivraison] = useState<string>("")

    const devisunique = devis.find((deviu: any) => deviu._id == id)
    useEffect(() => {
        if (devisunique)
        {
            setDevisRef(devisunique.code)
            setDevisClient(devisunique.client)
            setdevisDate(devisunique.date)
            setdevisDureeValid(devisunique.dureeValid)
            setdevisConditionReg(devisunique.conditionReg)
            setdevisModReg(devisunique.modeReglement)
            setdevisDateLivraison(devisunique.dateLivraison)
        }
            
    }, [devisunique])

    return (
        <div className="EditDevis">
            <MenuComm></MenuComm>
            <div className="editdevis-data">
                <div className="editdevis-barre">
                    <p>Fiche Proposition</p>
                </div>
                <hr className="editdevis-titre-limite"></hr>
                <div className="editdevis-titre">
                    <div className="editdevis-titre-gauche">
                        <img alt="devis-edit" src={edit}></img>
                    </div>
                    <div className="editdevis-titre-droite">
                        {/* Afficher les informations propre au devis sélectionner */}
                        {devisClient &&
                            <div>
                                <p>Ref : {devisRef}</p>
                                <p>Id du client : {devisClient.code}</p>
                                <p>Type de client : {devisClient.type}</p>
                                <p>Nom : {devisClient.nom}</p>
                                <p>Adresse : {devisClient.adresse + " "+ devisClient.codepostal + " " + devisClient.ville}</p>
                            </div>
                        }
                        <img src={logo}></img>
                    </div>
                </div>

                <hr className="editdevis-infos-limite"></hr>

                <div className="editdevis-infos">
                        {devisunique &&
                            <div className="editdevis-infos-gauche">
                                <div className="editdevis-infos-gauche-ligne">
                                    <p>Date du devis : <input type="date" value={devisunique.date}></input></p>
                                </div>
                                <div className="editdevis-infos-gauche-ligne">
                                    <p>Durée de validité : <input type="date" value={devisunique.dureeValid}></input></p>
                                </div>
                                <div className="editdevis-infos-gauche-ligne">
                                    <p>Date de Proposition : <input type="date" value={devisunique.dateLivraison}></input></p>
                                </div>
                                <div className="editdevis-infos-gauche-ligne">
                                    <p> Conditions de Reglement : </p>
                                    <select value={devisConditionReg}>
                                        <option value="reception">A réception</option>
                                        <option value="30 jours"> 30 jours </option>
                                        <option value="a livraison"> A livraison </option>
                                    </select>
                                </div>
                                <div className="editdevis-infos-gauche-ligne">
                                    <p> Mode de Reglement : </p>
                                    <select value={devisModReg}>
                                        <option value="virement"> Virement </option>
                                        <option value="cheque"> Cheque </option>
                                        <option value="especes"> Especes </option>
                                        <option value="prelevement"> Prelevement </option>
                                    </select>
                                </div>
                            </div>
                        }
                    <div className="editdevis-infos-droite">
                        <Totaux id={id}></Totaux>
                    </div>

                </div>

                <hr className="editdevis-titre-limite"></hr>

                {/* <div className="editdevis-data-submit">
                    <button>Editer le devis</button>
                </div> */}
                <Corps id={id}></Corps>
                <DocGen id={id}></DocGen>
            </div>
        </div>
    )
}

export default EditDevis