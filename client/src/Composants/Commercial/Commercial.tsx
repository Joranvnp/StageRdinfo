import axios from "axios";
import React from "react";
import MenuComm from "./MenuComm/MenuComm";
import './Commercial.css'

function Commercial() {

    // const genPdf = async () => {
    //     let reponse = await axios.post("/api/devis/genpdf", {
    //         data: Response
    //     })

    //     console.log(reponse.data)
    // }

    // const displayPdf = () => {

    //     axios.get('/api/devis/getpdf', {
    //         responseType:"blob",
    //     }).then(reponse => {

    //         const file : any = new Blob([reponse.data], {type:'application/pdf'})

    //         const fileurl : any = URL.createObjectURL(file)

    //         window.open(fileurl)
    //     })

    // }

    // const downloadPdf = () => {
    //     axios.get('/api/devis/')
    // }

    return (
        <div className="Commercial">
            <MenuComm></MenuComm>
            <div className="commercial-data">
                <h2>Commercial Devis et Facture : </h2>
                {/* <h2>PDF :</h2> */}
                {/* <button onClick={genPdf}>Générer un pdf</button><br></br>
                <button onClick={displayPdf}>Ouvrir le pdf dans un nouvel onglet</button>
                <button onClick={downloadPdf}>Supprimer le pdf</button> */}
            </div>
        </div>
    )
}

export default Commercial