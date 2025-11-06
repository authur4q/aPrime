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
    const [error, setError] = useState(null)
   
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

        // simple client-side validation
        if(!title || !description || !content){
            setError("All fields are required")
            return
        }

        try {
            const res = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({title,description,content,name})
            })

            const body = await res.json().catch(() => ({}))
            if (res.ok) {
            
                setTitle("")
                setDescription("")
                setContent("")
                setError(null)

            } else {
                setError('Failed to create post')
                
            }

        } catch (err) {
            console.log(err)
            setError('Network error')
        }

    }

    useEffect(()=>{
        const getData = async () => {
            try {
                const res = await fetch(`/api/posts?name=${name}`)
                const json =  await res.json()
              
                if (res.ok && Array.isArray(json)) {
                    setData(json)
                } else {
                    console.error('Failed to load posts', json)
                    setData([])
                }
            } catch (err) {
                console.error('Error fetching posts:', err)
                setData([])
            }
        }

        if (name) getData()
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

                
                                {Array.isArray(data) && data.length > 0 ?    
                                (
                                    data.map(item => (
                                        <div key={item._id} className={styles.post}>
                <Link  href={`blogs/${item._id}`} >
                    
                    <h2>{item.title}</h2>
            
                        
                </Link>
                <button className={styles.btn} onClick={() => handleDelete(item._id)}>Delete</button>
                    </div>
                
                 ))) :
                     (<h2 className={styles.nopost}>You haven't posted yet...</h2>)}
                </div>
            </div>
            <div className={styles.form}>
                <h1>Create New Post</h1>
                {error && <p style={{color: 'salmon', marginTop: 8}}>{error}</p>}
                <form onSubmit={handleOnSubmit}>
                    <input className={styles.input} value={title} onChange={e => setTitle(e.target.value)} required type="text" placeholder='Post Title' />
                    <input className={styles.input} value={description} onChange={e => setDescription(e.target.value)} type="text" placeholder='Post Description' />
                    <textarea className={styles.textarea} value={content} onChange={e => setContent(e.target.value)} required placeholder='Post Content'></textarea>
                    <button className={styles.button} type='submit'>Create Post</button>
                </form>
            </div>
        </div>
      
    </div>
  )
    }
    
    
    


 
}

export default page
