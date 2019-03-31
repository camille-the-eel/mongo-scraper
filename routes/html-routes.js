// var db = require("../models");
// var axios = require("axios");
// var cheerio = require("cheerio");


// module.exports = function (app) {

// app.get("/", function (req, res) {
//     res.render("index");
// })

// app.get("/", function(req, res) {
//     axios.get("https://www.bbc.co.uk/programmes/p0374bx8").then(function(response) {
//         var $ = cheerio.load(response.data);

//         $("div.promotion").each(function(i, element) {
//             var result = {};

//             result.title = $(this).children("div.promotion__body").children("div.promotion__body__inner").children("h4.promotion__titles").children("span.promotion__title").children("a").text();
//             result.link = $(this).children("div.promotion__body").children("div.promotion__body__inner").children("h4.promotion__titles").children("span.promotion__title").children("a").attr("href");
//             result.summary = $(this).children("div.promotion__body").children("div.promotion__body__inner").children("p.promotion__synopsis").children("span").text();
//             // result.img = $(this).children("div.promotion__img").children("img").attr("src");

//             db.Article.create(result)
//                 .then(function(dbArticle) {
//                     console.log(dbArticle);
//                     // res.render("index", { layout: false, Article: dbArticle });
//                 })
//                 .catch(function(err) {
//                     console.log(err);
//                 });
//         });
//         // res.render("index", { layout: false, Article: dbArticle });
//     });
// });

// };

