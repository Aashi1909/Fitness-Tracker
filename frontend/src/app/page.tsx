"use client"
import Image from "next/image";
import styles from "./page.module.css";
import Banner1 from "@/components/Banner1/Banner1";
import Banner2 from "@/components/Banner2/Banner2";

export default function Home() {
  return (
  
      <main className={styles.main}>
        <Banner1 />
        <Banner2 />

 
      </main>


  );
}
