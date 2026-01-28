
import { getProjects } from "@/app/actions/projects";
import { ProjectsManager } from "./projects-manager";

export default async function ProjectsPage() {
    const response = await getProjects();
    // Assuming getProjects returns { success: true, data: ... } or just list.
    // I defined it to return object.
    const projects = response.success && response.data ? response.data : [];

    return <ProjectsManager initialProjects={projects} />;
}
