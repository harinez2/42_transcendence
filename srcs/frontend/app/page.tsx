import { getAllPosts } from "../utils/api";
import PostComponent from "./post";
import { PostType } from "../utils/Types";

export async function GetPosts() {
  const posts: PostType[] = await getAllPosts();

  return {
    props: {
      posts,
    },
  };
}

const Page = async () => {
  const posts: PostType[] = await getAllPosts();
  // set props from getStaticProps
  // require props
  return <PostComponent posts={posts} />;
};

export default Page;
