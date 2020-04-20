module.exports = {
  postResponse: (req, res) => {
    const { response, slamId } = req.body;
    db.collection("slams").findOneAndUpdate(
      { _id: slamId },
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
};
