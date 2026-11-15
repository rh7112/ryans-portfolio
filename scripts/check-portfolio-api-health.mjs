// Deploy gate: confirms portfolio-api is reachable and healthy before the
// site is built. The homepage's project history, employers, education etc.
// are fetched at build time, and src/lib/portfolio-data.js degrades to an
// empty list when the API can't be reached -- so building during an NAS or
// Cloudflare Tunnel outage used to publish a page with no projects, replacing
// the last good one. Failing here instead leaves the previous deploy live; the
// next hourly run retries on its own.
//
// Retries a few times first so a single blip doesn't skip a deploy.

const BASE_URL = (process.env.PORTFOLIO_API_BASE_URL ?? "https://api.hurd.cc").replace(/\/+$/, "");
const url = `${BASE_URL}/api/v1/health`;
const ATTEMPTS = 3;
const DELAY_MS = 10_000;

let lastError = "";
let healthy = false;
for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(10_000) });
    if (res.ok) {
      console.log(`portfolio-api health check passed -- ${url} returned ${res.status}.`);
      healthy = true;
      break;
    }
    lastError = `returned ${res.status}`;
  } catch (err) {
    lastError = `could not be reached (${err})`;
  }
  console.error(`portfolio-api health check attempt ${attempt}/${ATTEMPTS}: ${url} ${lastError}`);
  if (attempt < ATTEMPTS) {
    await new Promise((resolve) => setTimeout(resolve, DELAY_MS));
  }
}

if (!healthy) {
  console.error(
    "portfolio-api health check FAILED -- not deploying, so the last good build stays live.",
  );
  process.exitCode = 1;
}
