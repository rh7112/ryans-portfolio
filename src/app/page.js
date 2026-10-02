import PortfolioShell from "./components/PortfolioShell";
import {
  getCertifications,
  getEducation,
  getEmployers,
  getHomepageData,
  getLatestBlogPosts,
  getProjectList,
  getVolunteerWork,
} from "@/lib/portfolio-data";
import { getGitHubStats } from "@/lib/github-data";
import { getPsnTrophies } from "@/lib/psn-data";

const contactLinks = [
  {
    label: "Email",
    href: "mailto:ryan@hurd.cc",
    icon: "email",
  },
  {
    label: "Phone",
    href: "tel:+13525800408",
    icon: "phone",
  },
  {
    label: "GitHub",
    href: "https://github.com/rh7112",
    icon: "github",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ryan-lee-hurd/",
    icon: "linkedin",
  },
  {
    label: "Resume",
    href: "/documents/ryan-hurd-resume.pdf",
    icon: "resume",
  },
  {
    label: "Indeed",
    href: "https://profile.indeed.com/p/ryanh-sv25zg9",
    icon: "indeed",
  },
];

export default async function Home() {
  const [homeData, projects, employers, education, certifications, psnTrophies, githubStats, latestBlogPosts, volunteerWork] =
    await Promise.all([
      getHomepageData(),
      getProjectList(),
      getEmployers(),
      getEducation(),
      getCertifications(),
      getPsnTrophies(),
      getGitHubStats(),
      getLatestBlogPosts(),
      getVolunteerWork(),
    ]);

  return (
    <PortfolioShell
      heroEyebrow={homeData.heroEyebrow}
      heroTitle={homeData.heroTitle}
      heroBody={homeData.heroBody}
      heroImageSrc="/images/ryan_pfp.png"
      heroImageAlt="Ryan Hurd"
      quickFacts={homeData.quickFacts}
      aboutTitle={homeData.aboutTitle}
      aboutBody={homeData.aboutBody}
      aboutBullets={homeData.aboutBullets}
      experienceHeading={homeData.experienceHeading}
      employers={employers.slice(0, 3)}
      education={education}
      certifications={certifications}
      psnTrophies={psnTrophies}
      githubStats={githubStats}
      latestBlogPosts={latestBlogPosts}
      volunteerWork={volunteerWork}
      projects={projects}
      contactHeading={homeData.contactHeading}
      contactBody={homeData.contactBody}
      contactLinks={contactLinks}
    />
  );
}
