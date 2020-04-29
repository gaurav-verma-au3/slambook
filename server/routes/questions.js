const router = require("express").Router();
const questionsController = require("../controllers/questions.controller");
router.put("/update", questionsController.update);

module.exports = router;
