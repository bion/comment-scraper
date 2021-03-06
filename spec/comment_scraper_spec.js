var should = require('should');
var sinon = require('sinon');
var CommentScraper = require('../lib/comment_scraper');

describe('CommentScraper', function() {

    describe('#scrapeComments', function() {
        beforeEach(function() {
            config = {
                baseUrl: 'www.example.com',
                urlExtension: 'extension_%%%',
                numPages: 2,
                commentContainerSelector: '.comments',
                columnTemplate: ['name', 'number', 'location', 'date', 'commentBody'],
                outputFilePath: 'output-path',
                outputFormat: 'json'
            };

            pageResponseMarkup = '<div class="comments"><div class="comment">foo</div>bar</div>';


            this.pageRequestStub = {
                request: function(thisArg, _, callback) {
                    callback.call(thisArg, pageResponseMarkup);
                }
            };

            this.writeStreamStub = {
                write: sinon.stub()
            }

            this.commentWriterStub = {
                writeCSVComment: sinon.stub(),
                writeJSONComment: sinon.stub()
            }

            this.fsStub = {
                createWriteStream: sinon.stub().returns(this.writeStreamStub)
            }

            this.commentPresenterStub = {
                newPresenter: function (comment) {
                    return 'presented-comment'
                }
            }

            this.subject = new CommentScraper(
                config,
                this.commentWriterStub,
                this.pageRequestStub,
                this.fsStub,
                this.commentPresenterStub
            );

        });

        it('should merge the config properties with the instance', function() {
            this.subject.baseUrl.should.equal('www.example.com');
            this.subject.urlExtension.should.equal('extension_%%%');
            this.subject.numPages.should.equal(2);
            this.subject.commentContainerSelector.should.equal('.comments');
        });

        describe('#scrapeComments', function() {

            context('when outputFormat is json', function() {

                beforeEach(function() {
                    this.subject.outputFormat = 'csv';
                    this.subject.scrapeComments('output-path');
                });

                it('should create a comment collection', function() {
                    this.subject.commentCollection.should.eql([]);
                });

                it('should write out the formatted comment contents as json objects', function() {
                    sinon.assert.calledWith(this.commentWriterStub.writeJSONComment, 'presented-comment');
                });

            });

            context('when outputFormat is csv', function() {

                beforeEach(function() {
                    this.subject.outputFormat = 'csv';
                    this.subject.scrapeComments('output-path');
                });

                it('should write the column header names out', function() {
                    sinon.assert.calledWith(this.writeStreamStub.write, 'name,number,location,date,commentBody\n');
                });

                it('should write out the formatted comment contents as csv', function() {
                    sinon.assert.calledWith(this.commentWriterStub.writeCSVComment, 'presented-comment');
                });

            });

        });

    });

});
