"use client";

import { useEffect, useState } from "react";

import Styles from "./TopBarComponent.module.css";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export const TopBarComponent: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [screenType, setScreenType] = useState<String>("Desktop");
  const [mobileNavMenuVisible, setMobileNavMenuVisible] =
    useState<Boolean>(false);

  const handleWindowSize = (windowSize: number) => {
    if (windowSize < 768) {
      setScreenType("Mobile");
    }

    if (windowSize >= 768) {
      setScreenType("Desktop");
    }
  };

  useEffect(() => {
    console.log("TopBarComponent Mounted");
    handleWindowSize(window.innerWidth);
    // Listen for resize
    window.addEventListener("resize", () => {
      handleWindowSize(window.innerWidth);
    });

    // Listen for scroll
  }, []);


  if (screenType === "Mobile") {
    return (
      <>

          <div className={`${Styles.MobileNavBarContainer}`}
                      style={{
                        zIndex: 1000,
                      }}>
            <div
              className={`${Styles.NavBarContentContainer}`}
              onClick={() => {
                setMobileNavMenuVisible(true);
              }}
            >
              <div className={Styles.MobileNavBarHamburgerContainer}>
                {[1, 2, 3].map((item, index) => {
                  return (
                    <div
                      key={index}
                      className={Styles.MobileNavBarHamburgerLine}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* Modal */}
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgb(64, 64, 64)",
              backdropFilter: "blur(5px)",
              zIndex: 1001,
              display: mobileNavMenuVisible ? "flex" : "none",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                height: "60px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  setMobileNavMenuVisible(false);
                }}
              >
                <span
                  style={{
                    fontSize: "20px",
                    color: "white",
                    fontWeight: 200,
                  }}
                >
                  Close
                </span>
              </div>
            </div>
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "25px",
              }}
            >
                
                  <Link
              className={`${Styles.NavBarContentContainer}`} 
              href={"/"}          
              onClick={() => {
                setMobileNavMenuVisible(false);
              }}          
                  >
                    <span
                      className={`${pathname === '/' ? Styles.MobileNavBarContentTextSelected : Styles.MobileNavBarContentText}`}
                      
                    >
                      Portfolio
                    </span>
                  </Link>

                  <Link
                    className={`${Styles.NavBarContentContainer}`}
                    href={"/posts"}
                    onClick={() => {
                      setMobileNavMenuVisible(false);
                    }}  
                  >
                    <span
                      className={`${pathname === '/posts' ? Styles.MobileNavBarContentTextSelected : Styles.MobileNavBarContentText}`}
                    >
                      Posts
                    </span>
                  </Link>
              
              
            </div>
          </div>

          {/* Spacer */}
          <div
            style={{
              height: "60px",
            }}
          ></div>
      </>
    )
  }


  return (
    <nav style={{
      zIndex: 1000,
    }}>


          <div className={`${Styles.NavBarContainer}`}
                      style={{
                        zIndex: 1000,
                      }}>
            {/* Left Side */}
            <div className={`${Styles.NavBarLeftContainer}`}>
              <Link className={`${Styles.NavBarContentContainer}`} href={"/"} >
                <span
                  className={`${Styles.NavBarContentText} ${pathname === '/' ? Styles.NavBarContentTextSelected : ''}`}
                >
                  Portfolio
                </span>
              </Link>
              <Link className={`${Styles.NavBarContentContainer}`} href={"/posts"}>
                <span className={`${Styles.NavBarContentText} ${pathname === '/posts' ? Styles.NavBarContentTextSelected : ''}`}>Posts</span>
              </Link>
            </div>
            {/* Right Side */}
            <div className={`${Styles.NavBarRightContainer}`}></div>
          </div>

          {/* Spacer */}
          <div
            style={{
              height: "60px",
            }}
          ></div>
        
    </nav>
  );
};
