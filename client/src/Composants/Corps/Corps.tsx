import React from "react";
import CorpsFuncButton from "./CorpsFuncButton/CorpsFuncButton";
import CorpsLigne from "./CorpsLigne/CorpsLigne";
import { RootState } from "../Redux/store";
import { useSelector } from "react-redux";
import CorpsLigneAdd from "./CorpsLigneAdd/CorpsLigneAdd";

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

    const lignes : Array<ligne> = useSelector((state : RootState) => state.ligne.data)

    return (
        <div className="Corps">
            <div className="corps-entete">
            </div>
            <div className="corps-data">
                {lignes.map((ligne: any) =>
                        <CorpsLigne data={ligne}></CorpsLigne>
                    )            
                }
            </div>
            <div className="corps-data-add">
                <CorpsLigneAdd element={props.id}></CorpsLigneAdd>
            </div>
           
        </div>
    )
}

export default Corps