var should = require('should');
var CommentPresenter = require('../lib/comment_presenter');

describe('CommentPresenter', function() {

    context('comment is an image', function() {

        beforeEach(function() {
            this.commentWithImage = "<div>  <div>        <div><h3>B Davis (#5372)</h3></div>  </div>  <span>    <strong>Date Submitted: </strong>    <span><span class='date-display-single' property='dc:date' datatype='xsd:dateTime' content='2012-12-04T00:00:00-05:00'>12/04/12</span></span>  </span>  <div>        <div><strong>Location:</strong> Spokane, WA</div>  </div>  <div>    <strong>Comment: </strong>    <div>See attached.</div>  </div>  <div class='fr-image'>    <strong>Attached Image: </strong>    <div><a href='attachments/images/Spokane_Mtg_108.jpg'><img typeof='foaf:Image' src='attachments/images/Spokane_Mtg_108.jpg' width='630' alt='></a></div>  </div>  </div>";

            this.subject = new CommentPresenter(this.commentWithImage, 'foo/');
        });

        describe('#name', function() {

            it('returns the name of the comment', function() {
                this.subject.name().should.equal('B Davis');
            });

        });

        describe('#number', function() {

            it('returns the number of the comment', function() {
                this.subject.number().should.equal('5372');
            });

        });

        describe('#location', function() {

            it('returns the location of the commenter', function() {
                this.subject.location().should.equal('Spokane, WA');
            });

        });

        describe('#date', function() {

            it('returns the submission date of the comment', function() {
                this.subject.date().should.equal('12/04/12');
            });

        });

        describe('#isImage', function() {

            it('returns true', function() {
                this.subject.isImage().should.equal(true);
            });

        });

        describe('#commentBody', function() {
            it('returns a link to the comment image', function() {
                this.subject.commentBody().should.equal('foo/attachments/images/Spokane_Mtg_108.jpg');
            });
        });

    });

});
