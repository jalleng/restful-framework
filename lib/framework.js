'use strict';

var http = require('http');
var url = require('url');
var parseUrl = require('parseurl');
var Router = require(__dirname + '/router');

var router = Router();

Router.prototype.get = function(route, callback) {


  http.createServer(function(req,res) {
    res.writehead(code, type)
    res.write()
    res.end();
  });
};











Router.prototype.post = function(route, callback) {
  http.createServer(function(req,res) {
    res.writehead(code, type)
    res.write()
    res.end;
  });
};

