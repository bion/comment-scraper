var CommentScraper = require('./comment_scraper');

var scraper = new CommentScraper({
    baseUrl: "http://scopingcomments.eisgatewaypacificwa.gov/Written_Comments",
    urlExtension: "public_%%%.html",
    numPages: 10,
    commentContainerSelector: "div.view-content",
    outputFilePath: './comments.json'
});

scraper.scrapeComments();
