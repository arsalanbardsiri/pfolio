//~\pfolio\fe\src\app\page.tsx

"use client"

import Image from "next/image";
import Link from 'next/link';
import {useState, useEffect} from "react";


export default function Home() {

  const [projects, setProjects] = useState([])

  useEffect(() => {async function rawData(){
    try{
      const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/projects?populate=*`)
      if (!res.ok) throw new Error(`Failed to fetch, status ${res.status}`);
      const json = await res.json()
      setProjects(json.data)
    }
    catch(err){
      console.error('Error loading projects:', err);
      return <p className="error">Failed to load projects.</p>;
    }
  }

  rawData();

},[]);
  
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    <header>
    <p>Header</p>
    </header>
    <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
    <h1>Hello World</h1>
    <ul>
    <li key = {projects.id}>{projects.map((project)=>(
      project.title))}
    </li>
    </ul>
    </main>
    <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
    <p>Footer</p>
    </footer>
    </div>
    );
}
