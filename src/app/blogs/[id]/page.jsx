"use client"
import React, { useEffect, useState } from 'react'
import styles from "./id.module.css"
import Navbar from '@/app/components/navbar/page'
import { useParams } from 'next/navigation'



const BlogPost = () => {
  const { id } = useParams()
  const [data,setData] = useState()
    useEffect(()=>{
  const getData = async () => {
  const res = await fetch(`/api/posts/${id}`)
  const json = await res.json()

  setData(json)
}

      getData()
    },[id])
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
