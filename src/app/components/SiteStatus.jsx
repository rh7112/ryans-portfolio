"use client";

import { useEffect, useState } from "react";

// Direct client-side call to portfolio-api's public (no-auth) site-health
// endpoint -- this has to run in the visitor's browser, not at build time,
// since the whole point is "is it up right now" and this page is
// statically generated (rebuilt hourly at most, see scheduled-rebuild in
// .github/workflows/deploy.yml). https://api.hurd.cc is the public
// internet-facing address; PORTFOLIO_API_BASE_URL (used elsewhere in this
// repo for build-time fetches) is LAN-only and unreachable from a
// visitor's browser.
const SITE_HEALTH_URL = "https://api.hurd.cc/api/v1/public/site-health";

// Friendlier labels than the raw repo-name `name` field the API returns.
const DISPLAY_NAMES = {
  "ryans-portfolio": "This site",
  "alycias-portfolio": "Alycia's portfolio",
  "ramonas-portfolio": "Ramona's portfolio",
  "bbsystems-us": "BBSystems.US",
  "blog-hurd-cc": "The blog",
  "archive-hurd-cc": "Family archive",
};

export default function SiteStatus() {
  const [sites, setSites] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(SITE_HEALTH_URL)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`status ${res.status}`))))
      .then((data) => {
        if (!cancelled) setSites(data);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Fails silently rather than showing an error state -- a status widget
  // that itself looks broken when portfolio-api has a blip is worse than
  // just not showing up that one time.
  if (failed) {
    return null;
  }

  if (!sites) {
    return <p className="mt-6 text-sm text-stone-500 dark:text-stone-400">Checking site status…</p>;
  }

  return (
    <div className="mt-6 flex flex-wrap gap-3 text-sm">
      {sites.map((site) => (
        <a
          key={site.name}
          href={site.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-stone-900/10 bg-stone-100/70 px-4 py-2 text-stone-700 transition hover:border-orange-600 dark:border-white/10 dark:bg-stone-950/70 dark:text-stone-200 dark:hover:border-orange-400"
        >
          <span
            className={`h-2 w-2 shrink-0 rounded-full ${site.up ? "bg-emerald-500" : "bg-red-500"}`}
            aria-hidden="true"
          />
          {DISPLAY_NAMES[site.name] ?? site.name}
        </a>
      ))}
    </div>
  );
}
