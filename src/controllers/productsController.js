const fs = require("fs");
const { url } = require("inspector");
const path = require("path");
const db = require("../database/models")
const { Op, where } = require("sequelize");
const { validationResult } = require('express-validator')

const controllers = {
    list: (req, res) => {
                if (res.locals.isLogged){
                db.Products.findAll().then(function(products) {
                    db.FavoriteProducs.findAll({where:{user_id:req.session.userLogged.id}}).then(productosFavoritos=>{
                        res.render("products/productsList.ejs", { products, category: null, productosFavoritos })

                    })
        }
        
        ).catch(error => {
            console.log(error)
        })
    }else{ db.Products.findAll().then(function(products) {res.render("products/productsList.ejs", { products, category: null, })})

    }},
    listByCategory: (req, res) => {
        const categoryId = req.params.id;
        if (categoryId) {
            let categoriePedido = db.ProductCategories.findAll({ where: { id: categoryId } });
            let productoPedido = db.Products.findAll({ where: { category_id: categoryId } });
            let productosFavoritos = req.session.userLogged ? db.FavoriteProducs.findAll({where:{user_id:req.session.userLogged.id}}) : [];

            Promise.all([categoriePedido, productoPedido, productosFavoritos]).then(function([category, products, productosFavoritos]) {
                console.log(category)

                if (products.length > 0) {
                    res.render("products/productsList.ejs", { category: category[0], products, productosFavoritos });

                } else {
                    res.redirect("/")
                }
            }).catch(error => {
                console.log(error)
            })
        } else {
            res.redirect("/")
        };
    },

    listMyProducts: async(req, res) => {
        const userId = req.session.userLogged.id

        try {
            let productosPedidos = await db.Products.findAll({ where: { vendor_id: userId } });
            if (productosPedidos) {
                res.render("products/productsList.ejs", { products: productosPedidos, category: null, productosFavoritos:null })
            } else {
                res.redirect('/')
            }

        } catch (error) {

            res.redirect('/')
        }
    },
   

    create: (req, res) => {
        req.session.userLogged.recentCreatedBrand = null;
        db.Models.findAll({ include: [{ association: "marcas" }] }).then((modelos) => {
            db.ProductCategories.findAll().then((categories) => {
                db.Users.findAll().then((vendor) => {
                    res.render("products/product-create-form", { m: modelos, c: categories, v: vendor })
                })
            })
        })
    },
    store: async(req, res) => {
        const resultValidation = validationResult(req);
         const productInDB = await db.Products.findAll({where:{vendor_id:req.session.userLogged.id, productName:req.body.productName}})
   let msg = ""
                if(productInDB.length>0){    
             const error ={
                    productName:{
                        msg:''
                    }
                }
                resultValidation.errors.push(error)
                msg = 'Ya tenes "'+ productInDB[0].productName +'" creado'}

                if (resultValidation.errors.length > 0) {
                    console.log(resultValidation.errors);
                    db.Models.findAll().then((modelos) => {
                        db.ProductCategories.findAll().then((categories) => {
                            db.Users.findAll().then((vendor) => {
                                res.render("products/product-create-form", {
                                    m: modelos,
                                    c: categories,
                                    v: vendor,
                                    errors: resultValidation.mapped(),
                                    oldData: req.body,
                                     error: msg
                                 })
                            })
                        })
                    })
                } else {
                    const userId = req.session.userLogged.id
                    const datosRecibidos = JSON.parse(JSON.stringify(req.body));
                     db.Products.create({
                        productName: datosRecibidos.productName,
                        price: datosRecibidos.price,
                        minBuy: datosRecibidos.minBuy,
                        productImages: req.file.filename,
                        description: datosRecibidos.description,
                        models_id: datosRecibidos.models,
                        category_id: datosRecibidos.category,
                        vendor_id: userId,
                    });
                    res.redirect("/")   
            }                      
    },
    edit: (req, res) => {


        try {

            let pedidoProducto = db.Products.findByPk(req.params.id);
            let pedidoModelos = db.Models.findAll({ include: [{ association: "marcas" }] });
            let pedidoCategorias = db.ProductCategories.findAll();
            Promise.all([pedidoProducto, pedidoModelos, pedidoCategorias])
                .then(([producto, modelos, categorias]) => {
                    const userId = req.session.userLogged.id
                    if (producto != null && userId == producto.vendor_id) {
                        res.render("products/product-edit-form", { p: producto, m: modelos, c: categorias })
                    } else {
                        res.redirect("../../products/myProducts")
                    };

                })
        } catch (error) {
            res.redirect("../../products/myProducts")
        }
    },
    update: (req, res) => {
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            /* console.log(resultValidation.errors);*/
            let pedidoProducto = db.Products.findByPk(req.params.id);
            let pedidoModelos = db.Models.findAll();
            let pedidoCategorias = db.ProductCategories.findAll();
            Promise.all([pedidoProducto, pedidoModelos, pedidoCategorias])
                .then(([producto, modelos, categorias]) => {
                    res.render("products/product-edit-form", {
                        p: producto,
                        m: modelos,
                        c: categorias,
                        errors: resultValidation.mapped(),
                        oldData: req.body
                    })
                })
        } else {
            const datosRecibidos = JSON.parse(JSON.stringify(req.body));
            // console.log(datosRecibidos);
            db.Products.findByPk(req.params.id).then((producto) => {
                producto.productName = datosRecibidos.productName;
                producto.price = datosRecibidos.price;
                producto.minBuy = datosRecibidos.minBuy;
                producto.productImages = req.file ? req.file.filename : producto.productImages;
                producto.description = datosRecibidos.description;
                producto.models_id = datosRecibidos.models;
                producto.category_id = datosRecibidos.category
                producto.save().then(() => {
                    res.redirect("/products");
                });
            })
        }
    },
    destroy: (req, res) => {
        db.ProductCart.destroy({
            where: {
                product_id: req.params.id
            }
        }).then(() => {
            db.FavoriteProducs.destroy({
                where: {
                    product_id: req.params.id
                }
            }).then(() => {
                db.Products.destroy({
                    where: {
                        id: req.params.id
                    }
                }).then(() => {
                    res.redirect("/products")
                })
            })
        })
    },
    detail: async(req, res) => {
        if(req.session.userLogged){
            let producto = await db.Products.findByPk(req.params.id, { include: [{ association: "vendor" }, { association: "modelosDeProducto" }] });
            let modelo = await db.Models.findByPk(producto.models_id, { include: [{ association: "marcas" }] });
            let marca = modelo.marcas
            let productsInCart = await db.ProductCart.findAll({where:{user_id: req.session.userLogged.id, product_id: req.params.id}}); 
            
            res.render("products/productDetail", { p: producto, m: modelo, marca: marca, productsInCart });
        } else {
            let producto = await db.Products.findByPk(req.params.id, { include: [{ association: "vendor" }, { association: "modelosDeProducto" }] });
            let modelo = await db.Models.findByPk(producto.models_id, { include: [{ association: "marcas" }] });
            let marca = modelo.marcas
            res.render("products/productDetail", { p: producto, m: modelo, marca: marca, productsInCart: null});
        }
    },
    search: (req, res) => {
        const busqueda = req.query.search;
        db.Products.findAll({
            where: {
                productName: {
                    [Op.like]: '%' + busqueda + '%'
                }
            }
        }).then((products) => {
            res.render("products/productsList.ejs", { products, category:null })
        })

    },
    productosFavoritos: (req,res)=>{
        db.FavoriteProducs.create({
            product_id:req.params.id,
            user_id:req.session.userLogged.id
        }).then((favoritoNuevo)=>{
            res.redirect("/")
        }).catch(error=>{
            console.log(error)
        })
    },
  /*   const userId = req.session.userLogged.id
    const productosFavoritos = Products.productosFavoritos.product_id

 db.Products.findAll({include: [{ association: "productosFavoritos" }]}, {where:{productosFavoritos:product.id,user_id: userId}}).then((productos)=>{
    res.render('products/productsList.ejs',{ category:null,productosFavoritos }) */
    listFavoritesProducts: async(req, res) => {
      const userId = req.session.userLogged.id
      let productosFavoritos = await db.FavoriteProducs.findAll({where:{user_id: userId}});
      let favoriteIDproduct =  productosFavoritos

      let productosBuscar = productosFavoritos.map(producto => {
        const resultado = producto.product_id;
        return resultado
      })


      let productos =  await db.Products.findAll({where: {
        id: {
          [Op.or]: productosBuscar
        }
      }}
    );
      
        if(productosFavoritos.length>0){
            res.render('products/products-favorites.ejs',{ category:null, products:productos })
        }else{
            res.render('products/products-favorites.ejs')
        } 
    },
    destroyFav: async (req,res)=>{
     await db.FavoriteProducs.destroy({
            where: {
                product_id: req.params.id,
                user_id: req.session.userLogged.id
            }
        })
        res.redirect('/products/favoritos')
    },

    productCartAdd: (req, res) => {
        db.ProductCart.create({
            product_id:req.params.id,
            user_id:req.session.userLogged.id,
         })
        res.redirect('/products/productCart')
    },

    showProductCart: async(req, res)=> {
        // agregar los productos
        const userId = req.session.userLogged.id
        const productsAdd = await db.ProductCart.findAll({where:{user_id: userId}});
        
        if(productsAdd.length==0){
            res.render("products/productCart.ejs", {productos: null})
        }else{
            let productosBuscar = productsAdd.map(producto => {
           
                const resultado = producto.product_id;
                return resultado
                   
            })
            let productos =  await db.Products.findAll({where: {
                id: {
                    [Op.or]: productosBuscar
                }
            }}
            );
            res.render("products/productCart.ejs", {productos})
        } 

    },
    destroyCart: async(req, res) => {
       await db.ProductCart.destroy({
            where: {
                product_id: req.params.id,
                user_id: req.session.userLogged.id
            }
        }) 
       res.redirect('/products/productCart')
    },

    apiProduct: (req, res) => {
        db.Products.findAll()
            .then(productos => {
                let lista = [];
                for (unProducto of productos) {
                    let unProd = {
                        nombre: unProducto.productName,
                        descripcion: unProducto.description,
                        precio: unProducto.price,
                        minBuy: unProducto.minBuy,
                       
                    };
                    lista.push(unProd);

                }
                res.status(200).json({
                    registro: lista.length,
                    data: lista,
                    codigo: 200,
                })

            });
    },
    apiProductDetail: (req, res) => {
        db.Products.findByPk(req.params.id, { include: [{ association: "categories" },{association:"productosFavoritos"}] })
            .then(producto => {
                res.status(200).json({
                    nombre: producto.productName,
                    descripcion: producto.description,
                    precio: producto.price,
                    minBuy: producto.minBuy,
                    imagen:`http://localhost:3001/img/articulos/${producto.productImages}`,
                    favoritos: producto.productosFavoritos,
                    categoria: producto.categories.name,
                    codigo: 200,
                })
            });
    },
    apiCategories: (req, res) => {
        console.log("category");
        db.Products.findAll().then(products=>{
            db.ProductCategories.findAll()
            .then(category => {
                let categorias = []
                
                category.forEach(element => {
                    let categoria = {
                        nombre: element.name,
                        cantidad:products.filter(x=>x.category_id==element.id).length,
                    }
                    categorias.push(categoria)
                });
                return res.status(200).json({
                    registro: categorias.length,
                    data: categorias,
                    codigo: 200
                })
            }).catch(excepcion => {
                console.log(excepcion);
            })
        }).catch(excepcion => {
            console.log(excepcion)});
       
    },
}



module.exports = controllers