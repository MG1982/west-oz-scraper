const axios = require("axios");
const cheerio = require("cheerio");
const db = require("../models");
const theWestURL = "https://thewest.com.au/news/wa";

module.exports = function (app) {
    // Scrape Articles Route
    app.get("/", function (req, res) {
        axios.get(theWestURL).then(function (response) {
            const $ = cheerio.load(response.data);

            // Regex for image URL
            let sourceRegEx = /src=\"([^\"]*)/i

            $(".PortraitCard").each(function (i, element) {
                let result = {};

                result.title = $(this).find(".Card-HeadlineText").text();
                result.link = theWestURL + $(this).find("a").attr("href");
                result.summary = $(this).find("p").text();
                result.imageURL = sourceRegEx.exec($(this).find("picture").text())[1];

                db.Article.create(result)
            });
        })
            .then(function (resp) {
                db.Article.find({}).populate("note").then(function (dbArticle) {
                    res.render("index", { articles: dbArticle });
                }).catch(function (err) {
                    res.json(err);
                });
            });
    });
    // Retrieve Saved Articles Route
    app.get("/savedarticles", function (req, res) {
        db.Article.find({})
            .populate("note")
            .then(function (dbArticle) {
                res.render("savedarticles", { articles: dbArticle });
            })
            .catch(function (err) {
                res.json(err);
            });
    });

};