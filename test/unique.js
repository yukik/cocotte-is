'use strict';
var assert = require('assert');
var unique = require('..').unique;

assert(unique([1, 2, 3]));
assert(!unique([1, 2, 2]));