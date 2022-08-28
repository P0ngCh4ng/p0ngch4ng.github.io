import { getAllPostIds, getPostData } from "../../lib/posts";
import Layout from "../../components/layout";
export default function Post({ postData }: { postData: posts }) {
  return (
    <Layout>
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
      <br />
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  );
}
export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}
export async function getStaticProps({ params }: { params: any }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
