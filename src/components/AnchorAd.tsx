"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    adsbygoogle: Record<string, unknown>[];
  }
}

export default function AnchorAd() {
  const pushed = useRef(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // AdSense not loaded yet — ok in dev
    }
  }, []);

  if (dismissed) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
      <div className="relative bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-t border-slate-200 dark:border-slate-700 shadow-[0_-2px_10px_rgba(0,0,0,0.08)]">
        {/* Close button */}
        <button
          onClick={() => setDismissed(true)}
          className="absolute -top-8 right-2 w-7 h-7 flex items-center justify-center rounded-t-lg bg-white/90 dark:bg-slate-800/90 border border-b-0 border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-600 transition-colors"
          aria-label="Close ad"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="px-2 py-1.5">
          <ins
            className="adsbygoogle"
            style={{ display: "block", width: "100%", minHeight: "50px", maxHeight: "60px" }}
            data-ad-client="ca-pub-7766090864059500"
            data-ad-slot="5119492203"
            data-ad-format="horizontal"
            data-full-width-responsive="true"
          />
        </div>
      </div>
    </div>
  );
}
