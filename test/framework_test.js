'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
var http = require('http');
var Frame = require(__dirname + '/../lib/router');

var frame = new Frame();

var host = 'localhost:3000';

describe('framework', function() {
  before(function() {
    http.createServer(frame.route).listen(3000, function() {
      console.log('server started');
    });

    frame.get('/', function(req, res) {
      res.set('Content-Type', 'text/plain');
      res.send("Hello, world"); //this write the header, set the body
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
});
