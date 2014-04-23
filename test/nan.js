var assert = require('assert');
var is = require('../is');

assert(is(NaN, NaN));
assert(is.unique([1, NaN]));
assert(!is.unique([NaN, NaN]));
assert(is.between(1, 2, null));
assert(!is.between(1, 2, NaN));



console.log('test ok');

