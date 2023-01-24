"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express_1 = __importStar(require("express"));
const pdfkit_1 = __importDefault(require("pdfkit"));
const fs_1 = __importDefault(require("fs"));
const devisdb_1 = __importDefault(require("../modeles/devisdb"));
// import blobStream from "blob-stream"
// import Iframe from 'react-iframe'
const routeur = express_1.default.Router();
routeur.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { client, date, dureeValid, conditionReg, modeReglement, dateLivraison } = req.body.data;
    let listeDevis = yield devisdb_1.default.find({}).toArray();
    let nbdevis = Number(listeDevis.length) + Number(1);
    let code = String(nbdevis).padStart(2, "0");
    let codeFinal = "PROV" + code;
    console.log(express_1.response);
    console.log(listeDevis.length);
    let resultat = yield devisdb_1.default.insertOne({
        code: codeFinal,
        status: "brouillon",
        client: client,
        date: date,
        dureeValid: dureeValid,
        conditionReg: conditionReg,
        modeReglement: modeReglement,
        dateLivraison: dateLivraison
    });
    console.log(resultat);
    console.log("salut");
    res.json(resultat.insertedId);
}));
routeur.get("/liste", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let listeDevis = yield devisdb_1.default.find({}).toArray();
    res.json(listeDevis);
    console.log(listeDevis);
}));
routeur.post("/genpdf", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("salut");
    const doc = new pdfkit_1.default();
    doc.pipe(fs_1.default.createWriteStream('/var/appli/serveur/documents/devis.pdf'));
    let filename = req.body.filename;
    filename = encodeURIComponent(filename) + '.pdf';
    res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
    res.setHeader('Content-type', 'application/pdf');
    // const content = req.body.content
    doc.pipe(fs_1.default.createWriteStream(filename));
    doc.text("Joran", 100, 100);
    doc.pipe(res);
    doc.end();
    // const file = fs.createReadStream(filename)
    // stream.on('finish', function() {
    //     const blob = stream.toBlob('/var/appli/serveur/documents/devis.pdf')
    //     const url = stream.toBlobUrl('/var/appli/serveur/documents/devis.pdf')
    //     // iframe.src = url
    // })
}));
routeur.get("/getpdf", (req, res) => {
    const path = "/var/appli/serveur/documents/devis.pdf";
    if (fs_1.default.existsSync(path)) {
        var file = fs_1.default.createReadStream(path);
        var stat = fs_1.default.statSync(path);
        res.setHeader('Content-Length', stat.size);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
        file.pipe(res);
    }
    else {
        res.json('NOTPDF');
    }
});
exports.default = routeur;
//# sourceMappingURL=devis.js.map