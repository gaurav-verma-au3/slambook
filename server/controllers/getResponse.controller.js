module.exports = {
  getSlamEntries: (req, res) => {
    const { _id } = req.payload;
    db.collection("slams")
      .findAll({ owner_id: _id }, { _id: 1, is_answered: 1 })
      .toArray((err, slams) => {
        if (err) {
          res.send({
            error: true,
            message: "Unable to get Slams !",
          });
        } else {
          res.send({
            error: false,
            slams,
          });
        }
      });
  },
  addSlamEntry: (req, res) => {
    const { _id: owner_id } = req.payload;
    const { name, bg } = req.body;
    const isAnswered = false;
    db.collection("slams").inserOne(
      { name, isAnswered, owner_id, bg },
      (err, data) => {
        if (err) {
          res.send({
            error: true,
            message: "Unable to add Slams !",
          });
        } else {
          // res.send({
          //   error: false,
          //   slams,
          // });
          console.log(data);
        }
      }
    );
  },
  getSlamDetails: (req, res) => {
    // const { _id: owner_id } = req.payload;
    const { slamId: _id } = req.body;
    db.collection("slams").find({ _id }, (err, data) => {
      if (err) {
        res.send({
          error: true,
          message: "Unable to find Slams !",
        });
      } else {
        // res.send({
        //   error: false,
        //   data,
        // });
        console.log(data);
      }
    });
  },
};
