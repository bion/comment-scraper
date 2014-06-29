var should = require('should');
var CommentPresenter = require('../lib/comment_presenter');

describe('CommentPresenter', function() {

    context('comment is an image', function() {

        beforeEach(function() {
            this.commentWithImage = "<div>  <div>        <div><h3>B Davis (#5372)</h3></div>  </div>  <span>    <strong>Date Submitted: </strong>    <span><span class='date-display-single' property='dc:date' datatype='xsd:dateTime' content='2012-12-04T00:00:00-05:00'>12/04/12</span></span>  </span>  <div>        <div><strong>Location:</strong> Spokane, WA</div>  </div>  <div>    <strong>Comment: </strong>    <div>See attached.</div>  </div>  <div class='fr-image'>    <strong>Attached Image: </strong>    <div><a href='attachments/images/Spokane_Mtg_108.jpg'><img typeof='foaf:Image' src='attachments/images/Spokane_Mtg_108.jpg' width='630' alt='></a></div>  </div>  </div>";

            this.subject = new CommentPresenter(this.commentWithImage, 'foo/');
        });

        describe('#newPresenter', function() {

            it('returns a new presenter', function() {
                var presenter = CommentPresenter.newPresenter(this.commentWithImage);
                Object.keys(presenter).should.eql(['comment', 'baseUrl']);
            });
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

    context('comment has no location', function() {

        beforeEach(function() {
            this.commentWithoutLocation = '<div>  <div>        <div><h3>B Halliday (#1265)</h3></div>  </div>    <span>    <strong>Date Submitted: </strong>    <span><span class="date-display-single" property="dc:date" datatype="xsd:dateTime" content="2012-10-13T00:00:00-04:00">10/13/12</span></span>  </span>    <div>        <div></div>  </div>    <div>    <strong>Comment: </strong>    <div>see attached</div>  </div>    <div class="fr-image">    <strong>Attached Image: </strong>    <div><a href="attachments/images/MailerForm158.jpg"><img typeof="foaf:Image" src="attachments/images/MailerForm158.jpg" width="630" alt=""></a></div>  </div>  </div>';

            this.subject = new CommentPresenter(this.commentWithoutLocation, 'baz');
        });

        describe('#location', function() {

            it("should return 'not provided'", function() {
                this.subject.location().should.equal('not provided');
            });

        });

    });

    context('comment body is text', function() {

        beforeEach(function() {
            this.textComment = "<div>  <div>        <div><h3>B. Prem (#8319)</h3></div>  </div>    <span>    <strong>Date Submitted: </strong>    <span>01/17/2013</span>  </span>    <div>        <div></div>  </div>    <div>    <strong>Comment: </strong>    <div>Dear GPT/BNSF Custer Spur EIS Co-Lead Agencies,<br> <br>I am a property owner in San Juan County.  I am concerned about the continued vitality of the Salish Sea, where coal ships would make over 950 transits per year if the Gateway Pacific Terminal were to be built.  I request that the GPT Environmental Impact Statement include the entire coal transportation corridor so that communities along the rail and marine routes are given due consideration.<br> <br>I am especially concerned about oil and coal spill risks.  Questions that concern me, and which objective, rigorous and comprehensive studies should address include:<br>How will GPT's marine vessel traffic increase collision risks with tankers and other cargo ships in the area?<br>What would be the effects on our region of a catastrophic oil and/or coal spill?<br>If there is no positive assurance and insurance from those involved against any potentially significant impacts, please consider a no build option.<br> <br>Sincerely,<br><br>Prem</div>  </div>  </div>";

            this.subject = new CommentPresenter(this.textComment, 'bar');
        });

        describe('#commentBody', function() {

            it('should return the text of the comment', function() {
                this.subject.commentBody().should.equal("Dear GPT/BNSF Custer Spur EIS Co-Lead Agencies, I am a property owner in San Juan County.  I am concerned about the continued vitality of the Salish Sea, where coal ships would make over 950 transits per year if the Gateway Pacific Terminal were to be built.  I request that the GPT Environmental Impact Statement include the entire coal transportation corridor so that communities along the rail and marine routes are given due consideration. I am especially concerned about oil and coal spill risks.  Questions that concern me, and which objective, rigorous and comprehensive studies should address include:How will GPT's marine vessel traffic increase collision risks with tankers and other cargo ships in the area?What would be the effects on our region of a catastrophic oil and/or coal spill?If there is no positive assurance and insurance from those involved against any potentially significant impacts, please consider a no build option. Sincerely,Prem");
            });

        });

    });

});
