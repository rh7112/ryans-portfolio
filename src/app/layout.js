import localFont from "next/font/local";
import "./globals.css";
import SiteHeader from "./components/SiteHeader";
import { getEmployers } from "@/lib/portfolio-data";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const siteUrl = "https://ryan.hurd.cc";
const siteTitle = "Ryan Hurd | Software Engineer";
const siteDescription =
  "Portfolio site for Ryan Hurd, a software engineer focused on thoughtful tools and practical solutions.";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Ryan Hurd",
  },
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Ryan Hurd",
    title: siteTitle,
    description: siteDescription,
    images: [{ url: "/images/ryan_pfp.png" }],
  },
  twitter: {
    card: "summary",
    title: siteTitle,
    description: siteDescription,
    images: ["/images/ryan_pfp.png"],
  },
};

// Person schema, present site-wide -- the single highest-leverage signal for
// how Google understands and displays results for searches on Ryan Hurd's
// own name, since it ties this site to his real identity/profiles rather
// than leaving Google to guess from unstructured text.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ryan Hurd",
  url: siteUrl,
  image: `${siteUrl}/images/ryan_pfp.png`,
  jobTitle: "Software Engineer",
  sameAs: [
    "https://github.com/rh7112",
    "https://www.linkedin.com/in/ryan-lee-hurd/",
    "https://profile.indeed.com/p/ryanh-sv25zg9",
  ],
};

// Applies a stored manual theme choice before first paint, so there's no
// flash of the wrong theme while React hydrates. Runs synchronously as the
// first thing in <body>; suppressHydrationWarning on <html> is needed
// because this intentionally changes className before hydration compares it.
const themeInitScript = `
(function () {
  try {
    var theme = window.localStorage.getItem("theme");
    if (theme === "dark" || theme === "light") {
      document.documentElement.classList.add(theme);
    }
  } catch (e) {}
})();
`;

export default async function RootLayout({ children }) {
  const employers = await getEmployers();

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <SiteHeader employers={employers} />
        {children}
        <script type="module" src="https://cdn.jsdelivr.net/gh/rh7112/hurd-footer@main/hurd-footer.js"></script>
        <hurd-footer tagline="Ryan Hurd" link-href="https://github.com/rh7112"></hurd-footer>
        {/* Cloudflare Web Analytics (ryans-portfolio#50) -- checking whether
            recent SEO work (robots.txt, sitemap.xml, Person JSON-LD,
            per-page metadata/OG tags) is actually moving traffic. Token is
            hardcoded, not an env var -- it's a public client-side value by
            design (visible in every page's HTML regardless), matching this
            family of repos' existing convention for values like this
            (see blog-hurd-cc's CommentsSection.jsx for the same reasoning). */}
        <script
          type="module"
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "07d239af894f42bdbf28ca24246ad6b3"}'
        ></script>
      </body>
    </html>
  );
}
