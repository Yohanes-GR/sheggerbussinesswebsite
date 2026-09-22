import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ProjectGallery } from "@/components/ProjectGallery";
import { getSite } from "@/lib/cms";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return { title: "Projects", description: site.pages.projects.text };
}

export default async function ProjectsPage() {
  const site = await getSite();
  const page = site.pages.projects;

  return (
    <div>
      <PageHero kicker={page.kicker} title={page.title} text={page.text} image={page.image} />
      <section className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <ProjectGallery projects={site.projects} />
      </section>
    </div>
  );
}
