'use strict';
var assert = require('assert');
var all = require('..').all;

assert(all(Date, []));
assert(!all(Date, [undefined]));
assert(all(Date, [new Date(), new Date(), new Date()]));
assert(all(Date, new Array()));
assert(all(Date, new Array(new Date(), new Date(), new Date())));
assert(all(Number, new Array(10)));
assert(!all(Date, null));
assert(!all(Date, [new Date(), new Date(), '2000-1-1']));
assert(!all(Date, ['a', 'b', 'c']));
assert(!all(Date, new Date()));


