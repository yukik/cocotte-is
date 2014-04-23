cocotte-is
======

node.js変数チェック用ライブラリ

jsに静的型指定機能を追加する為の簡易ライブラリです

underscoreの補完を目的として作成されているため、
underscoreに同等の機能が存在する場合はそちらを優先して使用してください。

ただしcocotte-isはunderscoreには依存していません。
単体で動作します

#使用方法

```javascirpt:example.js

var is = require('cocotte-is);

var fn = function (p1) {
    if ( ! is(String, p1)) {
        throw new TypeError('引数1が文字列ではありません');
    }
};

```

#関数

##is

型判定を行います  

`is(型, 値)`と使用し、真偽値を返します。  
型は基本的に値のconstructorと一致した時にtrueです。

ただし、いくつかの値に関しては型はconstructor以外になります

```javascript
var x = is(String, 'abc');
var y = is(Infinity, 1/0);
```

instanceofに似ていますが、プロトタイプチェーンをたどりません  
例えばnew String('abc')をStringであるかつObjectではないと判別するには  
instanceofの代わりにisを使用する必要があります  
またnull, NaNなどを判別する場合も使用できます  

値のconstructorではないものは以下の通りです。

 + undefined               : is(undefined, x) -> true ※注意
 + null                    : is(null     , x) -> true
 + NaN                     : is(NaN      , x) -> true
 + Infinity                : is(Infinity , x) -> true
 + Number.POSITIVE_INFINITY: is(Infinity , x) -> true
 + Number.NEGATIVE_INFINITY: is(-Infinity, x) -> true
 + new Data('abcdefg')     : is(NaN      , x) -> true

（注意）`undefined`は安全に検証する為のis.undefined(x)を使用してください

##is.getType
型を返します

```javascirpt
var tp = is.getType('abc');
```

is関数と似ていますが、一致を判定するのはなく型をそのまま返します


##is.enableId 
識別子として利用可能かどうかを確認します

```javascirpt
var x = is.enableId('xyz');
var y = is.enableId('xyz', ['abc', 'xyz']);
```

識別子は予約語ではなく、20文字以内の英数字である必要があります。  
また、第2引数に追加の予約語を設定する事が出来ます。

#is.reservedWords
予約語一覧を取得する

```javascirpt
var ls = is.reservedWords();
```

##is.undefined
対象が未設定の値(undefined)の場合にtrueを返します。  
undefinedを安全に検証する事ができます

```javascirpt
var x = is.undefined(123456);
```

##is.unset
対象がnull、undefinedの場合にtrueを返します  
空文字や数値の0と厳密に区別を行いたい場合に使用してください  

```javascirpt
var x = is.unset(0);
```

##is.arg
対象がArgumentsオブジェクトの場合はtrueを返します  
実際にはArgumentsは定義がないですが、is(Arguments, x)のように動作します。  
_.isArgumentsと同じです  

```javascirpt
var x = is.arg(arguments);
```

##is.error
エラーオブジェクトかどうかを確認します  
この関数はプロトタイプチェーンをさかのぼります  
isとの違いは`is(Error, new TypeError('x'))`はfalseになる事に対し
下記は`true`になります

```javascirpt
var x = is.error(new TypeError('文字列ではありません'));
```

##is.between
値が範囲内かどうかを確認します  
引数はすべて数字もしくはnullである必要があります

下記は、xが1から10の間に収まっているかを判別します  
開始もしくは終了の値がnullの場合は、以上・以下の判別です

```javascript
var x = 5;
var y = is.between(1, x, 10);
```

##is.allString
すべての値が空文字ではない文字列であるか判別します

```javascript
var x = is.allString(['a', 'b', 'c']);
```

##is.allNumber
すべての値が有効な数字であるか判別します  
`NaN`,`Infinity`, `Number.NEGATIVE_INFINITY`は無効な数字と見なします

```javascript
var x = is.allString([1, 2, 3]);
```

##is.unique
すべての値が一意であるか判別します。  
各要素の判定は`===`で行われます。

```javascript
var x = is.unique([1, 2, 3]);
```

##is.matches
すべての型が一致するかの判定を行います  
  @method matches  
  @static  
  @param  {Array}   types  
  @param  {Array|Arguments}   target  
  @param  {Object}  must  省略可能  
    省略出来ない値のインデックス。設定していない場合はすべて省略不可とします  
    省略可の値はis.unsetがtrueでも判定をパスします  
  @return {Boolean} match  

```javascript
var fn = function (p1, p2, p3) {
    if( ! is.matches([String, Number, Array], arguments) {
         throw new TypeError('引数の型が一致しません');
    }
};
```

##is.interfaceCheck

対象のオブジェクトがプロパティとメソッドを保持しているかを確認します。  
  @method interfaceCheck  
  @param  {Object}  target  
  @param  {Array}   properties [[プロパティ名, 許容型1, 許容型2,.. ], ...]  
  @param  {Array}   methods [メソッド名1, メソッド名2, ...]  
  @param  {Function} callback ({Error} err)  

```javascript
var target = {
  prop1: 'foo',
  prop2: 23,
  prop3: null,
  meth1: function (val) {this.prop1 = val;}
};

var properties = [['prop1', String], ['prop2', Number], ['prop3', String, null]];

var methods = ['meth1'];

var x = is.interfaceCheck(target, properties, methods, function(err) {
  if (err) console.error(err);
});
```




