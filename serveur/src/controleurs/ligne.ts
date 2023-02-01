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
routeur.get('/liste', async(req: Request, res: Response) => {
    let listeLigne : Array<ligne> = await lignedb.find({}).toArray()

    res.json(listeLigne)
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

        let lignes : Array<ligne> = await lignedb.find({}).toArray()

        res.json(lignes)

        console.log(lignes)
    }

})

export default routeur