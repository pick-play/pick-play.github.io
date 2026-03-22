"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getLocaleFromPath, htmlLangs } from "@/i18n/config";

export default function HtmlLangSetter() {
  const pathname = usePathname();

  useEffect(() => {
    const locale = getLocaleFromPath(pathname);
    const lang = htmlLangs[locale];
    if (document.documentElement.lang !== lang) {
      document.documentElement.lang = lang;
    }
  }, [pathname]);

  return null;
}
