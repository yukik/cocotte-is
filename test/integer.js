'use strict';
var assert = require('assert');
var cis = require('..');

assert(!cis.integer(void 0));
assert(!cis.integer(null));
assert(!cis.integer('foo'));
assert( cis.integer(1));
assert( cis.integer(0));
assert( cis.integer(-1));
assert(!cis.integer(123.1));
assert(!cis.integer(NaN));
assert( cis.integer(0.0));
assert( cis.integer(1.00));
assert( cis.integer(-1.00));
assert( cis.integer(2147483647));
assert(!cis.integer(2147483648));
assert( cis.integer(-2147483648));
assert(!cis.integer(-2147483649));
