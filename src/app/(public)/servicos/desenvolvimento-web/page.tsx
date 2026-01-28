import { ServiceHero } from "./components/ServiceHero";
import { ServiceWhatWeBuild } from "./components/ServiceWhatWeBuild";
import { ServiceAudience } from "./components/ServiceAudience";
import { ServiceWhy } from "./components/ServiceWhy";
import { ServiceCTA } from "./components/ServiceCTA";
import { ProjectsCarousel } from "./components/ProjectsCarousel";
import { Metadata } from "next";
import { getProjects } from "@/app/actions/projects";

export const metadata: Metadata = {
    title: "Desenvolvimento Web Profissional | iTech Soluções Digitais",
    description: "Desenvolvimento de sites e aplicações web sob medida, com foco em performance e resultado. Fale com a iTech.",
};

export default async function DevWebPage() {
    const response = await getProjects();
    const projects = response.success && response.data ? response.data : [];

    return (
        <main className="min-h-screen">
            <ServiceHero />
            <ServiceWhatWeBuild />
            <ProjectsCarousel projects={projects} />
            <ServiceAudience />
            <ServiceWhy />
            <ServiceCTA />
        </main>
    );
}
