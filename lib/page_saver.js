var PageRequest = require('./page_request'),
    fs = require('fs'),
    pageRequest = new PageRequest();

module.exports = (function() {
  var PageSaver = function(baseUrl, extensions) {
    this.baseUrl = baseUrl;
    this.extensions = extensions;
  }

  PageSaver.prototype.save = function(outputDirectory) {
    var url,
        that = this;

    this.extensions.forEach(function(extension) {
      url = that.baseUrl + '/' + extension + ".html";

      pageRequest.request(
        that,
        url,
        _writeBodyFor.bind(
          that,
          extension,
          outputDirectory + extension + ".html"
        )
      );
    });
  }

  function _writeBodyFor(extension, writePath, body) {
    process.stdout.write("writing page:" + extension + "...");
    fs.writeFile(writePath, body, function(err) {
      if (err) throw new Error(err);
      console.log("done");
    });
  }

  return PageSaver;
})();
