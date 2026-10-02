import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/custom-cursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ajay Chavan | Creative Full Stack Developer & 3D Web Architect",
  description: "Explore the interactive portfolio of Ajay Chavan, a senior full-stack engineer and UI/UX designer specializing in React, Next.js, Three.js, WebGL, Node.js, and serverless AI applications.",
  keywords: ["Ajay Chavan", "Full Stack Developer", "3D Web Architect", "Three.js Portfolio", "Next.js 15 Portfolio", "WebGL Web Designer", "React Engineer"],
  authors: [{ name: "Ajay Chavan" }],
  openGraph: {
    title: "Ajay Chavan | Creative Full Stack Developer Portfolio",
    description: "Immersive 3D interactive web experiences built with Next.js, React Three Fiber, GSAP, and Tailwind CSS.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      style={{ scrollBehavior: "smooth" }}
      suppressHydrationWarning
    >
      <body 
        className="min-h-full flex flex-col bg-[#030014] text-[#f8fafc] overflow-x-hidden select-none"
        suppressHydrationWarning
      >
        {/* Custom interactive mouse cursor trail */}
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
