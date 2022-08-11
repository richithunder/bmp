const db = require("../database/models")
const { Op } = require("sequelize");
const { validationResult } = require('express-validator')

const controllers = {
    list: (req, res) => {

        db.Models.findAll({ include: [{ association: "marcas" }] }).then((models) => {
            res.render("models/modelsList", {
                models : models
            })
        })

    },

    create: async (req, res) => {
        const brands = await db.Brands.findAll();
        res.render("models/modelsCreate", { m: brands });
    },

    store: async (req, res) => {
        const resultValidation = validationResult(req);
               if (resultValidation.errors.length > 0) {
            const brands = await db.Brands.findAll();
            return res.render("models/modelsCreate", {
                errors: resultValidation.mapped(),
                oldData: req.body,
                m:brands,
            });
            
        }
        const modelsInDB = await db.Models.findAll({where:{name:req.body.name}})
        if(modelsInDB.length>0){           
            const brands = await db.Brands.findAll();
            res.render("models/modelsCreate", {m: brands , errors: {
                name: {
                    msg: "Este modelo ya está creado"
                }
            },
            oldData: req.body}   
            );

        }  else {
        const datosRecibidos = JSON.parse(JSON.stringify(req.body));
        req.session.userLogged.recentCreatedBrand = null;
        db.Models.create({
            brand_id: datosRecibidos.brand_id,
            name : datosRecibidos.name,
            description: datosRecibidos.description
        }).then(
            (recentCreatedModel) => {
            req.session.userLogged.recentCreatedModel = recentCreatedModel;
            console.log("modeloguardado: ", req.session.userLogged.recentCreatedModel);
            res.redirect("../../products/create")
            }
        );

    }}
}


module.exports = controllers