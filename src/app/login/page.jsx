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
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if(!res?.ok) {
        setError("Invalid credentials");
        setLoading(false);
        return;
      }else {
        setLoading(false);
        router.push("/");
      }
    } catch (err) {
      
      setError('Unable to login. Try again later.')
      setLoading(false);
    }
  }
  return (
    <div className={styles.container}>
        <Navbar />
        <div className={styles.wrapper}>
            <div className={styles.text}>
                <h1>Ready for mind-blowing experience?</h1>
                
            </div>
            <div className={styles.form}>
                <form onSubmit={handleOnSubmit}>
                    <h2 className={styles.formTitle}>Login</h2>
                    <label htmlFor="email" className={styles.visuallyHidden}>Email</label>
                    <input id="email" name="email" className={styles.input} required onChange={e => setEmail(e.target.value)}  type="email" placeholder='Enter your email' />
                    <label htmlFor="password" className={styles.visuallyHidden}>Password</label>
                    <input id="password" name="password" className={styles.input} required  onChange={e => setPassword(e.target.value)}  type="password" placeholder='Enter your password' />
                    {error && <p className={styles.error}>{error}</p>}
                    <button className={styles.button} type='submit' disabled={loading}>{loading ? 'Signing in...' : 'Login'}</button>
                    <h1>Or</h1>
                    <p>Don't have an account? <Link href={"/register"} >Register</Link></p>
                </form>
        </div>
        </div>
      
    </div>
  )
}

export default Login