const { Router } = require("express");
const usersController = require("../controllers/usersController");
const path = require("path");
const router = Router();
const multer = require("multer");
const validations = require("../middlewares/registerValidation");
const loginValidation = require("../middlewares/loginValidation");
const guestMiddleware = require("../middlewares/guestMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const pathForMulter = "public/img/users/avatars/";
        cb(null, pathForMulter);
    },
    filename: function(req, file, cb) {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    },
});

const uploadFile = multer({ storage });




router.get("/vendorInfo/:id", usersController.vendorInformation);
router.get("/login", guestMiddleware, usersController.login);
router.post("/login", loginValidation, usersController.loguear)
router.get("/logOut", usersController.logOut)
router.get("/test", usersController.test);
router.get("/register", usersController.register);
router.post("/register", uploadFile.single("img"), validations, usersController.store);
router.get("/edit/", usersController.edit);
router.get("/edit/:id", usersController.edit);
router.put("/edit/:id", uploadFile.single("img"), usersController.update);
router.delete("/delete/:id", usersController.destroy);
router.get("/api", usersController.apiUsers);
router.get("/api/:id", usersController.apiUsersId)




module.exports = router;