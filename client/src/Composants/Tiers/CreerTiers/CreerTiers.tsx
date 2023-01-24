import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState} from "react";
import './CreerTiers.css'
import MenuTiers from "../MenuTiers/MenuTiers";

function CreerTiers() {

    const [nomTiers, setNomTiers] = useState<string>("");
    const [nomAlternatifTiers, setNomAlternatifTiers] = useState<string>("");
    const [prospectClientTiers, setProspectClientTiers] = useState<string>("");
    const [codeClientTiers, setCodeClientTiers] = useState<string>("");
    const [fournisseurTiers, setFournisseurTiers] = useState<string>("");
    const [codeFournisseurTiers, setCodeFournisseurTiers] = useState<string>("");
    const [etatTiers, setEtatTiers] = useState<string>("");
    const [codeBarresTiers, setCodeBarresTiers] = useState<string>("");
    const [adresseTiers, setAdresseTiers] = useState<string>("");
    const [codePostalTiers, setCodePostalTiers] = useState<string>("");
    const [villeTiers, setVilleTiers] = useState<string>("");
    const [paysTiers, setPaysTiers] = useState<string>("");
    const [departmentCantonTiers, setDepartmentCantonTiers] = useState<string>("");
    const [telephoneTiers, setTelephoneTiers] = useState<string>("");
    const [faxTiers, setFaxTiers] = useState<string>("");
    const [emailTiers, setEmailTiers] = useState<string>("");
    const [webTiers, setWebTiers] = useState<string>("");
    const [skypeTiers, setSkypeTiers] = useState<string>("");
    const [twitterTiers, setTwitterTiers] = useState<string>("");
    const [linkedinTiers, setLinkedinTiers] = useState<string>("");
    const [githubTiers, setGithubTiers] = useState<string>("");
    const [idProf1Tiers, setIdProf1Tiers] = useState<string>("");
    const [idProf2Tiers, setIdProf2Tiers] = useState<string>("");
    const [idProf3Tiers, setIdProf3Tiers] = useState<string>("");
    const [idProf4Tiers, setIdProf4Tiers] = useState<string>("");
    const [idProf5Tiers, setIdProf5Tiers] = useState<string>("");
    const [assujettiTVATiers, setAssujettiTVATiers] = useState<string>("");
    const [numeroTVATiers, setNumeroTVATiers] = useState<string>("");
    const [assujettiDeuxiemeTaxeTiers, setAssujettiDeuxiemeTaxeTiers] = useState<string>("");
    const [assujettiTroisiemeTaxeTiers, setAssujettiTroisiemeTaxeTiers] = useState<string>("");
    const [typeTiers, setTypeTiers] = useState<string>("");
    const [effectifsTiers, setEffectifsTiers] = useState<string>("");
    const [typeEntiteLegaleTiers, setTypeEntiteLegaleTiers] = useState<string>("");
    const [capitalTiers, setCapitalTiers] = useState<string>("");
    const [langueDefautTiers, setLangueDefautTiers] = useState<string>("");
    const [incotermsTiers, setIncotermsTiers] = useState<string>("");
    const [tagsClientsProspTiers, setTagsClientsProspTiers] = useState<string>("");
    const [tagsFournisseursTiers, setTagsFournisseursTiers] = useState<string>("");
    const [deviseTiers, setDeviseTiers] = useState<string>("");
    const [hauteurTiers, setHauteurTiers] = useState<string>("");
    const [poidsTiers, setPoidsTiers] = useState<string>("");
    const [professionTiers, setProfessionTiers] = useState<string>("");
    const [dateNaissanceTiers, setDateNaissanceTiers] = useState<string>("");
    const [maisonMereTiers, setMaisonMereTiers] = useState<string>("");
    const [commercialAffecteTiers, setCommercialAffecteTiers] = useState<string>("");
    // const [logoTiers, setLogoTiers] = useState<string>("");

    const handleNom = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNomTiers(event.target.value)
    };

    const handleNomAlternatif = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNomAlternatifTiers(event.target.value)
    };

    const handleProspectClient = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProspectClientTiers(event.target.value)
    };

    const handleCodeClient = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCodeClientTiers(event.target.value)
    };

    const handleFournisseur = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFournisseurTiers(event.target.value)
    };

    const handleCodeFournisseur = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCodeFournisseurTiers(event.target.value)
    };

    const handleEtat = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEtatTiers(event.target.value)
    };

    const handleCodeBarres = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCodeBarresTiers(event.target.value)
    }

    const handleAdresse = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAdresseTiers(event.target.value)
    };
    
    const handleCodePostal = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCodePostalTiers(event.target.value)
    };
    
    const handleVille = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVilleTiers(event.target.value)
    };
    
    const handlePays = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPaysTiers(event.target.value)
    };
    
    const handleDepartmentCanton = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDepartmentCantonTiers(event.target.value)
    };
    
    const handleTelephone = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTelephoneTiers(event.target.value)
    };
    
    const handleFax = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFaxTiers(event.target.value)
    };

    const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmailTiers(event.target.value)
    };
    
    const handleWeb = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWebTiers(event.target.value)
    };
    
    const handleSkype = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSkypeTiers(event.target.value)
    };
    
    const handleTwitter = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTwitterTiers(event.target.value)
    };
    
    const handleLinkedin = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLinkedinTiers(event.target.value)
    };
    
    const handleGithub = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGithubTiers(event.target.value)
    };
    
    const handleIdProf1 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIdProf1Tiers(event.target.value)
    };
    
    const handleIdProf2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIdProf2Tiers(event.target.value)
    };
    
    const handleIdProf3 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIdProf3Tiers(event.target.value)
    };
    
    const handleIdProf4 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIdProf4Tiers(event.target.value)
    };
    
    const handleIdProf5 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIdProf5Tiers(event.target.value)
    };
    
    const handleAssujettiTVA = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAssujettiTVATiers(event.target.value)
    };
    
    const handleNumeroTVA = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNumeroTVATiers(event.target.value)
    };
    
    const handleAssujettiDeuxiemeTaxe = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAssujettiDeuxiemeTaxeTiers(event.target.value)
    };

    const handleAssujettiTroisiemeTaxe = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAssujettiTroisiemeTaxeTiers(event.target.value)
    };
    
    const handleType = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTypeTiers(event.target.value)
    };
    
    const handleEffectifs = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEffectifsTiers(event.target.value)
    };
    
    const handleTypeEntiteLegale = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTypeEntiteLegaleTiers(event.target.value)
    }

    const handleCapital = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCapitalTiers(event.target.value)
    }

    const handleLangueDefaut = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLangueDefautTiers(event.target.value)
    }

    const handleIncoterms = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIncotermsTiers(event.target.value)
    }

    const handleTagsClientsProsp = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTagsClientsProspTiers(event.target.value)
    }

    const handleTagsFournisseurs = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTagsFournisseursTiers(event.target.value)
    }

    const handleDevise = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDeviseTiers(event.target.value)
    }

    const handleHauteur = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHauteurTiers(event.target.value)
    }

    const handlePoids = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPoidsTiers(event.target.value)
    }

    const handleProfession = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProfessionTiers(event.target.value)
    }

    const handleDateNaissance = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDateNaissanceTiers(event.target.value)
    }

    const handleMaisonMere = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMaisonMereTiers(event.target.value)
    }

    const handleAffecterCommercial = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCommercialAffecteTiers(event.target.value)
    }

    // const handleLogo = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setLogoTiers(event.target.value)
    // }
            
    const createTiers = async () => {

        let requete = {
            nomTiers: nomTiers,
            nomAlternatifTiers: nomAlternatifTiers,
            prospectClientTiers: prospectClientTiers,
            codeClientTiers: codeClientTiers,
            fournisseurTiers: fournisseurTiers,
            codeFournisseurTiers: codeFournisseurTiers,
            etatTiers: etatTiers,
            codeBarresTiers: codeBarresTiers,
            adresseTiers: adresseTiers,
            codePostalTiers: codePostalTiers,
            villeTiers: villeTiers,
            paysTiers: paysTiers,
            departmentCantonTiers: departmentCantonTiers,
            telephoneTiers: telephoneTiers,
            faxTiers: faxTiers,
            emailTiers: emailTiers,
            webTiers: webTiers,
            skypeTiers: skypeTiers,
            twitterTiers: twitterTiers,
            linkedinTiers: linkedinTiers,
            githubTiers: githubTiers,
            idProf1Tiers: idProf1Tiers,
            idProf2Tiers: idProf2Tiers,
            idProf3Tiers: idProf3Tiers,
            idProf4Tiers: idProf4Tiers,
            idProf5Tiers: idProf5Tiers,
            assujettiTVATiers: assujettiTVATiers,
            numeroTVATiers: numeroTVATiers,
            assujettiDeuxiemeTaxeTiers: assujettiDeuxiemeTaxeTiers,
            assujettiTroisiemeTaxeTiers: assujettiTroisiemeTaxeTiers,
            typeTiers: typeTiers,
            effectifsTiers: effectifsTiers,
            typeEntiteLegaleTiers: typeEntiteLegaleTiers,
            capitalTiers: capitalTiers,
            langueDefautTiers: langueDefautTiers,
            incotermsTiers: incotermsTiers,
            tagsClientsProspTiers: tagsClientsProspTiers,
            tagsFournisseursTiers: tagsFournisseursTiers,
            deviseTiers: deviseTiers,
            hauteurTiers: hauteurTiers,
            poidsTiers: poidsTiers,
            professionTiers: professionTiers,
            dateNaissanceTiers: dateNaissanceTiers,
            maisonMereTiers: maisonMereTiers,
            commercialAffecteTiers: commercialAffecteTiers,
            // logoTiers: logoTiers
        }
        
        let reponse : AxiosResponse = await axios.post('/api/tiers/creertiers', {
            data : requete
        })

        console.log(reponse.data)

        if(reponse.data === "ok")
        {
            document.location.href = "/creertiers"
        }
    }

    return(
        <div className="CreeTiers">
            <MenuTiers></MenuTiers>
            <div className="creetiers-form">
                <div className="container">
                    <div className="col-left">
                        <label>Nom du tiers:</label>
                        <input className="input" type="text" value={nomTiers} onChange={handleNom} placeholder="Entrez le nom du tiers"></input>

                        <label>Nom alternatif:</label>
                        <input className="input" type="text" value={nomAlternatifTiers} onChange={handleNomAlternatif} placeholder="Entrez le nom alternatif"></input>

                        <label>Prospect/Client:</label>
                        <input className="input" type="text" value={prospectClientTiers} onChange={handleProspectClient} placeholder="Entrez si c'est un prospect ou un client"></input>

                        <label>Code client:</label>
                        <input className="input" type="text" value={codeClientTiers} onChange={handleCodeClient} placeholder="Entrez le code client"></input>

                        <label>Fournisseur:</label>
                        <input className="input" type="text" value={fournisseurTiers} onChange={handleFournisseur} placeholder="Entrez si c'est un fournisseur"></input>

                        <label>Code fournisseur:</label>
                        <input className="input" type="text" value={codeFournisseurTiers} onChange={handleCodeFournisseur} placeholder="Entrez le code fournisseur"></input>

                        <label>Etat:</label>
                        <input className="input" type="text" value={etatTiers} onChange={handleEtat} placeholder="Entrez l'état"></input>

                        <label>Code barres:</label>
                        <input className="input" type="text" value={codeBarresTiers} onChange={handleCodeBarres} placeholder="Entrez le code barres"></input>

                        <label>Adresse:</label>
                        <input className="input" type="text" value={adresseTiers} onChange={handleAdresse} placeholder="Entrez l'adresse"></input>

                        <label>Code postal:</label>
                        <input className="input" type="text" value={codePostalTiers} onChange={handleCodePostal} placeholder="Entrez le code postal"></input>

                        <label>Ville:</label>
                        <input className="input" type="text" value={villeTiers} onChange={handleVille} placeholder="Entrez la ville"></input>

                        <label>Pays:</label>
                        <input className="input" type="text" value={paysTiers} onChange={handlePays} placeholder="Entrez le pays"></input>

                        <label>Département/Canton:</label>
                        <input className="input" type="text" value={departmentCantonTiers} onChange={handleDepartmentCanton} placeholder="Entrez le département/canton"></input>

                        <label>Téléphone:</label>
                        <input className="input" type="text" value={telephoneTiers} onChange={handleTelephone} placeholder="Entrez le téléphone"></input>
                
                        <label>Fax:</label>
                        <input className="input" type="text" value={faxTiers} onChange={handleFax} placeholder="Entrez le fax"></input>

                        <label>Email:</label>
                        <input className="input" type="text" value={emailTiers} onChange={handleEmail} placeholder="Entrez l'email"></input>

                        <label>Web:</label>
                        <input className="input" type="text" value={webTiers} onChange={handleWeb} placeholder="Entrez le site web"></input>

                        <label>Skype:</label>
                        <input className="input" type="text" value={skypeTiers} onChange={handleSkype} placeholder="Entrez le Skype"></input>

                        <label>Twitter:</label>
                        <input className="input" type="text" value={twitterTiers} onChange={handleTwitter} placeholder="Entrez le Twitter"></input>
                        
                        <label>Linkedin:</label>
                        <input className="input" type="text" value={linkedinTiers} onChange={handleLinkedin} placeholder="Entrez le Linkedin"></input>

                        <label>Github:</label>
                        <input className="input" type="text" value={githubTiers} onChange={handleGithub} placeholder="Entrez le Github"></input>
                        
                        <label>ID professionnel 1:</label>
                        <input className="input" type="text" value={idProf1Tiers} onChange={handleIdProf1} placeholder="Entrez l'ID professionnel 1"></input>

                    </div>
                    <div className="col-right">
                        
                        <label>ID professionnel 2:</label>
                        <input className="input" type="text" value={idProf2Tiers} onChange={handleIdProf2} placeholder="Entrez l'ID professionnel 2"></input>
                        
                        <label>ID professionnel 3:</label>
                        <input className="input" type="text" value={idProf3Tiers} onChange={handleIdProf3} placeholder="Entrez l'ID professionnel 3"></input>

                        <label>ID professionnel 4:</label>
                        <input className="input" type="text" value={idProf4Tiers} onChange={handleIdProf4} placeholder="Entrez l'ID professionnel 4"></input>

                        <label>ID professionnel 5:</label>
                        <input className="input" type="text" value={idProf5Tiers} onChange={handleIdProf5} placeholder="Entrez l'ID professionnel 5"></input>

                        <label>Assujetti à la TVA:</label>
                        <input className="input" type="text" value={assujettiTVATiers} onChange={handleAssujettiTVA} placeholder="Entrez si le tiers est assujetti à la TVA"></input>

                        <label>Numéro de TVA:</label>
                        <input className="input" type="text" value={numeroTVATiers} onChange={handleNumeroTVA} placeholder="Entrez le numéro de TVA"></input>

                        <label>Assujetti à la deuxième taxe:</label>
                        <input className="input" type="text" value={assujettiDeuxiemeTaxeTiers} onChange={handleAssujettiDeuxiemeTaxe} placeholder="Entrez si le tiers est assujetti à la deuxième taxe"></input>

                        <label>Assujetti à la troisième taxe:</label>
                        <input className="input" type="text" value={assujettiTroisiemeTaxeTiers} onChange={handleAssujettiTroisiemeTaxe} placeholder="Entrez si le tiers est assujetti à la troisième taxe"></input>

                        <label>Type de tiers:</label>
                        <input className="input" type="text" value={typeTiers} onChange={handleType} placeholder="Entrez le type de tiers"></input>

                        <label>Effectifs:</label>
                        <input className="input" type="text" value={effectifsTiers} onChange={handleEffectifs} placeholder="Entrez les effectifs"></input>

                        <label>Type d'entité légale:</label>
                        <input className="input" type="text" value={typeEntiteLegaleTiers} onChange={handleTypeEntiteLegale} placeholder="Entrez le type d'entité légale"></input>

                        <label>Capital:</label>
                        <input className="input" type="text" value={capitalTiers} onChange={handleCapital} placeholder="Entrez le capital"></input>

                        <label>Langue par défaut:</label>
                        <input className="input" type="text" value={langueDefautTiers} onChange={handleLangueDefaut} placeholder="Entrez la langue par défaut"></input>

                        <label>Incoterms:</label>
                        <input className="input" type="text" value={incotermsTiers} onChange={handleIncoterms} placeholder="Entrez les incoterms"></input>
                        
                        <label>Tags clients/prospects:</label>
                        <input className="input" type="text" value={tagsClientsProspTiers} onChange={handleTagsClientsProsp} placeholder="Entrez les tags clients/prospects"></input>
                        
                        <label>Tags fournisseurs:</label>
                        <input className="input" type="text" value={tagsFournisseursTiers} onChange={handleTagsFournisseurs} placeholder="Entrez les tags pour les fournisseurs"></input>

                        <label>Devise:</label>
                        <input className="input" type="text" value={deviseTiers} onChange={handleDevise} placeholder="Entrez la devise"></input>

                        <label>Hauteur:</label>
                        <input className="input" type="text" value={hauteurTiers} onChange={handleHauteur} placeholder="Entrez la hauteur"></input>

                        <label>Poids:</label>
                        <input className="input" type="text" value={poidsTiers} onChange={handlePoids} placeholder="Entrez le poids"></input>

                        <label>Profession:</label>
                        <input className="input" type="text" value={professionTiers} onChange={handleProfession} placeholder="Entrez la profession"></input>

                        <label>Date de naissance:</label>
                        <input className="input" type="text" value={dateNaissanceTiers} onChange={handleDateNaissance} placeholder="Entrez la date de naissance"></input>
                        
                        <label>Maison mère:</label>
                        <input className="input" type="text" value={maisonMereTiers} onChange={handleMaisonMere} placeholder="Entrez la maison mère"></input>

                        <label>Affecter à un commercial:</label>
                        <input className="input" type="text" value={commercialAffecteTiers} onChange={handleAffecterCommercial} placeholder="Entrez le commercial affecté"></input>

                    </div>
                </div>
                
                
                {/* <label>Logo:</label>
                <input type="text" value={logoTiers} onChange={handleLogo} placeholder="Entrez le logo"></input> */}
                
                <button onClick={createTiers}>Créer un tiers</button>
            </div>
        </div>
    )
}

export default CreerTiers