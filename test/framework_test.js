'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
var http = require('http');
var Frame = require(__dirname + '/../lib/router');
var fs = require('fs');

var frame = new Frame();

var host = 'localhost:3000';

describe('framework', function() {
  before(function() {
    http.createServer(frame.route).listen(3000, function() {
      console.log('server started');
    });

    frame.get('/', function(req, res) {
      res.set('Content-Type', 'text/plain');
      res.send("Hello, world"); //this writes the header, sets the body
    });

    frame.post('/', function(req, res) {
      res.json(req);
    });
  });

  it("should set up a home page", function(done) {
    chai.request(host)
      .get('/')
      .end(function(err, res) {
        expect(res.status).to.eql(200);
        expect(res.header['content-type']).to.eql('text/plain');
        expect(res.text).to.eql('Hello, world');
        done();
      });
  });

  it("should post", function(done) {
    chai.request(host)
      .post('/')
      .send({Name: "Test"})
      .end(function(err, res) {
        expect(res.status).to.eql(200);
        expect(res.header['content-type']).to.eql('application/json');
        var fileCount = fs.readdirSync('../data');
        expect(fileCount.length).to.eql(1);
        done();
      });
  });
});
