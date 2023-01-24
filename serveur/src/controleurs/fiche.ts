import express, { Request, Response ,Express, IRouter } from 'express'

const routeur: IRouter = express.Router()

routeur.get('/liste', async(req:Request, res: Response) => {
    console.log("salut")
})