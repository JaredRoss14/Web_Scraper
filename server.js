// Dependencies
const express      = require("express");
const mongoose     = require("mongoose");
const exphbs       = require("express-handlebars");
const bodyParser   = require("body-parser");
const path         = require("path");
const logger       = require("morgan");
const request      = require("cheerio");
const viewRoute    = require("./controllers/view");
const scrapeRoute  = require("./controllers/scrape");
const commentRoute = require("./controllers/comment");

// Set up express app
const app = express();

// Set up handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Have Morgan log requests
app.use(logger("dev"));

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));

// Join public files
app.use(express.static("public"));

// Use Routes
app.use(viewRoute);
app.use(commentRoute);
app.use(scrapeRoute);

// Connect to mongodb
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/newsScraper";
const PORT        = process.env.PORT || 3000;

// Require Database Models
const db = require("./models");

// Have Mongoose handle promises
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

// Start listening on PORT
app.listen(PORT, function () {
  console.log("App running on port: " + PORT);
})
