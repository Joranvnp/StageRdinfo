import React, { useEffect, useState } from "react";
import MenuTiers from "../MenuTiers/MenuTiers";
import axios, { AxiosResponse } from "axios";
import "./ListeTiers.css"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";

type Tiers = {
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

function ListeTiers() {

    const [tiersList, setTiersList] = useState<Array<Tiers>>([])

    const [selectTiersNom, setSelectTiersNom] = useState<string|null>("")
    const [selectTiersId, setSelectedTiersId] = useState<string|null>("")
    const [resSearch, setResSearch] = useState<Array<Tiers>>([])
    const [isSelected, setIsSelected] = useState<boolean>(false)

    useEffect(() => {
        axios.get("/api/tiers/listetiers").then(reponse => {
            setTiersList(reponse.data)
        })
    }, [])

    const handleTiersNom = async (event: React.ChangeEvent<HTMLInputElement>) => {

        if(event.target.value.length >= 2)
        {
            let reponse : AxiosResponse = await axios.post("/api/tiers/search", {
                search: event.target.value
            })
    
            setResSearch(reponse.data)
        } 
        else
        {
            setResSearch([])
        }
    }

    const selectTiers = (event: React.MouseEvent) => {
        let id : string|null = event.currentTarget.getAttribute("value-id")

        let nom: string|null = event.currentTarget.getAttribute("value-nom")

        setSelectedTiersId(id)
        setSelectTiersNom(nom)
        setIsSelected(true)
    }

    const cancelSelect = (event: React.MouseEvent) => {
        setIsSelected(false)
        setSelectTiersNom("")
        setResSearch([])
    }

    const users = useSelector((state : RootState) => state.users.data)
    console.log(users)

    return (
        <div className="ListeTiers">
            <MenuTiers></MenuTiers>
            <div className="listetiers-panel">
                <h1>Liste tiers</h1>
                <div className="listetierssearch">
                    <h4>Recherche de Tiers</h4>

                    {isSelected === false ?

                        (
                            <div>
                                <input type="text" onChange={handleTiersNom} placeholder="Recherche le nom"/>
                                {resSearch.map(tiers => 
                                    <div>
                                        <p value-id={tiers._id} value-nom={tiers.nom} onClick={selectTiers}>{tiers.nom}</p>
                                    </div>
                                )}
                            </div>
                        )
                        :
                        (
                            <div>
                                <p>{selectTiersNom}</p>
                                <button onClick={cancelSelect}>Annuler la sélection</button>
                            </div>
                        )

                    }

                    {/* <input type="text" placeholder="Prenom"/>
                    <input type="text" placeholder="Adresse"/>
                    <input type="text" placeholder="Seconde adresse"/>
                    <input type="text" placeholder="Code postal"/>
                    <input type="text" placeholder="Ville"/>
                    <input type="text" placeholder="Pays"/>
                    <input type="text" placeholder="Departement"/>
                    <input type="text" placeholder="Telephone"/>
                    <input type="text" placeholder="Email"/> */}
                    {/* <select value="type">
                        <option value="client">Client</option>
                        <option value="association">Association</option>
                        <option value="entreprise">Entreprise</option>
                    </select> */}
                </div>
                <table className="listetiers-tab">
                    <thead className="listetiers-tab-entete">
                        <tr>
                            <th>Nom</th>
                            <th>Prenom</th>
                            <th>Code</th>
                            <th>Adresse</th>
                            <th>Seconde adresse</th>
                            <th>Code Postal</th>
                            <th>Ville</th>
                            <th>Pays</th>
                            <th>Telephone</th>
                            <th>Email</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody className="listetiers-tab-body">
                        {tiersList.map(tiers => 
                            <tr key={tiers._id}>
                                <td>{tiers.nom}</td>
                                <td>{tiers.prenom}</td>
                                <td>{tiers.code}</td>
                                <td>{tiers.adresse}</td>
                                <td>{tiers.adresse2}</td>
                                <td>{tiers.codepostal}</td>
                                <td>{tiers.ville}</td>
                                <td>{tiers.pays}</td>
                                <td>{tiers.telephone}</td>
                                <td>{tiers.email}</td>
                                <td>{tiers.type}</td>
                                <div>
                                    <Link to={'/tiers/edit/'+tiers._id} value-id={tiers._id}><button>Modifier</button></Link>
                                </div>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ListeTiers