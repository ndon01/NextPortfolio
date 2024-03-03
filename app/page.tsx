import styles from "./page.module.css";

import LandingSection from "@/components/sections/LandingSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import { TopBarComponent } from "@/components/TopBarComponent";
import { Metadata } from "next";

type project = {
  projectId: string;
  projectName: string;
  projectDescription: string;
  projectImage: string;
  projectLink: string;
};

type ProjectsImplementation = project[] | null;

export const metadata: Metadata = {
  title: "Nicholas Donahue - Portfolio",
  description: "Showcasing projects and experiences in Computer Science and Software Engineering.",
  icons: ["/favicon.ico"],
};


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
