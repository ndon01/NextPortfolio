import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TopBarComponent } from "@/components/TopBarComponent";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">

      <body className={inter.className} style={{overflowX: "hidden"}}>
      <div className={`LoadingCover`}/>

      <TopBarComponent/>

        {children}</body>
    </html>
  );
}
