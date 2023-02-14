import React, { useEffect, useState } from "react";
import axios from "axios";
import MenuFac from "../../MenuFac/MenuFac";
import './CreerFacture.css'

type Facture = {
    client: string,
    type: string
}

type Tiers = {
    id: number,
    nom: string
}

function CreerFacture() {

    const [listeTiers, setListeTiers] = useState<Array<Tiers>>([])

    const [clientFacture, setClientFacture] = useState<string>("")
    const [typeFacture, setTypeFacture] = useState<string>("")

    useEffect(() => {
        axios.get("/api/tiers/listetiers").then(response => {
            setListeTiers(response.data)
        });
    }, [])

    const handleClientFacture = (event: any) => {
        setClientFacture(event.target.value)
    }

    const handleTypeFacture = (event: any) => {
        setTypeFacture(event.target.value)
    }

    const createFacture = async () => {

        let requete: Facture = {
            client: clientFacture,
            type: typeFacture
        }

        let reponse = await axios.post("/api/facture/create", {
            data: requete
        })


        if (reponse.data.message === "ok") {
            document.location.href = "/facture/edit/" + reponse.data.id
        }

        // console.log(requete)
    }

    return (
        <div className="CreerFacture">
            <MenuFac></MenuFac>
            <div className="creerfacture-data-form">

                <div className="creerfacture-data-form-gauche">
                    <select className="select" value={clientFacture} onChange={handleClientFacture}>
                        <option value={0}>Choisissez un client</option>
                        {listeTiers.map(tier => (
                            <option key={tier.id} value={tier.id}>{tier.nom}</option>
                        ))}
                    </select>
                </div>  

                <div className="creerfacture-data-form-gauche">
                    <select className="select" value={typeFacture} onChange={handleTypeFacture}>
                        <option value="">Choisissez un type de facture</option>
                        <option value="standard">Facture standard</option>
                        <option value="acompte">Facture d'acompte</option>
                        <option value="remplacement">Facture de remplacement</option>
                        <option value="avoir">Facture avoir</option>
                        <option value="modele">Facture modèle</option>
                    </select>
                </div>

                <div className="creerfacture-data-submit">
                    <button onClick={createFacture} >Creer</button>
                </div>
            </div>

        </div>
    )

}

export default CreerFacture