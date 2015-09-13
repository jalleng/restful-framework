'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;

var frame = require(__dirname + '/../lib/framework');

var host = 'localhost:3000';

describe('framework', function() {
  before(function() {
    frame.get('/', function(req, res) {
      res.set('Content-Type', 'text/plain');
      res.send("Hello, world"); //this write the header, set the body
    });

    frame.listen(3000, function() {
      console.log('server started');
    });
  });

  it("should set up a home page", function(done) {
    chai.request(host)
      .get('/')
      .end(function(err, res) {
        expect(res.status).to.eql(200);
        expect(res.header['content-type']).to.eql('text/plain; charset=utf-8');
        expect(res.text).to.eql('Hello, world');
        done();
      });
  });
});