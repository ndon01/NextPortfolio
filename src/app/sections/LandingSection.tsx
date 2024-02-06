// get if page is smaller than 768 px
import React, { useEffect, useState } from "react";
import styles from "./LandingSection.module.css";
import CustomButton from "../components/CustomButton";
import SkillsComponent from "../components/SkillsComponent";

type SocailConnectionProps = {
  socialId: string;
  socialName: string;
  socialImage: string;
  socialLink: string;
};

type SkillProps = {
  skillId: string;
  skillName: string;
  skillDescription: string;
};

const LandingSection: React.FC = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [{ width, height }, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (mainRef.current) {
        setDimensions({
          width: mainRef.current.getBoundingClientRect().width,
          height: mainRef.current.getBoundingClientRect().height + 1000,
        });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [skillList, setSkillList] = useState<SkillProps[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [socialConnections, setSocialConnections] = useState<
    SocailConnectionProps[]
  >([]);
  // fetch socials
  useEffect(() => {
    // fetch data
    fetch("/api/socials")
      .then((res) => res.json())
      .then((data) => {
        setSocialConnections(data.socials);
      })
      .catch((err) => {
        console.error(err);
      });

    fetch("/api/skills")
      .then((res) => res.json())
      .then((data) => {
        setSkillList(data.skills);
        setSkills(data.skills.map((skill: SkillProps) => skill.skillName));
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const mainRef = React.useRef<HTMLDivElement>(null);

  return (
    <div>
      {/* Background Blur Overlay */}
      <div
        className={styles.backgroundBlurOverlay}
        style={{ width: `${width}px`, height: `${height}px` }}
      />
      {/* Background Floating Objects */}

      <div ref={mainRef} className={`${styles.contentArea}`}>
        {/* Title, Subtitle */}
        <div
          className={`${styles.personalDetailsArea} ${styles.personalDetails} ${styles.slideInTop}`}
        >
          <h1 className={styles.pdNameH1}>Nicholas Donahue</h1>
          <h2
            style={{
              fontWeight: "normal",
            }}
          >
            Computer Science @
            <a className={styles.clickableButton} href="https://www.fiu.edu/">
              {" "}
              {isMobile ? "FIU" : "Florida International University"}
            </a>
          </h2>
          <h2
            style={{
              fontWeight: "normal",
            }}
          >
            GPA: <span style={{ fontWeight: "bold" }}>3.65</span>
          </h2>
        </div>
        {/* Links */}
        <div className={`${styles.socialLinksArea} ${styles.slideInLeft}`}>
          <h1>Socials</h1>

          {/* Social Links */}
          <div>
            {socialConnections.map((connection) => {
              return (
                <CustomButton
                  key={connection.socialId}
                  title={connection.socialName}
                  link={connection.socialLink}
                  buttonType={
                    connection.socialName.toLowerCase() as
                      | "github"
                      | "linkedin"
                      | "x"
                      | "youtube"
                  }
                />
              );
            })}
          </div>
        </div>
        {/* Skills */}
        <div className={`${styles.skillsArea} ${styles.slideInLeft}`}>
          <h1>Skills</h1>

          {/* Skill Tags */}
          <SkillsComponent skills={skills} />
        </div>
      </div>
    </div>
  );
};

export default LandingSection;
