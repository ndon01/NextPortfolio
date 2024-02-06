"use client"
import React from 'react';
import styles from './SkillsComponent.module.css';


interface SkillsTagsProps {
    skills: string[];
}

const SkillsComponent: React.FC<SkillsTagsProps> = ({ skills }) => {

    /* 
        Goal: Display the skills in a pool of tags, with each tag floating next to each other.
              the tags should aim to avoid the mouse pointer, and should be responsive to the screen size.
              If the mouse is able to hover over a tag, the tag should freeze in place, and the other tags should move away from the hovered tag.
    */

    return (
        <div style={{
            marginTop: "10px",
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            alignItems: "center",
            justifyContent: "center",

        }}>
            
                    {skills.map((skill, index) => (
                        <span key={index} className={styles.SkillsTag}>
                            {skill}
                        </span>
                    ))}
        </div>
    );
};

export default SkillsComponent;