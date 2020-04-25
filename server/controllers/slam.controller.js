const ObjectID = require("mongodb").ObjectID;

module.exports = {
  getSlamEntries: (req, res) => {
    const { _id } = req.payload;
    db.collection("slams")
      .find({ owner_id: _id })
      .project({ questions: 0 })
      .toArray((err, slams) => {
        if (err) {
          res.send({
            error: true,
            message: "Unable to get Slams !",
          });
        } else {
          res.send({
            error: false,
            message: "Slams Updated",
            slams,
          });
        }
      });
  },
  addSlamEntry: (req, res) => {
    const { _id: owner_id } = req.payload;
    const { name, custom_bg, message, questions } = req.body;
    const is_answered = false;
    db.collection("slams").insertOne(
      { name, is_answered, owner_id, custom_bg, questions, message },
      (err, data) => {
        if (err) {
          res.send({
            error: true,
            message: "Unable to add Slams !",
          });
        } else {
          res.send({
            error: false,
            message: "Slam entry added Successfully !",
          });
        }
      }
    );
  },
  editSlamEntry: (req, res) => {
    const { _id, name, custom_bg, message } = req.body;
    const { _id: owner_id } = req.payload;
    db.collection("slams").updateOne(
      { _id: ObjectID(_id), owner_id },
      { $set: { name, custom_bg, message } },
      { upsert: true },
      (err, data) => {
        if (err) {
          res.send({
            error: true,
            message: "Unable to edit Slam !",
          });
        } else {
          res.send({
            error: false,
            message: "Slam edited Successfully !",
            data,
          });
        }
      }
    );
  },
  markfavourite: (req, res) => {
    const { _id, isFavourite } = req.body;
    const { _id: owner_id } = req.payload;
    db.collection("slams").updateOne(
      { _id: ObjectID(_id), owner_id },
      { $set: { isFavourite } },
      { upsert: true },
      (err, data) => {
        if (err) {
          res.send({
            error: true,
            message: "Unable to mark favourite !",
          });
        } else {
          res.send({
            error: false,
            message: "Added to Favourites !",
            data,
          });
        }
      }
    );
  },
  deleteSlamEntry: (req, res) => {
    const { _id } = req.body;
    const { _id: owner_id } = req.payload;
    db.collection("slams").remove(
      { _id: ObjectID(_id), owner_id },
      (err, data) => {
        if (err) {
          res.send({
            error: true,
            message: "Unable to find Slams !",
          });
        } else {
          res.send({
            error: false,
            message: "Slam Deleted !",
          });
        }
      }
    );
  },
  getSlamDetails: (req, res) => {
    const { _id, owner_id } = req.params;
    db.collection("slams")
      .find({ _id: ObjectID(_id) })
      .toArray((err, data) => {
        if (err) {
          res.send({
            error: true,
            message: "Unable to find Slams !",
          });
        } else if (data[0].owner_id === owner_id) {
          res.send({
            error: false,
            data,
          });
        } else {
          res.send({
            error: true,
            message: "Slam doesn't belong to this account !",
          });
        }
      });
  },
};
