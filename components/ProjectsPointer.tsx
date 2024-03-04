"use client"

import { DownwardArrow } from "@/components/DownwardArrow";

import styles from './ProjectsPointer.module.css'
import React, { useMemo } from "react";

export default function ProjectsPointer() {

    const [shown, setShown] = React.useState(true);
    const [scrollY, setScrollY] = React.useState(0);

    const transparency = useMemo(() => {

        const newTransparency = 1 - (scrollY / 500);

        if (newTransparency <= 0) {
            setShown(false);
        } else {
            setShown(true);
        }

       return newTransparency
    }, [scrollY])

    const scroll = React.useCallback(() => {
        var element = document.getElementById("projects");
        if (element) {
            scrollTo({
                top: element.offsetTop - 45,
                behavior: "smooth"
            
            })
        }
    }, []);

    React.useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);





    return (
        <>
            <div className={styles.ProjectsPointerContainer}
                style={{
                    display: shown ? "flex" : "none",
                    opacity: transparency,
                }}
            >
                <div className={styles.Background}      onClick={scroll}
                style={{
                    opacity: transparency,
                    pointerEvents: shown ? "auto" : "none",
                }}
>
                <span style={{
                    fontSize: "2rem",
                    color: "black",
                    fontWeight: "bold",
                    marginBottom: 10,
                }}>Projects</span>
                <DownwardArrow />
                </div>
            </div>
        </>
    )
}