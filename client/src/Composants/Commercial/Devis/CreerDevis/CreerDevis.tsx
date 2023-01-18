import { type } from "@testing-library/user-event/dist/type";
import axios, { AxiosResponse } from "axios";
import { stringify } from "querystring";
import React, { useState } from "react";
import { idText } from "typescript";
import MenuComm from "../../MenuComm/MenuComm";
import './CreerDevis.css'

function CreerDevis() {

    const [devisClient, setdevisClient] = useState<string>("")
    const [devisDate, setdevisDate] = useState<string>("")
    const [devisDureeValid, setdevisDureeValid] = useState<string>("")
    const [devisConditionReg, setdevisConditionReg] = useState<string>("")
    const [devisModReg, setdevisModReg] = useState<string>("")
    const [devisDateLivraison, setdevisDateLivraison] = useState<string>("")

    type Devis = {
        ref: string,
        client: string,
        date: string,
        dureeValidité: string,
        conditionReglement: string,
        modeReglement: string,
        dateLivraison: string
    }

    const handleDevisClient = (event: React.ChangeEvent<HTMLInputElement>) => {
        setdevisClient(event.target.value)
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
            ref: devisClient,
            client: devisClient,
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
    

    return (
        <div className="CreerDevis">
            <MenuComm></MenuComm>
            <div className="creerDevis-data-form">
                <h2 className="h2">Nouvelle proprosition commerciale : </h2>
                <p>Ref : status brouillon</p>
                <input type="text" ></input>
                <p>Client</p>
                <input type="text" onChange={handleDevisClient}></input>

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