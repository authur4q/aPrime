
import styles from "./page.module.css";
import Navbar from "./components/navbar/page";
import Link from "next/link";
import { getServerSession } from "next-auth";



export default async function Home() {
  const session =  await getServerSession();
  return (
    <div className={styles.container}>
        <Navbar />
        <div className={styles.hero}>
          <h1>Welcome to Prime  </h1>
          <h1>Share Ideas. Spark Conversations. Inspire Minds.</h1>
          <p>Join a community where your thoughts matter. Post freely, explore what others are thinking, and connect with like-minded thinkers.</p>
          {session? (
            <Link href={"/dashboard"}><button className={styles.button}>Go to Dashboard </button></Link>
          ) : (
            <Link href={"/register"}><button className={styles.button}>Get started</button></Link>
          )}  
          
        </div>
      
    </div>
  );
}
