var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");

// var db = require("./models");
var PORT = 3000;
var app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


// mongoose.connect("mongodb://localhost/mongo-scraper", { useNewUrlParser: true });

app.get("/scrape", function(req, res) {
    axios.get("https://www.bbc.com/news/world").then(function(response) {
        var $ = cheerio.load(response.data);

        $("span.title-link__title-text").each(function(i, element) {
            var result = {};

            result.title = $(this).text();
            result.link = $(this).parent("h3").parent("a").attr("href");
            console.log("TITLE", result.title, "LINK", result.link);

        });
    });
    console.log(result);
});

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});