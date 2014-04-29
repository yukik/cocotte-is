'use strict';
var assert = require('assert');
var allNumber = require('..').allNumber;

assert(allNumber([]));
assert(allNumber([1, 2, 3]));
assert(!allNumber());
assert(!allNumber(1));
assert(!allNumber(['a', 'b', 'c']));
assert(!allNumber([1, 2, '3']));


