'use strict';
var assert = require('assert');
var cis = require('..');

var Fn = function Fn (){};

// null/undefined
assert(cis(undefined, void 0));
assert(cis(null, null));
assert(!cis(null, 0));
assert(!cis(null, ''));
assert(!cis(null, false));
assert(!cis(null, NaN));

// string
assert(!cis(String, void 0));
assert(!cis(String, null));
assert(cis(String, 'abc'));
assert(cis(String, ''));
assert(cis(String, new String()));
assert(!cis(String, 1));
assert(!cis(String, new Number()));
assert(!cis(String, true));
assert(!cis(String, new Boolean()));

// number
assert(!cis(Number, void 0));
assert(!cis(Number, null));
assert(cis(Number, 1));
assert(cis(Number, -1));
assert(cis(Number, 0));
assert(cis(Number, new Number()));
assert(!cis(Number, '1'));
assert(!cis(Number, NaN));
assert(!cis(Number, Infinity));
assert(!cis(Number, Number.POSITIVE_INFINITY));
assert(!cis(Number, Number.NEGATIVE_INFINITY));

// NaN/Infinity/-Inifinity
assert(cis(NaN, NaN));
assert(cis(NaN, new Date('abcde')));
assert(cis(Infinity, Infinity));
assert(cis(Infinity , Number.POSITIVE_INFINITY));
assert(cis(Number.NEGATIVE_INFINITY, -Infinity));
assert(cis(-Infinity, Number.NEGATIVE_INFINITY));

// Date
assert(cis(Date, new Date()));
assert(!cis(Date, new Date('unknown time')));

// other
assert(cis(Object, {}));
assert(!cis(Object, null));
assert(cis(Function, Fn));
assert(cis(Fn, new Fn()));
assert(!cis(Function, new Fn()));
