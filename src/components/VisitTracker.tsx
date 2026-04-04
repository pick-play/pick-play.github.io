"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function VisitTracker() {
  const pathname = usePathname();
  useEffect(() => {
    if (pathname === "/host") return; // Don't track admin page
    const key = "pickplay_visits";
    const data = JSON.parse(localStorage.getItem(key) || "{}");
    const today = new Date().toISOString().split("T")[0];

    if (!data[pathname]) data[pathname] = { total: 0, daily: {} };
    data[pathname].total += 1;
    data[pathname].daily[today] = (data[pathname].daily[today] || 0) + 1;

    // Track global
    if (!data._global) data._global = { total: 0, daily: {} };
    data._global.total += 1;
    data._global.daily[today] = (data._global.daily[today] || 0) + 1;

    localStorage.setItem(key, JSON.stringify(data));
  }, [pathname]);
  return null;
}
