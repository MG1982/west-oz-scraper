const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const router = express.Router();

// Require all models
const db = require("../models");


app.get("/scrape", function (req, res) {
    console.log("\n******************************************\n" +
        "Grabbing every article headline and link\n" +
        "from The West Australian website:" +
        "\n******************************************\n");
    // Make a request via axios to grab the HTML body from the site of your choice
    axios.get("https://thewest.com.au/news/wa").then(function (response) {

        // Load the HTML into cheerio and save it to a variable
        // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
        let $ = cheerio.load(response.data);

        // An empty array to save the data that we'll scrape
        let results = [];

        // Select each element in the HTML body from which you want information.
        // NOTE: Cheerio selectors function similarly to jQuery's selectors,
        // but be sure to visit the package's npm page to see how it works
        $("span").each(function (i, element) {

            let title = $(element).children().text();
            let link = $(element).find("a").attr("href");
            let teaser = $(element).find("p").attr("Card-Teaser");
            // Save these results in an object that we'll push into the results array we defined earlier
            results.push({
                title: title,
                link: link,
                teaser: teaser
            });
        });

        // Log the results once you've looped through each of the elements found with cheerio
        console.log(results);
    });
});