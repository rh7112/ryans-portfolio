import { FaEnvelope, FaFileAlt, FaGithub, FaLinkedin, FaPhoneAlt } from "react-icons/fa";
import { SiIndeed } from "react-icons/si";

// Single source of truth for the static contact links used on the resume
// and employer detail pages -- these two pages used to keep their own
// hand-copied lists, which had already drifted (different labels, the
// employer page's Indeed link missing from the resume page).
//
// The homepage's contact section is intentionally separate: it's driven by
// portfolio-api content (contactHeading/contactBody/contactLinks), editable
// without a code change, not duplicated by hand.
export const contactLinks = [
  { label: "Email", href: "mailto:ryan@hurd.cc", icon: FaEnvelope },
  { label: "Phone", href: "tel:+13525800408", icon: FaPhoneAlt },
  { label: "GitHub", href: "https://github.com/rh7112", icon: FaGithub },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ryan-lee-hurd/", icon: FaLinkedin },
  { label: "Resume", href: "/documents/ryan-hurd-resume.pdf", icon: FaFileAlt },
  { label: "Indeed", href: "https://profile.indeed.com/p/ryanh-sv25zg9", icon: SiIndeed },
];

export default function ContactLinks({ size = "md", className = "" }) {
  const padding = size === "sm" ? "px-4 py-2" : "px-4 py-3";

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {contactLinks.map((link) => {
        const Icon = link.icon;
        return (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noreferrer" : undefined}
            className={`inline-flex items-center gap-2 rounded-full border border-stone-900/10 bg-stone-100/70 ${padding} text-sm font-medium text-stone-700 transition hover:border-orange-600 hover:text-stone-900 dark:border-white/10 dark:bg-stone-950/70 dark:text-stone-200 dark:hover:border-orange-400 dark:hover:text-white`}
          >
            <Icon /> {link.label}
          </a>
        );
      })}
    </div>
  );
}
