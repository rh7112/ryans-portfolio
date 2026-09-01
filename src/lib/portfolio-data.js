const fallbackHomeData = {
  heroEyebrow: "Family-first • builder • software engineer",
  heroTitle:
    "I build practical internal tools that make teams faster, clearer, and more confident.",
  heroBody:
    "I’m Ryan Hurd, a software engineer focused on Retool, SQL-driven workflows, and operational tools that help people make better decisions with less friction.",
  quickFacts: [
    { label: "Current role", value: "Software Engineer" },
    { label: "Experience", value: "3+ years of Retool experience" },
    { label: "Focus", value: "Retool, SQL, automation" },
  ],
  aboutTitle: "A calm, practical engineer with a strong product mindset.",
  aboutBody:
    "I enjoy turning messy processes into clear, reliable experiences. My work has centered on internal software, workflow automation, and cross-functional problem solving, with an emphasis on usability, maintainability, and measurable impact.",
  aboutBullets: [
    "Retool, PostgreSQL, SQL, and JavaScript for production and operations workflows",
    "Clear, maintainable applications that balance speed, reliability, and usability",
    "Collaboration with operations, accounting, compliance, and leadership teams",
    "Training and mentoring others to use tools effectively and build with confidence",
  ],
  experienceHeading:
    "Experience that spans engineering, operations, and teamwork.",
  employerHighlights: [
    {
      title: "Packaging Personified",
      blurb:
        "Operations, compliance, and production tooling in a fast-moving manufacturing environment.",
      slug: "packaging-personified",
    },
    {
      title: "Sweetwater",
      blurb:
        "Cross-functional internal tools for support, accounting, and customer experience teams.",
      slug: "sweetwater",
    },
    {
      title: "Zimmer Biomet",
      blurb:
        "A grounded start in IT operations and dependable systems support.",
      slug: "zimmer-biomet",
    },
  ],
  projectHistory: [
    "Donut Duty",
    "Synchrony Bonus Bucks promotions",
    "Bonus Bucks GUI",
    "ECMS tax certificate expiration workflow",
    "Marketplace payments cancellation handling",
    "Automated collection letters",
    "Stop UT/CA auto-processing",
    "Electronic delivery invoice splitting",
    "CRM performance improvements",
    "Press release admin tool",
    "Merchandising price comparison report",
    "Web text editor",
    "Make Offer Tool",
    "404 admin tool",
    "Retool termination script",
    "Usability Retool App",
    "FileMaker purchase order and quote tooling",
    "XChange management platform",
    "Store SEO content management",
    "Sales Engineer planning workspace",
    "Drumfest check-in scanner workflow",
    "Kiosk Manager",
  ],

  contactHeading: "Open to thoughtful opportunities and conversations.",
  contactBody:
    "If you are looking for someone who can bring calm execution, strong communication, and practical problem solving to a team, I would love to hear from you.",
};

const fallbackEmployers = [
  {
    slug: "packaging-personified",
    name: "Packaging Personified, Inc.",
    title: "Software Engineer",
    startDate: "2025-10-01",
    endDate: null,
    location: "Warsaw, IN",
    summary:
      "Building internal Retool applications for production, compliance, accounting, and operations teams.",
    description:
      "Building internal Retool applications for production, compliance, accounting, and operations teams, including a Yield Report tool for tracking job performance and material usage, and consolidated EPA reporting for Illinois and Michigan compliance. Created reusable shared modules and delivered a 40%+ performance improvement to the Press WIP application while training managers and end users on Retool best practices.",
    sortOrder: 1,
    color: "emerald",
    secondaryColor: null,
    highlights: [
      "Developed and maintained internal applications using Retool, PostgreSQL, SQL, and JavaScript for production, compliance, accounting, and operations teams.",
      "Built the Yield Report application to track company and customer job performance, material usage, production efficiency, and operational trends.",
      "Consolidated spreadsheets and multiple data sources into EPA reporting tools supporting environmental compliance workflows for Illinois and Michigan facilities.",
      "Created reusable tools, including a standardized Header Module and scalable Location Swap application, to improve consistency across Retool applications.",
      "Optimized applications and automated workflows for performance, reliability, and usability, including improving Press WIP processing speed by more than 40%.",
      "Trained managers, developers, company owners, and end users on Retool functionality, application workflows, and development best practices.",
    ],
    caseStudies: [
      {
        title: "Yield Report",
        summary:
          "A reporting tool for tracking production and customer performance trends using operational data from multiple sources.",
        image: "/images/projects/ppi-yield-report.svg",
      },
      {
        title: "EPA Reporting",
        summary:
          "A compliance-oriented reporting workflow that combines spreadsheets and source data into a more maintainable reporting experience.",
        image: "/images/projects/ppi-epa-reporting-screenshot.png",
      },
      {
        title: "Press WIP Optimization",
        summary:
          "A performance-focused workflow improvement project that reduced processing time and simplified day-to-day operations.",
        image: "/images/projects/ppi-press-wip.svg",
      },
    ],
  },
  {
    slug: "sweetwater-sound",
    name: "Sweetwater Sound",
    title: "Software Engineer",
    startDate: "2021-05-01",
    endDate: "2025-08-01",
    location: "Fort Wayne, IN",
    summary:
      "Delivered internal tools, workflow automations, and revenue-driving platforms across accounting, commerce, and merchandising.",
    description:
      "Sole developer of Avalara's Exemption Certificate Management System, saving the tax team 160+ hours of manual validation per month, and integrated PayPal's Braintree system into the CRM to help launch Gear Exchange, which generated over $1M in sales within months. Also built a dynamic Price Management Platform that drove $4M in revenue in under a month, alongside daily-use internal tools across departments.",
    sortOrder: 2,
    color: "red",
    secondaryColor: null,
    highlights: [
      "Sole developer on the implementation of Avalara's Exemption Certificate Management System (ECMS), saving the tax team the equivalent of 160+ hours of validating exemption certificates per month.",
      "Integrated PayPal's GraphQL-based Braintree system into the CRM to help launch Gear Exchange, which saw over $1M in sales between users within its first few months.",
      "Built and deployed a Price Management Platform used by merchandising to adjust pricing dynamically, resulting in $4M in increased revenue in under a month.",
      "Provided a Turkey Handout application for Sweetwater's Thanksgiving giveaway within 72 hours, allowing the campus events team to hand out turkeys and gift cards to 2,500 employees.",
      "Contributed to internal software development by designing scalable features, debugging production issues, and delivering tools used daily across multiple departments.",
    ],
    caseStudies: [
      {
        title: "Turkey Handout App",
        summary: "A fast-turnaround internal tool that made holiday employee gifting easier and more organized.",
        image: "/images/projects/turkey-handout.png",
      },
      {
        title: "Gear Exchange",
        summary: "Helped support commerce workflows and secure payment integration for a rapidly growing platform.",
        image: "/images/projects/gear-exchange.jpg",
      },
      {
        title: "DementiaTrack",
        summary: "A capstone project that combined thoughtful software design with practical analytics.",
        image: "/images/projects/dementiatrack.jpg",
      },
    ],
  },
  {
    slug: "zimmer-biomet",
    name: "Zimmer Biomet",
    title: "Information Technology Intern",
    startDate: "2020-10-01",
    endDate: "2021-05-01",
    location: "Warsaw, IN",
    summary: "Supported device deployment and IT operations across campuses in the Warsaw area.",
    description:
      "Imaged and deployed company devices, issued laptops and accessories, and performed hardware upgrades for onboarding and refresh cycles. Delivered devices to campuses across the Warsaw area as part of IT operations support.",
    sortOrder: 3,
    color: "blue",
    secondaryColor: null,
    highlights: [
      "Imaged and prepared company devices with software for deployment.",
      "Issued laptops, accessories, and performed hardware upgrades for onboarding and refreshing hardware.",
      "Used a company vehicle to deliver devices to various campuses in the Warsaw area.",
    ],
    caseStudies: [
      {
        title: "Device Deployment Support",
        summary: "Helped prepare and configure systems for company use in a structured, detail-focused workflow.",
        image: null,
      },
    ],
  },
  {
    slug: "census-bureau",
    name: "United States Census Bureau",
    title: "Post-Enumeration Surveyor",
    startDate: "2020-01-01",
    endDate: "2020-10-01",
    location: "Warsaw, IN",
    summary: "Collected population data door-to-door for the U.S. Census Bureau's Post-Enumeration Survey.",
    description:
      "Conducted in-person interviews to collect population data for the Post-Enumeration Survey, ensuring census accuracy while complying with strict federal confidentiality guidelines. Maintained detailed activity logs and navigated difficult resident interactions with calm, professional de-escalation.",
    sortOrder: 4,
    color: "red",
    secondaryColor: "blue",
    highlights: [
      "Performed interviews at addresses within assigned blocks to collect population data as part of the Post-Enumeration Survey, ensuring census accuracy.",
      "Complied with strict federal guidelines and confidentiality rules for gathering demographic and housing information.",
      "Recorded information using a government-issued laptop, maintaining hour logs, mileage, and case activity.",
      "Navigated difficult or uncooperative situations by calmly diffusing tensions with hesitant or hostile residents.",
    ],
    caseStudies: [],
  },
  {
    slug: "staples",
    name: "Staples",
    title: "Technology Sales Associate",
    startDate: "2018-06-01",
    endDate: "2019-05-01",
    location: "Warsaw, IN",
    summary: "Helped customers find the right technology products as a top-performing sales associate.",
    description:
      "Assessed customer needs and guided them to the right technology products, consistently ranking as the top store in Northern Indiana for several consecutive weeks. Stayed current on promotions and product launches to support sales goals.",
    sortOrder: 5,
    color: "amber",
    secondaryColor: null,
    highlights: [
      "Asked customers pertinent questions to assess and determine their needs, guiding them to the correct product.",
      "Answered questions, explained product features, and gave honest input based on customer needs.",
      "Used Staples sales strategies to become the number one store in Northern Indiana for several weeks straight.",
      "Stayed up to date on weekly promotions and product launches to best support customers and hit sales goals.",
    ],
    caseStudies: [],
  },
  {
    slug: "blacks-concrete-construction",
    name: "Black's Concrete Construction",
    title: "Concrete Laborer",
    startDate: "2016-06-01",
    endDate: "2017-03-01",
    location: "Warsaw, IN",
    summary: "Handled nearly every phase of residential concrete work on a small, hands-on crew.",
    description:
      "Worked as part of a small 2-3 person crew handling nearly every phase of residential concrete work, including driving the company truck, forming, pouring, finishing, cutting, cleaning, sealing, and stamping. Gained hands-on versatility and a strong work ethic from taking on broad responsibility within a lean, close-knit team.",
    sortOrder: 6,
    color: "black",
    secondaryColor: "white",
    highlights: [
      "Drove the company truck and handled nearly every phase of residential concrete work on a lean 2-3 person crew.",
      "Performed forming, pouring, finishing, cutting, cleaning, sealing, and stamping across a wide range of jobs.",
      "Gained hands-on versatility and a strong work ethic from taking on broad responsibility within a small, close-knit team.",
    ],
    caseStudies: [],
  },
];

const fallbackEducation = [
  {
    slug: "whitko",
    institution: "Whitko Community High School",
    degree: "Core 40 – Academic Honors Diploma",
    startDate: "2011-08-01",
    endDate: "2016-05-01",
    location: "South Whitley, IN",
    sortOrder: 1,
  },
  {
    slug: "ivy-tech",
    institution: "Ivy Tech Community College",
    degree: "Associate of Science, Computer Science",
    startDate: "2017-01-01",
    endDate: "2019-05-01",
    location: "Warsaw/Fort Wayne, IN",
    sortOrder: 2,
  },
  {
    slug: "purdue-fort-wayne",
    institution: "Purdue University Fort Wayne",
    degree: "Bachelor of Science, Computer Science",
    startDate: "2019-08-01",
    endDate: "2021-05-01",
    location: "Fort Wayne, IN",
    sortOrder: 3,
  },
];

const fallbackCertifications = [
  {
    slug: "python-pcep",
    name: "Python PCEP Certification",
    issuer: "Python Institute",
    dateEarned: "2021-09-01",
    credentialUrl: null,
    score: null,
    expired: false,
    sortOrder: 1,
  },
  {
    slug: "comptia-a-plus",
    name: "CompTIA A+",
    issuer: "CompTIA",
    dateEarned: "2017-12-01",
    credentialUrl: null,
    score: "1880",
    expired: true,
    sortOrder: 2,
  },
  {
    slug: "retool-platform-admin",
    name: "Retool Platform Admin",
    issuer: "Retool",
    dateEarned: "2025-03-01",
    credentialUrl: null,
    score: null,
    expired: false,
    sortOrder: 3,
  },
  {
    slug: "retool-platform-developer",
    name: "Retool Platform Developer",
    issuer: "Retool",
    dateEarned: "2025-03-01",
    credentialUrl: null,
    score: null,
    expired: false,
    sortOrder: 4,
  },
];

// portfolio-api serves this site's homepage/projects/employers/education/
// certifications content (see ../portfolio-api). It may be unreachable at
// build time (e.g. while it's still LAN-only on the Synology NAS and this
// build runs on Cloudflare Pages) -- fetchFromApi returns null on any
// failure so callers can fall back to hard-coded content, the same way
// getDatabaseConnection returning null used to trigger the DB fallback.
async function fetchFromApi(path) {
  const baseUrl = process.env.PORTFOLIO_API_BASE_URL;

  if (!baseUrl) {
    console.log(`Skipping portfolio-api call to ${path}, missing PORTFOLIO_API_BASE_URL`);
    return null;
  }

  try {
    const response = await fetch(`${baseUrl.replace(/\/+$/, "")}${path}`, {
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      console.error(`portfolio-api request failed: ${response.status} ${path}`);
      return null;
    }

    return await response.json();
  } catch (err) {
    console.error(`portfolio-api request failed: ${err.message} ${path}`);
    return null;
  }
}

// Fisher-Yates shuffle, used to replicate the old "ORDER BY RAND() LIMIT 3"
// featured-project selection now that filtering happens via the API instead
// of SQL.
export function pickRandom(items, count) {
  const pool = [...items];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count);
}


export function normalizeDate(value) {
  return value instanceof Date ? value.toISOString().slice(0, 10) : value;
}

export function formatMonthYear(value) {
  if (!value) {
    return null;
  }

  // Date-only strings ("YYYY-MM-DD") parse as UTC midnight, which can shift
  // to the previous day/month once formatted in a non-UTC timezone. Build
  // the date from local components instead so the displayed month always
  // matches the calendar date, regardless of server timezone.
  if (typeof value === "string") {
    const [year, month, day] = value.split("-").map(Number);
    return new Date(year, month - 1, day).toLocaleDateString("en-US", { month: "short", year: "numeric" });
  }

  return value.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export function formatDateRange(startDate, endDate) {
  const start = formatMonthYear(startDate);
  if (!start) {
    return null;
  }

  return `${start} – ${endDate ? formatMonthYear(endDate) : "Present"}`;
}

export function normalizeEmployerRow(row) {
  return {
    slug: row.slug,
    name: row.name,
    title: row.title,
    startDate: normalizeDate(row.start_date ?? row.startDate),
    endDate: normalizeDate(row.end_date ?? row.endDate),
    dateRange: formatDateRange(row.start_date ?? row.startDate, row.end_date ?? row.endDate),
    location: row.location,
    summary: row.summary,
    description: row.description,
    sortOrder: row.sort_order ?? row.sortOrder,
    color: row.color,
    secondaryColor: row.secondary_color ?? row.secondaryColor,
    highlights: row.highlights ?? [],
  };
}

export function normalizeImagePath(image) {
  if (!image) {
    return null;
  }

  return image.startsWith("/") ? image : `/${image}`;
}

export function normalizeProjectRows(rows) {
  return rows.map((row) => ({
    id: row.id,
    slug: row.slug ?? null,
    title: row.title,
    summary: row.summary,
    image: normalizeImagePath(row.image),
    company: row.company,
    companySlug: row.company_slug || row.companySlug,
    color: row.color || "sky",
    techStack: row.tech_stack ?? row.techStack ?? null,
    link: row.link ?? null,
    featured: Boolean(row.featured),
    published: Boolean(row.published),
  }));
}

export async function getHomepageData() {
  const content = await fetchFromApi("/api/v1/homepage");

  if (!content || !Object.keys(content).length) {
    console.log("Using fallbackHomeData because portfolio-api was unreachable or empty");
    return fallbackHomeData;
  }

  return { ...fallbackHomeData, ...content };
}

// Every published project, featured or not -- used for the homepage's
// single Project History list (no separate featured carousel anymore, so
// there's no featured/non-featured split to maintain here).
export async function getProjectList() {
  const projects = await fetchFromApi("/api/v1/projects?published=true");

  if (!projects) {
    return [];
  }

  return normalizeProjectRows(projects);
}

// Only projects with a `slug` set get a dedicated /projects/[slug] page --
// currently just the featured ones. No fallback list: if portfolio-api is
// unreachable at build time, generateStaticParams just gets an empty
// array and no detail pages are generated for that build (same
// graceful-degradation pattern as everywhere else).
export async function getProjectsWithSlugs() {
  const projects = await fetchFromApi("/api/v1/projects?published=true");

  if (!projects) {
    return [];
  }

  return normalizeProjectRows(projects).filter((project) => project.slug);
}

export async function getProjectBySlug(slug) {
  const projects = await getProjectsWithSlugs();
  return projects.find((project) => project.slug === slug) ?? null;
}

// All published projects tied to one company (both featured and
// non-featured) -- used on the employer detail page, which shows the full
// project list rather than the homepage's featured/non-featured split.
export async function getProjectsByCompanySlug(companySlug) {
  const projects = await fetchFromApi("/api/v1/projects?published=true");

  if (!projects) {
    return [];
  }

  return normalizeProjectRows(projects).filter((project) => project.companySlug === companySlug);
}

export async function getEmployers() {
  const employers = await fetchFromApi("/api/v1/employers");

  if (!employers?.length) {
    return fallbackEmployers.map(normalizeEmployerRow);
  }

  return employers.map(normalizeEmployerRow);
}

export async function getEmployerBySlug(slug) {
  const employer = await fetchFromApi(`/api/v1/employers/${encodeURIComponent(slug)}`);

  if (!employer) {
    const fallback = fallbackEmployers.find((item) => item.slug === slug);
    return fallback ? { ...normalizeEmployerRow(fallback), highlights: fallback.highlights, caseStudies: fallback.caseStudies } : null;
  }

  return {
    ...normalizeEmployerRow(employer),
    highlights: employer.highlights ?? [],
    caseStudies: (employer.caseStudies ?? []).map((caseStudy) => ({
      title: caseStudy.title,
      summary: caseStudy.summary,
      image: normalizeImagePath(caseStudy.image),
    })),
  };
}

// Unofficial transcripts, keyed by education slug -- a static-asset map
// like ContactLinks' contactLinks, not portfolio-api content, since these
// are fixed PDFs rather than editable text. Not every school has one
// (Whitko's high school transcript isn't included).
export const educationTranscripts = {
  "ivy-tech": "/documents/ivy-tech-transcript.pdf",
  "purdue-fort-wayne": "/documents/purdue-fort-wayne-transcript.pdf",
};

export function normalizeEducationRow(row) {
  const startDate = row.start_date ?? row.startDate;
  const endDate = row.end_date ?? row.endDate;
  return {
    slug: row.slug,
    institution: row.institution,
    degree: row.degree,
    startDate: normalizeDate(startDate),
    endDate: normalizeDate(endDate),
    dateRange: formatDateRange(startDate, endDate),
    location: row.location,
    sortOrder: row.sort_order ?? row.sortOrder,
  };
}

export async function getEducation() {
  const education = await fetchFromApi("/api/v1/education");

  if (!education?.length) {
    return fallbackEducation.map(normalizeEducationRow);
  }

  return education.map(normalizeEducationRow);
}

export function normalizeCertificationRow(row) {
  const dateEarned = row.date_earned ?? row.dateEarned;
  return {
    slug: row.slug,
    name: row.name,
    issuer: row.issuer,
    dateEarned: normalizeDate(dateEarned),
    dateEarnedDisplay: formatMonthYear(dateEarned),
    credentialUrl: row.credential_url ?? row.credentialUrl ?? null,
    score: row.score ?? null,
    expired: Boolean(row.expired),
    sortOrder: row.sort_order ?? row.sortOrder,
  };
}

export async function getCertifications() {
  const certifications = await fetchFromApi("/api/v1/certifications");

  if (!certifications?.length) {
    return fallbackCertifications.map(normalizeCertificationRow);
  }

  return certifications.map(normalizeCertificationRow);
}

// Homepage teaser only -- blog.hurd.cc is the actual blog, this just points
// at it. No fallback content: if portfolio-api is unreachable, the teaser
// section simply doesn't render (same pattern as PSN trophies).
export async function getLatestBlogPosts(limit = 2) {
  const posts = await fetchFromApi("/api/v1/blog-posts");

  if (!posts?.length) {
    return [];
  }

  return posts
    .filter((post) => post.type === "article" && post.publishedAt)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, limit)
    .map((post) => ({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      publishedAt: post.publishedAt,
    }));
}
