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
const bson_1 = require("bson");
const express_1 = __importDefault(require("express"));
const lignedb_1 = __importDefault(require("../modeles/lignedb"));
const routeur = express_1.default.Router();
routeur.post('/listebyid', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let reponse = yield lignedb_1.default.find({
        element: req.body.data,
    }).toArray();
    res.json(reponse);
}));
routeur.post('/ajout', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { element, desc, qte, remise, tva, pu, pr, cat, type } = req.body.data;
    if (req.body.data) {
        let ligne = yield lignedb_1.default.insertOne({
            element: element,
            desc: desc,
            tva: tva,
            qte: qte,
            remise: remise,
            pu: pu,
            pr: pr,
            cat: cat,
            type: type
        });
        let lignes = yield lignedb_1.default.find({ "element": element }).toArray();
        res.json(lignes);
    }
}));
routeur.post('/supprimerbyid', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, element } = req.body.data;
    yield lignedb_1.default.deleteOne({ "_id": new bson_1.ObjectId(id) });
    let lignes = yield lignedb_1.default.find({ "element": element }).toArray();
    res.json(lignes);
}));
routeur.post('/modifierbyid', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, element, desc, tva, pu, qte, remise, pr, cat, type } = req.body.data;
    let reponse = yield lignedb_1.default.updateOne({
        "_id": new bson_1.ObjectId(id)
    }, {
        $set: {
            desc: desc,
            tva: tva,
            pu: pu,
            qte: qte,
            remise: remise,
            pr: pr,
            cat: cat,
            type: type
        }
    });
    console.log(id);
    let lignes = yield lignedb_1.default.find({ "element": element }).toArray();
    res.json(lignes);
}));
exports.default = routeur;
//# sourceMappingURL=ligne.js.map