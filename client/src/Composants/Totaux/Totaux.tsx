import React, { useEffect, useState } from "react";
import "./Totaux.css"
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import axios, { AxiosResponse } from "axios";
import ligne from "../Redux/Reducers/ligne";


type ligne = {
    id: string | null,
    element: string,
    desc: string,
    qte: number,
    remise: number,
    tva: number,
    pu: number,
    pr: number ,
    cat: string,
    type: string
}

type totaux = {
    totalht : number,
    totaltva: number,
    totalttc: number,
    element: string
}

function Totaux(props: any) {

    const lignes : Array<ligne> = useSelector((state : RootState) => state.ligne.data)

    const [totalHt, setTotalHt] = useState<number>(0)
    const [totalTva, setTotalTva] = useState<number>(0)
    const [totalTtc, setTotalTtc] = useState<number>(0)

    const totauxTotal = useSelector((state: RootState) => state.totaux.data)
    useEffect(() => {
        let totalHtInt : number = 0
        let totalTvaInt : number = 0 
        let totalTtcInt : number = 0

        lignes.forEach(ligne => {
            
            // console.log(ligne)

            totalHtInt = totalHtInt + (ligne.qte * ligne.pu)
            totalTvaInt = totalTvaInt + ligne.tva
            totalTtcInt = totalHtInt + totalTvaInt 
            // console.log(totalHtInt)
        })

        setTotalHt(totalHtInt)
        setTotalTva(totalTvaInt)
        setTotalTtc(totalTtcInt)

        let requete : totaux = {
            totalht: totalHt,
            totaltva: totalTva,
            totalttc: totalTtc,
            element: props.id
        }

        let totaux = axios.post("/api/totaux/setdata", {
            data: requete,
        })


        const totauxunique = totauxTotal.find((totauxu : totaux) => String(totauxu.element) === String(props.id))

        console.log("---")
        console.log(totalHt)

        console.log(totauxunique)
        
    }, [lignes, props.id, totalHt, totalTtc, totalTva, totauxTotal])


    return (
        <div className="Totaux">
            <p>Total HT : {totalHt}</p>
            <p>TVA : {totalTva}</p>
            <p>Total TTC : {totalTtc}</p>
        </div>
    )
}

export default Totaux