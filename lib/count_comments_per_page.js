var fs = require('fs')
var async = require('async')
var lodash = require('lodash')
var cheerio = require('cheerio')

var inputDirectory = "pages"
    , pageNames = fs.readdirSync(inputDirectory)

var commentNumRegex = /\(#\d+\)/g
var total = 0


function createCountHeaderElements (pageName) {
  return function (callback) {
    fs.readFile(inputDirectory + "/" + pageName, 'utf8', function(err, rawPage) {
      if (err) throw new Error(err)
      var count = rawPage.match(commentNumRegex).length
      total += count
      console.log(count + " comments in " + pageName)
      callback()
    })
  }
}

var funcs = lodash.collect(pageNames, function (pageName) {
  return createCountHeaderElements(pageName)
})

async.parallel(funcs, function () { console.log("total: " + total) })
