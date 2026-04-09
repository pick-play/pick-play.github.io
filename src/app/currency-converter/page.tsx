"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import AdBanner from "@/components/AdBanner";
import { useLocale } from "@/hooks/useLocale";
import type { Locale } from "@/i18n/config";

const CURRENCIES = [
  { code: "USD", flag: "🇺🇸" },
  { code: "EUR", flag: "🇪🇺" },
  { code: "KRW", flag: "🇰🇷" },
  { code: "JPY", flag: "🇯🇵" },
  { code: "CNY", flag: "🇨🇳" },
  { code: "GBP", flag: "🇬🇧" },
  { code: "CHF", flag: "🇨🇭" },
  { code: "CAD", flag: "🇨🇦" },
  { code: "AUD", flag: "🇦🇺" },
  { code: "NZD", flag: "🇳🇿" },
  { code: "SGD", flag: "🇸🇬" },
  { code: "HKD", flag: "🇭🇰" },
  { code: "TWD", flag: "🇹🇼" },
  { code: "THB", flag: "🇹🇭" },
  { code: "VND", flag: "🇻🇳" },
  { code: "PHP", flag: "🇵🇭" },
  { code: "IDR", flag: "🇮🇩" },
  { code: "MYR", flag: "🇲🇾" },
  { code: "INR", flag: "🇮🇳" },
  { code: "BRL", flag: "🇧🇷" },
] as const;

type CurrencyCode = (typeof CURRENCIES)[number]["code"];

const POPULAR_PAIRS: { from: CurrencyCode; to: CurrencyCode }[] = [
  { from: "USD", to: "KRW" },
  { from: "JPY", to: "KRW" },
  { from: "EUR", to: "KRW" },
  { from: "CNY", to: "KRW" },
];

const translations: Record<
  Locale,
  {
    title: string;
    subtitle: string;
    amount: string;
    from: string;
    to: string;
    swap: string;
    result: string;
    rate: string;
    inverseRate: string;
    lastUpdated: string;
    popularConversions: string;
    loading: string;
    errorMsg: string;
    currencyNames: Record<CurrencyCode, string>;
  }
> = {
  ko: {
    title: "환율 계산기",
    subtitle: "실시간 환율로 즉시 변환",
    amount: "금액",
    from: "변환 전",
    to: "변환 후",
    swap: "통화 교체",
    result: "변환 결과",
    rate: "환율",
    inverseRate: "역환율",
    lastUpdated: "최종 업데이트",
    popularConversions: "인기 환율 변환",
    loading: "환율 불러오는 중...",
    errorMsg: "환율 정보를 불러올 수 없습니다. 잠시 후 다시 시도해주세요.",
    currencyNames: {
      USD: "미국 달러",
      EUR: "유로",
      KRW: "한국 원",
      JPY: "일본 엔",
      CNY: "중국 위안",
      GBP: "영국 파운드",
      CHF: "스위스 프랑",
      CAD: "캐나다 달러",
      AUD: "호주 달러",
      NZD: "뉴질랜드 달러",
      SGD: "싱가포르 달러",
      HKD: "홍콩 달러",
      TWD: "대만 달러",
      THB: "태국 바트",
      VND: "베트남 동",
      PHP: "필리핀 페소",
      IDR: "인도네시아 루피아",
      MYR: "말레이시아 링깃",
      INR: "인도 루피",
      BRL: "브라질 레알",
    },
  },
  en: {
    title: "Currency Converter",
    subtitle: "Instant conversion with live exchange rates",
    amount: "Amount",
    from: "From",
    to: "To",
    swap: "Swap currencies",
    result: "Converted Amount",
    rate: "Exchange Rate",
    inverseRate: "Inverse Rate",
    lastUpdated: "Last Updated",
    popularConversions: "Popular Conversions",
    loading: "Loading exchange rates...",
    errorMsg: "Unable to load exchange rates. Please try again later.",
    currencyNames: {
      USD: "US Dollar",
      EUR: "Euro",
      KRW: "Korean Won",
      JPY: "Japanese Yen",
      CNY: "Chinese Yuan",
      GBP: "British Pound",
      CHF: "Swiss Franc",
      CAD: "Canadian Dollar",
      AUD: "Australian Dollar",
      NZD: "New Zealand Dollar",
      SGD: "Singapore Dollar",
      HKD: "Hong Kong Dollar",
      TWD: "Taiwan Dollar",
      THB: "Thai Baht",
      VND: "Vietnamese Dong",
      PHP: "Philippine Peso",
      IDR: "Indonesian Rupiah",
      MYR: "Malaysian Ringgit",
      INR: "Indian Rupee",
      BRL: "Brazilian Real",
    },
  },
  ja: {
    title: "為替計算機",
    subtitle: "リアルタイムレートで即時換算",
    amount: "金額",
    from: "変換元",
    to: "変換先",
    swap: "通貨を入れ替え",
    result: "換算結果",
    rate: "為替レート",
    inverseRate: "逆レート",
    lastUpdated: "最終更新",
    popularConversions: "人気の換算",
    loading: "為替レートを読み込み中...",
    errorMsg: "為替レートを読み込めませんでした。しばらくしてからもう一度お試しください。",
    currencyNames: {
      USD: "米ドル",
      EUR: "ユーロ",
      KRW: "韓国ウォン",
      JPY: "日本円",
      CNY: "中国人民元",
      GBP: "英国ポンド",
      CHF: "スイスフラン",
      CAD: "カナダドル",
      AUD: "オーストラリアドル",
      NZD: "ニュージーランドドル",
      SGD: "シンガポールドル",
      HKD: "香港ドル",
      TWD: "台湾ドル",
      THB: "タイバーツ",
      VND: "ベトナムドン",
      PHP: "フィリピンペソ",
      IDR: "インドネシアルピア",
      MYR: "マレーシアリンギット",
      INR: "インドルピー",
      BRL: "ブラジルレアル",
    },
  },
  zh: {
    title: "汇率计算器",
    subtitle: "实时汇率即时换算",
    amount: "金额",
    from: "从",
    to: "到",
    swap: "互换货币",
    result: "换算结果",
    rate: "汇率",
    inverseRate: "反向汇率",
    lastUpdated: "最后更新",
    popularConversions: "热门换算",
    loading: "正在加载汇率...",
    errorMsg: "无法加载汇率信息，请稍后再试。",
    currencyNames: {
      USD: "美元",
      EUR: "欧元",
      KRW: "韩元",
      JPY: "日元",
      CNY: "人民币",
      GBP: "英镑",
      CHF: "瑞士法郎",
      CAD: "加拿大元",
      AUD: "澳大利亚元",
      NZD: "新西兰元",
      SGD: "新加坡元",
      HKD: "港元",
      TWD: "台湾元",
      THB: "泰铢",
      VND: "越南盾",
      PHP: "菲律宾比索",
      IDR: "印度尼西亚盾",
      MYR: "马来西亚林吉特",
      INR: "印度卢比",
      BRL: "巴西雷亚尔",
    },
  },
  es: {
    title: "Conversor de Divisas",
    subtitle: "Conversión instantánea con tasas en tiempo real",
    amount: "Cantidad",
    from: "De",
    to: "A",
    swap: "Intercambiar divisas",
    result: "Resultado",
    rate: "Tipo de cambio",
    inverseRate: "Tipo inverso",
    lastUpdated: "Última actualización",
    popularConversions: "Conversiones populares",
    loading: "Cargando tipos de cambio...",
    errorMsg: "No se pueden cargar los tipos de cambio. Inténtalo de nuevo más tarde.",
    currencyNames: {
      USD: "Dólar estadounidense",
      EUR: "Euro",
      KRW: "Won surcoreano",
      JPY: "Yen japonés",
      CNY: "Yuan chino",
      GBP: "Libra esterlina",
      CHF: "Franco suizo",
      CAD: "Dólar canadiense",
      AUD: "Dólar australiano",
      NZD: "Dólar neozelandés",
      SGD: "Dólar de Singapur",
      HKD: "Dólar de Hong Kong",
      TWD: "Dólar taiwanés",
      THB: "Baht tailandés",
      VND: "Dong vietnamita",
      PHP: "Peso filipino",
      IDR: "Rupia indonesia",
      MYR: "Ringgit malayo",
      INR: "Rupia india",
      BRL: "Real brasileño",
    },
  },
};

function formatAmount(value: number, currency: CurrencyCode): string {
  const noDecimals = ["KRW", "JPY", "VND", "IDR", "TWD"];
  const digits = noDecimals.includes(currency) ? 0 : 2;
  return value.toLocaleString(undefined, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

function formatRate(rate: number): string {
  if (rate >= 100) return rate.toLocaleString(undefined, { maximumFractionDigits: 2 });
  if (rate >= 1) return rate.toLocaleString(undefined, { maximumFractionDigits: 4 });
  return rate.toLocaleString(undefined, { maximumFractionDigits: 6 });
}

export default function CurrencyConverterPage() {
  const locale = useLocale();
  const t = translations[locale] ?? translations.ko;

  const [rates, setRates] = useState<Record<string, number> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  const [amount, setAmount] = useState<string>("1");
  const [fromCurrency, setFromCurrency] = useState<CurrencyCode>("USD");
  const [toCurrency, setToCurrency] = useState<CurrencyCode>("KRW");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(false);
    fetch("https://open.er-api.com/v6/latest/USD")
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        if (data?.rates) {
          setRates(data.rates);
          const ts = data.time_last_update_utc
            ? new Date(data.time_last_update_utc).toLocaleString()
            : new Date().toLocaleString();
          setLastUpdated(ts);
        } else {
          setError(true);
        }
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const convert = useCallback(
    (amt: number, from: CurrencyCode, to: CurrencyCode): number | null => {
      if (!rates) return null;
      const fromRate = rates[from];
      const toRate = rates[to];
      if (!fromRate || !toRate) return null;
      // rates are relative to USD
      return (amt / fromRate) * toRate;
    },
    [rates]
  );

  const numAmount = parseFloat(amount) || 0;
  const converted = convert(numAmount, fromCurrency, toCurrency);
  const exchangeRate = convert(1, fromCurrency, toCurrency);
  const inverseRate = exchangeRate ? 1 / exchangeRate : null;

  function handleSwap() {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  }

  function handlePopular(from: CurrencyCode, to: CurrencyCode) {
    setFromCurrency(from);
    setToCurrency(to);
    setAmount("1");
  }

  const selectClass =
    "w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-100 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-400 appearance-none cursor-pointer";

  const flagMap = Object.fromEntries(CURRENCIES.map((c) => [c.code, c.flag])) as Record<
    CurrencyCode,
    string
  >;

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-emerald-50/20 dark:from-slate-950 dark:via-teal-950/20 dark:to-emerald-950/10">
        <div className="max-w-lg mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-500 text-white text-2xl mb-3 shadow-md">
              💱
            </div>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-1">
              {t.title}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">{t.subtitle}</p>
          </div>

          <AdBanner format="horizontal" className="my-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2" />

          {/* Main Card */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 mt-4 mb-4">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-10 gap-3">
                <div className="w-8 h-8 border-4 border-teal-400 border-t-transparent rounded-full animate-spin" />
                <p className="text-slate-500 dark:text-slate-400 text-sm">{t.loading}</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-10 gap-3">
                <span className="text-4xl">⚠️</span>
                <p className="text-slate-500 dark:text-slate-400 text-sm text-center">{t.errorMsg}</p>
              </div>
            ) : (
              <>
                {/* Amount */}
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5">
                    {t.amount}
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-100 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-teal-400"
                    placeholder="0"
                  />
                </div>

                {/* From / Swap / To */}
                <div className="flex items-end gap-2 mb-5">
                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5">
                      {t.from}
                    </label>
                    <select
                      value={fromCurrency}
                      onChange={(e) => setFromCurrency(e.target.value as CurrencyCode)}
                      className={selectClass}
                      aria-label={t.from}
                    >
                      {CURRENCIES.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.flag} {c.code} — {t.currencyNames[c.code]}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={handleSwap}
                    aria-label={t.swap}
                    className="flex-shrink-0 w-10 h-10 mb-0.5 flex items-center justify-center rounded-xl bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 hover:bg-teal-100 dark:hover:bg-teal-900/50 transition-colors text-lg font-bold"
                  >
                    ↔
                  </button>

                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5">
                      {t.to}
                    </label>
                    <select
                      value={toCurrency}
                      onChange={(e) => setToCurrency(e.target.value as CurrencyCode)}
                      className={selectClass}
                      aria-label={t.to}
                    >
                      {CURRENCIES.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.flag} {c.code} — {t.currencyNames[c.code]}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Result */}
                <AnimatePresence mode="wait">
                  {converted !== null && (
                    <motion.div
                      key={`${fromCurrency}-${toCurrency}-${amount}`}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.2 }}
                      className="bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-900/20 dark:to-emerald-900/20 rounded-xl p-4 mb-4"
                    >
                      <p className="text-xs font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wide mb-1">
                        {t.result}
                      </p>
                      <p className="text-4xl font-bold text-teal-700 dark:text-teal-300 tracking-tight">
                        {flagMap[toCurrency]} {formatAmount(converted, toCurrency)}{" "}
                        <span className="text-2xl">{toCurrency}</span>
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Rate info */}
                {exchangeRate !== null && inverseRate !== null && (
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3">
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-0.5">{t.rate}</p>
                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                        1 {fromCurrency} = {formatRate(exchangeRate)} {toCurrency}
                      </p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3">
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-0.5">{t.inverseRate}</p>
                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                        1 {toCurrency} = {formatRate(inverseRate)} {fromCurrency}
                      </p>
                    </div>
                  </div>
                )}

                {/* Last updated */}
                {lastUpdated && (
                  <p className="text-xs text-slate-400 dark:text-slate-500 text-right">
                    {t.lastUpdated}: {lastUpdated}
                  </p>
                )}
              </>
            )}
          </div>

          <AdBanner format="in-article" className="my-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2" />

          {/* Popular conversions */}
          {!loading && !error && (
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 mt-4 mb-4">
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
                {t.popularConversions}
              </p>
              <div className="grid grid-cols-2 gap-2">
                {POPULAR_PAIRS.map((pair) => {
                  const rate = convert(1, pair.from, pair.to);
                  return (
                    <button
                      key={`${pair.from}-${pair.to}`}
                      onClick={() => handlePopular(pair.from, pair.to)}
                      className={`flex flex-col items-start p-3 rounded-xl border transition-all text-left ${
                        fromCurrency === pair.from && toCurrency === pair.to
                          ? "border-teal-400 bg-teal-50 dark:bg-teal-900/20"
                          : "border-slate-200 dark:border-slate-700 hover:border-teal-300 hover:bg-teal-50/50 dark:hover:bg-teal-900/10"
                      }`}
                    >
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                        {flagMap[pair.from]} {pair.from} → {flagMap[pair.to]} {pair.to}
                      </span>
                      {rate !== null && (
                        <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          1 {pair.from} = {formatRate(rate)} {pair.to}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <AdBanner format="rectangle" className="my-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2" />
        </div>
      </div>
    </PageTransition>
  );
}
