import { getEmployers, getProjectsWithSlugs } from "@/lib/portfolio-data";

export const dynamic = "force-static";

const siteUrl = "https://ryan.hurd.cc";

// trailingSlash is on (next.config.mjs), so every URL here needs a trailing
// slash to match what the site actually serves -- otherwise crawlers see a
// redirect instead of a 200 for every entry.
export default async function sitemap() {
  const [employers, projectsWithSlugs] = await Promise.all([getEmployers(), getProjectsWithSlugs()]);

  const staticRoutes = ["", "/resume", "/volunteer"].map((path) => ({
    url: `${siteUrl}${path}/`,
    lastModified: new Date(),
  }));

  const employerRoutes = employers.map((employer) => ({
    url: `${siteUrl}/experience/${employer.slug}/`,
    lastModified: new Date(),
  }));

  const projectRoutes = projectsWithSlugs.map((project) => ({
    url: `${siteUrl}/projects/${project.slug}/`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...employerRoutes, ...projectRoutes];
}
