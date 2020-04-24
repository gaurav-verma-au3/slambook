const router = require("express").Router();
const slamController = require("../controllers/slam.controller");

router.post("/", slamController.addSlamEntry);
router.get("/all", slamController.getSlamEntries);
router.put("/edit", slamController.editSlamEntry);
router.delete("/delete", slamController.deleteSlamEntry);
router.get("/details", slamController.getSlamDetails);

module.exports = router;
