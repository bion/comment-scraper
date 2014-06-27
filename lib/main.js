var fs = require('fs');

var pageRequest = require("./page_request");
var CommentPresenter = require("./comment_presenter");
var CommentWriter = require("./comment_writer");

var URL = "http://scopingcomments.eisgatewaypacificwa.gov/Written_Comments/public_02.html";
var outputFile = fs.openSync('./comments.csv', 'a');

var page = pageRequest(URL);
var commentContainer = page("div.view-container");

commentWriter = new CommentWriter();

commentContainer.children().each(
    function(index, element) {
        var presentedComment = new CommentPresenter(element);
        commentWriter.write(outputFile, presentedComment);
    }
);

output_file.closeSync();
