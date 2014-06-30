var cheerio = require('cheerio');

var CommentPresenter = (function() {
    function CommentPresenter(comment, baseUrl) {
        this.comment = cheerio.load(comment);
        this.baseUrl = baseUrl;
    }

    CommentPresenter.newPresenter = function(comment, baseUrl) {
        return new this(comment, baseUrl);
    }

    CommentPresenter.prototype.name = function() {
        var header = this.comment('h3').text();
        return header.split('(')[0].trim();
    }

    CommentPresenter.prototype.number = function() {
        var header = this.comment('h3').text();
        var almostNum = header.split('#')[1];
        var result = almostNum ? almostNum.trim() : 'not found ';
        return result.substring(0, result.length - 1);
    }

    CommentPresenter.prototype.location = function() {
        var location = this.comment('div').next().next().text();
        location = location.match(/\s([A-Za-z]+[,\s]*[A-Za-z]*)/gm);
        return (location && (location.length > 1)) ? location[1].trim() : 'not provided';
    }

    CommentPresenter.prototype.date = function() {
        return this.comment('.date-display-single').text().trim();
    }

    CommentPresenter.prototype.commentBody = function() {
        if (this.isImage()) {
            return this.baseUrl + '/' + this.comment('a').attr('href');
        }

        return this.comment('div').last().text().replace(/\n/g, ' ');
    }

    CommentPresenter.prototype.isImage = function() {
        return this.comment('a').length > 0;
    }

    return CommentPresenter;

})();

module.exports = CommentPresenter;
