import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from "@/styles/Home.module.css"
import { getAllPosts } from '@/utils/api'
import { PostType } from '@/utils/Types'
const inter = Inter({ subsets: ['latin'] })

type Props = {
  posts: PostType[];
};

export async function getStaticProps() {
  const posts: PostType[] = await getAllPosts();

  return {
    props: {
      posts,
    },
  };
}

export default function Home({ posts }: Props) {
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
  )
}
