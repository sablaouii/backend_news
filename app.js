var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const session =require ("express-session");
const { connectToMongoDb } = require("./config/db");

const cors = require("cors");
require("dotenv").config();

const logMiddleware = require('./midlewares/logsMiddlewares.js'); //log



const http = require("http");//1 importation du protocole http

// gemini
const fetch = require('node-fetch');
global.fetch = fetch;
global.Headers = fetch.Headers;
global.Request = fetch.Request;
global.Response = fetch.Response;




var indexRouter = require("./routes/indexRouter");
var usersRouter = require("./routes/usersRouter");
var osRouter = require("./routes/osRouter");

var formationRouter = require("./routes/formationRouter");
var alerteRouter = require ("./routes/alerteRouter");
var articleRouter = require ("./routes/articleRouter");
var chapitreRouter = require ("./routes/chapitreRouter");
var inscritRouter = require ("./routes/inscritRouter");
var notifRouter = require ("./routes/notifRouter");
var pdfRouter = require ("./routes/pdfRouter");
var questionRouter = require ("./routes/questionRouter");
var quizRouter = require ("./routes/quizRouter");
var certificatRouter = require ("./routes/certificatRouter");


var GeminiRouter = require("./routes/GeminiRouter");
var app = express();



app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(logMiddleware); //log

app.use(cors({
  origin:"http://localhost:3000",//origin front
  methods:"GET,POST,PUT,Delete",
}));

app.use(session({   //cobfig session
  secret: "net secret pfe",
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: {secure: false},
    maxAge: 24*60*60,
  
  },  
}))


app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/os", osRouter);

// les tables
app.use("/formation", formationRouter);
app.use("/alerte", alerteRouter);
app.use("/article", articleRouter);
app.use("/chapitre", chapitreRouter);
app.use("/inscrit", inscritRouter);
app.use("/notif", notifRouter);
app.use("/pdf", pdfRouter);
app.use("/question", questionRouter);
app.use("/quiz", quizRouter);
app.use("/certificat", certificatRouter);

 //gemini 
app.use("/gemini", GeminiRouter);

 // path hety ely kbal l os 

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const server = http.createServer(app); //2
server.listen(process.env.port, () => {
  connectToMongoDb()
  console.log("app is running on port 5000");
});