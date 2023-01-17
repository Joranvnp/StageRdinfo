import express, { Request, Response, IRouter } from 'express';
import usersdb from '../modeles/userdb';
import bcrypt from 'bcrypt';
import { ObjectID } from "bson";

const routeur: IRouter = express.Router()

type Users = {
    nom: string,
    prenom: string,
    email: string,
    login: string,
    password: string,
}

routeur.post('/create', async (req: Request, res: Response) => {
    let { nom, prenom, email, login, password } : Users = req.body.data

    console.log(nom)

    let saltCount : number = 10

    let salt : string = await bcrypt.genSaltSync(saltCount)

    let hashPassword : string = await bcrypt.hashSync(password, salt)

    usersdb.insertOne({
        nom: nom,
        prenom: prenom,
        email: email,
        login: login,
        password: hashPassword
    })

    res.json("ok")
})

routeur.get('/list', async (req: Request, res: Response) => {
    let listUsers : Array<string> = await usersdb.find({}).toArray()

    res.json(listUsers)
})

routeur.post('/deletebyid', async (req: Request, res: Response) => {
    usersdb.deleteOne({
        _id : new ObjectID(req.body.id)
    })

    res.json("ok")
})

routeur.get('/info', async (req: Request, res: Response) => {
    // console.log(req.user)
    res.json(req.user)
})

routeur.get('/islogged', async (req: Request, res: Response) => {
    if(req.isAuthenticated())
    {
        res.json(true)
    }
    else
    {
        res.json(false)
    }
})

export default routeur