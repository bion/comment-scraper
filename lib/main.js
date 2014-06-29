var baseUrl = "http://scopingcomments.eisgatewaypacificwa.gov/Written_Comments"
var urlExtension = "public_%%.html";
var commentContainerSelector = "div.view-container";

scraper = new CommentScraper({
    baseUrl: baseUrl,
    urlExtension: urlExtension,
    numPages: 1,
    commentContainerSelector: commentContainerSelector
});

scraper.scrapeComments();
