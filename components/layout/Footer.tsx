import Image from "next/image";
import Link from "next/link";
import { footerLinks } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#020617]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <Image
              src="/brand/logo-full.png"
              alt="GitClone"
              width={220}
              height={64}
              className="h-auto w-44"
            />
            <p className="mt-5 max-w-md text-sm leading-6 text-muted">
              A premium developer ecosystem for repositories, collaboration,
              previews, governance, and deployment intelligence.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {footerLinks.Social.map((item) => (
                <Link
                  key={item}
                  href={getFooterHref(item)}
                  className="flex h-10 min-w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 px-3 font-mono text-xs text-muted transition hover:border-cyan-glow/60 hover:text-white"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {Object.entries(footerLinks).map(([group, links]) => (
              <div key={group}>
                <h3 className="text-sm font-semibold text-white">{group}</h3>
                <ul className="mt-4 space-y-3">
                  {links.map((link) => (
                    <li key={link}>
                      <Link
                        href={getFooterHref(link)}
                        className="text-sm text-muted transition hover:text-cyan-glow"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2026 GitClone. All rights reserved.</p>
          <p className="font-mono text-xs uppercase text-cyan-glow/80">
            GitClone Cloud Status: Operational
          </p>
        </div>
      </div>
    </footer>
  );
}

function getFooterHref(label: string) {
  const hrefs: Record<string, string> = {
    API: "/docs#api-reference",
    Docs: "/docs",
    Community: "/docs#get-started",
    Status: "/docs#production-checklist",
    Terms: "/docs",
    Privacy: "/docs",
    "GitClone Cloud": "/dashboard",
    X: "#",
    Discord: "#",
    LinkedIn: "#",
    Forum: "#"
  };

  return hrefs[label] ?? "#";
}
