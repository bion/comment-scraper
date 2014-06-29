var CommentPresenter = require("./comment_presenter");
var CommentWriter = require("./comment_writer");
var pageRequest = require('.pageRequest');
var fs = require('fs');

var CommentScraper = (function() {

    /*
      construct with:

      baseUrl
      urlExtension
      numPages
      commentContainerSelector
    */
    function CommentScraper(config) {
        for (var attr in config) { this[attr] = config[attr]; }
    }

    CommentScraper.prototype.scrapeComments = function(outputFilePath) {
        var columnTemplate = ['name', 'number', 'location', 'date', 'commentBody'];
        var writeStream = fs.createWriteStream(outputFilePath);
        var commentWriter = new CommentWriter(writeStream, columnTemplate);

        writeStream.write(columnTemplate.join(',') + '\n');

    }

    CommentScraper.prototype._writeLoop = function() {
        container.children().each(
            function(index, element) {
                var presentedComment = new CommentPresenter(element);
                commentWriter.write(presentedComment);
            }
        );
    }

    return CommentScraper;
})();

module.exports = CommentScraper;
