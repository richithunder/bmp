const { Router } = require("express");
const productsController = require("../controllers/productsController");
const path = require("path");
const router = Router();
const multer = require("multer");
const { body } = require('express-validator');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const pathForMulter = 'public/img/articulos/';
        cb(null, pathForMulter);
    },
    filename: function(req, file, cb) {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    }
})
const uploadFile = multer({ storage });
const validations = require("../middlewares/createProductValidation");
const validationEdit = require("../middlewares/ediProductValidation");
const authMiddleware = require("../middlewares/authMiddleware");

// /products 
router.get("/", productsController.list);
router.get("/category/:id?", productsController.listByCategory);
router.get("/create", authMiddleware, productsController.create);
router.post("/create", uploadFile.single("img"), validations, productsController.store)
router.get("/edit/:id", authMiddleware, productsController.edit);
router.put("/edit/:id", uploadFile.single("img"), validationEdit, productsController.update);
router.delete("/delete/:id", productsController.destroy);
router.get("/detail/:id", productsController.detail);
router.get("/search", productsController.search);
router.get("/api", productsController.apiProduct);
router.get("/api/:id", productsController.apiProductDetail);
router.get("/myProducts", authMiddleware, productsController.listMyProducts);
router.get("/categorias", productsController.apiCategories);
router.get("/favoritos/:id",authMiddleware, productsController.productosFavoritos)
router.get("/favoritos",authMiddleware, productsController.listFavoritesProducts);
router.delete("/productFavDestroy/:id", authMiddleware, productsController.destroyFav);
router.get('/productCart', authMiddleware, productsController.showProductCart);
router.get("/productCartAdd/:id", productsController.productCartAdd);
router.delete("/productCartDestroy/:id", authMiddleware, productsController.destroyCart);




module.exports = router