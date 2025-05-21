//Creating a Card component for the Project Item
import Image from "next/image";

interface ProjectItemProps {
	title: string;
	summary: string;
	github_url: string;
	screenshot: string;
}

export default function ProjectItem({title,summary,github_url,screenshot}:ProjectItemProps){

	return(
		<li>
		<Image
		src={screenshot}
		alt={title}
		height={200}
		width={200}
		/><br />
		<strong>{title}</strong><br />
		<em>{summary}</em><br />
		<a href={github_url} className = "bg-sky-500" target="_blank" rel="noopener noreferrer">
		View Project
		</a>
		<hr />
		</li>

		)};