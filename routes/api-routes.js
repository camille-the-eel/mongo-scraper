var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");

module.exports = function (app) {

    app.get("/scrape", function(req, res) {
        axios.get("https://www.bbc.co.uk/programmes/p0374bx8").then(function(response) {
            var $ = cheerio.load(response.data);
    
            $("div.promotion").each(function(i, element) {
                var result = {};
    
                result.title = $(this).children("div.promotion__body").children("div.promotion__body__inner").children("h4.promotion__titles").children("span.promotion__title").children("a").text();
                result.link = $(this).children("div.promotion__body").children("div.promotion__body__inner").children("h4.promotion__titles").children("span.promotion__title").children("a").attr("href");
                result.summary = $(this).children("div.promotion__body").children("div.promotion__body__inner").children("p.promotion__synopsis").children("span").text();
                // result.img = $(this).children("div.promotion__img").children("img").attr("src");
    
                db.Article.create(result)
                    .then(function(dbArticle) {
                        console.log(dbArticle);
                    })
                    .catch(function(err) {
                        console.log(err);
                    });
            });
            res.send("Scrape Complete");
        });
    });
    
    app.get("/articles", function(req, res) {
        db.Article.find({})
            .then(function(dbArticle) {
                res.render("index", { Article : dbArticle});
            })
            .catch(function(err) {
                res.json(err);
            });
    });
    
    app.get("/articles/:id", function(req,res) {
        db.Article.findOne({ _id: req.params.id })
            .populate("comment")
            .then(function(dbArticle) {
                res.json(dbArticle);
            })
            .catch(function(err) {
                res.json(err);
            });
    });
    
    app.post("/articles/:id", function(req, res) {
        db.Comment.create(req.body)
            .then(function(dbComment) {
                return db.Article.findOneAndUpdate({ _id: req.params.id }, { comment: dbComment._id }, { new: true });
            })
            .then(function(dbArticle) {
                res.json(dbArticle);
            })
            .catch(function(err) {
                res.json(err);
            });
    });

    app.put("/articles/saved/:id", function(req, res) {
       db.Article.findOneAndUpdate({ _id: req.params.id }, { saved: true })
            .then(function(savedArticle) {
                res.json(savedArticle);
            })
            .catch(function(err) {
                res.json(err);
            });
    });

};