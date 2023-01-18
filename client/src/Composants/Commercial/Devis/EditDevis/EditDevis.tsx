import React from "react";
import { useParams } from "react-router-dom";
import MenuComm from "../../MenuComm/MenuComm";
import './EditDevis.css'

function EditDevis() {

    const { id } = useParams()

    const sendData = () => {

    }

    return (
        <div className="EditDevis">
            <MenuComm></MenuComm>
            <div className="editDevis-data-form">
                <h1>Edit devis</h1>
                <p>{id}</p>
            </div>
            <div className="editDevis-data-submit">
                <button onClick={sendData}>Editer</button>
            </div>
        </div>
    )
}

export default EditDevis