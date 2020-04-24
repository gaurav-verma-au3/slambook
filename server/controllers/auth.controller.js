module.exports = {
  signup: (req, res) => {
    const { email } = req.body;

    db.collection("users").findOne({ email }, (err, data) => {
      if (err) throw err;
      if (data) {
        res.status(409).send({
          error: true,
          message: "This E-mail already exist !",
        });
      } else {
        db.collection("users").insertOne(req.body, (err, data) => {
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
        });
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
      else if (user && user.password === password) {
        const { name, email, image, _id } = user;
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
