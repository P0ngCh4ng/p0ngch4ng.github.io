---
title: '((Pythonで) 書く (Lisp) インタプリタ)　を読んで'
date: '2022-11-15'
tag: "progamming"
---
http://www.aoky.net/articles/peter_norvig/lispy.htm より
記事のまとめ...というより写経。

## schemeについて
   schemeは一般的にはlispの方言という説明を見かけたが、実態は違う言語である。
   ここでlispの方言というのは、内包的な意味ではなく、単純に似た言語であるという意味にちかい。
   
   今回の記事では、webページを読んで気づいたこと、写経などを行う。短い記事であるため、早ければ1ページ長くても２ページで終わる予定。
   最終的には記事だけ残る。
	
## インタプリタの作成について 
	インタプリタは以下のような構成で作成される。
	- 字句解析
	- 構文解析
   
   - 構文実行
	 上の二つについてはまとめて論じらることもしばしばあるようだが、大まかにはこれらの大分がされる。
	 
	 字句解析はインタプリタによって大きな違いはなく、与えられた文章を、字句ごとに分けることが目的である。
	 構文解析とは、字句解析の段階で最小になった文章の意味づけを理解していくフェーズである。
	 
	 ここで、最小に分解された文字を、**トークン**と呼ぶ。
	 処理されたトークンは、構文解析のフェーズで解読され、最後に構文実行のフェーズで実行される。
	 インタプリタの言語ごとの差異は、ここで大きくなる。
	 
	 基本的には、組み込み関数と文、それから式が実行される。
	 
	 
## インタプリタを作成する
### 構文解析: readとparse
	元の記事では、字句解析と構文解析が一緒くたになっているが、これは字句解析の実装が非常に簡単であったからであると思う。
	というのも、字句解析においてはPythonのstr.splitをそのまま使っている。
	
	```
	def tokenize(s):
    "文字列をトークンのリストに変換する。"
    return s.replace('(',' ( ').replace(')',' ) ').split()
	```
	リスト１ 字句解析のプログラム
	
	*()が多いため一見不思議な文に見えるが、()の間に空白を挟んでいるだけである。*
	
	```
	def read_from(tokens):
    "トークンの列から式を読み込む。"
		if len(tokens) == 0:
			raise SyntaxError('unexpected EOF while reading')
		token = tokens.pop(0)
		if '(' == token:
			L = []
			while tokens[0] != ')':
				L.append(read_from(tokens))
			tokens.pop(0) # pop off ')'
			return L
		elif ')' == token:
			raise SyntaxError('unexpected )')
		else:
			return atom(token)
 
	def atom(token):
    "数は数にし、それ以外のトークンはシンボルにする。"
		try: return int(token)
		except ValueError:
			try: return float(token)
			except ValueError:
				return Symbol(token)
	```
	リスト2 構文解析のプログラム
	
	read_from関数は、字句解析されたトークンが入力される。
	
	lispでは、特別な構文は()しかなく、プログラム全体は必ず()に包まれる。
	それら以外はすべてシンボルか数値である。
	()の中を再帰的に処理し、トークンはそれぞれatom関数でシンボルか数値かどうか判定される。
	シンボルはSymbolというオブジェクトに変換されるが、これはstrのエイリアスでしかなく、実態は後述するenvのなかに辞書の形で格納されている。
	つまりここでSymbolオブジェクトは単なるキーとなる文字列である。
	
	非常に簡素だが、Schemeの構文解析はこのように実装することができる。
	
### 実行: eval
```
def eval(x, env=global_env):
    "環境の中で式を評価する。"
    if isa(x, Symbol):             # 変数参照
        return env.find(x)[x]
    elif not isa(x, list):         # 定数リテラル
        return x                
    elif x[0] == 'quote':          # (quote exp)
        (_, exp) = x
        return exp
    elif x[0] == 'if':             # (if test conseq alt)
        (_, test, conseq, alt) = x
        return eval((conseq if eval(test, env) else alt), env)
    elif x[0] == 'set!':           # (set! var exp)
        (_, var, exp) = x
        env.find(var)[var] = eval(exp, env)
    elif x[0] == 'define':         # (define var exp)
        (_, var, exp) = x
        env[var] = eval(exp, env)
    elif x[0] == 'lambda':         # (lambda (var*) exp)
        (_, vars, exp) = x
        return lambda *args: eval(exp, Env(vars, args, env))
    elif x[0] == 'begin':          # (begin exp*)
        for exp in x[1:]:
            val = eval(exp, env)
        return val
    else:                          # (proc exp*)
        exps = [eval(exp, env) for exp in x]
        proc = exps.pop(0)
        return proc(*exps)
 
isa = isinstance
 
Symbol = str
```	
リスト3 構文実行のプログラム

	
