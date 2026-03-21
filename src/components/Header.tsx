"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";

const navCategories = [
  {
    label: "생활도구",
    links: [
      { href: "/food", label: "뭐 먹지" },
      { href: "/settlement", label: "정산" },
      { href: "/date-course", label: "데이트" },
      { href: "/roulette", label: "룰렛" },
    ],
  },
  {
    label: "파티게임",
    links: [
      { href: "/liar-game", label: "라이어" },
      { href: "/random-team", label: "조뽑기" },
      { href: "/balance-game", label: "밸런스" },
      { href: "/chosung-quiz", label: "초성" },
    ],
  },
  {
    label: "테스트",
    links: [
      { href: "/teto-egen", label: "테토에겐" },
      { href: "/mbti", label: "MBTI" },
    ],
  },
];

const mobileNavCategories = [
  {
    label: "생활 도구",
    links: [
      { href: "/food", label: "뭐 먹지?" },
      { href: "/settlement", label: "회식비 정산" },
      { href: "/date-course", label: "데이트 코스" },
      { href: "/roulette", label: "랜덤 룰렛" },
    ],
  },
  {
    label: "파티 게임",
    links: [
      { href: "/liar-game", label: "라이어 게임" },
      { href: "/random-team", label: "조 뽑기" },
      { href: "/balance-game", label: "밸런스 게임" },
      { href: "/chosung-quiz", label: "초성 퀴즈" },
    ],
  },
  {
    label: "심리 테스트",
    links: [
      { href: "/teto-egen", label: "테토 vs 에겐" },
      { href: "/mbti", label: "MBTI 검사" },
    ],
  },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-700">
      <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent shrink-0"
        >
          PickPlay
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navCategories.map((category, ci) => (
            <div key={category.label} className="flex items-center">
              {/* Category label */}
              <span className="px-2 text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 select-none">
                {category.label}
              </span>
              {/* Links */}
              {category.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-2.5 py-1 text-sm text-slate-600 dark:text-slate-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors font-medium whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
              {/* Separator between categories */}
              {ci < navCategories.length - 1 && (
                <div className="mx-2 h-4 w-px bg-slate-200 dark:bg-slate-700" />
              )}
            </div>
          ))}

          <div className="ml-3 pl-3 border-l border-slate-200 dark:border-slate-700">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-label="다크모드 토글"
            >
              {theme === "light" ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800"
            aria-label="다크모드 토글"
          >
            {theme === "light" ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800"
            aria-label="메뉴"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-5">
              {mobileNavCategories.map((category, ci) => (
                <div key={category.label}>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">
                    {category.label}
                  </p>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-0.5">
                    {category.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className="py-2 text-slate-600 dark:text-slate-300 hover:text-primary-500 font-medium text-sm"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                  {ci < mobileNavCategories.length - 1 && (
                    <div className="mt-4 h-px bg-slate-100 dark:bg-slate-800" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
