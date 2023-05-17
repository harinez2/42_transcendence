import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '../styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>Nest.js Blog</h1>
      <ul className={styles.postList}>
        <li className={styles.post}>
          <h2 className={styles.title}>はじめて投稿</h2>
          <p className={styles.author}>By me</p>
        </li>
      </ul>
    </div>
  )
}
