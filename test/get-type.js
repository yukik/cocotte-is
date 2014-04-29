'use strict';
var assert = require('assert');
var gettype = require('..').getType;

var Fn = function Fn () {};

assert(gettype('abc') === String);
assert(gettype(1) === Number);
assert(gettype(Infinity) === Infinity);
assert(gettype(new Date()) === Date);
assert(Number.isNaN(gettype(new Date('abc'))));
assert(gettype({}) === Object);
assert(gettype(Fn) === Function);

