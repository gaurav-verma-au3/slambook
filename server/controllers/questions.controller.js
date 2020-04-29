const ObjectId = require("mongodb").ObjectID;
module.exports = {
  update: (req, res) => {
    const { questions } = req.body;
    const { _id } = req.payload;
    db.collection("users").findOneAndUpdate(
      { _id: ObjectId(_id) },
      { $set: { questions } },
      (err, data) => {
        if (err) {
          res.send({
            error: true,
            message: "Unable to update please try again later !",
          });
        } else {
          db.collection("users").findOne(
            { _id: ObjectId(_id) },
            (err, data) => {
              if (err) {
                res.send({
                  error: true,
                  message: "Unexpected Error Occured please try again !",
                });
              }
              res.send({
                error: false,
                message: "Updated Successfully",
                questions: data.questions,
              });
            }
          );
        }
      }
    );
  },
  // add: (req, res) => {
  //   const { question } = req.body;
  //   const { _id } = req.payload;
  //   db.collection("users").findOneAndUpdate(
  //     { _id: ObjectId(_id) },
  //     { $push: { questions: { question } } },
  //     { returnNewDocument: true },
  //     (err, data) => {
  //       if (err) {
  //         res.send({
  //           error: true,
  //           message: "Unable to update please try again later !",
  //         });
  //       } else {
  //         db.collection("users").findOne(
  //           { _id: ObjectId(_id) },
  //           (err, data) => {
  //             if (err) {
  //               res.send({
  //                 error: true,
  //                 message: "Unexpected Error Occured please try again !",
  //               });
  //             }
  //             res.send({
  //               error: false,
  //               message: "Updated Successfully",
  //               questions: data.questions,
  //             });
  //           }
  //         );
  //       }
  //     }
  //   );
  // },
};
