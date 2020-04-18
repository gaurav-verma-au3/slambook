const router = require("express").Router();
const authController = require("../controllers/auth.controller");

router.get("/signup", authController.signup);
router.get("/login", authController.login);

module.exports = router;
