import { getAllPosts } from "../utils/api";
import PostComponent from "./post";
import { PostType } from "../utils/Types";

const Page = async () => {
  const posts: PostType[] = await getAllPosts();
  return <PostComponent posts={posts} />;
};

export default Page;
