'use strict';
var assert = require('assert');
var allString = require('..').allString;

assert(allString([]));
assert(allString(['a', 'b', 'c']));
assert(!allString());
assert(!allString('a'));
assert(!allString([1, 2, 3]));
assert(!allString(['a', 'b', 1]));

