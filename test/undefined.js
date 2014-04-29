'use strict';
var assert = require('assert');
var isUndefined = require('..').undefined;

assert(isUndefined(void 0));
assert(isUndefined(undefined));
assert(!isUndefined(1));