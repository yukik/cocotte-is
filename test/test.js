/*jshint strict:false*/

var assert = require('assert');

var is = require('../is');

var Fn = function Fn (){};

// is
assert(is(String, 'abc'));
assert(is(Number, 1));
assert(is(NaN, NaN));
assert(is(Infinity, Infinity));
assert(is(Infinity , Number.POSITIVE_INFINITY));
assert(is(Number.NEGATIVE_INFINITY, -Infinity));
assert(is(-Infinity, Number.NEGATIVE_INFINITY));
assert(is(Date, new Date()));
assert(is(NaN, new Date('abcde')));
assert(is(Object, {}));
assert(is(Function, Fn));
assert(is(Fn, new Fn()));

assert(!is(String, 1));
assert(!is(Number, Infinity));
assert(!is(Date, new Date('unknown time')));
assert(!is(Object, null));
assert(!is(Function, new Fn()));

// enableId 
assert(is.enableId('abc'));
assert(!is.enableId('null'));

// reservedWords
assert(is.reservedWords().indexOf('Array') >= 0);

// getType
assert(is.getType('abc') === String);
assert(is.getType(1) === Number);
assert(is.getType(Infinity) === Infinity);
assert(is.getType(new Date()) === Date);
assert(Number.isNaN(is.getType(new Date('abc'))));
assert(is.getType({}) === Object);
assert(is.getType(Fn) === Function);

// is.undefined
assert(is.undefined(void 0));
assert(is.undefined(undefined));
assert(!is.undefined(1));

//is.unset
assert(is.unset(undefined));
assert(is.unset(null));
assert(is.unset(''));
assert(!is.unset('abc'));

// is.arg
(function(){
  assert(is.arg(arguments));
})();
assert(!is.arg('abc'));

// is.error
assert(is.error(new Error('エラー')));
assert(is.error(new TypeError('型エラー')));
assert(!is.error('abc'));

// is.between
assert(is.between(1,3,5));
assert(is.between(1,1,5));
assert(is.between(1,5,5));
assert(!is.between(1,8,5));
assert(is.between(null,3,5));
assert(is.between(1,3,null));

// is.allString
assert(is.allString([]));
assert(is.allString(['a', 'b', 'c']));
assert(!is.allString('a'));
assert(!is.allString([1, 2, 3]));
assert(!is.allString(['a', 'b', 1]));

// is.allNumber
assert(is.allNumber([]));
assert(is.allNumber([1, 2, 3]));
assert(!is.allString(1));
assert(!is.allNumber(['a', 'b', 'c']));
assert(!is.allNumber([1, 2, '3']));

// is.unique
assert(is.unique([1, 2, 3]));
assert(!is.unique([1, 2, 2]));

// is.matches
assert(is.matches([String, String, String], ['a', 'b', 'c']));
assert(is.matches([String, String, String], ['a'], [0]));
assert(!is.matches([Number, String, Date], ['a', 'b'], [0, 1]));

// is.interfaceCheck
var Klass = function (name) {
  this.name = name || null;
};
Klass.prototype.hallo = function () {
  console.log('hallo');
};
assert(is.interfaceCheck(new Klass(), [['name', String, null]], ['hallo']));

// ok
console.log('test ok');