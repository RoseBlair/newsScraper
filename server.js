// Dependencies
var express = require("express");
var mongoose = require("mongoose");
var path = require("path");

var routes = require('./routes/routes');

// Initialize Express
var app = express();
var port = process.env.PORT || 3001;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Add Routes
app.use(routes);

// Make public a static dir
app.use(express.static("public"));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({
    defaultLayout: "main",
    partialsDir: path.join(__dirname, "/views/layouts/partials")
}));
app.set("view engine", "handlebars");



// Start server
app.listen(port, function() {
    console.log('Server started');
});

// Database configuration with mongoose

//mongoose.connect("mongodb://localhost/week18Populater1", { useNewUrlParser: true });
/////////////////////////////////////////////
var db = mongoose.connection;
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);
/////////////////////////////////////////////////////
// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});


// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});