'use strict';
var assert = require('assert');
var isUnset = require('..').unset;

assert(isUnset(undefined));
assert(isUnset(null));
assert(isUnset(''));
assert(!isUnset('abc'));

