"use client";
import Image from "next/image";
import React from "react";

import styles from "./CustomButton.module.css";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface ButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
  title?: string;
  link?: string;
  customStyle?: string
  buttonIcon?: string | StaticImport
}

const CustomButton: React.FC<ButtonProps> = ({
 onClick,
  disabled,
  children,
  title,
  link,
  customStyle,
  buttonIcon,
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

      {buttonIcon && (
        
          <Image
            src={buttonIcon}
            width={25}
            height={25}
            alt={title || "Icon"}
            className={styles.ImagePadding}
          />
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
