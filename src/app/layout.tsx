import type { Metadata, Viewport } from "next";
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
  maximumScale: 1,
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
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
