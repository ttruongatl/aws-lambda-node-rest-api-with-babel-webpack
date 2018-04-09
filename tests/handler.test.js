var hello = require('./../handler').hello;

var assert = require('chai').assert;
var should = require('chai').should();

describe('SMS module tests', function () {

  before(function (done) {
    done();
  });

  it('the hello function should work', function (done) {
    this.timeout(50000);
    var event = {};
    var context = {};
    var callback = (ctx, data) => {
      done();
    };
    hello(event, context, callback);
  });

});
