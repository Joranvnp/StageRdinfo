import express, { IRouter, NextFunction, Request, response, Response,  } from "express";
import React from "react";
import pdfkit from "pdfkit"
import doc from "pdfkit";
import fs from "fs"
import { width } from "pdfkit/js/page";
import devisdb from "../modeles/devisdb";
import { type } from "os";
import { ObjectID } from "bson";
// import blobStream from "blob-stream"
// import Iframe from 'react-iframe'

const routeur: IRouter = express.Router()

type devis = {
    _id: ObjectID,
    ref: string,
    status: string,
    client: string,
    date: string,
    dureeValid: string,
    conditionReg: string,
    modeReglement: string,
    dateLivraison: string
}

routeur.post("/create", async(req: Request, res: Response) => {

    const { client, date, dureeValid, conditionReg, modeReglement, dateLivraison} = req.body.data

    let listeDevis : Array<devis> = await devisdb.find({}).toArray()

    let nbdevis : number = Number(listeDevis.length) + Number(1)

    let code : string = String(nbdevis).padStart(2, "0")

    let codeFinal = "PROV"+code

    console.log(response)
    console.log(listeDevis.length)

    let resultat = await devisdb.insertOne({
        code : codeFinal,
        status: "brouillon",
        client: client,
        date: date,
        dureeValid: dureeValid, 
        conditionReg: conditionReg, 
        modeReglement: modeReglement,
        dateLivraison: dateLivraison
    })

    console.log(resultat)
    console.log("salut")

    res.json(resultat.insertedId)
})

routeur.get("/liste", async(req:Request, res: Response) => {
    let listeDevis : Array<devis> = await devisdb.find({}).toArray()

    res.json(listeDevis)

    console.log(listeDevis)
})

routeur.post("/genpdf", async(req: Request, res: Response, next: NextFunction) => {
    console.log("salut")

    const doc: any = new pdfkit()

    doc.pipe(fs.createWriteStream('/var/appli/serveur/documents/devis.pdf'))

    let filename = req.body.filename

    filename = encodeURIComponent(filename)+'.pdf'

    res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"')
    res.setHeader('Content-type', 'application/pdf')
    // const content = req.body.content
    
    doc.pipe(fs.createWriteStream(filename))

    doc.text("Joran", 100, 100)

    doc.pipe(res)

    doc.end()

    // const file = fs.createReadStream(filename)

    // stream.on('finish', function() {
    //     const blob = stream.toBlob('/var/appli/serveur/documents/devis.pdf')

    //     const url = stream.toBlobUrl('/var/appli/serveur/documents/devis.pdf')
    //     // iframe.src = url
    // })
})

routeur.get("/getpdf", (req: Request, res: Response) => {

    const path : string = "/var/appli/serveur/documents/devis.pdf"
    if(fs.existsSync(path))
    {
        var file : any = fs.createReadStream(path)
        var stat: any = fs.statSync(path);
        res.setHeader('Content-Length', stat.size);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
        file.pipe(res);
    }
    else
    {
        res.json('NOTPDF')
    }
})

export default routeur