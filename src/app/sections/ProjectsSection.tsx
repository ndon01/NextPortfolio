import React, { useEffect, useState } from "react";
import { ProjectCardComponent } from "../components/ProjectCardComponent";
import styles from "./ProjectsSection.module.css"; // Adjust the path as necessary

type project = {
    projectId: string;
    projectName: string;
    projectDescription: string;
    projectTags: string;
    projectLink: string;
};

type ProjectsImplementation = project[] | null;

export default function ProjectsSection() {
    const [projects, setProjects] = useState<ProjectsImplementation | null>(null);

    useEffect(() => {
        // fetch data
        fetch("/api/projects/all")
            .then((res) => res.json())
            .then((data) => {


                setProjects(data.projects);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    return (
        <div className={styles.projectsContainer}>
            <div className={styles.contentArea}>
                <div className={styles.titleRow}>
                    <h1 className={styles.title}>Projects</h1>
                </div>

                <div className={styles.projectCardsContainer}>
                    {!projects ? (
                        <div className={styles.loadingContainer}>
                            <h2>Loading...</h2>
                        </div>
                    ) : (
                        projects.map((project) => {
                            return (
                                <ProjectCardComponent
                                    key={project.projectId}
                                    title={project.projectName}
                                    description={project.projectDescription}
                                    tags={project.projectTags.split(",")}
                                    projectLink={project.projectLink}
                                />
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}
