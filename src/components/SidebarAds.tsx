"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle: Record<string, unknown>[];
  }
}

export default function SidebarAds({ side }: { side: "left" | "right" }) {
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // AdSense not loaded yet — ok in dev
    }
  }, []);

  return (
    <aside
      className="hidden xl:flex flex-col items-center pt-8 w-[160px] shrink-0"
      aria-hidden="true"
    >
      <div className="sticky top-24 w-[160px]">
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: "block", width: "160px", minHeight: "600px" }}
          data-ad-client="ca-pub-7766090864059500"
          data-ad-slot="auto"
          data-ad-format="auto"
          data-full-width-responsive="false"
        />
      </div>
    </aside>
  );
}
