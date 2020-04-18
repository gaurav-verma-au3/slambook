module.exports = {
  signup: (req, res) => {
    const { email } = req.body;
    db.collection("users").findOne({ email }, (err, data) => {
      if (err) throw err;
      if (data.email) {
        res.send({
          error: true,
          message: "E-mail already registered",
        });
      } else {
        db.collection("users").inserOne(req.body, (err, data) => {
          if (err) throw err;
          else
            res.send({
              error: false,
              message: "Registered Succesfully",
            });
        });
      }
    });
  },
  login: (req, res) => {
    const { password } = req.body;
    db.collection("users").findOne({ email: req.body.email }, (err, user) => {
      if (err) throw err;

      if (user && user.password === password) {
        const { name, email, phone, image, _id } = user;
        const jwt = require("jsonwebtoken");
        const token = jwt.sign({ _id, name, email }, process.env.TOKEN_SECRET);
        let data = {
          success: true,
          message: "Successfully Signed In!",
          token,
          _id,
          name,
          email,
          image,
          phone,
        };
        res.json(data);
      } else {
        res.status(404).send({
          error: true,
          message: "Wrong username or password",
        });
      }
    });
  },
};
