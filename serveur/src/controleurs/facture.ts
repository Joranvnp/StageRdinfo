import { ResolveOptions } from "dns";
import express, { IRouter, Request, Response } from "express";
import facturedb from "../modeles/facturedb";
import { ObjectId } from "bson";

const routeur : IRouter = express.Router()

routeur.post("/create", async(req: Request, res: Response) => {

    if(req.body.data)
    {
        const { client, type } = req.body.data

        let facture = await facturedb.insertOne({ 
            client: client,
            type: type
        })

        res.json(facture)

    } else {
        console.log("erreur")
    }

})

routeur.get("/list", async(req:Request, res:Response) => {
    
    let listeFacture : Array<string> = await facturedb.find({}).toArray()

    res.json(listeFacture)
})

routeur.post("/editbyid", async(req:Request, res:Response) => {

    const { id } = req.body.data

    let reponse = await facturedb.findOne({
        "_id" : new ObjectId(id),
    })

    res.json(reponse)
})

export default routeur