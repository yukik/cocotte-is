'use strict';
var assert = require('assert');
var enableId = require('..').enableId;

assert(enableId('abc'));
assert(!enableId('null'));