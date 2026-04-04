import { notFound } from "next/navigation";
import { projects } from "@/lib/data";
import { ProjectDetailClient } from "./ProjectDetailClient"; 

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = projects.find((p) => p.slug === resolvedParams.slug);
  
  if (!project) {
    notFound();
  }

  return (
    <ProjectDetailClient project={project} />
  );
}
