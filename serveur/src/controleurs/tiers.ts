import express, { Request, Response ,Express, IRouter } from 'express'
import tiersdb from '../modeles/tiersdb';
import { ObjectID } from "bson";

const routeur: IRouter = express.Router()

type tiers = {
    _id: ObjectID,
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

routeur.post('/creertiers', async(req:Request, res: Response) => {
    // console.log("salut")

    const { nom, prenom, adresse, adresse2, codepostal, ville, pays, departement, telephone, email, type, commercial } = req.body.data;

    let tiers = await tiersdb.findOne({"tiers" : nom})

    if(tiers)
    {
        res.json("existe")
    } else {
        tiersdb.insertOne({
            nom: nom.toLocaleLowerCase(),
            prenom: prenom,
            // code: code,  
            adresse: adresse,
            adresse2: adresse2,
            codepostal: codepostal,
            ville: ville,
            pays: pays,
            departement: departement,
            telephone: telephone,
            email: email,
            type: type,
            commercial: commercial,
        });
    }
    
    res.json("ok")
})

routeur.get('/listetiers', async (req:Request, res: Response) => {
    let listeTiers : Array<tiers> = await tiersdb.find({}).toArray()

    res.json(listeTiers)

    // console.log(listeTiers)
})

routeur.post('/search', async (req: Request, res: Response) => {

    let search : string = req.body.search

    let client = await tiersdb.find({"nom": {$regex: search.toLocaleLowerCase() + ".*"}}).toArray()

    console.log(client)

    res.json(client)
})

export default routeur