"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface Tool {
  title: string;
  description: string;
  href: string;
  emoji: string;
  category?: string;
}

interface ToolSearchBarProps {
  tools: Tool[];
  placeholder?: string;
}

const CATEGORIES = ["전체", "생활 도구", "파티 게임", "테스트"] as const;
type Category = (typeof CATEGORIES)[number];

function SearchIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"
      />
    </svg>
  );
}

function ClearIcon() {
  return (
    <svg
      className="w-3.5 h-3.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export default function ToolSearchBar({
  tools,
  placeholder = "도구 검색...",
}: ToolSearchBarProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("전체");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const trimmed = query.trim().toLowerCase();

  const filtered = tools.filter((tool) => {
    const matchesCategory =
      activeCategory === "전체" || tool.category === activeCategory;
    const matchesQuery =
      trimmed === "" ||
      tool.title.toLowerCase().includes(trimmed) ||
      tool.description.toLowerCase().includes(trimmed);
    return matchesCategory && matchesQuery;
  });

  const showDropdown = isFocused && trimmed !== "";

  // Close dropdown on outside click
  useEffect(() => {
    function handlePointerDown(e: PointerEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  return (
    <div ref={containerRef} className="w-full max-w-xl mx-auto">
      {/* Search input */}
      <div
        className={`
          flex items-center gap-2 px-4 py-3
          bg-white dark:bg-slate-800
          border-2 rounded-2xl
          transition-colors duration-150
          ${
            isFocused
              ? "border-primary-500 dark:border-primary-400"
              : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
          }
          shadow-sm
        `}
      >
        <span className="text-slate-400 dark:text-slate-500 shrink-0">
          <SearchIcon />
        </span>
        <input
          ref={inputRef}
          type="text"
          value={query}
          placeholder={placeholder}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          className="
            flex-1 bg-transparent outline-none
            text-sm text-slate-700 dark:text-slate-200
            placeholder:text-slate-400 dark:placeholder:text-slate-500
          "
        />
        <AnimatePresence>
          {query && (
            <motion.button
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.12 }}
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              className="
                shrink-0 p-0.5 rounded-full
                text-slate-400 dark:text-slate-500
                hover:text-slate-600 dark:hover:text-slate-300
                hover:bg-slate-100 dark:hover:bg-slate-700
                transition-colors
              "
              aria-label="검색어 지우기"
            >
              <ClearIcon />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2 mt-3">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`
              px-3 py-1 rounded-full text-xs font-semibold
              transition-colors duration-150
              ${
                activeCategory === cat
                  ? "bg-primary-500 text-white shadow-sm"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-700 dark:hover:text-slate-200"
              }
            `}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results dropdown */}
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="
              mt-2 rounded-2xl
              bg-white dark:bg-slate-800
              border border-slate-200 dark:border-slate-700
              shadow-lg overflow-hidden
            "
          >
            {filtered.length > 0 ? (
              <ul className="max-h-72 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-700/60">
                {filtered.map((tool) => (
                  <li key={tool.href}>
                    <Link
                      href={tool.href}
                      onClick={() => {
                        setQuery("");
                        setIsFocused(false);
                      }}
                      className="
                        flex items-center gap-3 px-4 py-3
                        text-sm
                        hover:bg-slate-50 dark:hover:bg-slate-700/50
                        transition-colors duration-100
                      "
                    >
                      <span className="text-xl leading-none shrink-0">{tool.emoji}</span>
                      <div className="min-w-0">
                        <p className="font-semibold text-slate-700 dark:text-slate-200 truncate">
                          {tool.title}
                        </p>
                        <p className="text-xs text-slate-400 dark:text-slate-500 truncate">
                          {tool.description}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-4 py-6 text-center">
                <p className="text-sm text-slate-400 dark:text-slate-500">
                  검색 결과가 없습니다
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
