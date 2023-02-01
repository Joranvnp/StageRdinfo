import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MenuFac from "../../MenuFac/MenuFac";
import './EditFacture.css'
import { RootState } from "../../../Redux/store";
import { facture } from "../../../Redux/Reducers/facture";

function EditFacture() {
    const { id } = useParams();
    const [clientFacture, setClientFacture] = useState<string>("");
    const [typeFacture, setTypeFacture] = useState<string>("");

    const factures : Array<any> = useSelector((state : RootState) => state.facture.data)

    useEffect(() => {

        if (factures)
        {
            const factureUnique = factures.find(factureU => factureU._id === id)
            setClientFacture(factureUnique.client)
            setTypeFacture(factureUnique.type)
        }

    }, [factures]);

    const handleClientChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setClientFacture(event.target.value);
    };

    const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTypeFacture(event.target.value);
    };

    const modifyData = () => {
        // let requete : facture = {
        //     id: id,
        //     client: clientFacture,
        //     type: typeFacture
        // }
        // axios.post("/api/facture/updatefacture", {
        //     data: requete
        // });
    };

    return (
        <div className="EditFacture">
            <MenuFac />
            <div className="editfacture-data-form">
                <h1>Edit facture</h1>
                <p>Id : {id}</p>
                <label htmlFor="client">Client :</label>
                <input
                    type="text"
                    value={clientFacture}
                    onChange={handleClientChange}/>
                <br />
                <label htmlFor="type">Type de facture :</label>
                <input
                    type="text"
                    value={typeFacture}
                    onChange={handleTypeChange}
                />
                 <div className="editfacture-data-submit">
                    <button onClick={modifyData}>Enregistrer les modifications</button>
                </div>
            </div>
        </div>
    );
}

export default EditFacture;
