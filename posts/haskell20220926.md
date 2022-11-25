---
title: "Haskell練習1"
date: "2022-9-26"
tag: "programming"
---
### 問題1
【問1】ランダムにアルファベット小文字の1文字表示を繰り返してください。'z'が現れたら"END"と表示して終了してください。


```haskell
import System.Random

randAlpha = randomRIO ('a', 'z')

main :: IO ()
main = do
    r <- randAlpha
    print r
    if r == 'z' then print "END"  else main
    
```

randomRIO関数はタプルをとってIOに包んだ文字(IOモナド)を返す関数
学んだこと
<- 演算子は、値をモナドから取り出してrに束縛するときに使っている。

printは ``a -> IO()`` 型だが、ここでは変数**r**は抜き出されて値のみが束縛されているので、print関数に代入できる。
Haskellでのif文は if ... then... elseという使い方なので注意


### 問題2
【問2】階乗を求める関数factを、アクションを返す関数に書き換えてください。
```haskell
fact 0 = 1
fact n | n > 0 = n * fact (n - 1)

main = do
    print $ fact 5
	```
実行結果
120
ヒント: fact 0 = return 1



```haskell
fact 0 = return 1
fact n | n > 0 = do
    n' <- fact (n - 1)
    return $ n * n'

main = do
    print =<< fact 5
	```

returnを使うと関数はアクション（ほとんどの場合モナド）を返却する。
この問題は関数をdoで包むのが盲点だった。
n'に<-でfact関数の戻り値を束縛しているが、この行を書くときにdoブロックに分けてある必要があった。
おそらくbind関数を使えばdoを使わずにワンライナーで記述可能。


### 問題３
【問3】リストをランダムに並べ替える関数shuffleを実装してください。


わからない....
また次回!
