---
title: "Haskell練習2"
date: "2022-10-3"
---
## 問題１

length,sum,product,take,drop,reverse関数を自前で再起で書くこと
```
length' []     = 0
length' (_:xs) = 1 + length' xs

sum' [] = 0
sum' (x:xs) = x + sum' xs


product' [] = 0
product' (x:xs) = x * product' xs


take' 0 _ = []
take' n (x:xs) = x : (take' (n-1) xs)

drop' 0 xs = xs 
drop' n (x:xs) = drop' (n-1) xs

reverse' :: [a] -> [a]
reverse' [] = []
reverse' (x:xs) = (reverse' xs) ++ [x]

main = do
    print $ length' [1, 2, 3]
    print $ sum' [1,2,3]
    print $ take' 2 [1,2,3]
    print $ drop' 2 [1,2,3]
    print $ reverse' [1,2,3]
```

## 問題２
shuffle関数を自作すること

```
shuffle :: [a] -> IO [a]
shuffle [] = return []
shuffle xs = do
   n <-  randomRIO (0, length xs - 1) :: IO Int
   xs' <- shuffle $ take n xs ++ drop (n + 1) xs
   return $ (xs !! n) : xs'
```

リスト操作にIOを組み込んだ形。
次の呼び出しには take n xs ++ drop (n + 1 ) xs を与える。
これは、リストの中からランダムな値を一つ取り除いたリストである（!!と逆の処理）。
そして、その返り値をxs'に代入している。

また、この関数が返すのは、リストから任意の値を取り出し、それを先程の物と組み合わせたもの。

