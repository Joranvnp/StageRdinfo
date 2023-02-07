import React, { useEffect } from "react";
import CorpsFuncButton from "./CorpsFuncButton/CorpsFuncButton";
import CorpsLigne from "./CorpsLigne/CorpsLigne";
import { RootState } from "../Redux/store";
import { useSelector } from "react-redux";
import CorpsLigneAdd from "./CorpsLigneAdd/CorpsLigneAdd";
import "./Corps.css"
import { useDispatch } from "react-redux";
import { getLigne } from "../Redux/Reducers/ligne";

type ligne = {
    id: string | null,
    element: string,
    desc: string,
    qte: number,
    remise: number,
    tva: number | null,
    pu: number,
    pr: number | null,
    cat: string,
    type: string
}

function Corps(props: any) {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getLigne(props.id))

    }, [props.id])

    const lignes : Array<ligne> = useSelector((state : RootState) => state.ligne.data)

    return (
        <div className="Corps">
            <div className="corps-data-entete">
                <p>Description</p>
                <p>TVA</p>
                <p>P.U HT</p>
                <p>Qté</p>
                <p>Remise</p>
                <p>Prix de revient</p>
                <p>Taux de Marge</p>
                <p>Total HT</p>
                <p>Actions</p>
            </div>
            <div className="corps-data">
                {lignes.map((ligne: any) =>
                        <CorpsLigne data={ligne} element={props.id} key={ligne._id} ></CorpsLigne>
                    )            
                }
            </div>

            <br />
            <hr className="corps-barre"></hr>

            <div className="corps-data-add">
                <CorpsLigneAdd element={props.id}></CorpsLigneAdd>
                <CorpsFuncButton id={props.id}></CorpsFuncButton>
            </div>      

            <br />
            <hr className="corps-barre"></hr>    
        </div>
    )
}

export default Corps