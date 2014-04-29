'use strict';
var assert = require('assert');
var reservedWords = require('..').reservedWords;

assert(reservedWords().indexOf('Array') >= 0);



