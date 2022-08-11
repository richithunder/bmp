const { Router } = require("express");
const brandsController = require("../controllers/brandsController");
const router = Router();
const authMiddleware = require("../middlewares/authMiddleware");
const validations = require("../middlewares/brandsValidation");

router.get("/", authMiddleware, brandsController.list);
router.get("/list", authMiddleware, brandsController.list);
router.get("/create", authMiddleware, brandsController.create);
router.post("/create",validations, brandsController.store);
router.get("/edit/:id", authMiddleware, brandsController.edit);
router.put("/edit/:id", authMiddleware, brandsController.update);
router.delete("/delete/:id", authMiddleware, brandsController.destroy);


module.exports = router;