import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Claude Task Manager - AI-Powered Task Management",
  description:
    "Manage tasks intelligently with Claude AI assistance. Organize, prioritize, and complete your work with the power of AI.",
  keywords: [
    "task management",
    "AI",
    "Claude",
    "productivity",
    "project management",
  ],
  authors: [{ name: "Claude Task Manager" }],
  openGraph: {
    title: "Claude Task Manager - AI-Powered Task Management",
    description:
      "Manage tasks intelligently with Claude AI assistance. Organize, prioritize, and complete your work with the power of AI.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Claude Task Manager - AI-Powered Task Management",
    description:
      "Manage tasks intelligently with Claude AI assistance. Organize, prioritize, and complete your work with the power of AI.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background text-foreground antialiased`}
      >
        <Header />
        <main className="relative">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
