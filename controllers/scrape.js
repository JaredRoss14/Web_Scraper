const cheerio = require('cheerio');
const express = require('express');
const router  = express.Router();
const db      = require('../models');
const axios   = require("axios");

router.get('/scrape', (req, res) => {
  axios("http://bleacherreport.com/washington-redskins")
    .then(function (response) {
      let $ = cheerio.load(response.data);
      let articles = [];

      $("li.articleSummary").each((i, element) => {
        
        let newArticle = {
          title: '',
          link: '',
          thumbnail: '',
          content: []
        };

        newArticle.title = $(element).children("div.articleContent").children("a.articleTitle").children("h3").text(),
        newArticle.link = $(element).children("div.articleContent").children("a.articleTitle").attr('href');
        newArticle.thumbnail = $(element).children('div.articleMedia').children("a").children("img").attr('href');

        // Check for duplicates in db
        let duplicate = false;
        for (let i = 0; i < dbArticles.length; i++) {
          if (dbArticles[i].title === result.title) {
            duplicate = true;
            break;
          }
        }

        // Before adding to db make sure article meets parameters 
        if (!duplicate && result.title && result.link) {
          resultArr.push(newArticle);
        } else {
          console.log("That article is already in the database");
        }
      });
    })
})


module.exports = router;