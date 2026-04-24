import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Internet University - Earn the degree the internet thinks you deserve",
  description: "Earn funny internet degrees by completing humorous checklists. Get your official certificate for ₹10!",
  keywords: ["internet university", "meme degree", "funny certificate", "viral", "meme"],
  authors: [{ name: "Internet University" }],
  openGraph: {
    title: "Internet University",
    description: "Earn the degree the internet thinks you deserve",
    type: "website",
    locale: "en_IN",
    siteName: "Internet University",
  },
  twitter: {
    card: "summary_large_image",
    title: "Internet University",
    description: "Earn the degree the internet thinks you deserve",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#6366F1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Google AdSense */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7620811634558573" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
