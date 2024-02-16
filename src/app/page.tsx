"use client";

import Image from "next/image";
import styles from "./page.module.css";
import CustomButton from "./components/CustomButton";
import SkillsComponent from "./components/SkillsComponent";
import { ProjectCardComponent } from "./components/ProjectCardComponent";
import { useEffect, useState } from "react";
import LandingSection from "./sections/LandingSection";
import ProjectsSection from "./sections/ProjectsSection";
import { TopBarComponent } from "./components/TopBarComponent";

type project = {
  projectId: string;
  projectName: string;
  projectDescription: string;
  projectImage: string;
  projectLink: string;
};

type ProjectsImplementation = project[] | null;

export default function LandingPage() {
  return (
    <>
      <TopBarComponent />
      <main
        style={{
          backgroundColor: "smokegrey",
        }}
      >
        {/* Personal Area Vertical List */}
        <LandingSection />
        {/* Transition Area */}
        <div
          style={{
            position: "relative",
            bottom: -10,
          }}
        >
          <svg
            viewBox="0 0 1440 172"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              width: "100%",
              height: "auto",
            }}
          >
            <path
              d="M0 32.7547C268.668 68.3857 425.947 69.4302 720 32.7547C1001.18 -9.79929 1158.82 -12.023 1440 32.7547V171.755H0V32.7547Z"
              fill="#404040"
            />
          </svg>
        </div>

        {/* Projects Area */}
        <ProjectsSection />
      </main>
    </>
  );
}
