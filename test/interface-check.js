'use strict';
var assert = require('assert');
var interfaceCheck = require('..').interfaceCheck;

var Klass = function (name) {
  this.name = name || null;
};
Klass.prototype.hallo = function () {
  console.log('hallo');
};
assert(interfaceCheck(new Klass(), [['name', String, null]], ['hallo']));

