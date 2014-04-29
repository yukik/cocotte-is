'use strict';
var assert = require('assert');
var arg = require('..').arg;

(function(){
  var x = arguments;
  assert(arg(x));
})();


(function(){
  var f = function (a) {
    assert(arg(a));
  };
  f(arguments);
})();


assert(!arg(['a', 'b', 'c']));
