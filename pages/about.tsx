import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
const About: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>自己紹介タイトル</title>
        <meta name="description" content="自己紹介概要" />
      </Head>
      <h1>自己紹介タイトル</h1>
    </div>
  );
};

export default About;
