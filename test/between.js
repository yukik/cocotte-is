'use strict';
var assert = require('assert');
var between = require('..').between;

assert(between(1,3,5));
assert(between(1,1,5));
assert(between(1,5,5));
assert(!between(1,8,5));
assert(!between(1,-1,5));
assert(between(null,3,5));
assert(between(1,3,null));
assert(between(null,3,null));
assert(between(1,3,Infinity));
assert(between(-Infinity,3,5));


