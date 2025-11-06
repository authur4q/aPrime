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
            <button
              className={`${styles.btn} ${styles.logout}`}
              onClick={() => signOut()}
              aria-label="Sign out"
              title="Sign out"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" style={{marginRight: '8px'}}>
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Logout
            </button>
          ):(
            null
          )}
        </div>
    </div>
  )
}

export default Navbar
