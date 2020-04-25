const router = require("express").Router();
const slamController = require("../controllers/slam.controller");

router.get("/all", slamController.getSlamEntries);
router.get("/details/:owner_id/:_id", slamController.getSlamDetails);
router.post("/", slamController.addSlamEntry);
router.put("/edit", slamController.editSlamEntry);
router.put("/markfavourite", slamController.markfavourite);
router.delete("/delete", slamController.deleteSlamEntry);

module.exports = router;
