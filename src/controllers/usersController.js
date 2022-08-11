const res = require("express/lib/response");
//const fs = require("fs");
//const path = require("path");
const bcrypt = require("bcryptjs");
let db = require("../database/models")
const { validationResult } = require('express-validator')

//const usersFilePath = path.join(__dirname, "../data/users.json");
//const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));



const controllers = {
    vendorInformation: (req, res) => {
        const idBuscado = req.params.id;
        db.Users.findByPk(idBuscado).then((vendorInfo) => {
            res.render("users/vendorInformation.ejs", { vendorInfo });
        })
    },

    login: (req, res) => {

        res.render("users/login.ejs", { error: "" });
    },

    test: (req, res) => {
        db.Users.findAll({
            include: [{
                association: 'usersCategories'
            }]
        }).then((users) => {
            res.render("users/usersTest.ejs", { usuarios: users });
        });
    },

    loguear: async(req, res) => {
        const emailRecibido = req.body.username;
        const password = req.body.password;
        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
            return res.render("users/login", {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        } else {

            const resultado = await db.Users.findAll({
                where: {
                    email: emailRecibido,
                }
            });

            if (resultado[0] == undefined) {
                res.render("users/login", { loginError: "Login incorrecto" });
            } else {

                if (bcrypt.compareSync(password, resultado[0].password)) {
                    req.session.userLogged = resultado[0];
                    console.log(req.session.userLogged);

                    if (req.body.recordame) {
                        res.cookie("userEmail", req.body.username, { maxAge: 1000 * 60 });
                    }
                    res.redirect("../");

                } else {
                    res.render("users/login", { loginError: "Login incorrecto" });
                };
                console.log(req.session)
            }

        }
    },
    logOut: (req, res) => {
        res.clearCookie("userEmail");
        req.session.destroy();
        console.log(res.cookie);
        console.log(req.session);
        res.redirect("../");
    },

    register: (req, res) => {
        if (req.session.userLogged) {
            res.redirect("../");
        } else {
            res.render("users/register");
        }
    },

    store: async (req, res) => {
        var img = null;
        

        if (req.file) {
            img = req.file.filename;
        } else {
            img = "default-avatar.png";
        }

        const hashedPassword = bcrypt.hashSync(req.body.password, 10);

        const resultValidation = validationResult(req);
        
        
        if (resultValidation.errors.length > 0) {
            return res.render("users/register", {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        } 
        
        const reqEmail = req.body.email
        const userInDb =  await db.Users.findAll({where: {email: reqEmail}})
       // console.log(userInDb)

        if(userInDb.length > 0 ){
            return res.render("users/register", {
                errors: {
                    email: {
                        msg: "Este email ya está registrado"
                    }
                },
                oldData: req.body
            });
        }else {
            db.Users.create({
                    userName: req.body.userName,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    cuit: req.body.cuit,
                    password: hashedPassword,
                    companyName: req.body.companyName,
                    phoneNumber: req.body.contact,
                    companyImg: img,
                    usercategory_id: 2,
                })
                .then((newUser) => {
                    const datosRecibidos = JSON.parse(JSON.stringify(req.body));
                    datosRecibidos.id = newUser.id;
                    req.session.userLogged = datosRecibidos;
                    res.redirect("../");
                })
                .catch((error) => console.log(error));
        }


    },

    edit: (req, res) => {

        if (req.session.userLogged) {
            console.log("aquí te va:", req.session.userLogged.usercategory_id);
            const userId = req.session.userLogged.id;
            const paramsId = req.params.id;
            if (!paramsId) {
                res.redirect(`/users/edit/${userId}`)
            } else if (paramsId != userId) {
                res.redirect(`/users/edit/${userId}`)
            } else {
                db.Users.findByPk(paramsId).then((usuario) => {
                    console.log(userId)
                    res.render("users/edit", { u: usuario })
                });
            };
        } else {
            res.redirect("/users/register");
        }
    },

    update: (req, res) => {
        const userId = req.session.userLogged.id;
        const paramsId = req.params.id;
        if (paramsId && userId == paramsId) {

            var img = null;

            if (req.file) {
                img = req.file.filename;
            } else {
                img = req.session.userLogged.img;
            }

            var passwordChange = null;

            if (req.body.password != "" && req.body.password == req.body.passwordRepeat) {
                passwordChange = true;
            }

            const hashedPassword = bcrypt.hashSync(req.body.password, 10);

            db.Users.update({
                    userName: req.body.userName,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    cuit: req.body.cuit,
                    password: passwordChange ? hashedPassword : req.session.userLogged.password,
                    companyName: req.body.companyName,
                    phoneNumber: req.body.contact,
                    companyImg: img,
                }, {
                    where: { id: userId }
                }).then((newUser) => {
                    const datosRecibidos = JSON.parse(JSON.stringify(req.body));
                    datosRecibidos.id = userId;
                    req.session.userLogged = datosRecibidos;
                    res.redirect(`/users/edit/${userId}`)
                })
                .catch((error) => console.log(error));

        } else {
            res.send("paramsId y sessionId no coinciden");
        }
    },
    destroy: (req, res) => {
        const userId = req.session.userLogged.id;
        const paramsId = req.params.id;
        if (paramsId && userId == paramsId) {
            db.Users.destroy({
                where: {
                    id: req.params.id
                }
            }).then(() => {
                res.redirect("/users/logOut")
            });
        } else {
            res.send("paramsId y sessionId no coinciden");
        }

    },

    apiUsers: (req, res) => {
        db.Users.findAll()
            .then(usuarios => {
                let lista = [];
                for (unUsuario of usuarios) {
                    let usuarios = {
                        id: unUsuario.id,
                        nombre: unUsuario.firstName,
                        email: unUsuario.email,
                        companyName: unUsuario.companyName,
                    };
                    lista.push(usuarios);
                }
              
                return res.status(200).json({
                    registro: lista.length,
                    data: lista,
                    codigo: 200,
                })

            });
    },
    apiUsersId: (req, res) => {
        db.Users.findByPk(req.params.id, /*{ include: [{ association: "" }] }*/ )
            .then(usuario => {
                res.status(200).json({

                    userName: usuario.userName,
                    firstName: usuario.firstName,
                    lastName: usuario.lastName,
                    email: usuario.email,
                    cuit: usuario.cuit,
                    companyName: usuario.companyName,
                    phoneNumber: usuario.contact,
                    imagen:`http://localhost:3001/img/users/avatars/${usuario.companyImg}`,
                    codigo: 200,

                })

            });
    }

};
module.exports = controllers;