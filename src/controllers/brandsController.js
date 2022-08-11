const db = require("../database/models")
const { Op } = require("sequelize");
const { validationResult } = require('express-validator')

const controllers = {
    list: (req, res) => {
        db.Brands.findAll().then( (brands) => 
        res.render("brands/brandsList", {
            brands: brands
        })
    );
    },
    create: (req, res) => {
        res.render("brands/brandsCreate")
    },

    store: async (req, res) => {
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            return res.render("brands/brandsCreate", {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }
        const brandInDB = await db.Brands.findAll({where:{name:req.body.name}})

        if(brandInDB.length>0){
            return res.render("brands/brandsCreate", {
                errors: {
                    name: {
                        msg: "Esta marca ya está creada"
                    }
                },
                oldData: req.body
            });

        }else{
        const datosRecibidos = JSON.parse(JSON.stringify(req.body));

        const newBrand = await  db.Brands.create({
            name : datosRecibidos.name
        });

        const brands = await  db.Brands.findAll();
            console.log(newBrand);
            req.session.userLogged.recentCreatedBrand = newBrand;
            res.redirect(`/models/create`)
    }},

    edit: (req, res) => {

        if (req.session.userLogged.usercategory_id == 1) {
            const paramsId = req.params.id;
            if (!paramsId) {
                res.redirect(`/brands/list`)
            } else {
                db.Brands.findByPk(paramsId).then((brand) => {
                    if (brand){
                        res.render("brands/brandsEdit", { b: brand })
                    } else {
                        res.redirect(`/brands/list`)
                    }

                });
            };
        } else {
            res.redirect("/products/");
        }
    },
    update: (req, res) => {

        if (req.session.userLogged.usercategory_id == 1) {
            const paramsId = req.params.id;
            
            if (!paramsId) {
                res.redirect(`/brands/list`)
            } else {
                db.Brands.update({
                    name: req.body.name
                }, {
                    where: { id: paramsId }
                }).then((brand) => {
                    console.log(brand)
                    res.redirect("/brands/list")
                });
            };
        } else {
            res.redirect("/products/");
        }
        

    },
    destroy: (req, res) => {

        if (req.session.userLogged.usercategory_id == 1) {
            const paramsId = req.params.id;
            
            if (!paramsId) {
                res.redirect(`/brands/list`)
            } else {
                db.Brands.destroy({
                    where: {
                        id: req.params.id
                    }
                }).then(() => {
                    res.redirect("/brands/list")
                });
            };
        } else {
            res.redirect("/products/");
        }

    },
}

module.exports = controllers