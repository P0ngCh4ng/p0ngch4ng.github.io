---
title: "Haskell練習3"
date: "2022-11-19"
tag: "programming"
---
 ## 問題4
 ボゴソートを作成
 
 ```
bogosort :: (Show a,Ord a) => [a] -> IO [a]
bogosort [] = return []
bogosort xs = do
  xs' <- shuffle xs
  if isSort xs' then return xs' else bogosort xs' 

isSort :: (Show a,Ord a) => [a] -> Bool
isSort [] = True
isSort [x] = trace(show x) True
isSort (x:y:xs) = if x > y then False else isSort $ res
  where
    res = y:xs
    

main :: IO ()
main = do
  xs <- shuffle [1..9]
  print  xs
  print =<< bogosort xs
   
   ```
   shuffle関数は[前回の頁を参照](https://p0ngch4ng.github.io/posts/haskell1114)
   ボゴソートのアルゴリズムは、ランダムにリストを並び換え、ソートされるまで繰り返すというもの。
   
   関数bogosortの実態はディスパッチャの様な役割を果たしていて、isSort関数に渡し、ソートされるまでshuffle関数に
   繰返し渡す。
   
   isSort関数は、再帰で先頭と次の数を比較し続ける。
   
   isSort関数のパターンマッチングについて少しほりさげると、
   ``` isSort (x:y:xs) =  (x:y:xs) = if x > y then False else isSort $ y:xs ```
   この行では、リストが２要素以上或る場合、比較する。
   先頭２数がソートされていれば、先頭の要素を抜いたリストを次のループに渡す。
   
   ``` isSort [x] = trace(show x) True ```
   １要素しかない場合、整列は完了しているのでTrueを返す。
   
   

