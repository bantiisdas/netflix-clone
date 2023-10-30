// "use client"

import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import { RecoilRoot } from 'recoil'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Netflix Clone",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <RecoilRoot> */}
        <ClerkProvider>{children}</ClerkProvider>
        {/* </RecoilRoot> */}
      </body>
    </html>
  );
}
