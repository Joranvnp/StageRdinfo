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

// //Authentication
import passport from "./controleurs/auth"
app.use(passport.initialize())
app.use(passport.session())

//API
import login from './controleurs/login'
app.use("/api/login", login)

import user from './controleurs/user'
app.use("/api/user", user)

app.listen(port, () => {
    console.log("Le serveur tourne sur le port" + port)
})
