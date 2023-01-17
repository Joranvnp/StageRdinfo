"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongodb_session_1 = __importDefault(require("connect-mongodb-session"));
const routeur = express_1.default.Router();
const mongoDBStore = (0, connect_mongodb_session_1.default)(express_session_1.default);
const store = new mongoDBStore({
    uri: "mongodb://" + process.env.DB_USER + ":" + process.env.DB_PASS + "@" + process.env.DB_HOST + "/" + process.env.DB_NAME,
    collection: "sessions",
});
console.log(process.env.DB_USER);
routeur.use((0, express_session_1.default)({
    secret: process.env.ACCESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000
    }
}));
exports.default = routeur;
//# sourceMappingURL=session.js.map