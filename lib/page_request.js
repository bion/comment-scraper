var request = require('request');

var pageRequest = function (url, callback) {
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            callback(body);
        } else {
            console.log("unsuccessful request made to " + url);
            process.exit(1);
        }

    })
}

module.exports = pageRequest;
