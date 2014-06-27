var cheerio = require('cheerio');

var CommentPresenter = (function() {
    function CommentPresenter(comment, baseUrl) {
        this.comment = cheerio.load(comment);
        this.baseUrl = baseUrl;
    }

    CommentPresenter.prototype.name = function() {
        var header = this.comment('h3').text();
        return header.split('(')[0].trim();
    };

    CommentPresenter.prototype.number = function() {
        var header = this.comment('h3').text();
        var almostNum = header.split('#')[1];
        return almostNum.substring(0, almostNum.length - 1);
    };

    CommentPresenter.prototype.location = function() {
        var location = this.comment('div').next().next().text();
        location = location.match(/\s([A-Za-z]+[,\s]*[A-Za-z]*)/gm)[1];
        return location ? location.trim() : 'not provided';
    };

    CommentPresenter.prototype.date = function() {
        return this.comment('.date-display-single').text().trim();
    };

    CommentPresenter.prototype.isImage = function() {
        return this.comment('a').length > 0;
    };

    CommentPresenter.prototype.commentBody = function() {
        return this.baseUrl + this.comment('a').attr('href');
    };

    return CommentPresenter;

})();

module.exports = CommentPresenter;
