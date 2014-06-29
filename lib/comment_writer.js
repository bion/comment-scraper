var CommentWriter = (function() {
    function CommentWriter(stream, columnTemplate) {
        this.stream = stream;
        this.columnTemplate = columnTemplate;
    }

    CommentWriter.prototype.writeComment = function(presentedComment) {
        var line = '';
        var value = '';

        for (i = 0; i < this.columnTemplate.length; i++) {
            value = presentedComment[columnTemplate[i]];

            if (value === undefined) {
                line += 'not provided';
            } else {
                line += value;
            }

            if (i !== this.columnTemplate.length - 1) {
                line += ',';
            }
        }

        line += '\n';

        this.stream.write(line);
    }

    return CommentWriter;
})();

module.exports = CommentWriter;
