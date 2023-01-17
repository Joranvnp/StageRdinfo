import express, { IRouter } from "express"
import session from "express-session"
import { default as connectMongoDBSession } from 'connect-mongodb-session';


const routeur: IRouter = express.Router()
const mongoDBStore = connectMongoDBSession(session)

const store = new mongoDBStore({
    uri: "mongodb://" + process.env.DB_USER + ":" + process.env.DB_PASS +"@" + process.env.DB_HOST + "/" + process.env.DB_NAME,
    collection: "sessions",
})

console.log(process.env.DB_USER)

routeur.use(session({
    secret: process.env.ACCESS_SESSION_SECRET as string,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        httpOnly: true,
        sameSite: "strict",
        secure: false,
        maxAge: 24 * 60 * 60 * 1000
    }
}));

export default routeur