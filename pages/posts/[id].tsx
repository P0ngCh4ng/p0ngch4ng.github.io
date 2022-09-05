import { getAllPostIds, getPostData } from "../../lib/posts";
import Layout from "../../components/layout";
import { NextPage } from "next";
import Head from "next/head";
interface PostProps {
  postData: post;
}
const Post: NextPage<PostProps> = ({ postData }) => (
  <Layout>
    <Head>
      <title>{postData.title}</title>
    </Head>
    {postData.title}
    <br />
    {postData.date}
    <br />
    <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
  </Layout>
);

export default Post;
export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}
export async function getStaticProps({ params }: { params: post }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
