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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoDB = __importStar(require("mongodb"));
let Totauxdb = function () {
    let url = 'mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASS + "@" + process.env.DB_HOST + '/' + process.env.DB_NAME;
    let client = new mongoDB.MongoClient(url);
    try {
        client.connect();
        let totaux = client.db('rdinfodb').collection('totaux');
        return totaux;
    }
    catch (erreur) {
        console.log(erreur);
    }
};
let totauxdb = Totauxdb();
exports.default = totauxdb;
//# sourceMappingURL=totauxdb.js.map