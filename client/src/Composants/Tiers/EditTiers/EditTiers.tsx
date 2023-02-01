import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import MenuTiers from "../MenuTiers/MenuTiers";
import './EditTiers.css'

function EditTiers()
{

    const {id} = useParams()

    useEffect(() => {
        axios.post('/api/tiers/modifier', {
            id: id
        }).then( reponse => {
            console.log(reponse.data)
        })
    }, [id])

    return (
        <div className="EditTiers">
            <MenuTiers></MenuTiers>
            <h1>Edit Tiers : </h1>
        </div>
    )
}

export default EditTiers