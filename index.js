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
const tokenverify = require("./server/middleware/tokensign.middleware");

//routes
const auth = require("./server/routes/auth");

app.use("/api/auth", auth);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log("Server listening on : ", PORT));
