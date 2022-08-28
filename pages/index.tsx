import styles from "../styles/Home.module.css";
import Link from "next/link"; //追記
import { getSortedPostsData } from "../lib/posts";
const Home = ({ allPostsData }: { allPostsData: posts[] }) => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <Link href="/about">
          <a>this page!</a>
        </Link>
        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>pages/index.tsx</code>
        </p>

        <ul>
          {allPostsData.map(({ id, title }) => (
            <li key={id}>
              <Link href={"/posts/" + id}>{title}</Link>
            </li>
          ))}
        </ul>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <img src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
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
