/*
 * Copyright(c) 2013 Yuki Kurata <yuki.kurata@gmail.com>
 * MIT Licensed
 */
'use strict';

/** 
 * 型判定機能を追加する為の簡易ライブラリです
 *
 * underscoreの補完を目的として作成されているため
 * underscoreに同等の機能が存在する場合はそちらを優先して使用してください
 * cocotte-isはunderscoreには依存していません
 * 単体で動作します
 */

/**
 * 型判定を行う
 * instanceofに似ていますが、プロトタイプチェーンをたどりません
 * 
 * 例えばnew String('abc')をStringであるかつObjectではないと判別するには
 * instanceofの代わりにisを使用する必要があります
 * 
 * またnullやNaNを判別する場合も使用できます
 *
 * instanceofとは異なる判定方法を行うものを次にまとめます
 * 
 *    undefined               : is(undefined, x) -> true 
 *          (確実に判定する為にis.undefinedを使用してください)
 *    null                    : is(null     , x) -> true
 *    NaN                     : is(NaN      , x) -> true
 *    Infinity                : is(Infinity , x) -> true
 *    Number.POSITIVE_INFINITY: is(Infinity , x) -> true
 *    Number.NEGATIVE_INFINITY: is(-Infinity, x) -> true
 *    new Data('abcdefg')     : is(NaN      , x) -> true
 *
 * それぞれ、Number/Dateと型判定時にfalseになります
 * 
 * @for is
 * @method  is
 * @static
 * @param  {Mixed}   type
 * @param  {Mixed}   target
 * @return {Boolean} isType
 */
var is = function is (type, target) {
  // undefined, null
  if(target === void 0 || target === null) {
    return type === target;
  }

  // 文字列
  if (typeof target === 'string') {
    return type === String;
  }

  // 数字
  if (typeof target === 'number') {
    if (isFinite(target)) {
      return type === Number;

    } else if (target !== target) { // NaN
      return  type !== type;

    } else {
      // Infinity, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY
      return type === target;
    }
  }

  // 真偽値
  if (typeof target === 'boolean') {
    return type === Boolean;
  }

  // その他
  var ctor = target.constructor;

  // 不正な日付
  if (ctor === Date && isNaN(target.getTime())) {
    return Number.isNaN(type);
  }

  // コンストラクタとの一致
  return type === ctor;
};

/**
 * 型を返します
 *
 * is関数とロジックは似ています
 * ただ、一致を判定するのはなく型をそのまま返します
 *
 * @method getType
 * @static
 * @param  {Mixed}  target
 * @return {Object} type
 */
is.getType = function getType (target) {

  // undefined, null
  if(target === void 0 || target === null) {
    return target;
  }

  // 文字列
  if (typeof target === 'string') {
    return String;
  }

  // 数字
  if (typeof target === 'number') {
    if (isFinite(target)) {
      return Number;

    } else if (Number.isNaN(target)) {
      return NaN;

    } else {
      // Infinity, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY
      return target;
    }
  }

  // 真偽値
  if (typeof target === 'boolean') {
    return Boolean;
  }

  // その他
  var ctor = target.constructor;

  // 日付
  if (ctor === Date) {
    return isNaN(target.getTime()) ? NaN : Date;
  }

  return ctor;
};

/*
 * 識別子として禁止用語
 * @property {Array} ngWords
 */
var ngWords = [
  // グローバルオブジェクト
  'Array', 'ArrayBuffer', 'Boolean', 'Collator', 'DataView',
  'Date', 'DateTimeFormat', 'decodeURI', 'decodeURIComponent', 'encodeURI',
  'encodeURIComponent', 'Error', 'eval', 'EvalError', 'Float32Array',
  'Float64Array', 'Function', 'Infinity', 'Intl', 'Int16Array',
  'Int32Array', 'Int8Array', 'isFinite', 'isNaN', 'Iterator',
  'JSON', 'Math', 'NaN', 'Number', 'NumberFormat',
  'Object', 'parseFloat', 'parseInt', 'RangeError', 'ReferenceError',
  'RegExp', 'StopIteration', 'String', 'SyntaxError', 'TypeError',
  'Uint16Array', 'Uint32Array', 'Uint8Array', 'Uint8ClampedArray', 'undefined',
  'uneval', 'URIError',
  // 構文予約語,
  'break', 'delete', 'if', 'this', 'while',
  'case', 'do', 'in', 'throw', 'with',
  'catch', 'else', 'instanceof', 'try', 'continue',
  'finally', 'new', 'typeof', 'debugger', 'for',
  'return', 'var', 'default', 'function', 'switch',
  'void', 'class', 'const', 'enum', 'export',
  'extends', 'import', 'super', 'implements', 'interface',
  'let', 'package', 'private', 'protected', 'public',
  'static', 'yield',
  // ECMAScript,
  'null', 'true', 'false',
  // addtional,
  'get', 'set', 'arguments',
  // node.js,
  'exports', 'require', 'module', '__filename', '__dirname',
  'DTRACE_NET_SERVER_CONNECTION', 'DTRACE_NET_STREAM_END',
  'DTRACE_NET_SOCKET_READ', 'DTRACE_NET_SOCKET_WRITE',
  'DTRACE_HTTP_SERVER_REQUEST', 'DTRACE_HTTP_SERVER_RESPONSE',
  'DTRACE_HTTP_CLIENT_REQUEST', 'DTRACE_HTTP_CLIENT_RESPONSE',
  'global', 'process', 'GLOBAL', 'root', 'Buffer',
  'setTimeout', 'setInterval', 'clearTimeout', 'clearInterval', 'setImmediate',
  'clearImmediate', 'console'
].sort();

/**
 * 識別子として利用可能かどうかを確認します
 * @method enableId
 * @param  {String}   target
 * @param  {Array}    optional (省略可能)
 * @return {Boolean}  success
 */
is.enableId = function enableId (target, optional) {

  if (!is(String, target)) {
    // 文字列ではない
    return false;

  } else if (~ngWords.indexOf(target)) {
    // システム予約語
    return false;

  } else if (is.allString(optional) && ~optional.indexOf(target)) {
    // オプションの予約語
    return false;

  } else if (!/^[a-z]([_0-9a-z]{0,18}[0-9a-z])?$/i.test(target)) {
    // 20文字以内の英数字ではない
    return false;

  } else {

    return true;
  }
};

/**
 * 予約語一覧を取得する
 * @method reservedWords
 * @param  {Array} optional (省略可能)
 * @return {Array}
 */
is.reservedWords = function reservedWords (optional) {
  if (is.allString(optional)) {
    var rtn = [];
    rtn = rtn.concat(ngWords);
    rtn = rtn.concat(optional);
    rtn.sort();
    return rtn;
  } else {
    return ngWords;
  }
};

/**
 * 対象が確実にundefinedであるかどうかを確認する
 * @method undefined
 * @param  {Mixed}  target
 * @return {Boolean}
 */
is.undefined = function isUndefined (target) {
  return target === void 0;
};

/**
 * 対象が空文字、null、undefinedの場合にtrueを返します
 * 数値の0やfalseと厳密に区別を行いたい場合に使用してください
 * @method unset
 * @param  {Mixed}   target
 * @return {Boolean}
 */
is.unset = function isUnset (target) {
  return target === null || target === void 0 || target === '';
};

/** 
 * 対象がArgumentsオブジェクトの場合はtrueを返します
 * 実際にはArgumentsは定義がないですが、is(Arguments, x)のように動作します。
 * _.isArgumentsと同じ処理です
 * @method arg
 * @param  {Mixed}   target
 * @return {Boolean} isArgumentsObject
 */
is.arg = function isArg (target) {
  return is(Object, target) && target.hasOwnProperty('callee');
};

/**
 * エラーオブジェクトかどうかを確認します
 * この関数はプロトタイプチェーンをさかのぼります
 * @method error
 * @param  {target} target
 * @return {Boolaen}
 */
is.error = function isError (target) {
  return target instanceof Error;
};

/**
 * 値が範囲内かどうかを確認します
 * @method between
 * @param  {Number} min    nullで判定をパス
 * @param  {Number} target 
 * @param  {Number} max    nullで判定をパス
 * @return {Boolean}
 */
is.between = function isBetween (min, target, max) {

  min = min === null ? -Infinity : min;
  max = max === null ? Infinity : max;

  return typeof min === 'number' &&
         typeof target === 'number' &&
         typeof max === 'number' &&
         min <= target && target <= max;
};

/**
 * すべての値が文字列であるか判別します
 * @method allString
 * @param  {Array}  arr
 * @return {Boolean}
 */
is.allString = function isAllString (target) {

  if (is.arg(target)) {
    target = Array.prototype.slice.call(target);

  } else if (!Array.isArray(target)) {
    return false;

  }

  return target.every(function (v) {
    return is(String, v);
  });
};

/**
 * すべての値が有効な数字であるか判別します
 * @method allNumber
 * @param  {Array}  target
 * @return {Boolean}
 */
is.allNumber = function isAllNumber (target) {

  if (is.arg(target)) {
    target = Array.prototype.slice.call(target);

  } else if (!Array.isArray(target)) {
    return false;

  }

  return target.every(function (v) {
    return is(Number, v);
  });
};

/**
 * すべての値が指定した型の要素の配列かどうかを判別します
 * @method all
 * @param  {Mixed} type
 * @param  {Array} target
 * @return {Boolean}
 */
is.all = function isAll (type, target) {

  if (is.arg(target)) {
    target = Array.prototype.slice.call(target);

  } else if (!Array.isArray(target)) {
    return false;

  }

  return target.every(function (v) {
    return is(type, v);
  });
};

/**
 * すべての値が一意であるか判別します
 * @method unique
 * @param  {Array} target
 * @return {Boolean}
 */
is.unique = function isUnique (target) {

  if (is.arg(target)) {
    target = Array.prototype.slice.call(target);

  } else if (!Array.isArray(target)) {
    return false;

  }

  // NaN対策
  var nanCnt = target.reduce(function(x, v){return v !== v ? x + 1: x;}, 0);
  if (nanCnt >= 2) {
    return false;
  }

  return target.every(function (v, i, self) {
    return self.indexOf(v) === self.lastIndexOf(v);
  });

};

/**
 * すべての型が一致するかの判定を行います
 * 
 * @method matches
 * @static
 * @param  {Array}           types
 * @param  {Array|Arguments} target
 * @param  {Array}           must
 *           省略出来ないインデックス。設定していない場合はすべて省略不可とします
 *           省略可の値はis.unsetがtrueでも判定をパスします
 * @return {Boolean} match
 */
is.matches = function isMatches (types, target, must) {

  // 対象が配列もしくはArgumentsではない場合はfalseを返す
  if (!Array.isArray(types) && !is.arg(target)) {
    return false;
  }

  // 判別
  if(Array.isArray(must)) {
    // 省略可能な引数が存在する場合
    return types.every(function (tp, i) {
      return (!~must.indexOf(i) && is.unset(target[i])) || is(tp, target[i]);
    });

  } else {
    // すべての引数が必須
    return types.every(function (tp, i) { return is(tp, target[i]); });

  }
};

/**
 * 対象のオブジェクトがプロパティとメソッドを保持しているかを確認します。
 * @method interfaceCheck
 * @param  {Object}  target
 * @param  {Array}   properties
 *                      [[プロパティ名, 許容型1, 許容型2,.. ], ...]
 * @param  {Array}   methods
 *                      [メソッド名1, メソッド名2, ...]
 * @param  {Function} callback ({Error} err)
 * @return {Boolean} result
 */
is.interfaceCheck = function interfaceCheck (target, properties, methods, callback) {
  
  var errorProperties = [];
  var errorMethods = [];

  if (properties) {
    properties.reduce(function (err, p) {
      var name = p[0];
      var val  = target[name];
      for(var i = 1, len = p.length; i < len; i++) {
        if (is(p[i], val)) {
          return err;
        }
      }
      err.push(name);
      return err;
    }, errorProperties);
  }

  if (methods) {
    methods.reduce(function (err, m) {
      if (!is(Function, target[m])) {
        err.push(m);
      }
      return err;
    }, errorMethods);
  }

  var err = null;

  if (errorProperties.length + errorMethods.length) {
    err = new Error(
      (errorProperties.length > 0 ? 'プロパティ:' + errorProperties.join() + '  ': '') +
      (errorMethods.length > 0 ? 'メソッド:' + errorMethods.join() : ''));
  }
  if (callback) {
    callback(err);
  }
  return !err;
};

module.exports = exports = is;
