'use strict';
var assert = require('assert');
var alt = require('..').alt;

assert(alt(String, 'abc', 'def') === 'abc');
assert(alt(String, 12345, 'def') === 'def');
assert(alt(Number, NaN) === null);