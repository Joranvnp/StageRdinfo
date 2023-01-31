import axios, {AxiosResponse} from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MenuComm from "../../MenuComm/MenuComm";
import './EditDevis.css'

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
    const [infosDevis, setInfosDevis] = useState<Array<string>>([])
    const [devisClient, setDevisClient] = useState<tiers>()
    const [devisStatus, setDevisStatus] = useState<string>("")
    const [devisDate, setdevisDate] = useState<string>("")
    const [devisDureeValid, setdevisDureeValid] = useState<string>("")
    const [devisConditionReg, setdevisConditionReg] = useState<string>("")
    const [devisModReg, setdevisModReg] = useState<string>("")
    const [devisDateLivraison, setdevisDateLivraison] = useState<string>("")

    useEffect(() => {

        axios.post("/api/devis/listebyid",{
            id : id,
        }).then(reponse => {
            // setInfosDevis(reponse.data)
            setDevisClient(reponse.data.client)
            setdevisDate(reponse.data.date)
            setdevisDureeValid(reponse.data.dureeValid)
            setdevisConditionReg(reponse.data.conditionReg)
            setdevisModReg(reponse.data.modeReglement)
            setdevisDateLivraison(reponse.data.dateLivraison)
        })

    }, [id])

    return (
        <div className="EditDevis">
            <MenuComm></MenuComm>
            <div className="editDevis-data-form">
                <h1>Fiche Proposition</h1>
                <div className="editdevis-data-entete">
                    {devisClient &&
                        <div>
                            <p>Id : {id}</p>
                            <p>Type de client : {devisClient.type}</p>
                            <p>Nom : {devisClient.nom}</p>
                            <p>Adresse : {devisClient.adresse + " Code postal : "+ devisClient.codepostal + " Ville : " + devisClient.ville}</p>
                        </div>
                    }
                    {/* Afficher les informations propre au devis sélectionner */}

                </div>
                <div className="editdevis-data-form">
                    {/* Afficher un formulaire pour modifier le devis et le poster avec une requete post */}
                    {/* {infosDevis.map(devis => 
                            <div key={devis.id}>
                                <td>{devis.code}</td>
                                <p>Date du devis : <input type="date" value={devis.date}></input></p>
                            </div>
                    )} */}
                    {/* {devisClient &&
                        <div>
                            <p>Date du devis : <input type="date" value={devisDate}></input></p>
                            <p>Date de Proposition : <input type="date" value={devisDate}></input></p>
                            <p>Durée de validité : <input type="text" value={devisModReg}></input></p>
                            <p>Condition de Reglement : <input type="text" value={devisConditionReg}></input></p>
                        </div>
                    } */}

                </div>
                <div className="editdevis-data-submit">

                </div>
            </div>
            
        </div>
    )
}

export default EditDevis