import './DocGen.css'
import axios from "axios"
import pdf from "../../Images/pdf.png"
import loupe from "../../Images/loupe.png"
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../Redux/store'

type devis = {
    _id : string,
    status: string,
    code: string,
    clientid: string | null,
    date: string,
    dureevalid: string,
    conditionreg: string,
    modereglement: string,
    datelivraison: string
} | undefined

function DocGen (props : any) 
{
    const [devisCode, setDevisCode] = useState<string>("")

    const genPDF = () => {
        axios.post('/api/devis/genpdf', {
            id : props.id
        }).then(reponse => {
            if(reponse.data === "ok")
            {
                alert("LE PDF a été généré")
            }
            else
            {
                alert("ERREUR")
            }
        })
    }
    
    const downloadPDF = () => {
        axios.get('/api/devis/downloadpdf',{
            responseType:"blob",
        }).then(reponse => {
    
            const file : any = new Blob([reponse.data], {type:'application/pdf'})
    
            const fileurl : any  = URL.createObjectURL(file)
    
            let alink : any = document.createElement('a');
            alink.href = fileurl;
            alink.download = 'PR20202304.pdf';
            alink.click();
            
        })
    }
    
    const displayPDF = () => {
    
        let id : string = props.id

        axios.get('/api/devis/getpdf', {
            params: {
                id : id
            },
            responseType:"blob",
        }).then(reponse => {
                        
            const file : any = new Blob([reponse.data], {type:'application/pdf'})
    
            const fileurl: any = URL.createObjectURL(file)
    
            window.open(fileurl)
        })
    }

    const devis : Array<devis> = useSelector((state : RootState) => state.devis.data)

    useEffect(() => {

        let id : string = props.id

       
        if (devis) {
            let devisunique : devis = devis.find((devisu : any) => String(devisu._id) === String(id))


            if (devisunique)
            {
                setDevisCode(devisunique.code)

            }
        }
        console.log(devis)
    },[props.id, devis])

    return (
        <div className="DocGen">
            <div className="docgen-titre">
                <p> Document PDF </p> 
                <button onClick={genPDF}> Générer </button>
            </div>
            <div className="docgen-data">
                <img alt="pdfdocgen" className="docgen-data-pdf" onClick={downloadPDF} src={pdf}></img>
                <p> {devisCode} </p>
                <img alt="loupedocgen" className="docgen-data-loupe" onClick={displayPDF} src={loupe}></img>
            </div>
        </div>
    )
}

export default DocGen