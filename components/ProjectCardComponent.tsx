"use client"

import styles from "./ProjectCardComponent.module.css"
import SkillsComponent from "./SkillsComponent";

type ProjectCardProps = {
    title: string;
    description: string;
    tags: string[];
    projectLink: string;
}

export const ProjectCardComponent = ({title = "Project Name", 
description = "A descriptive description.", tags = ["Javascript", "HTML", "CSS"], projectLink } : ProjectCardProps) => {
  return (
    <>
      <div className={styles.ProjectCardContainer}>
        <div className={styles.ProjectDetailsContainer}>
          <div className={styles.ProjectTitleContainer}>
            <h1 className={styles.ProjectTitle}>{title}</h1>
          </div>
          <div className={styles.ProjectDescriptionContainer}>
            <p className={styles.ProjectDescription}>
              {description}
            </p>
          </div>
          <div className={styles.ProjectTagsContainer}>
            <div className={styles.ProjectTagsTitleContainer}>
                <h3 className={styles.ProjectTagsTitle}> Tags </h3>
            </div>
            <div className={styles.ProjectTags}>
                <SkillsComponent skills={tags} />
            </div>
          </div>
        </div>
        <div className={styles.ProjectButtons}>
            <div className={styles.VisitProjectButton} onClick={() => {
                if (projectLink !== "") {
                    window.open(projectLink);
                }
            }}>
                Visit
            </div>
        </div>
      </div>
    </>
  );
};
