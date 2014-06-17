'use strict';

var httpProxy = require('http-proxy'),
    express = require('express'),
    logger = require('morgan'),
    modRewrite = require('connect-modrewrite'),
    prerender = require('prerender-node');

var app = express();

var pageUrl = process.env.IT_REMINDS_URL;

var prerenderMiddleware = prerender.set('prerenderServiceUrl', 'http://localhost:' + process.env.PRERENDER_PORT);
var rewriteMiddleware = modRewrite(['!(\\..+)$ / [L]']);
var proxy = httpProxy.createProxyServer({
  target: {
    host: pageUrl,
    port: 80
  }
});

if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
} else {
  app.use(logger('default'));
}
app.use(prerenderMiddleware);
app.use(rewriteMiddleware);
app.use(function (req, res) {
  req.headers.host = pageUrl;
  return proxy.web(req, res);
});

var port = process.env.IT_REMINDS_PORT;
app.listen(port, function () {
  console.log('Listening at localhost:' + port);
});
