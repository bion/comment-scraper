var fs = require('fs'),
PageSaver = require("./page_saver"),
miscExtensions = ["agencies", "elected_officials", "tribes", "businesses", "organizations"],
baseUrl = "http://scopingcomments.eisgatewaypacificwa.gov/Written_Comments",
publicCommentsUrlExtensionTemplate = "public_%%%",
publicCommentExtensions = [],
outputDir = __dirname + "/../pages/";

function zeroPad(num, padWidth) {
  num = '' + num;
  return num.length >= padWidth ? num : new Array(padWidth - num.length + 1).join('0') + num;
}

for (var i = 1; i < 11; i++) {
  var num = zeroPad(i, 2)
  var extension = publicCommentsUrlExtensionTemplate.replace(/%%%/g, num);
  publicCommentExtensions.push(extension);
}

var extensions = publicCommentExtensions.concat(miscExtensions);
var pageSaver = new PageSaver(baseUrl, extensions);

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

pageSaver.save(outputDir);
