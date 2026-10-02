"use client";

import { useEffect, useState } from "react";

// The first two are specific, verifiable public figures (country
// singer-songwriter; dream/sleep-paralysis researcher and author). The rest
// are bare occupation words pulled from real LinkedIn profiles that share
// this name -- deliberately stripped of name, employer, and location so
// nothing here identifies a specific private person, just the occupation.
const otherRyanHurds = [
  "the country singer",
  "the dream researcher",
  "a wealth management executive",
  "a commercial real estate advisor",
  "a trial attorney",
  "a VFX artist",
  "a band director",
  "a basketball coach",
  "a real estate investor",
  "a mechanical technician",
  "a photographer",
  "a partnership lead",
  "a recruitment director",
  "a leadership coach",
  "a public speaker",
  "a personal banker",
  "a student",
  "a production shift supervisor",
  "a process engineering analyst",
  "a brand strategist",
  "a corrections counselor",
  "a teacher",
];

export default function NotTheOtherRyanHurd() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((current) => (current + 1) % otherRyanHurds.length);
        setVisible(true);
      }, 300);
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  return (
    <p className="mt-3 text-sm italic text-stone-500 dark:text-stone-400">
      There's more than one Ryan Hurd out there — I'm not the one who's{" "}
      <span className={`inline-block transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}>
        {otherRyanHurds[index]}.
      </span>
    </p>
  );
}
