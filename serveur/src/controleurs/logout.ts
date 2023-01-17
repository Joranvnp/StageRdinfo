import express, { Request, Response, IRouter, NextFunction } from 'express';
import passport from 'passport';

const routeur : IRouter = express.Router()

routeur.post('/', async(req: Request, res: Response) => {
    req.session.destroy(() => {
        res.json("ok")
    })
})

export default routeur