cocotte-is
======

node.js変数チェック用ライブラリ

jsに静的型指定機能を追加する為の簡易ライブラリです

underscoreの補完を目的として作成されているため
underscoreに同等の機能が存在する場合はそちらを優先して使用してください
ただしcocotte-isはunderscoreには依存していません
単体で動作します

#使用方法

```js:example.js

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

instanceofに似ていますが、プロトタイプチェーンをたどりません  
例えばnew String('abc')をStringであるかつObjectではないと判別するには  
instanceofの代わりにisを使用する必要があります  
またnull, NaNなどを判別する場合も使用できます  
instanceofとは異なる判定方法を行うものを次にまとめます  

 + undefined               : is(undefined, x) -> true
 + null                    : is(null     , x) -> true
 + NaN                     : is(NaN      , x) -> true
 + Infinity                : is(Infinity , x) -> true
 + Number.POSITIVE_INFINITY: is(Infinity , x) -> true
 + Number.NEGATIVE_INFINITY: is(-Infinity, x) -> true
 + new Data('abcdefg')     : is(NaN      , x) -> true

undefinedは安全に検証する為のis.undefined(x)を使用してください

それぞれ、Number/Dateと型判定時にfalseになります

##is.enableId 
識別子として利用可能かどうかを確認します

#is.reservedWords
予約語一覧を取得する

##is.getType
型を返します  
is関数とロジックは似ています  
ただ、一致を判定するのはなく型をそのまま返します  

##is.undefined
対象が未設定の値(undefined)の場合にtrueを返します  
undefinedを安全に検証する事ができます

##is.unset
対象がnull、undefinedの場合にtrueを返します  
空文字や数値の0と厳密に区別を行いたい場合に使用してください  

##is.arg
対象がArgumentsオブジェクトの場合はtrueを返します  
実際にはArgumentsは定義がないですが、is(Arguments, x)のように動作します。  
_.isArgumentsと同じ処理です  

##is.error
エラーオブジェクトかどうかを確認します  
この関数はプロトタイプチェーンをさかのぼります  

##is.between
値が範囲内かどうかを確認します

##is.allString
すべての値が空文字ではない文字列であるか判別します

##is.allNumber
すべての値が有効な数字であるか判別します

##is.unique
すべての値が一意であるか判別します

##is.matches
すべての型が一致するかの判定を行います  
  @method matches  
  @static  
  @param  {Array}   types  
  @param  {Array}   target  
  @param  {Object}  must  省略可能  
  * 省略出来ないインデックス。設定していない場合はすべて省略不可とします
  * 省略可の値はis.unsetがtrueでも判定をパスします
  @return {Boolean} match


```js:example.js

var fn = function (p1, p2, p3) {
    if( ! is.matches([String, Number, Array], arguments) {
         throw new TypeError('引数の型が一致しません');
    }
};

```

##is.interfaceCheck
対象のオブジェクトがプロパティとメソッドを保持しているかを確認します。
チェックに失敗した場合は例外を発生させます。
  @method interfaceCheck
  @param  {Object}  target
  @param  {Array}   properties
                       [[プロパティ名, 許容型1, 許容型2,.. ], ...]
  @param  {Array}   methods
                       [メソッド名1, メソッド名2, ...]



