var cheerio = require('cheerio');

var CommentPresenter = (function() {
    function CommentPresenter(comment) {
        this.comment = cheerio.load(comment);
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

        return location.match(/\s([A-Za-z]+[,\s]*[A-Za-z]*)/gm)[1].trim();
    };

    CommentPresenter.prototype.date = function() {
        return this.comment.find('.date-display-single').val();
    };

    CommentPresenter.prototype.commentBody = function() {
    };

    CommentPresenter.prototype.isImage = function() {
    };

    return CommentPresenter;

})();

module.exports = CommentPresenter;
