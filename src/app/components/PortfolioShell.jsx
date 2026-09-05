'use client';

import Image from "next/image";
import Link from "next/link";

import BuyMeACoffeeButton from "./BuyMeACoffeeButton";
import NotTheOtherRyanHurd from "./NotTheOtherRyanHurd";
import SiteStatus from "./SiteStatus";
import { educationTranscripts } from "@/lib/portfolio-data";

import {
  FaArrowRight,
  FaCode,
  FaEnvelope,
  FaFileAlt,
  FaGithub,
  FaLinkedin,
  FaPhoneAlt,
} from "react-icons/fa";
import { SiIndeed } from "react-icons/si";

const icons = {
  email: FaEnvelope,
  phone: FaPhoneAlt,
  github: FaGithub,
  linkedin: FaLinkedin,
  resume: FaFileAlt,
  indeed: SiIndeed,
};

// Non-employer companies that only show up in project history (school
// coursework, personal projects) -- not real jobs, so no portfolio_employers
// row, just a stable fallback color.
const nonEmployerCompanyColors = {
  "purdue-university": "orange",
  "ivy-tech": "orange",
  "personal-projects": "orange",
};

// Date-only strings ("YYYY-MM-DD") parse as UTC midnight, which can shift to
// the previous day in a non-UTC timezone -- build from local components
// instead, same fix as portfolio-data.js's formatMonthYear.
function formatPostDate(value) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function resolveCompanyColor(companySlug, employers) {
  const employer = employers.find((item) => item.slug === companySlug);
  if (employer?.color) {
    return employer.color;
  }
  return nonEmployerCompanyColors[companySlug] ?? null;
}

function getCompanyCardClass(color) {
  switch (color) {
    case "red":
      return "border-red-600/30 bg-red-500/10 dark:border-red-500/30 dark:bg-red-500/10";
    case "blue":
      return "border-blue-600/30 bg-blue-500/10 dark:border-blue-500/30 dark:bg-blue-500/10";
    case "emerald":
      return "border-emerald-600/30 bg-emerald-500/10 dark:border-emerald-500/30 dark:bg-emerald-500/10";
    case "amber":
      return "border-amber-600/30 bg-amber-500/10 dark:border-amber-500/30 dark:bg-amber-500/10";
    case "black":
      return "border-stone-900/30 bg-stone-900/5 dark:border-white/30 dark:bg-white/10";
    case "orange":
      return "border-orange-600/30 bg-orange-500/10 dark:border-orange-500/30 dark:bg-orange-500/10";
    default:
      return "border-stone-900/10 bg-white/80 dark:border-white/10 dark:bg-stone-900/70";
  }
}

// Order non-employer groups (school coursework, personal projects) after
// real employers, which are ordered by their own sort_order.
const nonEmployerGroupOrder = ["purdue-university", "ivy-tech", "personal-projects"];

function groupProjectsByCompany(projects, employers) {
  const employerOrder = [...employers]
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((employer) => employer.slug);
  const groupOrder = [...employerOrder, ...nonEmployerGroupOrder];

  const bySlug = new Map();
  for (const project of projects) {
    const slug = project.companySlug;
    if (!bySlug.has(slug)) {
      bySlug.set(slug, []);
    }
    bySlug.get(slug).push(project);
  }

  const orderedSlugs = [
    ...groupOrder.filter((slug) => bySlug.has(slug)),
    ...[...bySlug.keys()].filter((slug) => !groupOrder.includes(slug)),
  ];

  return orderedSlugs.map((slug) => {
    const items = bySlug.get(slug);
    return {
      slug,
      company: items[0].company,
      color: resolveCompanyColor(slug, employers),
      items,
    };
  });
}

export default function PortfolioShell({
  heroEyebrow,
  heroTitle,
  heroBody,
  heroImageSrc,
  heroImageAlt,
  quickFacts,
  aboutTitle,
  aboutBody,
  aboutBullets,
  experienceHeading,
  employers,
  education,
  certifications,
  psnTrophies,
  githubStats,
  latestBlogPosts,
  projects,
  contactHeading,
  contactBody,
  contactLinks,
}) {
  const projectGroups = groupProjectsByCompany(projects, employers);

  return (
    <main className="min-h-screen bg-stone-50 text-stone-900 dark:bg-stone-950 dark:text-stone-100">
      <section id="top" className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="grid items-center gap-16 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="order-2 lg:order-1">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-orange-700 dark:text-orange-400">
              {heroEyebrow}
            </p>
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-stone-900 sm:text-5xl lg:text-6xl dark:text-white">
              {heroTitle}
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-stone-600 dark:text-stone-300">{heroBody}</p>
            <NotTheOtherRyanHurd />
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="mailto:rh25170@gmail.com?subject=Hello%20Ryan"
                className="inline-flex items-center gap-2 rounded-full bg-orange-600 px-5 py-3 font-medium text-white transition hover:bg-orange-500 dark:bg-orange-500 dark:text-stone-950 dark:hover:bg-orange-400"
              >
                Let’s connect <FaArrowRight />
              </a>
              <a
                href="/documents/ryan-hurd-resume.pdf"
                className="inline-flex items-center gap-2 rounded-full border border-stone-300 px-5 py-3 font-medium text-stone-700 transition hover:border-stone-400 hover:text-stone-900 dark:border-stone-700 dark:text-stone-200 dark:hover:border-stone-500 dark:hover:text-white"
              >
                View resume <FaFileAlt />
              </a>
              <Link
                href="/resume"
                className="inline-flex items-center gap-2 rounded-full border border-stone-300 px-5 py-3 font-medium text-stone-700 transition hover:border-stone-400 hover:text-stone-900 dark:border-stone-700 dark:text-stone-200 dark:hover:border-stone-500 dark:hover:text-white"
              >
                HTML resume <FaFileAlt />
              </Link>
            </div>
          </div>

          <div className="order-1 rounded-3xl border border-stone-900/10 bg-white/80 p-6 shadow-2xl shadow-stone-900/10 lg:order-2 dark:border-white/10 dark:bg-stone-900/70 dark:shadow-stone-950/50">
            <div className="overflow-hidden rounded-2xl border border-stone-900/10 dark:border-white/10">
              <Image
                src={heroImageSrc}
                alt={heroImageAlt}
                width={1200}
                height={1200}
                priority
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {quickFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="rounded-2xl border border-stone-900/10 bg-stone-100/70 p-3 text-center dark:border-white/10 dark:bg-stone-950/70"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">{fact.label}</p>
                  <p className="mt-1 text-sm font-semibold text-stone-900 dark:text-white">{fact.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-6xl px-6 py-8 lg:px-8">
        <div className="rounded-3xl border border-stone-900/10 bg-white/70 p-8 dark:border-white/10 dark:bg-stone-900/60 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-700 dark:text-orange-400">About</p>
              <h2 className="mt-3 text-3xl font-semibold text-stone-900 dark:text-white">{aboutTitle}</h2>
              <p className="mt-4 text-lg text-stone-600 dark:text-stone-300">{aboutBody}</p>
            </div>
            <div className="rounded-2xl border border-stone-900/10 bg-stone-100/60 p-6 dark:border-white/10 dark:bg-stone-950/60">
              <h3 className="text-lg font-semibold text-stone-900 dark:text-white">What I bring</h3>
              <ul className="mt-4 space-y-3 text-sm text-stone-600 dark:text-stone-300">
                {aboutBullets.map((bullet) => (
                  <li key={bullet}>• {bullet}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-700 dark:text-orange-400">Experience</p>
            <h2 className="mt-2 text-3xl font-semibold text-stone-900 dark:text-white">{experienceHeading}</h2>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {employers.map((employer) => (
            <Link
              key={employer.slug}
              href={`/experience/${employer.slug}`}
              className={`rounded-3xl border p-6 transition hover:-translate-y-0.5 hover:shadow-md ${getCompanyCardClass(employer.color)}`}
            >
              <p className="text-sm text-orange-700 dark:text-orange-400">{employer.dateRange}</p>
              <h3 className="mt-2 text-xl font-semibold text-stone-900 dark:text-white">{employer.title}</h3>
              <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">{employer.name}</p>
              <p className="mt-4 text-sm leading-7 text-stone-600 dark:text-stone-300">{employer.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <section id="projects" className="mx-auto max-w-6xl px-6 py-8 lg:px-8">
        <div className="rounded-3xl border border-stone-900/10 bg-white/70 p-8 dark:border-white/10 dark:bg-stone-900/60 lg:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-700 dark:text-orange-400">Project history</p>
          <h3 className="mt-2 text-2xl font-semibold text-stone-900 dark:text-white">
            A broad set of projects across operations, finance, commerce, and internal tools.
          </h3>

          <div className="mt-8 space-y-6">
            {projectGroups.map((group) => (
              <div key={group.slug}>
                <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">
                  {group.company}
                </h4>
                <div className="mt-3 flex flex-wrap gap-3">
                  {group.items.map((project) => {
                    const pillClassName = `rounded-full border px-3 py-2 text-sm text-stone-700 dark:text-stone-200 ${getCompanyCardClass(group.color)}`;
                    // A detail page beats an external link when a project
                    // happens to have both -- keeps visitors on the site.
                    if (project.slug) {
                      return (
                        <Link
                          key={project.id}
                          href={`/projects/${project.slug}`}
                          title={project.company}
                          className={`${pillClassName} transition hover:border-orange-600 dark:hover:border-orange-400`}
                        >
                          {project.title}
                        </Link>
                      );
                    }
                    return project.link ? (
                      <a
                        key={project.id}
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        title={project.company}
                        className={`${pillClassName} transition hover:border-orange-600 dark:hover:border-orange-400`}
                      >
                        {project.title}
                      </a>
                    ) : (
                      <span key={project.id} title={project.company} className={pillClassName}>
                        {project.title}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="education" className="mx-auto max-w-6xl px-6 py-8 lg:px-8">
        <div className="rounded-3xl border border-stone-900/10 bg-white/70 p-8 dark:border-white/10 dark:bg-stone-900/60 lg:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-700 dark:text-orange-400">Education</p>
          <h2 className="mt-2 text-3xl font-semibold text-stone-900 dark:text-white">Where it started.</h2>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {education.map((item) => {
              const transcriptUrl = educationTranscripts[item.slug];
              const EducationTag = transcriptUrl ? "a" : "div";
              return (
                <EducationTag
                  key={item.slug}
                  {...(transcriptUrl ? { href: transcriptUrl, target: "_blank", rel: "noreferrer" } : {})}
                  className="block rounded-2xl border border-stone-900/10 bg-stone-100/70 p-6 dark:border-white/10 dark:bg-stone-950/70"
                >
                  <p className="text-sm text-orange-700 dark:text-orange-400">{item.dateRange}</p>
                  <h3 className="mt-2 text-lg font-semibold text-stone-900 dark:text-white">{item.institution}</h3>
                  {item.degree && <p className="mt-1 text-sm text-stone-600 dark:text-stone-300">{item.degree}</p>}
                  {item.location && <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">{item.location}</p>}
                  {transcriptUrl && (
                    <p className="mt-2 text-xs font-medium uppercase tracking-wide text-orange-700 dark:text-orange-400">
                      View unofficial transcript →
                    </p>
                  )}
                </EducationTag>
              );
            })}
          </div>
        </div>
      </section>

      {certifications.length > 0 && (
        <section id="certifications" className="mx-auto max-w-6xl px-6 py-8 lg:px-8">
          <div className="rounded-3xl border border-stone-900/10 bg-white/70 p-8 dark:border-white/10 dark:bg-stone-900/60 lg:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-700 dark:text-orange-400">Certifications</p>
            <h2 className="mt-2 text-3xl font-semibold text-stone-900 dark:text-white">Credentials I've earned.</h2>

            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {certifications.map((cert) => {
                const CertTag = cert.credentialUrl ? "a" : "div";
                return (
                  <CertTag
                    key={cert.slug}
                    {...(cert.credentialUrl
                      ? { href: cert.credentialUrl, target: "_blank", rel: "noreferrer" }
                      : {})}
                    className="rounded-2xl border border-stone-900/10 bg-stone-100/70 p-6 dark:border-white/10 dark:bg-stone-950/70"
                  >
                    {cert.dateEarnedDisplay && (
                      <p className="text-sm text-orange-700 dark:text-orange-400">{cert.dateEarnedDisplay}</p>
                    )}
                    <h3 className="mt-2 text-lg font-semibold text-stone-900 dark:text-white">{cert.name}</h3>
                    {cert.issuer && <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">{cert.issuer}</p>}
                    {cert.score && <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">Score: {cert.score}</p>}
                    {cert.expired && (
                      <p className="mt-3 inline-flex rounded-full bg-stone-900/5 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-stone-500 dark:bg-white/10 dark:text-stone-400">
                        Expired
                      </p>
                    )}
                  </CertTag>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {psnTrophies && (
        <section id="hobbies" className="mx-auto max-w-6xl px-6 py-8 lg:px-8">
          <div className="rounded-3xl border border-stone-900/10 bg-white/70 p-8 dark:border-white/10 dark:bg-stone-900/60 lg:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-700 dark:text-orange-400">
              Outside of work
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-stone-900 dark:text-white">PlayStation trophies.</h2>
            <p className="mt-3 text-stone-600 dark:text-stone-300">
              Trophy level {psnTrophies.trophyLevel} ({psnTrophies.tierLabel}), {psnTrophies.progress}% of the way to
              the next level.
            </p>

            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <span className="rounded-full border border-stone-900/10 bg-stone-100/70 px-4 py-2 text-stone-700 dark:border-white/10 dark:bg-stone-950/70 dark:text-stone-200">
                🏆 Platinum: {psnTrophies.earnedTrophies.platinum}
              </span>
              <span className="rounded-full border border-stone-900/10 bg-stone-100/70 px-4 py-2 text-stone-700 dark:border-white/10 dark:bg-stone-950/70 dark:text-stone-200">
                🥇 Gold: {psnTrophies.earnedTrophies.gold}
              </span>
              <span className="rounded-full border border-stone-900/10 bg-stone-100/70 px-4 py-2 text-stone-700 dark:border-white/10 dark:bg-stone-950/70 dark:text-stone-200">
                🥈 Silver: {psnTrophies.earnedTrophies.silver}
              </span>
              <span className="rounded-full border border-stone-900/10 bg-stone-100/70 px-4 py-2 text-stone-700 dark:border-white/10 dark:bg-stone-950/70 dark:text-stone-200">
                🥉 Bronze: {psnTrophies.earnedTrophies.bronze}
              </span>
            </div>

            {psnTrophies.recentTitles.length > 0 && (
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {psnTrophies.recentTitles.map((title) => (
                  <div
                    key={title.id}
                    className="flex items-center gap-3 rounded-2xl border border-stone-900/10 bg-stone-100/70 p-3 dark:border-white/10 dark:bg-stone-950/70"
                  >
                    {title.iconUrl && (
                      // eslint-disable-next-line @next/next/no-img-element -- external PSN CDN icon, not a local asset
                      <img src={title.iconUrl} alt="" className="h-12 w-12 shrink-0 rounded-lg object-cover" />
                    )}
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-stone-900 dark:text-white">{title.name}</p>
                      <p className="text-xs text-stone-500 dark:text-stone-400">{title.progress}% complete</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {githubStats && (
        <section className="mx-auto max-w-6xl px-6 py-8 lg:px-8">
          <div className="rounded-3xl border border-stone-900/10 bg-white/70 p-8 dark:border-white/10 dark:bg-stone-900/60 lg:p-10">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-700 dark:text-orange-400">
                  Site Status
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-stone-900 dark:text-white">
                  A look at the public side of the work — and whether it's all still standing.
                </h2>
              </div>
              <a
                href={githubStats.profileUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-orange-700 transition hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300"
              >
                <FaGithub /> View profile
              </a>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <span className="rounded-full border border-stone-900/10 bg-stone-100/70 px-4 py-2 text-stone-700 dark:border-white/10 dark:bg-stone-950/70 dark:text-stone-200">
                📦 Public repos: {githubStats.publicRepos}
              </span>
              <span className="rounded-full border border-stone-900/10 bg-stone-100/70 px-4 py-2 text-stone-700 dark:border-white/10 dark:bg-stone-950/70 dark:text-stone-200">
                ⭐ Total stars: {githubStats.totalStars}
              </span>
              <span className="rounded-full border border-stone-900/10 bg-stone-100/70 px-4 py-2 text-stone-700 dark:border-white/10 dark:bg-stone-950/70 dark:text-stone-200">
                👤 Followers: {githubStats.followers}
              </span>
            </div>

            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.3em] text-orange-700 dark:text-orange-400">
              Family sites, live
            </p>
            <SiteStatus />
          </div>
        </section>
      )}

      {latestBlogPosts?.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-8 lg:px-8">
          <div className="rounded-3xl border border-stone-900/10 bg-white/70 p-8 dark:border-white/10 dark:bg-stone-900/60 lg:p-10">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-700 dark:text-orange-400">
                  Latest from the blog
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-stone-900 dark:text-white">
                  Family notes, projects, and the occasional recipe.
                </h2>
              </div>
              <a
                href="https://blog.hurd.cc/blog/"
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-orange-700 transition hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300"
              >
                Visit blog.hurd.cc →
              </a>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {latestBlogPosts.map((post) => (
                <a
                  key={post.slug}
                  href={`https://blog.hurd.cc/blog/${post.slug}/`}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-2xl border border-stone-900/10 bg-stone-100/70 p-5 transition hover:border-orange-600 dark:border-white/10 dark:bg-stone-950/70 dark:hover:border-orange-400"
                >
                  <p className="text-xs uppercase tracking-[0.15em] text-stone-500 dark:text-stone-400">
                    {formatPostDate(post.publishedAt)}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-stone-900 dark:text-white">{post.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-stone-300">{post.excerpt}</p>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="contact" className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="rounded-3xl border border-orange-600/20 bg-gradient-to-br from-stone-100 to-stone-50 p-8 dark:border-orange-500/20 dark:from-stone-900 dark:to-stone-950 lg:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-700 dark:text-orange-400">Contact</p>
          <h2 className="mt-2 text-3xl font-semibold text-stone-900 dark:text-white">{contactHeading}</h2>
          <p className="mt-4 max-w-2xl text-lg text-stone-600 dark:text-stone-300">{contactBody}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            {contactLinks.map((link) => {
              const Icon = icons[link.icon];
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                  className="inline-flex items-center gap-2 rounded-full border border-stone-900/10 bg-stone-100/70 px-4 py-3 text-sm font-medium text-stone-700 transition hover:border-orange-600 hover:text-stone-900 dark:border-white/10 dark:bg-stone-950/70 dark:text-stone-200 dark:hover:border-orange-400 dark:hover:text-white"
                >
                  <Icon /> {link.label}
                </a>
              );
            })}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <BuyMeACoffeeButton />
            <a
              href="https://api.hurd.cc/docs/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-stone-500 transition hover:text-orange-700 dark:text-stone-400 dark:hover:text-orange-400"
            >
              <FaCode /> API Docs
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
