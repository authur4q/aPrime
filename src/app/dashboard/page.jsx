"use client"
import React, { useEffect, useState } from 'react'
import styles from "./dashboard.module.css"
import Navbar from '../components/navbar/page'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'


const page = () => {
    const [title,setTitle] = useState("")
   
    const [description,setDescription] = useState("")
    const [content,setContent] = useState("")
   
    const router = useRouter()
    const [data,setData] = useState([])
    

    const {data:session,status} = useSession()
    const name = session?.user?.name
    useEffect(()=>{
            if(status == "unauthenticated"){
        router.push("/login")
    }
    },[status])


    const handleOnSubmit = async (e) => {
        e.preventDefault()

        if(!title || !description || !content){
            setError("All fields are required")
        }

        try {
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
                body:JSON.stringify({title,description,content,name})
            })
            console.log(res)

        } catch (error) {
            console.log(error)
        }

    }

    useEffect(()=>{
        const getData = async () => {
        const res = await fetch(`/api/posts?name=${name}`)
        const json =  await res.json()
        setData(json)
        


        }
        getData()
    },[name])

    console.log(data)


 
 const handleDelete = async (postId) => {
    const res = await fetch(`api/posts/${postId}`,{
        method:"DELETE"
    })
    setData(prevData => prevData.filter(data => data._id !== postId))
 }
    if(status == "authenticated"){
         return (
    <div className={styles.container}>
        <Navbar />
        <div className={styles.wrapper}>
            <div className={styles.posts}> 
                <h1>{name}</h1>
                <div className={styles.scroll}>

                
                {data?         
                  data.map(item => (
                    <div key={item._id} className={styles.post}>
                <Link  href={`blogs/${item._id}`} >
                    
                    <h2>{item.title}</h2>
                    <p>{item.description}</p>
                        
                </Link>
                <button className={styles.btn} onClick={() => handleDelete(item._id)}>Delete</button>
                    </div>
                
             )) :
                <h1 className={styles.nopost}>You haven't posted yet...</h1>}
                </div>
            </div>
            <div className={styles.form}>
                <h1>Create New Post</h1>
                <form onSubmit={handleOnSubmit}>
                    <input className={styles.input} onChange={e => setTitle(e.target.value)} required type="text" placeholder='Post Title' />
                    <input className={styles.input}  onChange={e => setDescription(e.target.value)} type="text" placeholder='Post Title' />
                    <textarea className={styles.textarea}  onChange={e => setContent(e.target.value)} required placeholder='Post Content'></textarea>
                    <button className={styles.button} type='submit'>Create Post</button>
                </form>
            </div>
        </div>
      
    </div>
  )
    }
    
    
    


 
}

export default page
