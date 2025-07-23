import React from 'react'
import styles from "./id.module.css"
import Navbar from '@/app/components/navbar/page'

const getData = async (id) => {
  const res = await fetch(`http://localhost:3000/api/posts/${id}`)
  if(!res.ok){
    <p>error fetching posts....</p>
  }
  return await res.json()
}


const BlogPost = async ({params}) => {
    const data = await getData(await params.id)
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
