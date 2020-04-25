const ObjectId = require("mongodb").ObjectID;
module.exports = {
  postResponse: (req, res) => {
    const { response, slamId } = req.body;
    db.collection("slams").findOneAndUpdate(
      { _id: ObjectId(slamId) },
      { $set: response },
      (err, data) => {
        if (err) {
          res.send({
            error: true,
            message: "Unable to update response please try again later !",
          });
        } else {
          res.send({
            error: false,
            message: "Response added Successfully",
          });
        }
      }
    );
  },
  getSlam: (req, res) => {
    const slam_id = req.params.slam_id;
    db.collection("slams").findOne({ _id: ObjectId(slam_id) }, (err, slam) => {
      if (err) {
        res.send({
          error: true,
          message: "Unable to get slam please try again later !",
        });
      } else {
        db.collection("users").findOne(
          { _id: ObjectId(slam.owner_id) },
          (err, owner) => {
            if (err) {
              res.send({
                error: true,
                message: "Unable to get slam please try again later !",
              });
            } else {
              const { name } = owner;
              res.send({
                owner: { name },
                slam,
              });
            }
          }
        );
      }
    });
  },
};
