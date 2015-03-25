'use strict';
var assert = require('assert');
var enableId = require('..').enableId;

assert( enableId('a'));
assert( enableId('abc'));
assert( enableId('a_b_c'));
assert(!enableId('_abc'));
assert(!enableId('abc_'));
assert(!enableId('a-b-c'));
assert(!enableId('null'));
assert(!enableId('123'));
assert( enableId('a123'));
assert(   32 === 'a1234567890123456789012345678901'.length);
assert( enableId('a1234567890123456789012345678901'));
assert(   33 === 'a12345678901234567890123456789012'.length);
assert(!enableId('a12345678901234567890123456789012'));