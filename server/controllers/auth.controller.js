const bcrypt = require("bcrypt");

module.exports = {
  signup: (req, res) => {
    const { email, password } = req.body;
    const salt = bcrypt.genSaltSync(8);
    const hashedPassword = bcrypt.hashSync(password, salt);
    db.collection("users").findOne({ email }, (err, data) => {
      if (err) throw err;
      if (data) {
        res.status(409).send({
          error: true,
          message: "This E-mail already exist !",
        });
      } else {
        db.collection("users").insertOne(
          { ...req.body, password: hashedPassword },
          (err, data) => {
            if (err) {
              res.send({
                error: true,
                message: "Attemp Failed, please try again later !",
              });
            } else {
              res.send({
                error: false,
                message: "Successfully Signed Up !",
              });
            }
          }
        );
      }
    });
  },

  login: (req, res) => {
    const { password, email } = req.body;

    db.collection("users").findOne({ email }, (err, user) => {
      if (err) throw err;
      if (!user)
        res.status(403).json({
          error: true,
          message: "Email not Registered !",
        });
      else if (user && bcrypt.compareSync(password, user.password)) {
        const { name, email, image, _id, questions, custom_bg } = user;
        const jwt = require("jsonwebtoken");
        const token = jwt.sign({ _id, name, email }, process.env.TOKEN_SECRET);
        let data = {
          success: true,
          message: "Successfully Signed In !",
          error: false,
          token,
          _id,
          name,
          email,
          image,
          questions,
          custom_bg,
        };
        res.json(data);
      } else {
        res.status(401).json({
          error: true,
          message: "Email, Password Mismatch !",
        });
      }
    });
  },
};
