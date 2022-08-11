const path = require("path");
const fs = require("fs");
const db = require("../database/models")

/* const productsFilePath = path.join(__dirname, "../data/products.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8")); */



module.exports = {
    home: async (req, res) => {

        const newProducts =  await db.Products.findAll({order: [['id', 'DESC']], limit: 8 });
        const cheapProducts =  await db.Products.findAll({order: [['price', 'ASC']], limit: 8});
        const productosFavoritos = req.session.userLogged ? await db.FavoriteProducs.findAll({where:{user_id:req.session.userLogged.id}}) : [];

        res.render("index.ejs", { newProducts , cheapProducts, productosFavoritos });

    },
    
    register: (req, res) => {
        res.redirect("users/register");
    },
    
    aboutUs: (req, res) => {
        res.render("aboutUs.ejs");
    },
    informacionVendedor: (req, res) => {
        res.render("informacionVendedor.ejs");
    }
};