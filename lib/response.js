'use strict';

var http = require('http');
var fs = require('fs');

http.ServerResponse.prototype.set = function() {
  this.setHeader(arguments[0], arguments[1]);
};

http.ServerResponse.prototype.send = function(body) {
  this.write(body);
};

http.ServerResponse.prototype.json = function(req) {
  this.set('Content-Type', 'application/json');

  var body = '';
  req.on('data', function(chunk) {
    body += chunk;
  });

  req.on('end', function() {
    if(!fs.existsSync(__dirname + '/../data')) {
      fs.mkdirSync(__dirname + '/../data');
    }

    var filesArr = fs.readdirSync(__dirname + '/../data');
    fs.writeFileSync(__dirname + '/../data/request' + filesArr.length + '.json', body);
  });
};