const router = require("express").Router();
const PostController = require("../controllers/postResponse.controller");

router.post("/postresponse", PostController.postResponse);
router.get("/getslam/:slam_id", PostController.getSlam);
module.exports = router;
