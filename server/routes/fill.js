const router = require("express").Router();
const PostController = require("../controllers/postResponse.controller");

router.post("/getslam", PostController.postResponse);
router.get("/getslam/:slam_id", PostController.getSlam);

module.exports = router;



// _id:5ea083a1221350001798ffa1
// http://localhost:3001/api/fill/getslam/5ea083a1221350001798ffa1