import { useEffect, useState } from "react";

import Styles from "./TopBarComponent.module.css";
import { useRouter, usePathname } from "next/navigation";

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


  const navigateHome = () => {
    router.push("/");
  }

  const navigateBlog = () => {
    router.push("/blog");
  }


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
              zIndex: 1000,
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
                    fontSize: "24px",
                    color: "white",
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
              }}
            >
                
                  <div
                    className={`${Styles.NavBarContentContainer} ${Styles.NavBarContentContainerSelected}`}
                  >
                    <span
                      className={`${Styles.NavBarContentText}`}
                      onClick={navigateHome}
                    >
                      Home
                    </span>
                  </div>

                  <div
                    className={`${Styles.NavBarContentContainer} ${Styles.NavBarContentContainerSelected}`}
                  >
                    <span
                      className={`${Styles.NavBarContentText}`}
                      onClick={navigateBlog}
                    >
                      Blog
                    </span>
                  </div>
              
              
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


          <div className={`${Styles.NavBarContainer}`}>
            {/* Left Side */}
            <div className={`${Styles.NavBarLeftContainer}`}>
              <div className={`${Styles.NavBarContentContainer}`} onClick={navigateHome}>
                <span
                  className={`${Styles.NavBarContentText} ${pathname === '/' ? Styles.NavBarContentTextSelected : ''}`}
                >
                  Home
                </span>
              </div>
              <div className={`${Styles.NavBarContentContainer}`} onClick={navigateBlog}>
                <span className={`${Styles.NavBarContentText} ${pathname === '/blog' ? Styles.NavBarContentTextSelected : ''}`}>Blog</span>
              </div>
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
