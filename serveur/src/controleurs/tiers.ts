import express, { Request, Response ,Express, IRouter } from 'express'
import tiersdb from '../modeles/tiersdb';
import { ObjectId } from "bson";

const routeur: IRouter = express.Router()

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

routeur.post('/creertiers', async(req:Request, res: Response) => {

    const { nom, prenom, code, adresse, adresse2, codepostal, ville, pays, departement, telephone, email, type, commercial} = req.body.data;

    let alltiers : Array<tiers> = await tiersdb.find({}).toArray()

    let nbtiers = alltiers.length

    function getcode(nbtiers : number, data : Array<tiers>, codedepart: number)
    {
        if(nbtiers === 0)
        {
            let depart = codedepart
            return depart
        }
        else
        {
            let depart = Number(data[nbtiers - 1].code.split("-")[1]) + 1 
            return depart
        }
    }

    let codedepart: number = 1000
    let codeint : any = getcode(nbtiers,alltiers,codedepart)
    codeint = Number(codeint)

    let tiers = await tiersdb.findOne({"nom" : nom.toLocaleLowerCase()})

    if(tiers)
    {
        res.json("existe")
    } 
    else {

        tiersdb.insertOne({
            nom: nom.toLocaleLowerCase(),
            prenom: prenom,
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
        }, async(erreur : any, client: any) => {

            let id = client.insertedId
            let date = new Date().toLocaleDateString()
            let jour = date.substr(0,2)
            let mois = date.substr(3,2)

            let codefinal = "CU" + jour + mois + "-" + codeint

            tiersdb.updateOne({"_id": new ObjectId(id)},{
                $set : {code: codefinal}
            })

            let data : tiers = await tiersdb.findOne({"_id": new ObjectId(id)})

            res.json('ok')

        });
    }
})

routeur.get('/listetiers', async (req:Request, res: Response) => {
    let listeTiers : Array<tiers> = await tiersdb.find({}).toArray()

    res.json(listeTiers)
})

routeur.post('/search', async (req: Request, res: Response) => {

    let search : string = req.body.search

    let client = await tiersdb.find({"nom": {$regex: search.toLocaleLowerCase() + ".*"}}).toArray()
    res.json(client)
})

routeur.post('/modifier', async (req: Request, res:Response) => {
    let reponse = await tiersdb.findOne({
        _id : new ObjectId(req.body.id)
    })

    res.json(reponse)
})


routeur.post('/supprimer', async (req: Request, res: Response) => {
    tiersdb.deleteOne({
        _id : new ObjectId(req.body.id)
    })

    res.json("ok")
})


export default routeur