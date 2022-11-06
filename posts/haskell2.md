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
