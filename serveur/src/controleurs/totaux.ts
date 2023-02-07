import express, { Request, Response ,Express, IRouter } from 'express'
import tiersdb from '../modeles/tiersdb';
import totauxdb from '../modeles/totauxdb';
import { ObjectId } from 'bson';

const routeur: IRouter = express.Router()

type totaux = {
    totalht : number,
    totaltva: number,
    totalttc: number,
}

routeur.post('/setdata', async (req: Request, res: Response) => {

    // console.log("execute la requete")

    const { totalht , totaltva, totalttc, element } = req.body.data

    totauxdb.updateOne({"element": new ObjectId(element)},{$set: {
        totalht: totalht,
        totaltva : totaltva,
        totalttc: totalttc,
    }})

    let totaux = await totauxdb.findOne({"element": new ObjectId(element)})

    res.json(totaux)

    // console.log(req.body.data)
})

routeur.post('/list', async (req: Request, res : Response) => {

    let totaux = await totauxdb.findOne({"element": new ObjectId(req.body.id)})

    res.json(totaux)

})
export default routeur