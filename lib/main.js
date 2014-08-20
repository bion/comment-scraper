var CommentScraper = require('./comment_scraper');

var scraper = new CommentScraper({
    baseUrl: "http://scopingcomments.eisgatewaypacificwa.gov/Written_Comments",
    urlExtension: "public_%%%.html",
    numPages: 10,
    commentContainerSelector: "div.view-content",
    columnTemplate: ['commenter_name', 'submission_number', 'submitter_location', 'submission_date', 'body', 'image_url'],
    outputFilePath: './comments.json',
    outputFormat: 'json'
});

scraper.scrapeComments();
