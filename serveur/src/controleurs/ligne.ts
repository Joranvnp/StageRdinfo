import { ObjectId } from 'bson';
import express, { Request, Response, IRouter, NextFunction } from 'express';
import lignedb from '../modeles/lignedb';

const routeur: IRouter = express.Router()

type ligne = {
    id: string | null,
    element: string,
    desc: string,
    qte: number,
    remise: number,
    tva: number | null,
    pu: number,
    pr: number | null,
    cat: string,
    type: string
}

routeur.post('/listebyid', async(req:Request, res:Response) => {

    let reponse : any = await lignedb.find({
        element : req.body.data,
    }).toArray()

    res.json(reponse)
})

routeur.post('/ajout', async(req: Request, res: Response) => {
    const { element, desc, qte, remise, tva, pu, pr, cat, type } = req.body.data

    if (req.body.data)
    {
        let ligne = await lignedb.insertOne({
            element: element,
            desc: desc,
            tva: tva,
            qte: qte,
            remise: remise,
            pu: pu,
            pr: pr,
            cat: cat,
            type: type
        })        

        let lignes : Array<ligne> = await lignedb.find({"element": element}).toArray()

        res.json(lignes)
    }

})

routeur.post('/supprimerbyid', async(req:Request, res:Response) => {
    const { id, element } = req.body.data

    await lignedb.deleteOne({"_id" : new ObjectId(id)})

    let lignes : Array<ligne> = await lignedb.find({"element": element}).toArray()

    res.json(lignes)
})

routeur.post('/modifierbyid', async(req:Request, res:Response) => {
    const { id, element, desc, tva, pu, qte, remise, pr, cat, type } = req.body.data

    let reponse = await lignedb.updateOne({
        "_id" : new ObjectId(id)
    }, {
        $set:{
            desc: desc,
            tva: tva,
            pu: pu,
            qte: qte,
            remise: remise,
            pr: pr,
            cat: cat,
            type: type
        }
    })

    console.log(id)

    let lignes : Array<ligne> = await lignedb.find({"element": element}).toArray()

    res.json(lignes)
})

export default routeur