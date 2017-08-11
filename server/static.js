'use strict'

var parseUrl = require('parseurl')
var resolve = require('path').resolve

function serveStatic(req, res, next) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
        return next()
  }

  var originalUrl = parseUrl.original(req)
  var path = parseUrl(req).pathname

  if(path !== '/index.html') {
    res.sendFile(`../build${path}`);
  }

}

module.exports = serveStatic;
