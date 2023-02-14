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
const bson_1 = require("bson");
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
    done(null, userInfos);
});
passport_1.default.deserializeUser((userInfos, done) => __awaiter(void 0, void 0, void 0, function* () {
    let userdata = yield userdb_1.default.findOne({ "_id": new bson_1.ObjectId(userInfos.id) });
    if (userdata) {
        let usergen = {
            id: userdata._id,
            nom: userdata.nom,
            prenom: userdata.prenom,
            email: userdata.email,
            login: userdata.login,
            date: userInfos.date
        };
        done(null, usergen);
    }
    else {
        done("Utilisateur non trouvé", null);
    }
}));
exports.default = passport_1.default;
//# sourceMappingURL=auth.js.map