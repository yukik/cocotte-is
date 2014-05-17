'use strict';
var assert = require('assert');
var cis = require('..');

assert( cis.be(String, void 0));
assert( cis.be(String, null));
assert( cis.be(String, 'foo'));
assert(!cis.be(String, 123));