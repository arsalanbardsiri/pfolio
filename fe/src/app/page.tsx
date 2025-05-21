//~\pfolio\fe\src\app\page.tsx

"use client"

import Image from "next/image";
import Link from 'next/link';
import ProjectItem from "./components/ProjectItem"
import {useState, useEffect} from "react";


export default function Home() {

  const [projects, setProjects] = useState([])

  useEffect(() => {
    async function rawData(){
    try{
      const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/projects?populate=*`)
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
    <ul className = "grid grid-cols-3 content-start gap-2">

    {projects.map((project: Project) => (
          <ProjectItem
            key={project.id}
            title={project.title}
            summary={project.summary ?? 'No summary'}
            screenshot={`${process.env.NEXT_PUBLIC_STRAPI_URL}${project?.screenshot?.url}` ?? ''}
            github_url={project.github_url || '#'}/>
        ))}
    
    </ul>
    </main>
    <footer>
    <p>Footer</p>
    </footer>
    </div>
    );
}
