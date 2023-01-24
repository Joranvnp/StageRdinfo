import { type } from "@testing-library/user-event/dist/type";
import axios, { AxiosResponse } from "axios";
import { stringify } from "querystring";
import React, { useState } from "react";
import { idText } from "typescript";
import MenuComm from "../../MenuComm/MenuComm";
import './CreerDevis.css'

type Devis = {
    clientId: string | null,
    date: string,
    dureeValidité: string,
    conditionReglement: string,
    modeReglement: string,
    dateLivraison: string
}

type Tiers = {
    _id: string,
    code: string,
    nom: string,
    adresse: string,
    adresse2: string,
    codepostal: string,
    ville: string,
    pays: string,
    departement: string,
    telephone:string,
    email:string,
    commercial: string
}

function CreerDevis() {

    const [devisDate, setdevisDate] = useState<string>("")
    const [devisDureeValid, setdevisDureeValid] = useState<string>("")
    const [devisConditionReg, setdevisConditionReg] = useState<string>("")
    const [devisModReg, setdevisModReg] = useState<string>("")
    const [devisDateLivraison, setdevisDateLivraison] = useState<string>("")
    const [selectClientNom, setSelectClientNom] = useState<string|null>("")
    const [selectClientId, setSelectClientId] = useState<string|null>("")
    const [isSelected, setIsSelected] = useState<boolean>(false)
    const [resSearch, setResSearch] = useState<Array<Tiers>>([])

    const handleDevisClient = async (event: React.ChangeEvent<HTMLInputElement>) => {

        if(event.target.value.length >= 2)
        {
            let reponse : AxiosResponse = await axios.post('/api/tiers/search', {
                search: event.target.value
            })

            setResSearch(reponse.data)
        }
        else
        {
            setResSearch([])
        }
    }

    const handleDevisDate = (event: React.ChangeEvent<HTMLInputElement>) => {
        setdevisDate(event.target.value)
    }

    const handleDevisDureeValid = (event : React.ChangeEvent<HTMLInputElement>) => {
        setdevisDureeValid(event.target.value)
    }

    const handleDevisConditionReg = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setdevisConditionReg(event.target.value)
    }

    const handleDevisModReg = (event : React.ChangeEvent<HTMLSelectElement>) => {
        setdevisModReg(event.target.value)
    }

    const handleDevisDateLivraison = (event : React.ChangeEvent<HTMLInputElement>) => {
        setdevisDateLivraison(event.target.value)
    }

    const creerDevis = async () => {
        let requete : Devis = {
            clientId: selectClientId,
            date: devisDate,
            dureeValidité: devisDureeValid,
            conditionReglement: devisConditionReg,
            modeReglement: devisModReg,
            dateLivraison: devisDateLivraison
        }

        let reponse : AxiosResponse = await axios.post("/api/devis/create", {
            data: requete
        })

        console.log(reponse)

        document.location.href = "/EditDevis/"+reponse.data
    }

    const selectClient = (event: React.MouseEvent) => {

        let id : string|null = event.currentTarget.getAttribute("value-id")

        let nom : string|null = event.currentTarget.getAttribute("value-nom")

        setSelectClientId(id)
        setSelectClientNom(nom)
        setIsSelected(true)
    }

    const handleCancelSelect = (event: React.MouseEvent) => {
        setIsSelected(false)
        setResSearch([])
    }

    return (
        <div className="CreerDevis">
            <MenuComm></MenuComm>
            <div className="creerDevis-data-form">
                <h2 className="h2">Nouvelle proprosition commerciale : </h2>
                <p>Ref : status brouillon</p>

                <p>Client</p>

                    {isSelected === false ?
                        (
                            <div>
                                <input type="text" onChange={handleDevisClient}></input>
                                {resSearch.map(ligne =>
                                    <div>
                                        <p value-nom={ligne.nom} value-id={ligne._id} onClick={selectClient}>{ligne.nom}</p>
                                    </div>
                                    )
                                }
                            </div>
                        )
                        :
                        (
                            <div>
                                <button onClick={handleCancelSelect}>Annuler la sélection</button>
                            </div>
                        )
                    } 

                <p>Date de Proposition</p>
                <input type="date" onChange={handleDevisDate}></input>

                <p>Durée de validité</p>
                <input type="text" onChange={handleDevisDureeValid}></input>

                <p>Conditions de Règlement</p>
                <select onChange={handleDevisConditionReg}>
                    <option>choisir</option>
                    <option value="A réception">A réception</option>
                </select>

                <p>Règlement</p>
                <select onChange={handleDevisModReg}>
                    <option>Choisir</option> 
                    <option value="Cheque">Cheque</option>
                    <option value="Espèce">Espèce</option>
                    <option value="Virement">Virement</option>
                    <option value="Prélevement">Prélevement</option>
                </select>

                <p>Date de livraison</p>
                <input type="date" onChange={handleDevisDateLivraison}></input>

                <div className="creerDevis-data-submit">
                    <br />
                    <button onClick={creerDevis}>Créer Devis</button>
                </div>
            </div>
        </div>
    )
}

export default CreerDevis