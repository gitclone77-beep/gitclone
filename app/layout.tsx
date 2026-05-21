import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap"
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap"
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gitclone.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "GitClone - Build, Clone, Ship Faster",
    template: "%s | GitClone"
  },
  description:
    "A next-generation developer platform for repositories, collaboration, issue tracking, branch previews, and deployment workflows.",
  keywords: [
    "GitClone",
    "developer platform",
    "repository management",
    "code collaboration",
    "deployment previews",
    "pull requests"
  ],
  applicationName: "GitClone",
  authors: [{ name: "GitClone" }],
  creator: "GitClone",
  publisher: "GitClone",
  openGraph: {
    title: "GitClone - Build, Clone, Ship Faster",
    description:
      "A futuristic developer ecosystem for repositories, collaboration, previews, and deployments.",
    url: siteUrl,
    siteName: "GitClone",
    images: [
      {
        url: "/brand/og-image.png",
        width: 1200,
        height: 630,
        alt: "GitClone futuristic developer platform"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "GitClone - Build, Clone, Ship Faster",
    description:
      "A next-generation developer platform for repositories, collaboration, and deployment workflows.",
    images: ["/brand/og-image.png"]
  },
  icons: {
    icon: "/brand/favicon.png",
    shortcut: "/brand/favicon.png",
    apple: "/brand/logo-symbol.png"
  }
};

export const viewport: Viewport = {
  themeColor: "#020617",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="overflow-x-hidden bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
