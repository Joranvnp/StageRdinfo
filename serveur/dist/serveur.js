"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const https_1 = __importDefault(require("https"));
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
//Importer les fichiers env
dotenv_1.default.config();
//Application
const app = (0, express_1.default)();
//Ports
const port = process.env.port || 5000;
//Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
//SESSION
const session_1 = __importDefault(require("./controleurs/session"));
app.use(session_1.default);
//Authentication
const auth_1 = __importDefault(require("./controleurs/auth"));
app.use(auth_1.default.initialize());
app.use(auth_1.default.session());
const protected_1 = __importDefault(require("./controleurs/protected"));
//API
const login_1 = __importDefault(require("./controleurs/login"));
app.use("/api/login", login_1.default);
const user_1 = __importDefault(require("./controleurs/user"));
app.use("/api/user", user_1.default);
//Mise en place du dossier Statique
app.use(express_1.default.static(path_1.default.join(__dirname, '../../client/build')));
//Pages non authentifi´ees
app.get('/', function (req, res) {
    res.sendFile(path_1.default.join(__dirname, '../../client/build', 'index.html'));
});
//Pages authentifi´ees
app.get('/*', protected_1.default, function (req, res) {
    res.sendFile(path_1.default.join(__dirname, '../../client/build', 'index.html'));
});
//Ecoute sur le port 5000 HTTPS
const options = {
    cert: fs_1.default.readFileSync("/var/appli/serveur/certificats/fullchain.pem"),
    key: fs_1.default.readFileSync("/var/appli/serveur/certificats/privkey.pem"),
};
const httpsserver = https_1.default.createServer(options, app);
httpsserver.listen(5000, () => {
    console.log("Le serveur HTTPS tourne sur le port " + port);
});
//# sourceMappingURL=serveur.js.map