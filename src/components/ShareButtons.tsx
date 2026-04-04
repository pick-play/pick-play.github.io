"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ShareButtonsProps {
  url?: string;
  title?: string;
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState(url ?? "");
  const [shareTitle, setShareTitle] = useState(title ?? "");

  useEffect(() => {
    if (!url) setShareUrl(window.location.href);
    if (!title) setShareTitle(document.title);
  }, [url, title]);

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: shareTitle, url: shareUrl });
      } catch {
        // user cancelled or error — fall through to expand menu
        setIsOpen((o) => !o);
      }
      return;
    }
    setIsOpen((o) => !o);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(shareTitle);

  const buttons = [
    {
      key: "copy",
      label: copied ? "복사 완료!" : "링크 복사",
      onClick: handleCopy,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          {copied ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-4 10h6a2 2 0 002-2v-8a2 2 0 00-2-2h-6a2 2 0 00-2 2v8a2 2 0 002 2z" />
          )}
        </svg>
      ),
      href: null,
      bg: "bg-slate-600 hover:bg-slate-700",
    },
    {
      key: "twitter",
      label: "Twitter/X",
      onClick: null,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      bg: "bg-black hover:bg-gray-800",
    },
    {
      key: "facebook",
      label: "Facebook",
      onClick: null,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      bg: "bg-blue-600 hover:bg-blue-700",
    },
    {
      key: "kakao",
      label: "KakaoTalk",
      onClick: null,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3C6.48 3 2 6.69 2 11.25c0 2.91 1.81 5.47 4.55 6.96l-1.16 4.29 4.99-3.3c.52.07 1.06.11 1.62.11 5.52 0 10-3.69 10-8.25S17.52 3 12 3z" />
        </svg>
      ),
      href: `https://story.kakao.com/share?url=${encodedUrl}`,
      bg: "bg-yellow-400 hover:bg-yellow-500 text-slate-900",
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col-reverse items-end gap-2">
      <AnimatePresence>
        {isOpen &&
          buttons.map((btn, i) => (
            <motion.div
              key={btn.key}
              initial={{ opacity: 0, y: 12, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.85 }}
              transition={{ duration: 0.18, delay: i * 0.04 }}
              className="flex items-center gap-2"
            >
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 shadow whitespace-nowrap">
                {btn.label}
              </span>
              {btn.href ? (
                <a
                  href={btn.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg transition-colors ${btn.bg}`}
                  aria-label={btn.label}
                >
                  {btn.icon}
                </a>
              ) : (
                <button
                  onClick={btn.onClick ? () => void btn.onClick!() : undefined}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg transition-colors ${btn.bg}`}
                  aria-label={btn.label}
                >
                  {btn.icon}
                </button>
              )}
            </motion.div>
          ))}
      </AnimatePresence>

      {/* Main share button */}
      <motion.button
        onClick={() => void handleNativeShare()}
        whileTap={{ scale: 0.92 }}
        className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-xl flex items-center justify-center hover:from-primary-400 hover:to-primary-600 transition-all"
        aria-label="공유하기"
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </motion.svg>
      </motion.button>
    </div>
  );
}
