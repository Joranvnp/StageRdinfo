import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import Corps from "../Corps";
import './CorpsLigne.css'

function CorpsLigne(props: any) {

    console.log(props.data.desc)

    return (
        <div className="CorpsLigne">
            <p>{props.data.desc}</p>
        </div>
    )
}

export default CorpsLigne