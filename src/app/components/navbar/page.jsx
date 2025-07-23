"use client"
import React from 'react'
import Link from 'next/link'
import styles from './navbar.module.css'
import { signOut, useSession } from 'next-auth/react'


const links = [
  { 
    href: '/',
    label: 'Home',
    id:1
  },
  {
    href: '/blogs',
    label: 'Blogs',
    id:2
  },
  {
    href: '/dashboard',
    label: 'Dashboard'
    , id:3
  },

]

const Navbar = () => {
  const {data:session} = useSession()
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <h1><Link href={"https://www.instagram.com/authurprime_?igsh=aDF0OWp6M2djODFs"}>Prime</Link></h1>
        </div>
        <div className={styles.links}>
          {links.map(link => (
            < Link  href={link.href} key={link.id}>{link.label}</Link>
          ))}

          {session?.user?.name?  (
            <button  className={styles.btn} onClick={() => signOut()}>Logout</button>
          ):(
            null
          )}
        </div>
    </div>
  )
}

export default Navbar
