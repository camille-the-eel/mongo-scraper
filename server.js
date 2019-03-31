var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var path = require("path");

var PORT = 3000;
var app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//ROUTING
require("./routes/html-routes")(app);
require("./routes/api-routes")(app);


mongoose.connect("mongodb://localhost/mongo-scraper", { useNewUrlParser: true });

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});