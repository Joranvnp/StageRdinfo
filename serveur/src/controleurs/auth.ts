import express, { Request, Response, IRouter } from "express"
import bcrypt from "bcrypt";
import usersdb from '../modeles/userdb';
import passport from "passport";
import { Strategy as localStrategy } from 'passport-local';
import { ObjectID, ObjectId } from "bson";

type userobject = {
    _id: string,
    nom: string,
    prenom: string,
    email: string,
    login: string,
    password: string,
}

passport.use(new localStrategy({
    usernameField: 'login',
    passwordField: 'password',
}, async (login, password, done) => {
    let userdatabase: userobject | null = await usersdb.findOne({ "login": login })
    if (userdatabase === null) {
        done(null, false)
    }
    else {
        let resultat: Boolean = await bcrypt.compare(password, userdatabase.password)
        if (resultat === true) {
            done(null, userdatabase)
        }
        else {
            done(null, false)
        }
    }
}))

passport.serializeUser((user: any, done: any) => {
    // done(null, user._id)

    type userInfo = {
        id : ObjectId,
        date: Date
    }

    let userInfos: userInfo = {
        id: user._id,
        date: new Date()
    }

    done(null, userInfos)
})

passport.deserializeUser(async (userInfos: any, done: any) => {
    
    let userdata = await usersdb.findOne({ "_id": new ObjectId(userInfos.id)})

    if (userdata) {
        let usergen : any = {
            id: userdata._id,
            nom: userdata.nom,
            prenom: userdata.prenom,
            email: userdata.email,
            login: userdata.login,
            date: userInfos.date
        }

        done(null, usergen)
    } else {
        done("Utilisateur non trouvé", null)
    }
    
})

export default passport