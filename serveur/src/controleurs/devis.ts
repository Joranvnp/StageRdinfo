import React from "react";
import express, { IRouter, NextFunction, Request, Response } from "express";
import pdfkit from "pdfkit"
import fs from "fs"
import devisdb from "../modeles/devisdb";
import { ObjectId } from "bson";
import tiersdb from "../modeles/tiersdb";
// import blobStream from "blob-stream"
// import Iframe from 'react-iframe'

const routeur: IRouter = express.Router()

type devis = {
    _id: ObjectId,
    ref: string,
    status: string,
    client: string,
    date: string,
    dureeValid: string,
    conditionReg: string,
    modeReglement: string,
    dateLivraison: string
}

type tiers = {
    _id: ObjectId,
    code: string,
    nom: string,
    prenom: string
    adresse: string,
    adresse2: string,
    codepostal: string,
    ville: string,
    pays: string,
    departement: string,
    telephone:string,
    email:string,
    type: string,
    commercial: string
}
routeur.post("/create", async(req: Request, res: Response) => {

    const { clientid, date, dureevalid, conditionreg, modereglement, datelivraison} = req.body.data

    let listeDevis : Array<devis> = await devisdb.find({}).toArray()

    let infosClient: tiers = await tiersdb.findOne({"_id": new ObjectId(clientid)})

    let nbdevis : number = Number(listeDevis.length) + Number(1)

    let code : string = String(nbdevis).padStart(2, "0")

    let codeFinal = "PROV"+code

    console.log(infosClient)

    let resultat = await devisdb.insertOne({
        code : codeFinal,
        status: "brouillon",
        client: infosClient,
        date: date,
        dureevalid: dureevalid, 
        conditionreg: conditionreg, 
        modereglement: modereglement,
        datelivraison: datelivraison
    })

    res.json(resultat.insertedId)
})

routeur.get("/liste", async(req:Request, res: Response) => {
    let listeDevis : Array<devis> = await devisdb.find({}).toArray()

    res.json(listeDevis)
})

routeur.post("/listebyid", async(req:Request, res:Response) => {

    let infosDevisById = await devisdb.findOne({
        "_id": new ObjectId(req.body.id),
    })

    res.json(infosDevisById)

    
})

routeur.post("/modifier", async(req:Request, res: Response) => {
    const { id } = req.body.data

    let reponse = await devisdb.find({
        "_id" : new ObjectId(id),
    })

    res.json(reponse)
})

routeur.post("/genpdf", async(req: Request, res: Response, next: NextFunction) => {

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