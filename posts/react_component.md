---
title: "ReactのTypeScriptを用いた関数コンポーネントの簡単なまとめ"
data: "2022-9-12"
tag: "programming"
---

これはとりあえず書いてみた関数コンポーネント

```ts
export const App: FC<myProps> = () => {
  const [value, setValue] = useState("");

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  const handleSubmit = async function (
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
  };

  return (
    <div className="container">
      <a>{value} </a>
      <form onSubmit={handleSubmit}>
        <input type="submit" value="Submit" />
      </form>
      <textarea value={value} onChange={handleChange} />
    </div>
  );
};

```
stateはuseStateを代入する。かっこのなかは初期値。
[]で囲み一つ目の変数がゲッター、二つ目の変数がセッターとして扱われる。（両方とも関数）

詳細を記述していないが、propsは型を指定する必要がある。
関数コンポーネントの引数として渡し、中でそのまま扱うことができる。

メソッドは関数として定義する必要がある。従って関数のありかたは一般的なクロージャと同等である。


handleChange関数は引き数のかたにanyを指定しているが、ここで型を指定する場合は、handleSubmitのように__Event<>の形式で型を指定する必要がある。
onChange、onSubmitなどの呼び出すメソッドによって型を変える必要がある。

returnでReact.Element型の値を返す必要がある。
