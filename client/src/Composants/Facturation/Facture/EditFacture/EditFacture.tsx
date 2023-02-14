import axios from "axios";
import React, { useState, useEffect, Factory } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MenuFac from "../../MenuFac/MenuFac";
import './EditFacture.css'
import { RootState } from "../../../Redux/store";
import { facture } from "../../../Redux/Reducers/facture";
import { useDispatch } from "react-redux";
import { setData } from "../../../Redux/Reducers/facture";
import Corps from "../../../Corps/Corps";
import Totaux from "../../../Totaux/Totaux";
import CorpsFuncButton from "../../../Corps/CorpsFuncButton/CorpsFuncButton";
import CorpsLigne from "../../../Corps/CorpsLigne/CorpsLigne";
import edit from '../../../../Images/facture-dachat.png'

function EditFacture(props: any) {

    const dispatch = useDispatch()

    const { id } = useParams();
    const [clientFacture, setClientFacture] = useState<string>("");
    const [typeFacture, setTypeFacture] = useState<string>("");



    const factures : Array<any> = useSelector((state : RootState) => state.facture.data)

    const factureUnique = factures.find(factureU => factureU._id === id)
    useEffect(() => {

        if (factureUnique)
        {
            setClientFacture(factureUnique.client)
            setTypeFacture(factureUnique.type)
        }

    }, [factureUnique]);

    const handleClientChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setClientFacture(event.target.value);
    };

    const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTypeFacture(event.target.value);
    };

    // const modifyData = () => {

    //     let data : any = {
    //         id: id,
    //         client: clientFacture,
    //         type: typeFacture
    //     }

    //     dispatch(setData(data))

    // };

    return (
        <div className="EditFacture">
            <MenuFac></MenuFac>
            <div className="editfacture-data">
                <div className="editfacture-barre">
                    <p>Facture</p>
                </div>
                <hr className="editfacture-titre-limite"></hr>
                <div className="editfacture-titre">
                    <div className="editfacture-titre-gauche">
                        <img alt="facture-edit" src={edit}></img>
                    </div>
                    <div className="editfacture-titre-droite">
                        <p>Créer/Générer une facture avec un devis</p>
                    </div>
                </div>

                <hr className="editfacture-infos-limite"></hr>

                <div className="editfacture-infos">
                    <div className="editdevis-infos-gauche">
                        <div className="editdevis-infos-gauche-ligne">
                            <p>Id : {id}</p>

                        </div>

                        <div className="editdevis-infos-gauche-ligne">
                            <p>Client : <input type="text" value={clientFacture} onChange={handleClientChange}/></p>
                        </div>

                        <div className="editdevis-infos-gauche-ligne">
                            <p>Type de facture : <input type="text" value={typeFacture} onChange={handleTypeChange}/></p>
                        </div>

                        <div className="editfacture-data-submit">
                            {/* <button onClick={modifyData}>Enregistrer les modifications</button> */}
                        </div>
                    </div>

                    <div className="editfacture-infos-droite">
                        <Totaux element={id}></Totaux>
                    </div>

                   
                </div>

                <hr className="editfacture-titre-limite"></hr>

                <Corps id={id}></Corps>

                {/* <div className="editfacture-data-form">
                    
                </div> */}
            </div>
        </div>
    );
}

export default EditFacture;
