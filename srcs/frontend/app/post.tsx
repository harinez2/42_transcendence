"use client";
import { Inter } from "next/font/google";
import styles from "../styles/Home.module.css";
import { PostType } from "../utils/Types";
type Props = {
  posts: PostType[];
};

const PostComponent = ({ posts }: Props) => {
  return (
    <>
      <div className={styles.container}></div>
      <h1>ft_trans</h1>

      <ul className={styles.postList}>
        {posts.map((post: PostType) => (
          <li className={styles.post} key={post.id}>
            <h2 className={styles.tytle}>{post.title}</h2>
            <p className={styles.author}>{post.author}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default PostComponent;
