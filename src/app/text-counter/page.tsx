"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import AdBanner from "@/components/AdBanner";
import { useLocale } from "@/hooks/useLocale";
import type { Locale } from "@/i18n/config";

const translations: Record<
  Locale,
  {
    title: string;
    subtitle: string;
    placeholder: string;
    clearBtn: string;
    copyBtn: string;
    copiedBtn: string;
    statsTitle: string;
    totalChars: string;
    charsNoSpace: string;
    words: string;
    sentences: string;
    paragraphs: string;
    bytes: string;
    keywordTitle: string;
    noKeywords: string;
    readingTimeTitle: string;
    readingTimeSec: (s: number) => string;
    readingTimeMin: (m: number, s: number) => string;
    rank: string;
    word: string;
    count: string;
    density: string;
  }
> = {
  ko: {
    title: "글자수 세기",
    subtitle: "실시간 문자 수 카운터",
    placeholder: "여기에 텍스트를 입력하세요...",
    clearBtn: "지우기",
    copyBtn: "복사",
    copiedBtn: "복사됨!",
    statsTitle: "통계",
    totalChars: "글자수 (공백 포함)",
    charsNoSpace: "글자수 (공백 제외)",
    words: "단어 수",
    sentences: "문장 수",
    paragraphs: "문단 수",
    bytes: "바이트 (UTF-8)",
    keywordTitle: "키워드 밀도 (상위 5개)",
    noKeywords: "텍스트를 입력하면 키워드가 표시됩니다.",
    readingTimeTitle: "읽기 시간 예상",
    readingTimeSec: (s) => `약 ${s}초`,
    readingTimeMin: (m, s) => `약 ${m}분 ${s}초`,
    rank: "순위",
    word: "단어",
    count: "횟수",
    density: "밀도",
  },
  en: {
    title: "Text Counter",
    subtitle: "Real-time character & word counter",
    placeholder: "Type or paste your text here...",
    clearBtn: "Clear",
    copyBtn: "Copy",
    copiedBtn: "Copied!",
    statsTitle: "Statistics",
    totalChars: "Characters (with spaces)",
    charsNoSpace: "Characters (no spaces)",
    words: "Words",
    sentences: "Sentences",
    paragraphs: "Paragraphs",
    bytes: "Bytes (UTF-8)",
    keywordTitle: "Keyword Density (Top 5)",
    noKeywords: "Enter text to see keyword density.",
    readingTimeTitle: "Estimated Reading Time",
    readingTimeSec: (s) => `~${s} sec`,
    readingTimeMin: (m, s) => `~${m} min ${s} sec`,
    rank: "Rank",
    word: "Word",
    count: "Count",
    density: "Density",
  },
  ja: {
    title: "文字数カウント",
    subtitle: "リアルタイム文字・単語カウンター",
    placeholder: "ここにテキストを入力してください...",
    clearBtn: "クリア",
    copyBtn: "コピー",
    copiedBtn: "コピー済み!",
    statsTitle: "統計",
    totalChars: "文字数（スペース含む）",
    charsNoSpace: "文字数（スペース除く）",
    words: "単語数",
    sentences: "文数",
    paragraphs: "段落数",
    bytes: "バイト数（UTF-8）",
    keywordTitle: "キーワード密度（上位5件）",
    noKeywords: "テキストを入力するとキーワードが表示されます。",
    readingTimeTitle: "読了時間の目安",
    readingTimeSec: (s) => `約${s}秒`,
    readingTimeMin: (m, s) => `約${m}分${s}秒`,
    rank: "順位",
    word: "単語",
    count: "回数",
    density: "密度",
  },
  zh: {
    title: "字数统计",
    subtitle: "实时字符与单词计数器",
    placeholder: "请在此输入文字...",
    clearBtn: "清空",
    copyBtn: "复制",
    copiedBtn: "已复制!",
    statsTitle: "统计信息",
    totalChars: "字符数（含空格）",
    charsNoSpace: "字符数（不含空格）",
    words: "单词数",
    sentences: "句子数",
    paragraphs: "段落数",
    bytes: "字节数（UTF-8）",
    keywordTitle: "关键词密度（前5名）",
    noKeywords: "输入文字后将显示关键词密度。",
    readingTimeTitle: "预计阅读时间",
    readingTimeSec: (s) => `约${s}秒`,
    readingTimeMin: (m, s) => `约${m}分${s}秒`,
    rank: "排名",
    word: "词语",
    count: "次数",
    density: "密度",
  },
  es: {
    title: "Contador de Texto",
    subtitle: "Contador de caracteres y palabras en tiempo real",
    placeholder: "Escribe o pega tu texto aquí...",
    clearBtn: "Limpiar",
    copyBtn: "Copiar",
    copiedBtn: "¡Copiado!",
    statsTitle: "Estadísticas",
    totalChars: "Caracteres (con espacios)",
    charsNoSpace: "Caracteres (sin espacios)",
    words: "Palabras",
    sentences: "Oraciones",
    paragraphs: "Párrafos",
    bytes: "Bytes (UTF-8)",
    keywordTitle: "Densidad de palabras clave (Top 5)",
    noKeywords: "Ingresa texto para ver la densidad de palabras clave.",
    readingTimeTitle: "Tiempo estimado de lectura",
    readingTimeSec: (s) => `~${s} seg`,
    readingTimeMin: (m, s) => `~${m} min ${s} seg`,
    rank: "Pos.",
    word: "Palabra",
    count: "Veces",
    density: "Densidad",
  },
};

function getByteLength(str: string): number {
  return new TextEncoder().encode(str).length;
}

function countWords(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}

function countSentences(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  const matches = trimmed.match(/[^.!?…]*[.!?…]+/g);
  return matches ? matches.length : 1;
}

function countParagraphs(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\n\s*\n+/).filter((p) => p.trim().length > 0).length || 1;
}

function getKeywordDensity(text: string): { word: string; count: number; density: number }[] {
  const trimmed = text.trim();
  if (!trimmed) return [];
  const words = trimmed
    .toLowerCase()
    .replace(/[^가-힣a-zA-Z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1);
  if (words.length === 0) return [];
  const freq: Record<string, number> = {};
  for (const w of words) {
    freq[w] = (freq[w] ?? 0) + 1;
  }
  const total = words.length;
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([word, count]) => ({
      word,
      count,
      density: Math.round((count / total) * 1000) / 10,
    }));
}

function getReadingTime(
  text: string,
  locale: Locale
): { minutes: number; seconds: number } {
  const wpm = locale === "ko" || locale === "ja" || locale === "zh" ? 200 : 250;
  const wordCount = countWords(text);
  const totalSeconds = Math.round((wordCount / wpm) * 60);
  return {
    minutes: Math.floor(totalSeconds / 60),
    seconds: totalSeconds % 60,
  };
}

export default function TextCounterPage() {
  const locale = useLocale() as Locale;
  const t = translations[locale] ?? translations.ko;

  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => {
    return {
      totalChars: text.length,
      charsNoSpace: text.replace(/\s/g, "").length,
      words: countWords(text),
      sentences: countSentences(text),
      paragraphs: countParagraphs(text),
      bytes: getByteLength(text),
    };
  }, [text]);

  const keywords = useMemo(() => getKeywordDensity(text), [text]);
  const readingTime = useMemo(() => getReadingTime(text, locale), [text, locale]);

  const readingTimeLabel = useMemo(() => {
    if (stats.words === 0) return "-";
    if (readingTime.minutes === 0) return t.readingTimeSec(readingTime.seconds);
    return t.readingTimeMin(readingTime.minutes, readingTime.seconds);
  }, [readingTime, stats.words, t]);

  const handleClear = () => {
    setText("");
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: silently fail
    }
  };

  const statCards = [
    { label: t.totalChars, value: stats.totalChars.toLocaleString() },
    { label: t.charsNoSpace, value: stats.charsNoSpace.toLocaleString() },
    { label: t.words, value: stats.words.toLocaleString() },
    { label: t.sentences, value: stats.sentences.toLocaleString() },
    { label: t.paragraphs, value: stats.paragraphs.toLocaleString() },
    { label: t.bytes, value: stats.bytes.toLocaleString() },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 dark:from-slate-950 dark:via-blue-950/20 dark:to-indigo-950/10">
        <div className="max-w-lg mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6 text-center"
          >
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="text-2xl">📝</span>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
                {t.title}
              </h1>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">{t.subtitle}</p>
          </motion.div>

          {/* Textarea */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden mb-4"
          >
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={t.placeholder}
              rows={8}
              className="w-full p-4 text-sm text-slate-800 dark:text-slate-100 bg-transparent resize-none focus:outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500 leading-relaxed"
            />
            <div className="flex items-center justify-between px-4 py-2 border-t border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60">
              <span className="text-xs text-slate-400 dark:text-slate-500">
                {stats.totalChars.toLocaleString()} chars
              </span>
              <div className="flex gap-2">
                <button
                  onClick={handleClear}
                  disabled={!text}
                  className="px-3 py-1 text-xs rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  {t.clearBtn}
                </button>
                <button
                  onClick={handleCopy}
                  disabled={!text}
                  className="px-3 py-1 text-xs rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  {copied ? t.copiedBtn : t.copyBtn}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Ad Banner */}
          <div className="mb-4">
            <AdBanner format="horizontal" />
          </div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mb-4"
          >
            <h2 className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-3 px-1">
              {t.statsTitle}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {statCards.map((card) => (
                <div
                  key={card.label}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 text-center"
                >
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 tabular-nums">
                    {card.value}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-tight">
                    {card.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Reading Time */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 mb-4 flex items-center justify-between"
          >
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
              {t.readingTimeTitle}
            </span>
            <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
              {readingTimeLabel}
            </span>
          </motion.div>

          {/* Keyword Density */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 mb-4"
          >
            <h2 className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-3">
              {t.keywordTitle}
            </h2>
            {keywords.length === 0 ? (
              <p className="text-xs text-slate-400 dark:text-slate-500 text-center py-2">
                {t.noKeywords}
              </p>
            ) : (
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-700">
                    <th className="text-left py-1 pr-2 font-medium w-8">{t.rank}</th>
                    <th className="text-left py-1 pr-2 font-medium">{t.word}</th>
                    <th className="text-right py-1 pr-2 font-medium">{t.count}</th>
                    <th className="text-right py-1 font-medium">{t.density}</th>
                  </tr>
                </thead>
                <tbody>
                  {keywords.map((kw, i) => (
                    <tr
                      key={kw.word}
                      className="border-b border-slate-50 dark:border-slate-700/60 last:border-0"
                    >
                      <td className="py-1.5 pr-2 text-slate-400 dark:text-slate-500">{i + 1}</td>
                      <td className="py-1.5 pr-2 font-medium text-slate-700 dark:text-slate-200">
                        {kw.word}
                      </td>
                      <td className="py-1.5 pr-2 text-right text-slate-600 dark:text-slate-300">
                        {kw.count}
                      </td>
                      <td className="py-1.5 text-right text-blue-600 dark:text-blue-400 font-medium">
                        {kw.density}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </motion.div>

          {/* Bottom Ad Banner */}
          <div className="mt-2">
            <AdBanner format="rectangle" />
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
