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
const express_1 = __importDefault(require("express"));
const userdb_1 = __importDefault(require("../modeles/userdb"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const bson_1 = require("bson");
const routeur = express_1.default.Router();
routeur.post('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { nom, prenom, email, login, password } = req.body.data;
    console.log(nom);
    let saltCount = 10;
    let salt = yield bcrypt_1.default.genSaltSync(saltCount);
    let hashPassword = yield bcrypt_1.default.hashSync(password, salt);
    userdb_1.default.insertOne({
        nom: nom,
        prenom: prenom,
        email: email,
        login: login,
        password: hashPassword
    });
    res.json("ok");
}));
routeur.get('/list', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let listUsers = yield userdb_1.default.find({}).toArray();
    res.json(listUsers);
}));
routeur.post('/deletebyid', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    userdb_1.default.deleteOne({
        _id: new bson_1.ObjectID(req.body.id)
    });
    res.json("ok");
}));
routeur.get('/info', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.user)
    res.json(req.user);
}));
routeur.get('/islogged', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.isAuthenticated()) {
        res.json(true);
    }
    else {
        res.json(false);
    }
}));
exports.default = routeur;
//# sourceMappingURL=user.js.map