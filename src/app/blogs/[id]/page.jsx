import React from 'react'
import styles from "./id.module.css"
import Navbar from '@/app/components/navbar/page'
import { getPostId } from '@/app/api/posts/[id]/route'


const BlogPost = async ({params}) => {
    const data = await getPostId(await params.id)
  return (
    <div className={styles.container} >
        <Navbar></Navbar>
      <div className={styles.wrapper}>
        <h1 className={styles.title} >{data.title}</h1>
        <h2 className={styles.description}>{data.description}</h2>
        <p className={styles.content}>{data.content}</p>
      </div>
    </div>
  )
}

export default BlogPost
