"use client"
import React, { useState } from 'react'
import Navbar from '../components/navbar/page'
import styles from "./login.module.css"
import Link from 'next/link'
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [error,setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
  });
  if(!res?.ok) {
    setError("Invalid credentials");
  }else {
    
    router.push("/");
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
                    
                    <input  className={styles.input} required onChange={e => setEmail(e.target.value)}  type="email" placeholder='Enter your email' />
                    <input className={styles.input} required  onChange={e => setPassword(e.target.value)}  type="password" placeholder='Enter your password' />
                    {error && <p className={styles.error}>{error}</p>}
                    <button className={styles.button} type='submit'>Login</button>
                    <h1>Or</h1>
                    <p>Don't have an account?<Link href={"/register"} >Register</Link></p>
                </form>
        </div>
        </div>
      
    </div>
  )
}

export default Login
