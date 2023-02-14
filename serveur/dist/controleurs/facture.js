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
const facturedb_1 = __importDefault(require("../modeles/facturedb"));
const bson_1 = require("bson");
const routeur = express_1.default.Router();
routeur.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.data) {
        const { client, type } = req.body.data;
        let facture = yield facturedb_1.default.insertOne({
            client: client,
            type: type
        });
        res.json(facture);
    }
    else {
        console.log("erreur");
    }
}));
routeur.get("/list", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let listeFacture = yield facturedb_1.default.find({}).toArray();
    res.json(listeFacture);
}));
routeur.post("/editbyid", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, client, type } = req.body.data;
    let reponse = yield facturedb_1.default.updateOne({
        "_id": new bson_1.ObjectId(id)
    }, {
        $set: {
            client: client,
            type: type
        }
    });
    console.log("salut");
    res.json(reponse);
}));
exports.default = routeur;
//# sourceMappingURL=facture.js.map