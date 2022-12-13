---
title: "scheme練習1"
date: "2022-12-13"
---

かなりやっつけではあるが、http://www.nct9.ne.jp/m_hiroi/func/scheme.html
を参照しつつ練習問題に挑戦したため、記録として残しておく。

```

; 引数を三乗する cubic
(define (cubic x) (* x x x))
(cubic 3)
; 引数を 1/2 にする half
(define (half x)(* x 1/2))
(half 4)
;二つの引数の平均値をとる medium
(define (medium x y) (* (+ x y) 1/2))
(medium 2 4)
;二つの引数の二乗の平均値をとる square-medium
(define (square-medium x y) (* (+ (* x x)(* y y) ) 1/2))
(square-medium 2 4)
;1 から n までの総和を求める関数 sum n
(define (sum n) (* n (+ n 1) 1/2))
(sum 3)
;公式 1 + 2 + ... + n = n(n + 1)/2 を使うと簡単
#|
cons と list で次に示すリストを作ってください
xs : (a (b) ((c)) (((d))))
ys : ((a b c) (d e f) (g h i))
zs : ((a . b) (c . d) (e . f))
|#
(define xs (list 'a (list 'b ) (list (list 'c)) (list (list ( list 'd)))))
xs
(define ys (list (list 'a 'b 'c) (list 'd 'e 'f) (list 'g 'h 'i)))
ys
(define zs (list (cons 'a 'b) (cons 'c 'd) (cons 'e 'f)))
zs


(list-ref  (list-ref xs 1) 0)
(list-ref (list-ref  (list-ref xs 2) 0) 0)
(list-ref (list-ref (list-ref  (list-ref xs 3) 0) 0) 0)

(list-ref (list-ref ys 0) 0)
(list-ref (list-ref ys 0) 1)
(list-ref (list-ref ys 0) 2)

(list-ref (list-ref ys 1) 0)
(list-ref (list-ref ys 1) 1)
(list-ref (list-ref ys 1) 2)

(list-ref (list-ref ys 2) 0)
(list-ref (list-ref ys 2) 1)
(list-ref (list-ref ys 2) 2)

(list-ref (list-ref zs 0) 0)
(list-ref (list-ref zs 0) 0)

(define (select-drink degree)
  (if (<= 30 degree)
      (display "Drink ice coffee\n")
      (display "Don't drink ice coffee\n")))

#|
引数 n が引数 m の約数か判定する述語 divisor? m n
引数 n が 3 または 5 の倍数か判定する述語 three-or-five-multiple n
引数 n が引数 low, high の範囲内にあるか判定する述語 between n low high
リストの要素がただひとつか調べる述語 single? xs
リストの要素が二つあるか調べる述語 double?
|#
(define (divisor? m n)
  (zero? (modulo m n))
  )
(divisor? 4 2)
(define (three-or-five-multiple n) (or (divisor? n 3) (divisor? n 5))
  )
(three-or-five-multiple 4)

(define (between n low high)(and (<= low n) (>= high n)))
(between 1 0 3)

(define (single? xs)
  (and (pair? xs) (null? (cdr xs))))
(single? '(1 2))


(define (double? xs)
  (and (pair? xs)(single? (cdr xs))))
(double? '())


(define (pow2 x y)
  (if (= y 0)
      1
      (let ((z (pow2 x (quotient y 2))))
        (if (= (modulo y 2) 0)
            (* z z)
            (* x z z)))))


(define (pow1 x y)
  (cond
    ((= y 0) 1)
    ((= (modulo y 2) 0)
     (* (pow1 x (quotient y 2)) (pow1 x (quotient y 2))))
    (else                               
     (* x (pow1 x (quotient y 2)) (pow1 x (quotient y 2))))))
(define (facti n a)
  (if (= n 0)
      a
      (facti (- n 1) (* n a))))
(define (fact n) (facti n 1))




;; リスト xs の長さを求める関数 my-length xs
;; length は Scheme に定義されている
;; リスト xs はリスト ys よりも長いか調べる述語 longer? xs ys
;; リスト xs の先頭から n 個の要素を取り出す関数 take xs n
;; リスト xs の先頭から n 個の要素を取り除く関数 drop xs n
;; take, drop は Scheme のライブラリ SRFI-1 [*3] の関数
;; SRFI-1 は R7RS-large で取り込まれる予定
;; リストの要素を足し算する関数 sum-list xs
;; リストの要素を掛け算する関数 product xs


(define (my-length xs)
  (let ((xs2 xs)
        (n 0))
        (while (not (null? xs2))
          (set! xs2 (cdr xs2))
          (set! n (+ n 1)))
    n)
  )

(my-length '(1 2 3))
(define (my-length2 xs) 
  (let iter ((xs xs) (c 0))
    (if (null? xs) c (iter (cdr xs) (+ c 1)))))

(my-length2 '(1 2 3))
(define (longer? xs ys)  
  (
   cond ((null? xs) #f)((null? ys) #t)( else (longer? (cdr xs)(cdr ys)))
   ))

(longer? '(1  3 3 3 2) '(1 2 3))

(define (take xs n)
  (let iter ((xs xs) (n n)(ls '()))
    (if (zero? n) ls
        (iter (cdr xs) (- n 1) (cons (car xs) ls)))))

(take '(2 2 2) 10)
(define (drop xs n)
  (if (zero? n) xs (drop (cdr xs) (- n 1))))
(drop '(2 3 2 3 4 5) 10)

(define (sum-list xs)
  (let iter ((xs xs)(n 0))
    (if(null? xs) n (iter (cdr xs) (+ n (car xs))))))
(sum-list '(1 2 10))
(define (product xs)
  (let iter((xs xs)(n 1))
    (if(null? xs) n (iter(cdr xs) (* n (car xs)))))
  )
(product '(1 2 3 4 5 6 7 8 9 10))
```
