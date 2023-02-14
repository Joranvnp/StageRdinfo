import React, { useEffect } from "react";
import './CorpsFuncButton.css'
import { useDispatch } from "react-redux";
import axios from "axios";

function CorpsFuncButton(props: any) {

    const dispatch = useDispatch()

    useEffect(() => {
    }, [])

    const valider = () => {
        axios.post("/api/devis/valider", {
            id: props.id
        })
    }

    return (
        <div className="CorpsFuncButton">
            <div className="corpsfuncbutton-data-actions">
                <button onClick={valider}>Valider</button>
            </div>
        </div>
    )
}

export default CorpsFuncButton