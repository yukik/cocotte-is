'use strict';
var assert = require('assert');
var err = require('..').error;

assert(err(new Error('エラー')));
assert(err(new TypeError('型エラー')));
assert(!err('abc'));
