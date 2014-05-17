cocotte-is
======

node.js変数チェック用ライブラリ

jsに静的型指定機能を追加する為の簡易ライブラリです

underscoreの補完を目的として作成されているため、
underscoreに同等の機能が存在する場合はそちらを優先して使用してください。

ただしcocotte-isはunderscoreには依存していません。
単体で動作します

#使用方法

```javascript
var cis = require('cocotte-is');

var fn = function (p1) {
    if (!cis(String, p1)) {
        throw new TypeError('引数1が文字列ではありません');
    }
};
```

#関数

##cis

型判定を行います  

`cis(型, 値)`と使用し、真偽値を返します。  
型は基本的に値のconstructorと一致した時にtrueです。

ただし、いくつかの値に関しては型はconstructor以外になります

```javascript
var x = cis(String, 'abc');
var y = cis(Infinity, 1/0);
```

instanceofに似ていますが、プロトタイプチェーンをたどりません  
例えばnew String('abc')をStringであるかつObjectではないと判別するには  
instanceofの代わりにcisを使用する必要があります  
またnull, NaNなどを判別する場合も使用できます  

値のconstructorではないものは以下の通りです。

| 値                      | true              | false          |
| ----------------------- | ------------------| -------------- |
| undefined               | cis(undefined, x) | cis(null  , x) |
| null                    | cis(null     , x) | cis(Object, x) |
| NaN                     | cis(NaN      , x) | cis(Number, x) |
| Infinity                | cis(Infinity , x) | cis(Number, x) |
| Number.POSITIVE_INFINITY| cis(Infinity , x) | cis(Number, x) |
| Number.NEGATIVE_INFINITY| cis(-Infinity, x) | cis(Number, x) |
| new Data('abcdefg')     | cis(NaN      , x) | cis(Date  , x) |

（注意）`undefined`は安全に検証する為のcis.undefined(x)を使用してください

##cis.be

型判定を行います。  
`cis`と似ていますが、入力値が`null`または`undefined`の場合は`true`を返します。

```javascript
var x = cis.be(String, 'abc');
var y = cis.be(String, null);
```

どちらも`true`を返します

##cis.alt

型判定を行い、一致した場合は値をそのまま返し、不一致の場合は代替の値を返します  
第三引数を省略した場合は、代替の値は`null`です

```javascript
var x = cis.alt(String, 'abc', 'def'); // x -> 'abc'
var y = cis.alt(Number, '123', 456);   // y -> 456
var z = cis.alt(Boolean, 't');         // z -> null
```

##cis.getType
型を返します

```javascript
var type = cis.getType('abc');
```

##cis.enableId 
識別子として利用可能かどうかを確認します

```javascript
var x = cis.enableId('xyz');
var y = cis.enableId('xyz', ['abc', 'xyz']);
```

識別子は予約語ではなく、20文字以内の英数字である必要があります。  
また、第2引数に追加の予約語を設定する事が出来ます。

##cis.reservedWords
予約語一覧を取得する

```javascript
var ls = cis.reservedWords();
```

##cis.undefined
対象が未設定の値(undefined)の場合にtrueを返します。  
undefinedを安全に検証する事ができます

```javascript
var x = cis.undefined(123456);
```

##cis.unset
対象がnull、undefinedの場合にtrueを返します  
空文字や数値の0と厳密に区別を行いたい場合に使用してください  

```javascript
var x = cis.unset(0);
```

##cis.arg
対象がArgumentsオブジェクトの場合はtrueを返します  
実際にはArgumentsは定義がないですが、cis(Arguments, x)のように動作します。  
_.cisArgumentsと同じです  

```javascript
var x = cis.arg(arguments);
```

##cis.error
エラーオブジェクトかどうかを確認します  
この関数はプロトタイプチェーンをさかのぼります  
cisとの違いは`cis(Error, new TypeError('x'))`はfalseになる事に対し
下記は`true`になります

```javascript
var x = cis.error(new TypeError('文字列ではありません'));
```

##cis.between
値が範囲内かどうかを確認します  
引数はすべて数字もしくはnullである必要があります

下記は、xが1から10の間に収まっているかを判別します  
開始もしくは終了の値がnullの場合は、以上・以下の判別です

```javascript
var x = 5;
var y = cis.between(1, x, 10);
```

##cis.allString
すべての値が文字列であるか判別します

```javascript
var x = cis.allString(['a', 'b', 'c']);
```

##cis.allNumber
すべての値が有効な数字であるか判別します  
`NaN`,`Infinity`, `Number.NEGATIVE_INFINITY`は無効な数字と見なします

```javascript
var x = cis.allString([1, 2, 3]);
```

##cis.all
すべての値が指定した型の要素の配列かどうかを判別します  

```javascript
var x = cis.all(Date, [new Date(), new Date(), '2014-01-12']);
```

##cis.unique
すべての値が一意であるか判別します。  
各要素の判定は`===`で行われます。

```javascript
var x = cis.unique([1, 2, 3]);
```

##cis.matches
すべての型が一致するかの判定を行います  
  @method matches  
  @static  
  @param  {Array}   types  
  @param  {Array|Arguments}   target  
  @param  {Object}  must  省略可能  
    省略出来ない値のインデックス。設定していない場合はすべて省略不可とします  
    省略可の値はcis.unsetがtrueでも判定をパスします  
  @return {Boolean} match  

```javascript
var fn = function (p1, p2, p3) {
    if( ! cis.matches([String, Number, Array], arguments) {
         throw new TypeError('引数の型が一致しません');
    }
};
```

##cis.interfaceCheck

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
  meth1: function (val) {thcis.prop1 = val;}
};

var properties = [['prop1', String], ['prop2', Number], ['prop3', String, null]];

var methods = ['meth1'];

var x = cis.interfaceCheck(target, properties, methods, function(err) {
  if (err) console.error(err);
});
```




