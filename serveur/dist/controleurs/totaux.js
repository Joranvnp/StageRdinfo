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
const totauxdb_1 = __importDefault(require("../modeles/totauxdb"));
const bson_1 = require("bson");
const routeur = express_1.default.Router();
routeur.post('/setdata', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("execute la requete")
    const { totalht, totaltva, totalttc, element } = req.body.data;
    totauxdb_1.default.updateOne({ "element": new bson_1.ObjectId(element) }, { $set: {
            totalht: totalht,
            totaltva: totaltva,
            totalttc: totalttc,
        } });
    let totaux = yield totauxdb_1.default.findOne({ "element": new bson_1.ObjectId(element) });
    res.json(totaux);
    // console.log(req.body.data)
}));
routeur.post('/list', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let totaux = yield totauxdb_1.default.findOne({ "element": new bson_1.ObjectId(req.body.id) });
    res.json(totaux);
}));
exports.default = routeur;
//# sourceMappingURL=totaux.js.map