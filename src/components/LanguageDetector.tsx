"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const langMap: Record<string, string> = {
  en: "/en",
  ja: "/jp",
  zh: "/cn",
  "zh-CN": "/cn",
  "zh-TW": "/cn",
  es: "/es",
};

export default function LanguageDetector() {
  const pathname = usePathname();

  useEffect(() => {
    // Only redirect from Korean (root) pages
    const isLocaleRoute = /^\/(en|jp|cn|es)(\/|$)/.test(pathname);
    if (isLocaleRoute) return;

    // Check saved preference
    const saved = localStorage.getItem("pickplay-locale");
    if (saved === "ko") return;
    if (saved && langMap[saved]) {
      const dest = langMap[saved] + (pathname === "/" ? "" : pathname);
      window.location.replace(dest);
      return;
    }

    // Auto-detect from browser language
    const browserLang = navigator.language || "";
    const primary = browserLang.split("-")[0];

    // Korean users stay on Korean pages
    if (primary === "ko") {
      localStorage.setItem("pickplay-locale", "ko");
      return;
    }

    // Check if we support this language
    const target = langMap[browserLang] || langMap[primary];
    if (target) {
      localStorage.setItem("pickplay-locale", primary);
      const dest = pathname === "/" ? target : target + pathname;
      window.location.replace(dest);
    }
  }, [pathname]);

  return null;
}
