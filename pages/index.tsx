import styles from "../styles/Home.module.css";
import Link from "next/link"; //追記
import { getSortedPostsData } from "../lib/posts";
const Home = ({ allPostsData }: { allPostsData: posts[] }) => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>今日の学び</h1>
        <Link href="/about">
          <a style={{ color: "blue" }}>自分について</a>
        </Link>
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
      </footer>
    </div>
  );
};

export default Home;

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
