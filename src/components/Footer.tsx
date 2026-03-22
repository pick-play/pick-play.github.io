"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getLocaleFromPath, localePaths } from "@/i18n/config";
import { getNavData } from "@/i18n/nav";

export default function Footer() {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  const prefix = localePaths[locale];
  const nav = getNavData(locale);

  return (
    <footer className="border-t border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row gap-10 mb-8">
          {/* Brand */}
          <div className="shrink-0">
            <Link
              href={prefix || "/"}
              className="text-xl font-bold bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent"
            >
              PickPlay
            </Link>
            <p className="text-sm text-slate-400 mt-1">
              {nav.tagline}
            </p>
          </div>

          {/* Category link columns */}
          <nav className="flex flex-wrap gap-10 md:gap-12">
            {nav.footer.map((category) => (
              <div key={category.label}>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">
                  {category.label}
                </p>
                <ul className="space-y-2">
                  {category.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={`${prefix}${link.href}`}
                        className="py-1.5 inline-block text-sm text-slate-500 dark:text-slate-400 hover:text-primary-500 transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="pt-6 border-t border-slate-200/60 dark:border-slate-700/60 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <span>&copy; {new Date().getFullYear()} PickPlay</span>
          <span>
            Made by{" "}
            <a
              href="https://github.com/pick-play"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-primary-500 transition-colors"
            >
              pick-play
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
