"use client"
import React from 'react'
import Navbar from '../components/navbar/page'
import styles from "./register.module.css"
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation';

const page = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter()

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
    const {userId} = await res.json()
    console.log(res)
    if(!res.ok) {
      setError("Registration failed");
    }else{
      router.push("/login");
      setError("");
    }
  }
  return (
    <div className={styles.container}>
        <Navbar />
        <div className={styles.wrapper}>
            <div className={styles.text}>
                <h1>Ready for mind-blowing experience?</h1>
                <h2>Register here</h2>
            </div>
            <div className={styles.form}>
                <form onSubmit={handleOnSubmit}>
                    <input className={styles.input} onChange={e => setName(e.target.value)} type="text" placeholder='Enter your name' />
                    <input className={styles.input} onChange={e => setEmail(e.target.value)}  type="email" placeholder='Enter your email' />
                    <input className={styles.input} onChange={e => setPassword(e.target.value)} type="password" placeholder='Enter your password' />
                    {error && <p className={styles.error}>{error}</p>}
                    {/* Handle form submission logic here */}
                    <button className={styles.button} type='submit'>Register</button>
                    <h1>Or</h1>
                    <Link href={"/login"} ><p>Login using existing account</p></Link>
                </form>
        </div>
        </div>
      
    </div>
  )
}

export default page
