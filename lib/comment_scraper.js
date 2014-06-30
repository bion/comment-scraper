var CommentPresenter = require("./comment_presenter");
var CommentWriter = require("./comment_writer");
var PageRequest = require('./page_request');
var fs = require('fs');
var cheerio = require('cheerio');
var _ = require('lodash');

var CommentScraper = (function() {

    /*
      construct with:

      config = {
          baseUrl
          urlExtension
          numPages
          commentContainerSelector
          columnTemplate
          outputFilePath
      }
    */
    function CommentScraper(config, commentWriter, pageRequest, argFs, commentPresenter) {
        for (var attr in config) { this[attr] = config[attr]; }

        this.pageRequest = pageRequest != null ? pageRequest : new PageRequest();
        this.fs = argFs != null ? argFs : fs;
        this.writeStream = this.fs.createWriteStream(this.outputFilePath);

        this.commentWriter = commentWriter != null ? commentWriter : new CommentWriter(this.writeStream, this.columnTemplate);

        this.commentPresenter = commentPresenter != null ? commentPresenter : CommentPresenter;

        this.currentPage = 1;
    }

    CommentScraper.prototype.scrapeComments = function() {
        _writeColumnHeaders.call(this);
        _scrapePage.call(this);
    }

    function _scrapePage() {
        this.pageRequest.request(this, _currentUrl.call(this), _findComments);
    }

    function _writeColumnHeaders() {
        this.writeStream.write(this.columnTemplate.join(',') + '\n');
    }

    function _findComments(body) {
        var parsedBody = cheerio.load(body);
        var selected = parsedBody(this.commentContainerSelector);
        _writeLoop.call(this, selected);
    }

    function _writeLoop(container) {
        var children = container.children();
        console.log("number of comments: ", children.length);
        _.forEach(children, _writeComment, this);

        if (this.numPages !== this.currentPage) {
            this.currentPage += 1;
            _scrapePage.call(this);
        }
    }

    function _writeComment(comment) {
        var presentedComment = this.commentPresenter.newPresenter(comment, this.baseUrl);
        this.commentWriter.writeComment(presentedComment, this.baseUrl);
    }

    function _currentUrl() {
        var pageNum = _zeroPad(this.currentPage, 2);
        var extension = this.urlExtension.replace(/%%%/gi, pageNum);
        return this.baseUrl + '/' + extension;
    }

    function _zeroPad(num, padWidth) {
        num = '' + num;
        return num.length >= padWidth ? num : new Array(padWidth - num.length + 1).join('0') + num;
    }

    return CommentScraper;
})();

module.exports = CommentScraper;
