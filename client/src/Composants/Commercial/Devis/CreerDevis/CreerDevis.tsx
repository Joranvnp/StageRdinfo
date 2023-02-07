import axios, { AxiosResponse } from "axios";
import React, { useState } from "react";
import MenuComm from "../../MenuComm/MenuComm";
import './CreerDevis.css'

type Devis = {
    status: string,
    clientid: string | null,
    date: string,
    dureevalid: string,
    conditionreg: string,
    modereglement: string,
    datelivraison: string
}

type tiers = {
    _id: string,
    nom: string,
    code: string,
    adresse :string,
    ville: string,
    pays: string,
    departement: string,
    telephone: string,
    email: string,
    commercial: string,
}

function CreerDevis() {

    const [devisDate, setdevisDate] = useState<string>("")
    const [devisDureeValid, setdevisDureeValid] = useState<string>("")
    const [devisConditionReg, setdevisConditionReg] = useState<string>("")
    const [devisModReg, setdevisModReg] = useState<string>("")
    const [devisDateLivraison, setdevisDateLivraison] = useState<string>("")
    const [devisStatus, setDevisStatus] = useState<string>("")

    const [resSearch, setResSearch] = useState<Array<tiers>>([])

    const [selectClientId, setSelectClientId] = useState<string|null>("")
    const [selectClientNom, setSelectClientNom] = useState<string|null>("")

    const [isSelected, setIsSelected] = useState<boolean>(false)


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

    const selectClient = (event: React.MouseEvent) => {

        let id : string | null  = event.currentTarget.getAttribute("value-id")
        let nom : string | null = event.currentTarget.getAttribute("value-nom")


        setSelectClientNom(nom)
        setSelectClientId(id)

        setIsSelected(true)
    }
    
    const cancelSelect = (event: React.MouseEvent) => {
        setIsSelected(false)
        setSelectClientNom("")
        setResSearch([])
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
        setIsSelected(true)
        setDevisStatus("brouillon")
        
        let requete : Devis = {
            clientid: selectClientId,
            date: devisDate,
            dureevalid: devisDureeValid,
            conditionreg: devisConditionReg,
            modereglement: devisModReg,
            datelivraison: devisDateLivraison,
            status: devisStatus
        }

        let reponse : AxiosResponse = await axios.post("/api/devis/create", {
            data: requete,
        })

        // console.log(selectClientId)

        document.location.href = "/devis/edit/"+reponse.data
    }



    return (
        <div className="CreerDevis">
            <MenuComm></MenuComm>
            <div className="creerDevis-data-form">
                <h2 className="h2">Nouveau devis</h2>
                <p>Status : brouillon</p>

                <p>Client</p>

                {isSelected === false ?
                    (
                        <div>
                            <input onChange={handleDevisClient} type="text"></input>
                            {resSearch && 
                                resSearch.map((ligne : tiers) =>
                                    <div value-id={ligne._id} value-nom={ligne.nom} onClick={selectClient} key={ligne._id}>
                                        <p value-id={ligne._id} value-nom={ligne.nom} onClick={selectClient}>{ligne.nom}</p>
                                    </div>
                                )
                            }
                        </div>
                    )
                    :
                    (
                        <div>
                            <p>{selectClientNom}</p>
                            <button onClick={cancelSelect}>Annuler la sélection</button>
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

                <p>Mode de Règlement</p>
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