const router = require("express").Router();
const slamController = require("../controllers/slam.controller");

router.post("/slam", slamController.addSlamEntry);
router.get("/slam/all", slamController.getSlamEntries);
router.put("/slam/edit", slamController.editSlamEntry);
router.delete("/slam/delete", slamController.deleteSlamEntry);
router.get("/slam/details", slamController.getSlamDetails);

module.exports = router;
