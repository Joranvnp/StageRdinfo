import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MenuFac from "../../MenuFac/MenuFac";
import './EditFacture.css'

type Facture = {
    id: any,
    client: string,
    type: string
};

function EditFacture() {
    const { id } = useParams();
    const [clientFacture, setClientFacture] = useState<string>("");
    const [typeFacture, setTypeFacture] = useState<string>("");

    useEffect(() => {
        axios.post("/api/facture/editbyid", {
            data: { id }
        })
        .then(response => {
            setClientFacture(response.data.client);
            setTypeFacture(response.data.type);
        });
    }, [id]);

    const handleClientChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setClientFacture(event.target.value);
    };

    const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTypeFacture(event.target.value);
    };

    const modifyData = () => {
        let requete : Facture = {
            id: id,
            client: clientFacture,
            type: typeFacture
        }
        axios.post("/api/facture/updatefacture", {
            data: requete
        });
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
