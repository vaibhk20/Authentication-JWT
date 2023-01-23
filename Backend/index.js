const express = require("express");
const app = express();
const session = require("express-session");
var cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./router/routes");
var cookieParser = require("cookie-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
require("./db_Connection");

app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

    cookie: {
      httpOnly: true,
    },
  })
);
app.use(urlencodedParser);
app.use(cookieParser());
app.use(router);

app.listen(8000, () => {
  console.log("server started");
});
