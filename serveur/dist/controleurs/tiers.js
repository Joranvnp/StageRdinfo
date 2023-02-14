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
const tiersdb_1 = __importDefault(require("../modeles/tiersdb"));
const bson_1 = require("bson");
const routeur = express_1.default.Router();
routeur.post('/creertiers', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nom, prenom, code, adresse, adresse2, codepostal, ville, pays, departement, telephone, email, type, commercial } = req.body.data;
    let alltiers = yield tiersdb_1.default.find({}).toArray();
    let nbtiers = alltiers.length;
    function getcode(nbtiers, data, codedepart) {
        if (nbtiers === 0) {
            let depart = codedepart;
            return depart;
        }
        else {
            let depart = Number(data[nbtiers - 1].code.split("-")[1]) + 1;
            return depart;
        }
    }
    let codedepart = 1000;
    let codeint = getcode(nbtiers, alltiers, codedepart);
    codeint = Number(codeint);
    let tiers = yield tiersdb_1.default.findOne({ "nom": nom.toLocaleLowerCase() });
    if (tiers) {
        res.json("existe");
    }
    else {
        tiersdb_1.default.insertOne({
            nom: nom.toLocaleLowerCase(),
            prenom: prenom,
            adresse: adresse,
            adresse2: adresse2,
            codepostal: codepostal,
            ville: ville,
            pays: pays,
            departement: departement,
            telephone: telephone,
            email: email,
            type: type,
            commercial: commercial,
        }, (erreur, client) => __awaiter(void 0, void 0, void 0, function* () {
            let id = client.insertedId;
            let date = new Date().toLocaleDateString();
            let jour = date.substr(0, 2);
            let mois = date.substr(3, 2);
            let codefinal = "CU" + jour + mois + "-" + codeint;
            tiersdb_1.default.updateOne({ "_id": new bson_1.ObjectId(id) }, {
                $set: { code: codefinal }
            });
            let data = yield tiersdb_1.default.findOne({ "_id": new bson_1.ObjectId(id) });
            res.json('ok');
        }));
    }
}));
routeur.get('/listetiers', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let listeTiers = yield tiersdb_1.default.find({}).toArray();
    res.json(listeTiers);
}));
routeur.post('/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let search = req.body.search;
    let client = yield tiersdb_1.default.find({ "nom": { $regex: search.toLocaleLowerCase() + ".*" } }).toArray();
    res.json(client);
}));
routeur.post('/modifier', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let reponse = yield tiersdb_1.default.findOne({
        _id: new bson_1.ObjectId(req.body.id)
    });
    res.json(reponse);
}));
routeur.post('/supprimer', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    tiersdb_1.default.deleteOne({
        _id: new bson_1.ObjectId(req.body.id)
    });
    res.json("ok");
}));
exports.default = routeur;
//# sourceMappingURL=tiers.js.map