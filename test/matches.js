'use strict';
var assert = require('assert');
var isMatches = require('..').matches;

assert(isMatches([String, String, String], ['a', 'b', 'c']));
assert(isMatches([String, String, String], ['a'], [0]));
assert(!isMatches([Number, String, Date], ['a', 'b'], [0, 1]));
