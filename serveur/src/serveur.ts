import express, { Express, Request, Response } from "express"
import cors from 'cors'
import path from "path"
import https from "https"
import dotenv from "dotenv"
import http from "http"
import fs from "fs"

//Importer les fichiers env
dotenv.config()

//Application
const app: Express = express()

//Ports
const port: String | Number = process.env.port || 5000

//Middleware
app.use(cors())
app.use(express.json())


//SESSION
import session from "./controleurs/session"
app.use(session)

//Authentication
import passport from "./controleurs/auth"
app.use(passport.initialize())
app.use(passport.session())

import authenticate from "./controleurs/protected"

//API
import login from './controleurs/login'
app.use("/api/login", login)

import user from './controleurs/user'
app.use("/api/user", user)

import logout from './controleurs/logout'
app.use("/api/logout", logout)

//Mise en place du dossier Statique
app.use(express.static(path.join(__dirname, '../../client/build')));

//Pages non authentifi´ees
app.get('/', function (req : Request, res: Response) {
    res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
    });

//Pages authentifi´ees
app.get('/*', authenticate, function (req: Request, res: Response) {
    res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
})

//Ecoute sur le port 5000 HTTPS
const options: any = {
    cert: fs.readFileSync("/var/appli/serveur/certificats/fullchain.pem"),
    key: fs.readFileSync("/var/appli/serveur/certificats/privkey.pem"),
}

const httpsserver = https.createServer(options,app)

httpsserver.listen(5000, () => {
    console.log("Le serveur HTTPS tourne sur le port " + port)
})
