"use client";
import Image from "next/image";
import React from "react";

import styles from "./CustomButton.module.css";

interface ButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
  title?: string;
  link?: string;
  buttonType?: "github" | "linkedin" | "x" | "youtube";
}

const CustomButton: React.FC<ButtonProps> = ({
  onClick,
  disabled,
  children,
  title,
  buttonType,
  link,
}) => {
  const [isMouseHovered, setMouseHovered] = React.useState(Boolean);

  const handleMouseEnter = () => {
    setMouseHovered(true);
  };

  const handleMouseLeave = () => {
    setMouseHovered(false);
  };

  const handleButtonClick = () => {
    if (link) {
      window.open(link);
    }
  };
  return (
    <div
      className={styles.CustomButton}
      onClick={handleButtonClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Replace the Image component with your customizable logo */}

      {title?.toLowerCase() === "github" && (
        <>
          <Image
            src="/assets/images/github-logo-svg.svg"
            width={25}
            height={25}
            alt="Github"
            className={styles.ImagePadding}
          />
        </>
      )}

      {title?.toLowerCase() === "linkedin" && (
        <>
          <Image
            src="/assets/images/linkedin-logo-svg.svg"
            width={25}
            height={25}
            alt="LinkedIn"
            className={styles.ImagePadding}
          />
        </>
      )}

      {title?.toLowerCase() === "x" && (
        <>
          <Image
            src="/assets/images/X-logo-svg.svg"
            width={25}
            height={25}
            alt="X"
            className={styles.ImagePadding}
          />
        </>
      )}

      {title?.toLowerCase() === "twitch" && (
        <>
          <Image
            src="/assets/images/twitch-logo-svg.svg"
            width={25}
            height={25}
            alt="X"
            className={styles.ImagePadding}
          />
        </>
      )}

    {title?.toLowerCase() === "youtube" && (
          <>
          <Image
            src="/assets/images/youtube-logo-svg.svg"
            width={25}
            height={25}
            alt="X"
            className={styles.ImagePadding}
          />
        </>
      )}


      <div className={styles.InnerDiv}>
        {/* Replace the static text with a dynamic text prop */}
        <span>
          {isMouseHovered && `Go to ${title}`}
          {(!isMouseHovered && title) || ""}
        </span>
      </div>
    </div>
  );
};

export default CustomButton;
