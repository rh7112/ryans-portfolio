-- blog_posts (articles/recipes) used to live here. It's moved to its own
-- blog_hurd_cc database, served by blog.hurd.cc -- not this file's concern.

CREATE DATABASE IF NOT EXISTS ryan_portfolio;

USE ryan_portfolio;

CREATE TABLE IF NOT EXISTS portfolio_content (
  id INT AUTO_INCREMENT PRIMARY KEY,
  scope VARCHAR(50) NOT NULL,
  `key` VARCHAR(100) NOT NULL,
  `value` TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS portfolio_projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(255) DEFAULT NULL,
  title VARCHAR(255) NOT NULL,
  summary TEXT NOT NULL,
  image VARCHAR(255) DEFAULT NULL,
  company VARCHAR(150) NOT NULL,
  company_slug VARCHAR(150) DEFAULT NULL,
  color VARCHAR(50) DEFAULT 'sky',
  tech_stack VARCHAR(255) DEFAULT NULL,
  link VARCHAR(500) DEFAULT NULL,
  featured TINYINT(1) DEFAULT 0,
  published TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_project_title_company (title, company_slug),
  UNIQUE KEY uq_project_slug (slug)
);

-- Single source of truth for work history: the homepage Experience cards, the
-- header's "Work" dropdown, and /experience/[slug] pages are all driven by
-- this table (plus its two child tables below).
CREATE TABLE IF NOT EXISTS portfolio_employers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(150) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NULL, -- NULL means "current / present"
  location VARCHAR(150) DEFAULT NULL,
  summary VARCHAR(500) NOT NULL, -- short blurb for the homepage preview card
  description TEXT NOT NULL,     -- longer intro shown on the employer's own page
  sort_order INT DEFAULT 0,
  color VARCHAR(20) DEFAULT NULL,           -- brand color swatch, e.g. "red"
  secondary_color VARCHAR(20) DEFAULT NULL, -- optional second swatch, e.g. "blue"
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Short bullet points shown under "What I worked on" on the employer page.
CREATE TABLE IF NOT EXISTS portfolio_employer_highlights (
  id INT AUTO_INCREMENT PRIMARY KEY,
  employer_id INT NOT NULL,
  highlight TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  FOREIGN KEY (employer_id) REFERENCES portfolio_employers(id) ON DELETE CASCADE
);

-- Case-study cards shown under "Featured work" on the employer page.
CREATE TABLE IF NOT EXISTS portfolio_employer_case_studies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  employer_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  summary TEXT NOT NULL,
  image VARCHAR(255) DEFAULT NULL,
  sort_order INT DEFAULT 0,
  FOREIGN KEY (employer_id) REFERENCES portfolio_employers(id) ON DELETE CASCADE
);

-- Standalone from portfolio_employers -- a degree isn't a job, so it gets
-- its own homepage section rather than being folded into Experience.
CREATE TABLE IF NOT EXISTS portfolio_education (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(150) NOT NULL UNIQUE,
  institution VARCHAR(255) NOT NULL,
  degree VARCHAR(255) DEFAULT NULL,
  start_date DATE NOT NULL,
  end_date DATE NULL,
  location VARCHAR(150) DEFAULT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS portfolio_certifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(150) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  issuer VARCHAR(255) DEFAULT NULL,
  date_earned DATE NULL,
  credential_url VARCHAR(500) DEFAULT NULL,
  score VARCHAR(50) DEFAULT NULL,
  expired TINYINT(1) DEFAULT 0,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO portfolio_content (scope, `key`, `value`, sort_order) VALUES
('homepage', 'heroEyebrow', '"Family-first • software engineer • builder"', 1),
('homepage', 'heroTitle', '"I build practical internal tools that make teams faster, clearer, and more confident."', 2),
('homepage', 'heroBody', '"I’m Ryan Hurd, a software engineer focused on Retool, SQL-driven workflows, and operational tools that help people make better decisions with less friction."', 3)
ON DUPLICATE KEY UPDATE `value` = VALUES(`value`);

-- One-time rename: title is part of portfolio_projects' unique key
-- (title, company_slug), so the ON DUPLICATE KEY UPDATE below won't match
-- the existing 'Personal Portfolio' row once its title changes -- it'd
-- insert a duplicate instead of renaming in place. This UPDATE handles the
-- rename explicitly; it's a no-op on any re-run once the title has changed.
UPDATE portfolio_projects SET title = 'Ryan''s Portfolio', image = '/images/projects/ryans-portfolio.png'
  WHERE title = 'Personal Portfolio' AND company_slug = 'personal-projects';

-- Slugs for the featured projects that get a dedicated /projects/[slug]
-- detail page. Plain UPDATEs (not part of the bulk INSERT below) since
-- these rows already exist -- idempotent, safe to re-run.
UPDATE portfolio_projects SET slug = 'ryans-portfolio' WHERE title = 'Ryan''s Portfolio' AND company_slug = 'personal-projects';
UPDATE portfolio_projects SET slug = 'yield-report' WHERE title = 'Yield Report' AND company_slug = 'packaging-personified';
UPDATE portfolio_projects SET slug = 'epa-reporting' WHERE title = 'EPA Reporting' AND company_slug = 'packaging-personified';
UPDATE portfolio_projects SET slug = 'press-wip-optimization' WHERE title = 'Press WIP Optimization' AND company_slug = 'packaging-personified';
UPDATE portfolio_projects SET slug = 'gear-exchange-braintree' WHERE title = 'Gear Exchange - Braintree Implementation' AND company_slug = 'sweetwater-sound';
UPDATE portfolio_projects SET slug = 'price-management-platform' WHERE title = 'Price Management Platform' AND company_slug = 'sweetwater-sound';
UPDATE portfolio_projects SET slug = 'ecms' WHERE title = 'Tax Exemption Certification Management System (ECMS)' AND company_slug = 'sweetwater-sound';
UPDATE portfolio_projects SET slug = 'turkey-handout-application' WHERE title = 'Turkey Handout Application' AND company_slug = 'sweetwater-sound';

-- The Self-Hosted Home AI Platform project now has a real public repo
-- (home-llm-platform) documenting it -- adding the link via UPDATE rather
-- than moving this row into the with-link INSERT block below.
UPDATE portfolio_projects SET link = 'https://github.com/rh7112/home-llm-platform'
  WHERE title = 'Self-Hosted Home AI Platform' AND company_slug = 'personal-projects';

INSERT INTO portfolio_projects (title, summary, image, company, company_slug, color, tech_stack, featured, published) VALUES
('Ryan''s Portfolio', 'Built this portfolio to expand knowledge of Next.js, HeroUI, and MariaDB while showcasing professional experience.', '/images/projects/ryans-portfolio.png', 'Personal Projects', 'personal-projects', 'sky', 'Next.js, HeroUI, MariaDB', 1, 1),
('Self-Hosted Home AI Platform', 'Built a fully self-hosted LLM stack running on home hardware for family use and as groundwork for a potential web-development business -- no data ever leaves the household network to a third-party AI vendor. Ollama serves multiple local models (coding, general chat, and vision) behind Open WebUI, reachable remotely via both a Synology-hosted OpenVPN server and a Cloudflare Tunnel, with private web search via a self-hosted SearXNG instance instead of Google/Bing. The most technically demanding part was diagnosing a silent, multi-layer network failure: Docker''s daemon was resetting the NAS''s iptables FORWARD policy to DROP on every restart, invisibly breaking VPN routing -- tracked down via systematic elimination (packet captures, iptables rule inspection) rather than guesswork, then made persistent by hooking the fix into the NAS''s existing boot script.', NULL, 'Personal Projects', 'personal-projects', 'sky', 'Ollama, Open WebUI, Docker, Qwen2.5 (Coder/Instruct/VL), Synology DSM, OpenVPN, Cloudflare Tunnel, SearXNG, Windows/WSL2, PowerShell, iptables', 1, 1),
('Family Archive (archive.hurd.cc)', 'Built a family archive knowledgebase for uploading and preserving scanned family documents, transcribed by the family''s self-hosted vision model and made searchable and taggable by the people they mention. Built with Nuxt 4 specifically for server-side rendering, since the Cloudflare Access identity has to be read before hydration so the upload and correction controls never flash into a state a visitor doesn''t actually have permission for. Deployed to Cloudflare Workers, backed by portfolio-api''s own family_archive tenant, which independently enforces the real security boundary (JWT signature/audience verification and per-branch read/write authorization) rather than trusting anything client-side.', NULL, 'Personal Projects', 'personal-projects', 'sky', 'Nuxt 4, Cloudflare Workers, Cloudflare Access, portfolio-api, TypeScript', 1, 1),
('Minesweeper', 'A classic Minesweeper build in Retool, exploring custom component logic and state management outside typical business apps.', NULL, 'Personal Projects', 'personal-projects', 'sky', 'Retool', 0, 1),
('Tetris', 'An in-progress Tetris build in Retool, exploring game-loop logic and state management. Still a work in progress.', NULL, 'Personal Projects', 'personal-projects', 'sky', 'Retool', 0, 1),
('Debt Calculator', 'A debt payoff planner built in Retool to compare snowball- and avalanche-style payoff ordering.', NULL, 'Personal Projects', 'personal-projects', 'sky', 'Retool', 0, 1),
('NOAA Weather Mobile App', 'A mobile weather app built in Retool against NOAA''s public weather data.', NULL, 'Personal Projects', 'personal-projects', 'sky', 'Retool', 0, 1),
('Pi-hole Network Ad Blocking', 'Set up network-wide ad blocking with Pi-hole behind Cloudflared, running on Ubuntu in VMware.', NULL, 'Personal Projects', 'personal-projects', 'sky', 'Cloudflared, VMware, Ubuntu', 0, 1),
('Synology NAS Home Server', 'Configured a Synology NAS as a home server, including MariaDB hosting, Surveillance Station and IP camera setup, scheduled backups, user and permission management, port forwarding, DDNS, and Cloudflare integration.', NULL, 'Personal Projects', 'personal-projects', 'sky', 'MariaDB, Surveillance Station, DDNS, Cloudflare, Linux', 0, 1),
('Plex Media Server', 'Built a home media server with Plex and WinNUT/BackUPS for graceful shutdown during power outages.', NULL, 'Personal Projects', 'personal-projects', 'sky', 'Plex, WinNUT', 0, 1),
('Home Assistant Setup', 'Built out a Home Assistant OS smart-home setup covering IP cameras, thermostat, oven, printers, TV, and Alexa integration, and consolidated the *arr media stack (Bazarr, Radarr, Lidarr, Sonarr) onto it as HAOS add-ons.', NULL, 'Personal Projects', 'personal-projects', 'sky', 'Home Assistant OS, Bazarr, Radarr, Lidarr, Sonarr', 0, 1),
('PC Building', 'Built a PC in 2017 and have been upgrading and maintaining it ever since.', NULL, 'Personal Projects', 'personal-projects', 'sky', 'Hardware', 0, 1),
('Technology Repair', 'Repaired game consoles including PlayStation, Switch, and Xbox hardware.', NULL, 'Personal Projects', 'personal-projects', 'sky', 'Hardware repair', 0, 1),
('Household Projects', 'General contractor-style home projects: fan installation, spackling and painting, converting a bay window into a slider door, and electrical updates.', NULL, 'Personal Projects', 'personal-projects', 'sky', 'Home improvement', 0, 1),
('Raspberry Pi Steam Link', 'Set up a Raspberry Pi running Steam Link to stream PC games to the TV.', NULL, 'Personal Projects', 'personal-projects', 'sky', 'Raspberry Pi, Steam Link', 0, 1),
('Alycia''s Portfolio', 'Built a separate portfolio site for Alycia using SvelteKit and Tailwind CSS, backed by portfolio-api''s isolated Alycia tenant.', NULL, 'Personal Projects', 'personal-projects', 'sky', 'SvelteKit, Tailwind CSS, portfolio-api', 0, 1),
('portfolio-api (Go)', 'Built a Go REST API backed by MariaDB as the shared read/write layer for this site, Alycia''s portfolio, and blog.hurd.cc, replacing direct database queries from each site.', NULL, 'Personal Projects', 'personal-projects', 'sky', 'Go, MariaDB, Docker', 0, 1),
('Morel Mushroom Hunting App (Concept)', 'A planned application for tracking morel mushroom hunting spots and conditions. Not yet started, but scoped out enough to move quickly once picked up.', NULL, 'Personal Projects', 'personal-projects', 'sky', NULL, 0, 1),
('Advent of Code Problems', 'Solved a collection of Advent of Code programming puzzles in Go.', NULL, 'Personal Projects', 'personal-projects', 'sky', 'Go', 0, 1),
('Yield Report', 'A reporting experience that surfaced production, material, and customer-job trends in a clearer way for operations and leadership.', '/images/projects/ppi-yield-report.svg', 'Packaging Personified, Inc.', 'packaging-personified', 'sky', 'Retool, Excel, DL4, PKP, Access', 1, 1),
('EPA Reporting', 'A compliance-focused reporting workflow that consolidated multiple sources into a more maintainable experience.', '/images/projects/ppi-epa-reporting-screenshot.png', 'Packaging Personified, Inc.', 'packaging-personified', 'sky', 'Retool, Excel, DL4, PKP, Access', 1, 1),
('Press WIP Optimization', 'A workflow efficiency project that reduced processing time and improved usability for day-to-day operations, improving speed by over 40%.', '/images/projects/ppi-press-wip.svg', 'Packaging Personified, Inc.', 'packaging-personified', 'sky', 'Retool, DL4, PKP, Access', 1, 1),
('Header Module', 'A standardized header module to unify the look and navigation across locations, with email integration for ticketing and bug reports.', NULL, 'Packaging Personified, Inc.', 'packaging-personified', 'sky', 'Retool, Email', 0, 1),
('Location Swap Application', 'Abstracted a one-off sandboxed location-switching tool into its own standalone application so other teams could benefit, and folded the same functionality into the Header Module.', NULL, 'Packaging Personified, Inc.', 'packaging-personified', 'sky', 'Retool', 0, 1),
('Production Shift Report Module', 'An in-progress Retool tool letting shift leads log scrap and production statistics digitally instead of on paper, eventually pulling data directly from machines. Still a work in progress.', NULL, 'Packaging Personified, Inc.', 'packaging-personified', 'sky', 'Retool', 0, 1),
('Mounting Department Application', 'An early-stage Retool application for the Mounting department, built in the same vein as the Press WIP and Slitter WIP optimizations to streamline day-to-day mounting operations. Just getting started.', NULL, 'Packaging Personified, Inc.', 'packaging-personified', 'sky', 'Retool, DL4, PKP, Access', 0, 1),
('Slitter WIP Optimization', 'Advised on load-speed optimizations for the Slitter WIP process, helping cut load speed by 30-40%.', NULL, 'Packaging Personified, Inc.', 'packaging-personified', 'sky', 'Process optimization', 0, 1),
('Timeclock Workflow Optimization', 'Optimized the PunchAndReset, Punching, and BadgeAndPin timeclock workflows, letting employees punch in/out and manage PINs by badge or PIN entry.', NULL, 'Packaging Personified, Inc.', 'packaging-personified', 'sky', 'Retool Workflows', 0, 1),
('AI-Assisted Development Practices', 'Explored practical ways to work effectively with AI tools for planning, implementation, and verification.', NULL, 'Packaging Personified, Inc.', 'packaging-personified', 'sky', 'Retool AI, ChatGPT', 0, 1),
('Data Governance & Housekeeping', 'General housekeeping, data governance, database normalization, and resource management work across Retool applications.', NULL, 'Packaging Personified, Inc.', 'packaging-personified', 'sky', 'PostgreSQL, SQL', 0, 1),
('Contacts Database', 'Built and maintained a centralized contacts database.', NULL, 'Sweetwater Sound', 'sweetwater-sound', 'sky', '4D', 0, 1),
('4D SQL Engine Restrictions', 'Restricted non-senior engineers from running expensive SQL keywords like HAVING and WITH that were taxing the system.', NULL, 'Sweetwater Sound', 'sweetwater-sound', 'sky', '4D', 0, 1),
('Press Release Management', 'Let staff post and maintain press releases, including images, directly to the Sweetwater website.', NULL, 'Sweetwater Sound', 'sweetwater-sound', 'sky', 'Retool', 0, 1),
('Web Text Editor', 'Attempted a WYSIWYG-style editor for the web team to update product text and images directly. Record-locking limitations in Retool, and the lack of true drag-and-drop, ultimately kept it from shipping even after getting close.', NULL, 'Sweetwater Sound', 'sweetwater-sound', 'sky', 'Retool', 0, 1),
('Beverage Kiosks', 'Rewrote the shared beverage kiosk application, including testing its Stripe payment integration, to improve consistency and maintainability across multiple kiosk locations.', '/images/projects/beverage-kiosks.jpg', 'Sweetwater Sound', 'sweetwater-sound', 'sky', 'Retool, Stripe', 0, 1),
('Crescendo Cafe Kiosk', 'Rebuilt the cafe management system with Retool, including programming, testing, and maintaining its Stripe payment integration, to improve usability, performance, and long-term maintainability.', '/images/projects/crescendo-cafe-kiosk.jpg', 'Sweetwater Sound', 'sweetwater-sound', 'sky', 'Retool, Stripe', 0, 1),
('Consumer Audio', 'Reworked the round-robin assignment flow for less specialized audio equipment sales to reduce sales engineer workload and increase throughput.', '/images/projects/consumer-audio.jpg', 'Sweetwater Sound', 'sweetwater-sound', 'sky', '4D', 0, 1),
('Distribution Center Cookout Giveaway', 'Built a badge-based raffle application for the Sweetwater Distribution Center to manage employee prizes and winners at a cookout event.', '/images/projects/dc-cookout-giveaway.jpg', 'Sweetwater Sound', 'sweetwater-sound', 'sky', 'Retool', 0, 1),
('End of Day Notes', 'Created a shared handoff application for the Guitar Gallery to centralize daily notes and improve shift transitions.', '/images/projects/end-of-day-notes.png', 'Sweetwater Sound', 'sweetwater-sound', 'sky', 'Retool', 0, 1),
('Gear Exchange - Braintree Implementation', 'Integrated PayPal''s Braintree payment processing into Gear Exchange, enabling secure transactions and helping bring the platform to life. Gear Exchange saw over $1M in sales within its first few months.', '/images/projects/gear-exchange.jpg', 'Sweetwater Sound', 'sweetwater-sound', 'sky', '4D, PayPal Braintree GraphQL API', 1, 1),
('Gitlab Permissions Lookup', 'Created a tool that uses the GitLab REST API to surface repository ownership and maintainers for support teams.', '/images/projects/gitlab-permissions-lookup.jpg', 'Sweetwater Sound', 'sweetwater-sound', 'sky', 'Retool, GitLab API', 0, 1),
('In-House Credit Freezing/Thawing', 'Modified the logic related to freezing and thawing credits to comply with Indiana state law and improve financial accuracy.', '/images/projects/credit-freezing-thawing.png', 'Sweetwater Sound', 'sweetwater-sound', 'sky', '4D', 0, 1),
('Inventory Variances', 'Built an app to help the Music Store track inventory variances and maintain stock more effectively.', '/images/projects/inventory-variances.png', 'Sweetwater Sound', 'sweetwater-sound', 'sky', 'Retool', 0, 1),
('Mentor Management Application', 'Built with the Orbital class team, this app helped mentees select mentors over a set period to support learning and skill-building.', '/images/projects/mentor-management.png', 'Sweetwater Sound', 'sweetwater-sound', 'sky', 'C#/.NET, Go/GCP', 0, 1),
('Personalized Tile Promotions', 'Rewrote the Personalized Tile Promotions application to show targeted promotions based on browsing history.', '/images/projects/personalized-tile-promotions.jpg', 'Sweetwater Sound', 'sweetwater-sound', 'sky', 'Retool', 0, 1),
('Price Management Platform', 'Built a pricing-tracking tool for the merchandising team that helped sharpen competitor pricing insight, driving $4M in increased revenue in under a month.', '/images/projects/price-management-platform.png', 'Sweetwater Sound', 'sweetwater-sound', 'sky', 'Retool', 1, 1),
('Search Miner', 'Developed a tool to help the SEO engineer analyze Sweetwater.com search results and improve website health and performance.', '/images/projects/search-miner.png', 'Sweetwater Sound', 'sweetwater-sound', 'sky', 'Retool', 0, 1),
('Tax Exemption Certification Management System (ECMS)', 'Sole developer on implementing Avalara''s Exemption Certificate Management System, saving the tax team the equivalent of 160+ hours of validating certificates per month.', '/images/projects/ecms.jpg', 'Sweetwater Sound', 'sweetwater-sound', 'sky', '4D, ECM/ECMS API', 1, 1),
('Turkey Handout Application', 'Delivered a Thanksgiving turkey/gift card handout tool within 72 hours, letting the campus events team serve 2,500 employees.', '/images/projects/turkey-handout.png', 'Sweetwater Sound', 'sweetwater-sound', 'sky', 'Retool', 1, 1),
('Wavelengths Salon & Spa Kiosk', 'Provided support and maintenance for the Wavelengths Salon and Spa internal platform, including testing its Stripe payment integration, with a focus on usability and bug fixes.', '/images/projects/wavelengths-salon-spa-kiosk.jpg', 'Sweetwater Sound', 'sweetwater-sound', 'sky', 'Retool, Stripe', 0, 1),
('Mentoring and Training', 'Trained engineers new to 4D, including an electrical engineer without a CS background and a senior engineer transitioning from another team, plus ongoing mentoring in code reviews and meetings.', NULL, 'Sweetwater Sound', 'sweetwater-sound', 'sky', '4D', 0, 1),
('C# Orbital', 'Completed a three-part C# Orbital course at Sweetwater covering a web API, triangle/geometry logic, and Entity Framework basics.', NULL, 'Sweetwater Sound', 'sweetwater-sound', 'sky', 'C#, .NET, Entity Framework', 0, 1),
('Device Tracking Spreadsheet', 'Built an Excel tracking sheet for assigned devices to reduce hand-off errors from manual tracking.', NULL, 'Zimmer Biomet', 'zimmer-biomet', 'sky', 'Excel', 0, 1),
('Accessibility Website', 'Built a website teaching accessibility concepts using Agile methodologies as part of a project management course.', '/images/projects/accessibility-website.jpg', 'Purdue University', 'purdue-university', 'sky', 'React', 0, 1),
('DementiaTrack', 'A senior capstone project that analyzed patient sensor data to explore sensor-based health monitoring and machine learning insights.', '/images/projects/dementiatrack.jpg', 'Purdue University', 'purdue-university', 'sky', 'Python, React', 0, 1),
('Flashcards Android Application', 'Built a Flashcards app as part of a software engineering course.', '/images/projects/flashcards-android.jpg', 'Purdue University', 'purdue-university', 'sky', 'Kotlin, Android Studio', 0, 1),
('Website Development - Final Project', 'Built a website for Black''s Concrete Construction as a functional final project for coursework.', '/images/projects/website-development-final-project.png', 'Ivy Tech', 'ivy-tech', 'sky', 'HTML5, CSS3', 0, 1),
('Phase 10 Dice', 'Developed the Phase 10 Dice game as the final project for an introductory programming course.', '/images/projects/phase-10-dice.jpg', 'Ivy Tech', 'ivy-tech', 'sky', 'C++', 0, 1),
('Banking Application', 'Built a banking application as a course project.', NULL, 'Ivy Tech', 'ivy-tech', 'sky', 'C++', 0, 1)
ON DUPLICATE KEY UPDATE summary = VALUES(summary), image = VALUES(image), company = VALUES(company), color = VALUES(color), tech_stack = VALUES(tech_stack), featured = VALUES(featured), published = VALUES(published);

-- Projects with an external link (repo, live docs, etc.), rendered as
-- clickable on the site instead of static text. Separate INSERT since these
-- are the only rows in this file that set the `link` column.
INSERT INTO portfolio_projects (title, summary, image, company, company_slug, color, tech_stack, link, featured, published) VALUES
('BBSystems.US Website', 'Built and launched the BBSystems.US website for site owner Cruz Gregory.', NULL, 'Personal Projects', 'personal-projects', 'sky', NULL, 'https://bbsystems.us', 1, 1),
('blog.hurd.cc Extraction', 'Split the blog and recipes content out of this portfolio into its own site, including migrating the data into portfolio-api''s isolated hurd_blog database.', NULL, 'Personal Projects', 'personal-projects', 'sky', 'Next.js, portfolio-api', 'https://blog.hurd.cc', 0, 1),
('portfolio-api Swagger Docs', 'Set up Swagger/OpenAPI documentation for portfolio-api, giving a browsable, interactive reference for its REST endpoints.', NULL, 'Personal Projects', 'personal-projects', 'sky', 'Swagger/OpenAPI, Go', 'https://api.hurd.cc/docs/', 0, 1),
('Ramona Bauch, PA-C Website', 'Built a simple static portfolio website for Ramona Bauch, PA-C, deployed to Cloudflare Pages.', NULL, 'Personal Projects', 'personal-projects', 'sky', 'HTML, CSS, Cloudflare Pages', 'https://ramona.bauch.cc', 0, 1),
('Minecraft Turtle Strip Miner', 'Wrote Lua scripts for modded Minecraft (ComputerCraft) Turtles: a strip-mining script that automatically mines a specified number of strips, plus a companion script for storing mined materials in a chest.', NULL, 'Personal Projects', 'personal-projects', 'sky', 'Lua, ComputerCraft', 'https://pastebin.com/u/rh25170/1/gRSLQgiq', 0, 1)
('Tic-Tac-Toe (React)', 'Built a classic Tic-Tac-Toe game in React.', NULL, 'Personal Projects', 'personal-projects', 'sky', 'React', 'https://github.com/rh7112/React-Tic-Tac-Toe', 0, 1),
('Ticket Sales Lab', 'A freshman-year C++ lab exercise calculating ticket sales totals.', NULL, 'Ivy Tech', 'ivy-tech', 'sky', 'C++', 'https://github.com/rh7112/cpp-ticket-sales-lab', 0, 1),
('Kg to Lb Conversion Lab', 'A freshman-year C++ lab exercise converting kilograms to pounds.', NULL, 'Ivy Tech', 'ivy-tech', 'sky', 'C++', 'https://github.com/rh7112/cpp-kg-to-lb-lab', 0, 1),
('Restaurant Bill Lab', 'A freshman-year C++ lab exercise calculating a restaurant bill with tax and tip.', NULL, 'Ivy Tech', 'ivy-tech', 'sky', 'C++', 'https://github.com/rh7112/cpp-restaurant-bill-lab', 0, 1),
('Output and ASCII Lab', 'A freshman-year C++ lab exercise exploring console output formatting and ASCII values.', NULL, 'Ivy Tech', 'ivy-tech', 'sky', 'C++', 'https://github.com/rh7112/cpp-output-and-ascii-lab', 0, 1)
ON DUPLICATE KEY UPDATE summary = VALUES(summary), image = VALUES(image), company = VALUES(company), color = VALUES(color), tech_stack = VALUES(tech_stack), link = VALUES(link), featured = VALUES(featured), published = VALUES(published);

-- Employers: single source of truth for homepage Experience cards, the
-- header's Work dropdown, and /experience/[slug] pages.
INSERT INTO portfolio_employers (slug, name, title, start_date, end_date, location, summary, description, sort_order, color, secondary_color) VALUES
('packaging-personified', 'Packaging Personified, Inc.', 'Software Engineer', '2025-10-01', NULL, 'Warsaw, IN', 'Building internal Retool applications for production, compliance, accounting, and operations teams.', 'Building internal Retool applications for production, compliance, accounting, and operations teams, including a Yield Report tool for tracking job performance and material usage, and consolidated EPA reporting for Illinois and Michigan compliance. Created reusable shared modules and delivered a 40%+ performance improvement to the Press WIP application while training managers and end users on Retool best practices.', 1, 'emerald', NULL),
('sweetwater-sound', 'Sweetwater Sound', 'Software Engineer', '2021-05-01', '2025-08-01', 'Fort Wayne, IN', 'Delivered internal tools, workflow automations, and revenue-driving platforms across accounting, commerce, and merchandising.', 'Sole developer of Avalara''s Exemption Certificate Management System, saving the tax team 160+ hours of manual validation per month, and integrated PayPal''s Braintree system into the CRM to help launch Gear Exchange, which generated over $1M in sales within months. Also built a dynamic Price Management Platform that drove $4M in revenue in under a month, alongside daily-use internal tools across departments.', 2, 'red', NULL),
('zimmer-biomet', 'Zimmer Biomet', 'Information Technology Intern', '2020-10-01', '2021-05-01', 'Warsaw, IN', 'Supported device deployment and IT operations across campuses in the Warsaw area.', 'Imaged and deployed company devices, issued laptops and accessories, and performed hardware upgrades for onboarding and refresh cycles. Delivered devices to campuses across the Warsaw area as part of IT operations support.', 3, 'blue', NULL),
('census-bureau', 'United States Census Bureau', 'Post-Enumeration Surveyor', '2020-01-01', '2020-10-01', 'Warsaw, IN', 'Collected population data door-to-door for the U.S. Census Bureau''s Post-Enumeration Survey.', 'Conducted in-person interviews to collect population data for the Post-Enumeration Survey, ensuring census accuracy while complying with strict federal confidentiality guidelines. Maintained detailed activity logs and navigated difficult resident interactions with calm, professional de-escalation.', 4, 'red', 'blue'),
('staples', 'Staples', 'Technology Sales Associate', '2018-06-01', '2019-05-01', 'Warsaw, IN', 'Helped customers find the right technology products as a top-performing sales associate.', 'Assessed customer needs and guided them to the right technology products, consistently ranking as the top store in Northern Indiana for several consecutive weeks. Stayed current on promotions and product launches to support sales goals.', 5, 'amber', NULL),
('blacks-concrete-construction', 'Black''s Concrete Construction', 'Concrete Laborer', '2016-06-01', '2017-03-01', 'Warsaw, IN', 'Handled nearly every phase of residential concrete work on a small, hands-on crew.', 'Worked as part of a small 2-3 person crew handling nearly every phase of residential concrete work, including driving the company truck, forming, pouring, finishing, cutting, cleaning, sealing, and stamping. Gained hands-on versatility and a strong work ethic from taking on broad responsibility within a lean, close-knit team.', 6, 'black', 'white')
ON DUPLICATE KEY UPDATE name = VALUES(name), title = VALUES(title), start_date = VALUES(start_date), end_date = VALUES(end_date), location = VALUES(location), summary = VALUES(summary), description = VALUES(description), sort_order = VALUES(sort_order), color = VALUES(color), secondary_color = VALUES(secondary_color);

-- Highlights and case studies are seed-only (no natural unique key), so clear
-- any existing rows for these employers before re-inserting on a fresh run.
DELETE h FROM portfolio_employer_highlights h JOIN portfolio_employers e ON e.id = h.employer_id
  WHERE e.slug IN ('packaging-personified', 'sweetwater-sound', 'zimmer-biomet', 'census-bureau', 'staples', 'blacks-concrete-construction');
DELETE c FROM portfolio_employer_case_studies c JOIN portfolio_employers e ON e.id = c.employer_id
  WHERE e.slug IN ('packaging-personified', 'sweetwater-sound', 'zimmer-biomet');

INSERT INTO portfolio_employer_highlights (employer_id, highlight, sort_order)
SELECT e.id, h.highlight, h.sort_order FROM portfolio_employers e
JOIN (
  SELECT 'packaging-personified' AS slug, 1 AS sort_order, 'Developed and maintained internal applications using Retool, PostgreSQL, SQL, and JavaScript for production, compliance, accounting, and operations teams.' AS highlight
  UNION ALL SELECT 'packaging-personified', 2, 'Built the Yield Report application to track company and customer job performance, material usage, production efficiency, and operational trends.'
  UNION ALL SELECT 'packaging-personified', 3, 'Consolidated spreadsheets and multiple data sources into EPA reporting tools supporting environmental compliance workflows for Illinois and Michigan facilities.'
  UNION ALL SELECT 'packaging-personified', 4, 'Created reusable tools, including a standardized Header Module and scalable Location Swap application, to improve consistency across Retool applications.'
  UNION ALL SELECT 'packaging-personified', 5, 'Optimized applications and automated workflows for performance, reliability, and usability, including improving Press WIP processing speed by more than 40%.'
  UNION ALL SELECT 'packaging-personified', 6, 'Trained managers, developers, company owners, and end users on Retool functionality, application workflows, and development best practices.'
  UNION ALL SELECT 'sweetwater-sound', 1, 'Sole developer on the implementation of Avalara''s Exemption Certificate Management System (ECMS), saving the tax team the equivalent of 160+ hours of validating exemption certificates per month.'
  UNION ALL SELECT 'sweetwater-sound', 2, 'Integrated PayPal''s GraphQL-based Braintree system into the CRM to help launch Gear Exchange, which saw over $1M in sales between users within its first few months.'
  UNION ALL SELECT 'sweetwater-sound', 3, 'Built and deployed a Price Management Platform used by merchandising to adjust pricing dynamically, resulting in $4M in increased revenue in under a month.'
  UNION ALL SELECT 'sweetwater-sound', 4, 'Provided a Turkey Handout application for Sweetwater''s Thanksgiving giveaway within 72 hours, allowing the campus events team to hand out turkeys and gift cards to 2,500 employees.'
  UNION ALL SELECT 'sweetwater-sound', 5, 'Contributed to internal software development by designing scalable features, debugging production issues, and delivering tools used daily across multiple departments.'
  UNION ALL SELECT 'zimmer-biomet', 1, 'Imaged and prepared company devices with software for deployment.'
  UNION ALL SELECT 'zimmer-biomet', 2, 'Issued laptops, accessories, and performed hardware upgrades for onboarding and refreshing hardware.'
  UNION ALL SELECT 'zimmer-biomet', 3, 'Used a company vehicle to deliver devices to various campuses in the Warsaw area.'
  UNION ALL SELECT 'census-bureau', 1, 'Performed interviews at addresses within assigned blocks to collect population data as part of the Post-Enumeration Survey, ensuring census accuracy.'
  UNION ALL SELECT 'census-bureau', 2, 'Complied with strict federal guidelines and confidentiality rules for gathering demographic and housing information.'
  UNION ALL SELECT 'census-bureau', 3, 'Recorded information using a government-issued laptop, maintaining hour logs, mileage, and case activity.'
  UNION ALL SELECT 'census-bureau', 4, 'Navigated difficult or uncooperative situations by calmly diffusing tensions with hesitant or hostile residents.'
  UNION ALL SELECT 'staples', 1, 'Asked customers pertinent questions to assess and determine their needs, guiding them to the correct product.'
  UNION ALL SELECT 'staples', 2, 'Answered questions, explained product features, and gave honest input based on customer needs.'
  UNION ALL SELECT 'staples', 3, 'Used Staples sales strategies to become the number one store in Northern Indiana for several weeks straight.'
  UNION ALL SELECT 'staples', 4, 'Stayed up to date on weekly promotions and product launches to best support customers and hit sales goals.'
  UNION ALL SELECT 'blacks-concrete-construction', 1, 'Drove the company truck and handled nearly every phase of residential concrete work on a lean 2-3 person crew.'
  UNION ALL SELECT 'blacks-concrete-construction', 2, 'Performed forming, pouring, finishing, cutting, cleaning, sealing, and stamping across a wide range of jobs.'
  UNION ALL SELECT 'blacks-concrete-construction', 3, 'Gained hands-on versatility and a strong work ethic from taking on broad responsibility within a small, close-knit team.'
) h ON h.slug = e.slug;

INSERT INTO portfolio_employer_case_studies (employer_id, title, summary, image, sort_order)
SELECT e.id, c.title, c.summary, c.image, c.sort_order FROM portfolio_employers e
JOIN (
  SELECT 'packaging-personified' AS slug, 'Yield Report' AS title, 'A reporting tool for tracking production and customer performance trends using operational data from multiple sources.' AS summary, '/images/projects/ppi-yield-report.svg' AS image, 1 AS sort_order
  UNION ALL SELECT 'packaging-personified', 'EPA Reporting', 'A compliance-oriented reporting workflow that combines spreadsheets and source data into a more maintainable reporting experience.', '/images/projects/ppi-epa-reporting-screenshot.png', 2
  UNION ALL SELECT 'packaging-personified', 'Press WIP Optimization', 'A performance-focused workflow improvement project that reduced processing time and simplified day-to-day operations.', '/images/projects/ppi-press-wip.svg', 3
  UNION ALL SELECT 'sweetwater-sound', 'Turkey Handout App', 'A fast-turnaround internal tool that made holiday employee gifting easier and more organized.', '/images/projects/turkey-handout.png', 1
  UNION ALL SELECT 'sweetwater-sound', 'Gear Exchange', 'Helped support commerce workflows and secure payment integration for a rapidly growing platform.', '/images/projects/gear-exchange.jpg', 2
  UNION ALL SELECT 'sweetwater-sound', 'DementiaTrack', 'A capstone project that combined thoughtful software design with practical analytics.', '/images/projects/dementiatrack.jpg', 3
  UNION ALL SELECT 'zimmer-biomet', 'Device Deployment Support', 'Helped prepare and configure systems for company use in a structured, detail-focused workflow.', NULL, 1
) c ON c.slug = e.slug;
INSERT INTO portfolio_education (slug, institution, degree, start_date, end_date, location, sort_order) VALUES
('whitko', 'Whitko Community High School', 'Core 40 – Academic Honors Diploma', '2011-08-01', '2016-05-01', 'South Whitley, IN', 1),
('ivy-tech', 'Ivy Tech Community College', 'Associate of Science, Computer Science', '2017-01-01', '2019-05-01', 'Warsaw/Fort Wayne, IN', 2),
('purdue-fort-wayne', 'Purdue University Fort Wayne', 'Bachelor of Science, Computer Science', '2019-08-01', '2021-05-01', 'Fort Wayne, IN', 3)
ON DUPLICATE KEY UPDATE institution = VALUES(institution), degree = VALUES(degree), start_date = VALUES(start_date), end_date = VALUES(end_date), location = VALUES(location), sort_order = VALUES(sort_order);

INSERT INTO portfolio_certifications (slug, name, issuer, date_earned, credential_url, score, expired, sort_order) VALUES
('python-pcep', 'Python PCEP Certification', 'Python Institute', '2021-09-24', 'https://pythoninstitute.org/credential-verification', NULL, 0, 1),
('comptia-a-plus', 'CompTIA A+', 'CompTIA', '2017-12-01', NULL, '1880', 1, 2),
('retool-platform-admin', 'Retool Platform Admin', 'Retool', '2025-03-20', 'https://www.credly.com/badges/ff682844-9d1f-4336-9f49-6622bdce25c5/linked_in_profile', NULL, 0, 3),
('retool-platform-developer', 'Retool Platform Developer', 'Retool', '2025-03-19', 'https://www.credly.com/badges/9d9a47c9-09dd-4527-ab31-ab6766df44de/linked_in_profile', NULL, 0, 4),
('testout-pc-pro', 'TestOut PC Pro', 'TestOut', '2017-12-13', 'https://webservices.testout.com/OrbisServerJson/DownloadCertificates.aspx?certificateSetGuid=a82a3791-07ad-4736-9cb5-bc8af4a98f13', NULL, 0, 5)
ON DUPLICATE KEY UPDATE name = VALUES(name), issuer = VALUES(issuer), date_earned = VALUES(date_earned), credential_url = VALUES(credential_url), score = VALUES(score), expired = VALUES(expired), sort_order = VALUES(sort_order);
