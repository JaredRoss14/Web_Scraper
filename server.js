//Dependencies
const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const path = require("path");

//Routes
const commentRoutes = require(".controllers/comments");
const scrapeRoutes = require(".controllers/scrape");
const viewRoutes = require("./controllers/view");

// Set up express app
const app = express();
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/newsScraper"
var PORT = process.env.PORT || 8080

// Join public files
app.use(express.static(__dirname + "app/public"));

// Pull in necessary middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.text());

//App Routes
require(path.join(__dirname, './app/routing/apiRoutes'))(app);
require(path.join(__dirname, './app/routing/htmlRoutes'))(app);

// Start listening on PORT
app.listen(PORT, function () {
  console.log("app running");
})
