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
    axios.get("https://www.bbc.co.uk/programmes/p0374bx8").then(function(response) {
        var $ = cheerio.load(response.data);

        $("div.promotion").each(function(i, element) {
            var result = {};

            result.img = $(this).children("div.promotion__img").children("img").attr("src");

            result.title = $(this).children("div.promotion__body").children("div.promotion__body__inner").children("h4.promotion__titles").children("span.promotion__title").children("a").text();
            result.link = $(this).children("div.promotion__body").children("div.promotion__body__inner").children("h4.promotion__titles").children("span.promotion__title").children("a").attr("href");
            result.summary = $(this).children("div.promotion__body").children("div.promotion__body__inner").children("p.promotion__synopsis").children("span").text();
            console.log("IMG", result.img, "TITLE", result.title, "LINK", result.link, "SUMMARY", result.summary);

        });
    });
    console.log(result);
});

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});