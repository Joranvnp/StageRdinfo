import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import Corps from "../Corps";
import './CorpsLigne.css'
import crayon from '../../../Images/crayon.png'
import drag from '../../../Images/drag.png'
import corbeille from '../../../Images/envoyer-a-la-corbeille.png'
import valider from '../../../Images/valide.png'
import { useDispatch } from "react-redux";
import { delLigne } from "../../Redux/Reducers/ligne";
import { modLigne } from "../../Redux/Reducers/ligne";

type ligne = {
    id: string | null,
    element: string,
    desc: string,
    qte: number,
    remise: number,
    tva: number,
    pu: number,
    pr: number,
    cat: string,
    type: string
}

type requete = {
    id: string | null,
    element: string | null
}

function CorpsLigne(props: any) {

    const [modifLigne, setModifLigne] = useState(false)

    const [ligneDesc, setLigneDesc] = useState<string>("")
    const [ligneTva, setLigneTva] = useState<number>(0)
    const [lignePu, setLignePu] = useState<number>(0)
    const [ligneQte, setLigneQte] = useState<number>(0)
    const [ligneRemise, setLigneRemise] = useState<number >(0)
    const [lignePr, setLignePr] = useState<number>(0)
    const [ligneCat, setLigneCat] = useState<string>("")
    const [ligneType, setLigneType] = useState<string>("")

    // const [data, setData] = useState(props.data)

    const formulaire: any = useRef()


    useEffect(() => {
        setLigneDesc(props.data.desc)
        setLigneTva(props.data.tva)
        setLignePu(props.data.pu)
        setLigneQte(props.data.qte)
        setLigneRemise(props.data.remise)
        setLignePr(props.data.pr)
        setLigneCat(props.data.cat)
        setLigneType(props.data.type)
    }, [props.data])

    const dispatch = useDispatch()

    const deleteLigne = async (event: any) => {

        event.preventDefault()

        let id: string | null = event.currentTarget.getAttribute("value-id")

        let data: requete = {
            id: id,
            element: props.data.element
        }

        dispatch(delLigne(data))

        console.log(id)

    }

    const modifyLigne = async (event: any) => {
        event.preventDefault()

        // let id : string | null = event.currentTarget.getAttribute("value-id")

        // let data : requete = {
        //     id: id,
        //     element: props.data.element
        // }

        setModifLigne(true)

        // console.log(id)

    }

    const modifyValid = async (event: any) => {
        setModifLigne(false)

        let id : string | null = event.currentTarget.getAttribute("value-id")

        let data : ligne = {
            id: id,
            element: props.data.element,
            desc: ligneDesc,
            tva: ligneTva,
            pu: lignePu,
            qte: ligneQte,
            remise: ligneRemise,
            pr : lignePr,
            cat: ligneCat,
            type: "ligne"
        }

        dispatch(modLigne(data))
    }

    const handleLigneDesc = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLigneDesc(event.target.value)
    }

    const handleLigneTva = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLigneTva(Number(event.target.value))
    }

    const handleLignePu = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLignePu(Number(event.target.value))
    }

    const handleLigneQte = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLigneQte(Number(event.target.value))
    }

    const handleLigneRemise = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLigneRemise(Number(event.target.value))
    }

    const handleLignePR = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLignePr(Number(event.target.value))
    }

    const handleLigneCat = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLigneCat(event.target.value)
    }

    return (
        <div className="CorpsLigne">
            
            <div className="corpsligne-data">
                    {modifLigne ? (
                            <form ref={formulaire} onSubmit={modifyValid} className="corpsligne-data-ligne">
                                <input type="text" onChange={handleLigneDesc} value={ligneDesc}></input>
                                <input type="text" onChange={handleLigneTva} value={ligneTva}></input> 
                                <input type="text" onChange={handleLignePu} value={lignePu}></input>
                                <input type="text" onChange={handleLigneQte} value={ligneQte}></input>
                                <input type="text" onChange={handleLigneRemise} value={ligneRemise}></input>
                                <input type="text" onChange={handleLignePR} value={lignePr}></input>
                                <input type="text" onChange={handleLigneCat} value={ligneCat}></input>
                                <input type="text" value="Total HT"></input>
                                <div className="corpsligne-data-actions">
                                    <img value-id={props.data._id} onClick={modifyValid} className="corpsligne-data-actions" data-type="ligne" alt="valid-ligne" src={valider} ></img>

                                    <img className="corpsligne-data-actions" data-type="ligne" alt="drag-ligne" src={drag}></img>
                                </div>

                            </form>
                    ) : (
                        <div className="corpsligne-data-ligne">
                            <p>{props.data.desc}</p>
                            <p>{props.data.tva}</p>
                            <p>{props.data.pu}</p>
                            <p>{props.data.qte}</p>
                            <p>{props.data.remise}</p>
                            <p>{props.data.pr}</p>
                            <p>{props.data.cat}</p>
                            <p>Total HT</p>
                            <div className="corpsligne-data-actions">
                                <img value-id={props.data._id} onClick={modifyLigne} className="corpsligne-data-actions" data-type="ligne" alt="modif-ligne" src={crayon}></img>

                                <img value-id={props.data._id} onClick={deleteLigne} className="corpsligne-data-actions" data-type="ligne" alt="supp-ligne" src={corbeille} ></img>

                                <img className="corpsligne-data-actions" data-type="ligne" alt="drag-ligne" src={drag}></img>
                            </div>
                        </div>
                            
                    )}
            </div>
        </div>
    )
}

export default CorpsLigne