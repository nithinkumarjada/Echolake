import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  metadataBase: new URL("https://nithin.dev"),
  title: {
    default: "Nithin Kumar Jada | Data Engineer & Software Engineer",
    template: "%s | Nithin Kumar Jada"
  },
  description:
    "Premium portfolio for Nithin Kumar Jada, a technology professional specializing in data engineering, full-stack software, cloud platforms, and analytics systems.",
  keywords: [
    "Nithin Kumar Jada",
    "Data Engineer",
    "Software Engineer",
    "Full Stack Developer",
    "Cloud Engineer",
    "AWS",
    "Spark",
    "Kafka",
    "React",
    "Next.js"
  ],
  authors: [{ name: "Nithin Kumar Jada" }],
  creator: "Nithin Kumar Jada",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nithin.dev",
    title: "Nithin Kumar Jada | Premium Technology Portfolio",
    description:
      "Data engineering, cloud, full-stack systems, and analytics portfolio built for recruiters and technical leaders.",
    siteName: "Nithin Kumar Jada"
  },
  twitter: {
    card: "summary_large_image",
    title: "Nithin Kumar Jada | Data Engineer & Software Engineer",
    description: "Premium portfolio for a modern technology professional."
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.svg"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f9fc" },
    { media: "(prefers-color-scheme: dark)", color: "#060a12" }
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Nithin Kumar Jada",
    jobTitle: "Data Engineer and Software Engineer",
    url: "https://nithin.dev",
    sameAs: [
      "https://www.linkedin.com/in/nithin-kumar-jada",
      "https://github.com/nithin-kumar-jada"
    ],
    knowsAbout: ["Data Engineering", "Cloud Computing", "Full Stack Development", "Analytics"]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Script
          id="portfolio-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
