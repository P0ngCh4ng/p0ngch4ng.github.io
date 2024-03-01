import styles from "../styles/Home.module.css";
import Link from "next/link"; //追記
import { NextPage } from "next";
import { getSortedPostsData } from "../lib/posts";
import Head from "next/head";
interface HomeProps {
  allPostsData: post[];
}
const Home: NextPage<HomeProps> = ({ allPostsData }) => (
  <div className={styles.container}>
    <Head>
      <title>今日の学び</title>
    </Head>
    <main className={styles.main}>
      <h1 className={styles.title}>今日の学び</h1>
      {/*   <Link href="/posts/about">
         <a style={{ color: "blue" }}>自分について</a>
      </Link>    */}
      <a>いいかげんメモとブログの境目が曖昧になってきたので作り直し予定...</a>
      <ul>
        {allPostsData.map(({ id, title }) => (
          <li key={id}>
            <Link href={"/posts/" + id}>{title}</Link>
          </li>
        ))}
      </ul>
    </main>

    <footer className={styles.footer}>
      <a>Powered by P0ngCh4ng</a>
      <a> 感想や間違いはこちらまで p0ngch4ng@gmail.com</a>
    </footer>
  </div>
);

export default Home;

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
