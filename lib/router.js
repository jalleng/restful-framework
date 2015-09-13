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
    res.set = function() {
      res.setHeader(arguments[0], arguments[1]);
    };

    res.status = 200;

    res.send = function(body) {
      res.write(body, "utf-8");
    };

    callback(req, res);
    res.end();
  };
};

Router.prototype.post = function(route, callback) {
  routes.POST[route] = callback;
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
    routes[req.method][req.url](req, res);
  }
};
