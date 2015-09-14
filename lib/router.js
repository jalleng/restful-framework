'use strict';

var fs = require('fs');

var routes = {
'GET': {},
'POST': {},
'PUT': {},
'PATCH': {},
'DELETE': {}
};

var Router = function() {
};

module.exports = exports = function() {
  return new Router();
};

Router.prototype.get = function(route, callback) {
  routes.GET[route] = function(req, res) {
    callback(req, res);
    res.end();
  };
};

Router.prototype.post = function(route, callback) {
  routes.POST[route] = function(req, res) {
    callback(req, res);
    res.end();
  };
};

Router.prototype.put = function(route, callback) {
  routes.PUT[route] = callback;
};

Router.prototype.patch = function(route, callback) {
  routes.PATCH[route] = callback;
};

Router.prototype.delete = function(route, callback) {
  routes.DELETE[route] = callback;
};

Router.prototype.route = function(req, res) {
  if(typeof routes[req.method][req.url] === 'function') {
    if(!res.set) {
      res.set = function() {
        this.setHeader(arguments[0], arguments[1]);
      };
    }

    if(!res.send) {
      res.send = function(body) {
        this.write(body);
      };
    }

    if(!res.json) {
      res.json = function(req) {
        this.writeHead(200, {'Content-Type': 'application/json'});

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

        this.send(JSON.stringify({msg: 'json stored'}));
      };
    }

    routes[req.method][req.url](req, res);
  }
};
