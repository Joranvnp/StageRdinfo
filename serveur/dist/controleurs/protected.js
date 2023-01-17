"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authenticate = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        res.redirect('/');
    }
};
exports.default = authenticate;
//# sourceMappingURL=protected.js.map