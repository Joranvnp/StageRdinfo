import React, {useState , useRef } from "react"
import "./CorpsLigneAdd.css"
import { useDispatch } from "react-redux"
import { addLigne } from "../../Redux/Reducers/ligne"
import Corps from "../Corps"

type Ligne = {
    element : string,
    desc : string,
    qte: number,
    remise : number,
    tva: number | null,
    pu: number,
    pr: number | null,
    cat: string,
    type: string,
}

function CorpsLigneAdd (props:any)
{
    const dispatch = useDispatch()
    const formulaire: any = useRef()

    const [ligneDesc, setligneDesc] = useState<string>("")
    const [ligneTva, setligneTva] = useState<number | null>(null)
    const [ligneQte, setligneQte] = useState<number>(0)
    const [ligneRemise, setligneRemise] = useState<number>(0)
    const [lignePu, setlignePu] = useState<number>(0)
    const [lignePr, setlignePr] = useState<number | null >(null)
    const [ligneCat, setligneCat] = useState<string >("")
    
    const handleLigneDesc = (event : React.ChangeEvent<HTMLTextAreaElement>) => {
        setligneDesc(event.target.value)
    }

    const handleLigneTva = (event : React.ChangeEvent<HTMLSelectElement>) => {
        setligneTva(Number(event.target.value))
    }

    const handleLignePu = (event : React.ChangeEvent<HTMLInputElement>) => {
        setlignePu(Number(event.target.value))
    }

    const handleLigneQte = (event : React.ChangeEvent<HTMLInputElement>) => {
        setligneQte(Number(event.target.value))
    }

    const handleLigneCat = (event :React.ChangeEvent<HTMLSelectElement>) => {
        setligneCat(event.target.value)
    }

    const handleLigneRemise = (event : React.ChangeEvent<HTMLInputElement>) => {
        setligneRemise(Number(event.target.value))
    }

    const handleLignePR = (event : React.ChangeEvent<HTMLInputElement>) => {
        setlignePr(Number(event.target.value))
    }

    const insertLigne = async (event: any) => {

        event.preventDefault()

        let requete : Ligne = {
            element: props.element,
            desc: ligneDesc,
            tva: ligneTva,
            qte: ligneQte,
            remise :ligneRemise,
            pu: lignePu,
            pr: lignePr,
            cat : ligneCat,
            type: "ligne",
        } 

        //Ajouter la ligne
        dispatch(addLigne(requete))
        
        //Reset Formulaire
        setligneDesc("")
        setligneTva(null)
        setligneQte(0)
        setligneCat("")       
        setlignePu(0)
        formulaire.current.reset()
    }

    return (
        <form ref={formulaire} onSubmit={insertLigne} className="CorpsLigneAdd">
            <div className="corpsligneadd-type">
                <p> Type de ligne </p>
                <select onChange={handleLigneCat}>
                    <option> Choisir Type Ligne </option> 
                    <option value="produit"> Produit </option>
                    <option value="service"> Service </option>
                </select>
            </div>
            <div className="corpsligneadd-data">
                <textarea placeholder="Description" onChange={handleLigneDesc}></textarea>
                <select onChange={handleLigneTva}>
                    <option> Choisir TVA </option>
                    <option value={0}>0%</option>
                    <option value={0.10}>10%</option>
                    <option value={0.05}>5%</option>
                    <option value={0.20}>20%</option> 
                </select>
                <input type="text" placeholder="p.unitaire" onChange={handleLignePu}></input>
                <input type="text" placeholder="qte≠ 0" onChange={handleLigneQte}></input>
                <input type="text" placeholder="remise" onChange={handleLigneRemise}></input>
                <input type="text" placeholder="p.revient" onChange={handleLignePR}></input>
                {ligneDesc && ligneQte && ligneTva && lignePu ?
                    (
                        <div className="corpsligneadd-data-actions">
                            <input type="submit" value="ajouter"></input>
                        </div> 
                    ):null                 
                }
            </div>
        </form>
    )
}

export default CorpsLigneAdd