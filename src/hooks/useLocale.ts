"use client";

import { usePathname } from "next/navigation";
import { getLocaleFromPath, type Locale } from "@/i18n/config";

export function useLocale(): Locale {
  const pathname = usePathname();
  return getLocaleFromPath(pathname);
}
