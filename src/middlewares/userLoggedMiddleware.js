const db = require("../database/models");

async function userLogged(req, res, next) {


    res.locals.isLogged = false;
    let emailEnCookie = req.cookies.userEmail;
    let userEnCookie = emailEnCookie ? await db.Users.findOne({
        where: { email: emailEnCookie }
    }) : null;

    if (userEnCookie) {
        req.session.userLogged = userEnCookie
    }

    if (req.session.userLogged) {
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }

    next();

}

module.exports = userLogged;