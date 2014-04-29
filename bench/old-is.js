'use strict';

var cis = require('..');

var oldIs = function oldIs (type, target) {

  if(target === void 0 || target === null) {
    return type === target;

  } else {
    var ctor = target.constructor;

    if (ctor === Number && !isFinite(target)) {
      return type === target || Number.isNaN(type) && Number.isNaN(target);

    } else if (ctor === Date && isNaN(target.getTime())) {
      return Number.isNaN(type);

    } else {
      return type === ctor;

    }
  }
};


var t0 = (new Date()).getTime();

for(var i=0; i < 100000000; i++) {
  cis(Boolean, true);
}

var t1 = (new Date()).getTime();
console.log('current version: ' + (t1 - t0));

for(var i=0; i < 100000000; i++) {
  oldIs(Boolean, true);
}

var t2 = (new Date()).getTime();
console.log('old version: ' + (t2 - t1));


var assert = require('assert');

assert(t1 - t0 < t2 - t1);

console.log('test ok');