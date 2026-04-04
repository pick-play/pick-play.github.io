"use client";

import { useEffect, useRef } from "react";

type AdFormat = "horizontal" | "rectangle" | "in-article";

const formatStyles: Record<AdFormat, { minHeight: string; className: string }> = {
  horizontal: {
    minHeight: "250px",
    className: "w-full",
  },
  rectangle: {
    minHeight: "280px",
    className: "w-full max-w-[336px] mx-auto",
  },
  "in-article": {
    minHeight: "280px",
    className: "w-full",
  },
};

declare global {
  interface Window {
    adsbygoogle: Record<string, unknown>[];
  }
}

export default function AdBanner({
  format = "horizontal",
  className = "",
}: {
  format?: AdFormat;
  className?: string;
}) {
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    if (adRef.current?.dataset.adsbygoogleStatus) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // AdSense not loaded yet — ok in dev
    }
  }, []);

  const style = formatStyles[format];

  return (
    <div
      className={`flex items-center justify-center overflow-hidden ${style.className} ${className}`}
      style={{ minHeight: style.minHeight }}
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block", width: "100%" }}
        data-ad-client="ca-pub-7766090864059500"
        data-ad-slot={format === "horizontal" ? "1539339846" : format === "rectangle" ? "2852421514" : "4598815705"}
        data-ad-format={format === "in-article" ? "fluid" : "auto"}
        {...(format === "in-article" ? { "data-ad-layout": "in-article" } : {})}
        data-full-width-responsive="true"
      />
    </div>
  );
}
