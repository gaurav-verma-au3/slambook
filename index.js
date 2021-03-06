const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const MongoClient = require("mongodb").MongoClient;
const url = process.env.MONGO_STRING;
const DbName = "slambook";
const passport = require("passport");
app.use(cors());
app.use(passport.initialize());
//bodyParser Setup
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

//Database
app.locals.db;

//connecting to DataBase
MongoClient.connect(
  url,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  function (err, client) {
    if (err) throw err;
    console.log("DB connected");
    db = client.db(DbName);
  }
);

//importing ObjectId
app.locals.ObjectId;
ObjectId = require("mongodb").ObjectID;

app.get("/api/login", (req, res) => {});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, "./build/index.html"));
  });
}

//middleware
const tokenverify = require("./server/middleware/tokensign.middleware")
  .verifyToken;

//routes
const auth = require("./server/routes/auth");
const slam = require("./server/routes/slam");
const fill = require("./server/routes/fill");
const questions = require("./server/routes/questions");
app.use("/api", auth);
app.use("/api/fill", fill);
app.use("/api/slam", tokenverify, slam);
app.use("/api/questions", tokenverify, questions);
app.put("/api/user/update-bg", tokenverify, (req, res) => {
  const { custom_bg } = req.body;
  const { _id } = req.payload;
  db.collection("users").findOneAndUpdate(
    { _id: ObjectId(_id) },
    { $set: { custom_bg } },
    (err, data) => {
      if (err) {
        res.send({
          error: true,
          message: "Unable to update background",
        });
      } else {
        res.send({
          error: false,
          message: "Background Updated Successfully",
        });
      }
    }
  );
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log("Server listening on : ", PORT));
