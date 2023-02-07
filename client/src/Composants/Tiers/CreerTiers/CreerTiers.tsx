import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState} from "react";
import './CreerTiers.css'
import MenuTiers from "../MenuTiers/MenuTiers";

function CreerTiers() {

    const [nomTiers, setNomTiers] = useState<string>("");
    const [prenomTiers, setPrenomTiers] = useState<string>("");
    const [codeClientTiers, setCodeClientTiers] = useState<string>("");
    const [adresseTiers, setAdresseTiers] = useState<string>("");
    const [adresse2Tiers, setAdresse2Tiers] = useState<string>("");
    const [codepostalTiers, setcodepostalTiers] = useState<string>("");
    const [villeTiers, setVilleTiers] = useState<string>("");
    const [paysTiers, setPaysTiers] = useState<string>("");
    const [departementTiers, setDepartementTiers] = useState<string>("");
    const [telephoneTiers, setTelephoneTiers] = useState<string>("");
    const [emailTiers, setEmailTiers] = useState<string>("");
    const [typeTiers, setTypeTiers] = useState<string>("entreprise");
    const [commercialTiers, setCommercialTiers] = useState<string>("");
    // const [logoTiers, setLogoTiers] = useState<string>("");

    const handleNom = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNomTiers(event.target.value)
    };

    const handlePrenom = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrenomTiers(event.target.value)
    };

    const handleAdresse = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAdresseTiers(event.target.value)
    };
    
    const handleAdresse2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAdresse2Tiers(event.target.value)
    };

    const handleCodePostal = (event: React.ChangeEvent<HTMLInputElement>) => {
        setcodepostalTiers(event.target.value)
    };
    
    const handleVille = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVilleTiers(event.target.value)
    };
    
    const handlePays = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPaysTiers(event.target.value)
    };

    const handleDepartement = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDepartementTiers(event.target.value)
    }
    
    const handleTelephone = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTelephoneTiers(event.target.value)
    };

    const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmailTiers(event.target.value)
    };
 
    const handleType = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTypeTiers(event.target.value)
    };
    
    const handleAffecterCommercial = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCommercialTiers(event.target.value)
    };
            
    const createTiers = async () => {

        let requete = {
            nom: nomTiers,
            prenom: prenomTiers,
            adresse: adresseTiers,
            adresse2: adresse2Tiers,
            codepostal: codepostalTiers,
            ville: villeTiers,
            pays: paysTiers,
            departement: departementTiers,
            telephone: telephoneTiers,
            email: emailTiers,
            type: typeTiers,
            commercial: commercialTiers,
        }
        
        let reponse : AxiosResponse = await axios.post('/api/tiers/creertiers', {
            data : requete
        })

        console.log(reponse.data)

        if(reponse.data === "ok")
        {
            document.location.href = "/listetiers"
        }
    }

    return(
        <div className="CreeTiers">
            <MenuTiers></MenuTiers>
            <div className="creetiers-form">
                <div className="container">
                    <label>Type de tiers:</label>
                    <select value={typeTiers} onChange={handleType}>
                        <option value="client">Client</option>
                        <option value="association">Association</option>
                        <option value="entreprise">Entreprise</option>
                    </select>

                    {typeTiers === "client" ?
                        (
                            <div>
                                <h2>Client : </h2>

                                <label>Nom:</label>
                                <input className="input" type="text" value={nomTiers} onChange={handleNom} placeholder="Entrez le nom du tiers"></input>

                                <label>Prenom : </label>
                                <input className="input" type="text" value={prenomTiers} onChange={handlePrenom} placeholder="Entrez le prénom du tiers"></input>

                                <label>Adresse :</label>
                                <input className="input" type="text" value={adresseTiers} onChange={handleAdresse} placeholder="Entrez l'adresse"></input>

                                <label>Seconde adresse:</label>
                                <input className="input" type="text" value={adresse2Tiers} onChange={handleAdresse2} placeholder="Entrez la seconde adresse"></input>

                                <label>Code postal</label>
                                <input className="input" type="text" value={codepostalTiers} onChange={handleCodePostal} placeholder="Entrez le code postal"/>

                                <label>Ville:</label>
                                <input className="input" type="text" value={villeTiers} onChange={handleVille} placeholder="Entrez la ville"></input>

                                <label>Pays:</label>
                                <input className="input" type="text" value={paysTiers} onChange={handlePays} placeholder="Entrez le pays"></input>

                                <label>Département:</label>
                                <input className="input" type="text" value={departementTiers} onChange={handleDepartement} placeholder="Entrez le département"></input>

                                <label>Téléphone:</label>
                                <input className="input" type="text" value={telephoneTiers} onChange={handleTelephone} placeholder="Entrez le téléphone"></input>
                        
                                <label>Email:</label>
                                <input className="input" type="text" value={emailTiers} onChange={handleEmail} placeholder="Entrez l'email"></input>

                                <label>Affecter à un commercial:</label>
                                <input className="input" type="text" value={commercialTiers} onChange={handleAffecterCommercial} placeholder="Entrez le commercial affecté"></input>
                            </div>
                        )
                        :typeTiers === "entreprise" ?
                        (
                            <div>
                                <h2>Entreprise : </h2>

                                <label>Nom du tiers:</label>
                                <input className="input" type="text" value={nomTiers} onChange={handleNom} placeholder="Entrez le nom du tiers"></input>

                                <label>Adresse:</label>
                                <input className="input" type="text" value={adresseTiers} onChange={handleAdresse} placeholder="Entrez l'adresse"></input>

                                <label>Seconde adresse:</label>
                                <input className="input" type="text" value={adresse2Tiers} onChange={handleAdresse2} placeholder="Entrez la seconde adresse"></input>

                                <label>Code postal</label>
                                <input className="input" type="text" value={codepostalTiers} onChange={handleCodePostal} placeholder="Entrez le code postal"/>

                                <label>Ville:</label>
                                <input className="input" type="text" value={villeTiers} onChange={handleVille} placeholder="Entrez la ville"></input>

                                <label>Pays:</label>
                                <input className="input" type="text" value={paysTiers} onChange={handlePays} placeholder="Entrez le pays"></input>

                                <label>Département:</label>
                                <input className="input" type="text" value={departementTiers} onChange={handleDepartement} placeholder="Entrez le département"></input>

                                <label>Téléphone:</label>
                                <input className="input" type="text" value={telephoneTiers} onChange={handleTelephone} placeholder="Entrez le téléphone"></input>
                        
                                <label>Email:</label>
                                <input className="input" type="text" value={emailTiers} onChange={handleEmail} placeholder="Entrez l'email"></input>

                                <label>Affecter à un commercial:</label>
                                <input className="input" type="text" value={commercialTiers} onChange={handleAffecterCommercial} placeholder="Entrez le commercial affecté"></input>
                            </div>
                        )
                        : typeTiers === "association" ?
                        (
                            <div>
                                <h2>Association : </h2>

                                <label>Nom du tiers:</label>
                                <input className="input" type="text" value={nomTiers} onChange={handleNom} placeholder="Entrez le nom du tiers"></input>

                                <label>Adresse:</label>
                                <input className="input" type="text" value={adresseTiers} onChange={handleAdresse} placeholder="Entrez l'adresse"></input>

                                <label>Seconde adresse:</label>
                                <input className="input" type="text" value={adresse2Tiers} onChange={handleAdresse2} placeholder="Entrez la seconde adresse"></input>

                                <label>Code postal</label>
                                <input className="input" type="text" value={codepostalTiers} onChange={handleCodePostal} placeholder="Entrez le code postal"/>

                                <label>Ville:</label>
                                <input className="input" type="text" value={villeTiers} onChange={handleVille} placeholder="Entrez la ville"></input>

                                <label>Pays:</label>
                                <input className="input" type="text" value={paysTiers} onChange={handlePays} placeholder="Entrez le pays"></input>

                                <label>Département:</label>
                                <input className="input" type="text" value={departementTiers} onChange={handleDepartement} placeholder="Entrez le département"></input>

                                <label>Téléphone:</label>
                                <input className="input" type="text" value={telephoneTiers} onChange={handleTelephone} placeholder="Entrez le téléphone"></input>
                        
                                <label>Email:</label>
                                <input className="input" type="text" value={emailTiers} onChange={handleEmail} placeholder="Entrez l'email"></input>

                                <label>Affecter à un commercial:</label>
                                <input className="input" type="text" value={commercialTiers} onChange={handleAffecterCommercial} placeholder="Entrez le commercial affecté"></input>
                            </div>
                        )
                        : null
                    }
                    
                </div>
                
                {/* <label>Logo:</label>
                <input type="text" value={logoTiers} onChange={handleLogo} placeholder="Entrez le logo"></input> */}
                
                <button onClick={createTiers}>Créer un tiers</button>
            </div>
        </div>
    )
}

export default CreerTiers