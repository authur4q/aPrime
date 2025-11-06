"use client"
import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar/page'
import styles from "./blogs.module.css"
import Link from 'next/link'
import { format,parseISO } from 'date-fns'





const Blogs =  () => {
  const [data,setData] = useState([])

  useEffect(()=>{
    const getData = async  () => {
  const res = await fetch("api/posts")
  const json = await res.json()
  if(!res.ok){
    <p>error fetching posts....</p>
  }
  setData(json)
}

getData()
  },[])



  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.wrapper}>
         <div className={styles.posts}>
               {data.map((item) => (
            <Link key={item._id}  href={`/blogs/${item._id}`}>
              <div className={styles.post}>
                  <div className={styles.postHeader}>
                    
                      <h3 className={styles.author}>post by {item.name}</h3>
                      <p className={styles.time}>{format(parseISO(item.createdAt),'MM/dd/yyyy HH:mm')}</p>

                  </div>
                   <h1>{item.title}</h1>
                   <h3>{item.description}</h3>

              </div>
            </Link>
                    ))}
          </div>
          <div className={styles.text}>
            <h2>Get upto-date with latest catchy posts</h2>
          </div>
      </div>
    </div>
  )
}

export default Blogs
