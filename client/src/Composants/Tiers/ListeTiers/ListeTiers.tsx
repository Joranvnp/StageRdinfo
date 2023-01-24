import React, { useEffect, useState } from "react";
import MenuTiers from "../MenuTiers/MenuTiers";
import axios from "axios";
import "./ListeTiers.css"

type Tiers = {
    _id: string,
    nomTiers: string,
    nomAlternatifTiers: string,
    prospectClientTiers: string,
    codeClientTiers: string,
    fournisseurTiers: string,
    codeFournisseurTiers: string,
    etatTiers: string,
    codeBarresTiers: string,
    adresseTiers: string,
    codePostalTiers: string,
    villeTiers: string,
    paysTiers: string,
    departmentCantonTiers: string,
    telephoneTiers: string,
    faxTiers: string,
    emailTiers: string,
    webTiers: string,
    skypeTiers: string,
    twitterTiers: string,
    linkedinTiers: string,
    githubTiers: string,
    idProf1Tiers: string,
    idProf2Tiers: string,
    idProf3Tiers: string,
    idProf4Tiers: string,
    idProf5Tiers: string,
    assujettiTVATiers: string,
    numeroTVATiers: string,
    assujettiDeuxiemeTaxeTiers: string,
    assujettiTroisiemeTaxeTiers: string,
    typeTiers: string,
    effectifsTiers: string,
    typeEntiteLegaleTiers: string,
    capitalTiers: string,
    langueDefautTiers: string,
    incotermsTiers: string,
    tagsClientsProspTiers: string,
    tagsFournisseursTiers: string,
    tierseTiers: string,
    hauteurTiers: string,
    poidsTiers: string,
    professionTiers: string,
    dateNaissanceTiers: string,
    maisonMereTiers: string,
    commercialAffecteTiers: string,
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
                <table className="listetiers-tab">
                    <thead className="listetiers-tab-entete">
                        <tr>
                            <th>Nom du tiers</th>
                            <th>Nom alternatif</th>
                            <th>Code client</th>
                            <th>Ville</th>
                            <th>Pays</th>
                            <th>Type du tiers</th>
                            <th>Email</th>
                            <th>Téléphone</th>
                            <th>Nature du tiers</th>
                            <th>Maison mère</th>
                            <th>Etat</th>
                        </tr>
                    </thead>
                    <tbody className="listetiers-tab-body">
                        {tiersList.map(tiers => 
                            <tr key={tiers._id}>
                                <td>{tiers.nomTiers}</td>
                                <td>{tiers.nomAlternatifTiers}</td>
                                <td>{tiers.codeClientTiers}</td>
                                <td>{tiers.villeTiers}</td>
                                <td>{tiers.paysTiers}</td>
                                <td>{tiers.typeTiers}</td>
                                <td>{tiers.emailTiers}</td>
                                <td>{tiers.telephoneTiers}</td>
                                <td>{tiers.prospectClientTiers} et {tiers.fournisseurTiers}</td>
                                <td>{tiers.maisonMereTiers}</td>
                                <td>{tiers.etatTiers}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ListeTiers