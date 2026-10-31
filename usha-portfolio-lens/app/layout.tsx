import type { Metadata, Viewport } from "next";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource/caveat/500.css";
import "./globals.css";
import { BuildProvider } from "@/components/BuildMode";
import { site } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: new URL("https://ushasahu.netlify.app"),
  title: {
    default: "Usha Teli — Freelance Full-Stack Developer & Digital Product Engineer",
    template: "%s | Usha Teli",
  },
  description:
    "Usha Teli partners with ambitious businesses and founders to design and engineer distinctive digital experiences, custom web applications (MERN, Next.js, React) and scalable products.",
  keywords: [
    "Usha Teli",
    "Freelance Full-Stack Developer",
    "Digital Product Engineer",
    "Next.js Developer",
    "MERN Stack Developer",
    "React Engineer",
    "Frontend Architect",
    "Full-Stack Web Applications",
    "Freelance Developer Ahmedabad",
    "Custom Web Application Development",
  ],
  authors: [{ name: "Usha Teli", url: "https://ushasahu.netlify.app" }],
  creator: "Usha Teli",
  openGraph: {
    title: "Usha Teli — Freelance Full-Stack Developer & Digital Product Engineer",
    description:
      "Beautiful on the surface. Thoughtfully engineered underneath. I partner with ambitious businesses to build distinctive digital experiences and scalable web apps.",
    url: "https://ushasahu.netlify.app",
    siteName: "Usha Teli Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Usha Teli — Freelance Full-Stack Developer & Digital Product Engineer",
    description:
      "Beautiful on the surface. Thoughtfully engineered underneath. MERN, Next.js, React, TypeScript.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#EEF3F1",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Usha Teli",
    url: "https://ushasahu.netlify.app",
    jobTitle: "Freelance Full-Stack Developer & Digital Product Engineer",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ahmedabad",
      addressRegion: "Gujarat",
      addressCountry: "India",
    },
    knowsAbout: [
      "Full-Stack Development",
      "Next.js",
      "React",
      "TypeScript",
      "MERN Stack",
      "Node.js",
      "Express",
      "MongoDB",
      "UI/UX Engineering",
      "Three.js",
    ],
    sameAs: [site.github, site.linkedin].filter(Boolean),
  };

  return (
    <html lang="en" data-build="off">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a href="#work" className="skip">
          Skip to selected work
        </a>
        <BuildProvider>{children}</BuildProvider>
      </body>
    </html>
  );
}
