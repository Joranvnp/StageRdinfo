import express, { Request, Response, IRouter, NextFunction } from 'express';
import passport from 'passport';

const routeur: IRouter = express.Router()

type User = {
    login: string,
    password: string
}

routeur.post('/check', async(req: Request, res: Response, next: NextFunction) => {

    passport.authenticate('local', (err, user) => {
        req.logIn(user, err => {
            if(user)
            {
                res.json("ok")
            }
            else
            {
                res.json("n ok")
            }
        })

    })(req, res, next)
    
})

export default routeur