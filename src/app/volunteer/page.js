import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import ContactLinks from "@/app/components/ContactLinks";
import { getVolunteerWork } from "@/lib/portfolio-data";

const description =
  "Community volunteer work by Ryan Hurd: food packing, animal shelter support, church concert series, and school music boosters.";

export const metadata = {
  title: "Volunteer Work",
  description,
  alternates: { canonical: "/volunteer/" },
  openGraph: { type: "website", title: "Volunteer Work", description, url: "/volunteer/" },
  twitter: { card: "summary", title: "Volunteer Work", description },
};

export default async function VolunteerPage() {
  const items = await getVolunteerWork();

  return (
    <main className="min-h-screen bg-stone-50 text-stone-900 dark:bg-stone-950 dark:text-stone-100">
      <section className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
        <div className="rounded-3xl border border-stone-900/10 bg-white/80 p-8 dark:border-white/10 dark:bg-stone-900/70 lg:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-700 dark:text-orange-400">Community</p>
          <h1 className="mt-3 text-4xl font-semibold text-stone-900 dark:text-white">Volunteer work</h1>
          <p className="mt-6 text-lg text-stone-600 dark:text-stone-300">
            Giving time back to the community, from packing meals to walking shelter dogs.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-8 lg:px-8">
        {items.length === 0 ? (
          <p className="text-stone-600 dark:text-stone-300">Volunteer work is currently unavailable. Please check back soon.</p>
        ) : (
          <div className="grid gap-6">
            {items.map((item) => (
              <article
                key={item.slug}
                id={item.slug}
                className="rounded-3xl border border-stone-900/10 bg-white/70 p-8 dark:border-white/10 dark:bg-stone-900/60 lg:p-10"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="text-2xl font-semibold text-stone-900 dark:text-white">
                    {item.link ? (
                      <a href={item.link} target="_blank" rel="noreferrer" className="hover:text-orange-700 dark:hover:text-orange-400">
                        {item.organization}
                      </a>
                    ) : (
                      item.organization
                    )}
                  </h2>
                  <p className="text-sm text-stone-500 dark:text-stone-400">{item.dateRange}</p>
                </div>
                <p className="mt-2 text-stone-600 dark:text-stone-300">
                  {item.role}
                  {item.cause ? ` • ${item.cause}` : ""}
                  {item.location ? ` • ${item.location}` : ""}
                </p>
                <p className="mt-4 text-sm leading-7 text-stone-600 dark:text-stone-300">{item.description}</p>
                {item.highlights.length > 0 && (
                  <ul className="mt-4 space-y-2 text-sm leading-7 text-stone-600 dark:text-stone-300">
                    {item.highlights.map((highlight) => (
                      <li key={highlight}>• {highlight}</li>
                    ))}
                  </ul>
                )}
                {item.hoursTotal ? (
                  <p className="mt-4 text-sm text-stone-500 dark:text-stone-400">About {item.hoursTotal} hours volunteered</p>
                ) : null}
              </article>
            ))}
          </div>
        )}
        <Link href="/" className="mt-8 inline-flex items-center gap-2 text-orange-700 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300">
          <FaArrowLeft /> Return home
        </Link>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="rounded-3xl border border-orange-600/20 bg-gradient-to-br from-stone-100 to-stone-50 p-8 dark:border-orange-500/20 dark:from-stone-900 dark:to-stone-950 lg:p-10">
          <h2 className="text-3xl font-semibold text-stone-900 dark:text-white">Contact</h2>
          <ContactLinks className="mt-8" />
        </div>
      </section>
    </main>
  );
}
