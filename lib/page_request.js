var request = require('request');

var PageRequest = (function() {

    function PageRequest() {
    }

    PageRequest.prototype.request = function (thisArg, url, callback) {
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                callback.call(thisArg, body);
            } else {
                console.log("unsuccessful request made to " + url);
                process.exit(1);
            }
        })
    }

    return PageRequest;
})();

module.exports = PageRequest;
