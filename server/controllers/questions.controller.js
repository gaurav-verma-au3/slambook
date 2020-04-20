module.exports = {
  update: (req, res) => {
    const { questions } = req.body;
    const { _id } = req.payload;
    db.collection("users").findOneAndUpdate(
      { _id },
      { $set: questions },
      (err, data) => {
        if (err) {
          res.send({
            error: true,
            message: "Unable to update please try again later !",
          });
        } else {
          res.send({
            error: false,
            message: "Updated Successfully",
          });
        }
      }
    );
  },
};
