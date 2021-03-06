var should = require('should');
var sinon = require('sinon');
var CommentWriter = require('../lib/comment_writer');

describe('CommentWriter', function() {

    describe('#writeFunction', function() {

        beforeEach(function() {
            this.stream = {
                write: sinon.stub()
            };

            columnTemplate = ['name', 'number', 'location', 'date', 'commentBody'];

            this.subject = new CommentWriter(this.stream, columnTemplate);
        });

        context('comment has all properties', function() {

            beforeEach(function() {
                presentedComment = {
                    name: sinon.stub().returns('name'),
                    number: sinon.stub().returns('2'),
                    location: sinon.stub().returns('bellingham'),
                    date: sinon.stub().returns('2/2/2'),
                    commentBody: sinon.stub().returns('the body')
                };

                this.subject.writeComment(presentedComment);
            });

            it('should write the comment out formatted to csv', function() {
                sinon.assert.calledWith(this.stream.write, 'name,2,bellingham,2/2/2,the body\n');
            })

        });

        context('comment has some properties', function() {

        });

    });

});
