'use strict';

var cis = require('..');

var target = {
  prop1: 'foo',
  prop2: 23,
  prop3: null,
  meth1: function (val) {this.prop1 = val;}
};

var properties = [['prop1', String], ['prop2', Number], ['prop3', String, null]];

var methods = ['meth1'];

var x = cis.interfaceCheck(target, properties, methods, function(err) {
  if (err) {
    console.error(err);
  }
});

console.log(x);