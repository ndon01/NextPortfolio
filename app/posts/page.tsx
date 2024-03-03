import { TopBarComponent } from "@/components/TopBarComponent";
import { Metadata } from "next";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Nicholas Donahue - Posts",
  description: "Posts from Nicholas Donahue",
  icons: ["/favicon.ico"],
};


import styles from "./posts.module.css";

export default function LandingPage() {

  return (
    <>

    <div style={{
      display: "flex",
      flexDirection: "column",
        }}>
      <TopBarComponent />
      <main
        style={{
          backgroundColor: "smokegrey",
          flex: 1
        }}
      >

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flex: 1, marginTop: "100px" }}>
          <h1 style={{ fontSize: "3rem", marginBottom: "2rem" }}>Coming Soon</h1>
          <p style={{ fontSize: "1.5rem" }}>Stay tuned for updates!</p>
        </div>
    
      </main>
      </div>
    </>
  );
}
