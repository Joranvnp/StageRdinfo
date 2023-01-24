"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const userdb_1 = __importDefault(require("../modeles/userdb"));
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
passport_1.default.use(new passport_local_1.Strategy({
    usernameField: 'login',
    passwordField: 'password',
}, (login, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    let userdatabase = yield userdb_1.default.findOne({ "login": login });
    if (userdatabase === null) {
        done(null, false);
    }
    else {
        let resultat = yield bcrypt_1.default.compare(password, userdatabase.password);
        if (resultat === true) {
            done(null, userdatabase);
        }
        else {
            done(null, false);
        }
    }
})));
passport_1.default.serializeUser((user, done) => {
    // done(null, user._id)
    let userInfos = {
        id: user._id,
        date: new Date()
    };
    // console.log(userInfos)
    done(null, userInfos);
});
passport_1.default.deserializeUser((userInfos, done) => __awaiter(void 0, void 0, void 0, function* () {
    /*
    let userdata = await usersdb.findOne({ "_id": new ObjectId(userInfos.id)})

    let usergen : any = {
        id: userdata._id,
        nom: userdata.nom,
        prenom: userdata.prenom,
        email: userdata.email,
        login: userdata.login,
        date: userInfos.date
    }

    // console.log(userdata)
    done(null, usergen)*/
}));
exports.default = passport_1.default;
//# sourceMappingURL=auth.js.map