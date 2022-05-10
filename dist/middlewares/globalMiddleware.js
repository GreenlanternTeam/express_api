"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const local = (req, res, next) => {
    res.locals.loggedIn = !!req.session.loggedIn;
    res.locals.user = req.session.user;
};
