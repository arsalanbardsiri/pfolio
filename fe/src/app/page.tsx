//~\pfolio\fe\src\app\page.tsx

"use client"

import Image from "next/image";
import Link from 'next/link';
import {useState, useEffect} from "react";


export default function Home() {

  const [projects, setProjects] = useState([])

  useEffect(() => {async function rawData(){
    try{
      const res = await fetch(`${process.env.STRAPI_URL}/api/projects?populate=*`)
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
    <div>
    <header>
    <p>Header</p>
    </header>
    <main >
    <h1>Projects</h1>
    <ul>
    {projects.map((project: Project[])=>
      <li key={project.id}>{project.title}
      <Image src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${project?.screenshot?.url}`} width={150} height={150} alt={project.title} unoptimized/>
      <Link className="bg-sky-500" href={project.github_url}  target="_blank" rel="noopener noreferrer">Link</Link>
      </li>)}
    </ul>
    </main>
    <footer>
    <p>Footer</p>
    </footer>
    </div>
    );
}
