// npm packages
const dotenv = require("dotenv");
const express = require("express");

// app imports
const { connectToDatabase, globalResponseHeaders } = require("./config");
const { errorHandler, imageHandler } = require("./handlers");
const {
  thingsRouter,
  translateRouter,
  voiceRouter,
  imageRouter,
  lingvaRouter,
  settingsRouter,
  recentLanguages,
  historyRouter,
  recentsRouter,
  favoritesRouter,
  categoriesRouter
} = require("./routers");

const multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
    cb(null, Date.now() + ext);
  }
})
const upload = multer({ storage:storage });

// global constants
dotenv.config();
const app = express();
const {
  bodyParserHandler,
  globalErrorHandler,
  fourOhFourHandler,
  fourOhFiveHandler,
} = errorHandler;

// database
// connectToDatabase();

// body parser setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.use(bodyParserHandler); // error handling specific to body parser only

// response headers setup; CORS
app.use(globalResponseHeaders);
app.post("/upload_files", upload.array("files"), uploadFiles);

function uploadFiles(req, res) {
    console.log(req.body);
    console.log(req.files);
    res.json({ message: "Successfully uploaded files" });
}

app.use("/things", thingsRouter);
app.use("/translate", translateRouter)
app.use("/voice", voiceRouter)
app.use("/image",imageRouter)
app.use('/translation',lingvaRouter)
app.use('/settings',settingsRouter)
app.use('/recent-languages',recentLanguages)
app.use('/history', historyRouter)
app.use('/recents',recentsRouter)
app.use('/favorites',favoritesRouter)
app.use('/categories', categoriesRouter)

// catch-all for 404 "Not Found" errors
app.get("*", fourOhFourHandler);
// catch-all for 405 "Method Not Allowed" errors
app.all("*", fourOhFiveHandler);

app.use(globalErrorHandler);

/**
 * This file does NOT run the app. It merely builds and configures it then exports it.config
 *  This is for integration tests with supertest (see __tests__).
 */
module.exports = app;
