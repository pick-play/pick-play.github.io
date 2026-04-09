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
    propertyTypeLabel: string;
    propertyTypes: { house: string; land: string; commercial: string };
    priceLabel: string;
    pricePlaceholder: string;
    priceUnit: string;
    homeCountLabel: string;
    homeCounts: { one: string; two: string; three: string };
    firstTimeBuyerLabel: string;
    firstTimeBuyerDesc: string;
    regulatedAreaLabel: string;
    regulatedAreaDesc: string;
    resultTitle: string;
    acquisitionTax: string;
    localEducationTax: string;
    specialRuralTax: string;
    totalTax: string;
    effectiveRate: string;
    comparisonTitle: string;
    disclaimer: string;
    won: string;
    inputRequired: string;
    firstTimeBuyerNote: string;
  }
> = {
  ko: {
    title: "취득세 계산기",
    subtitle: "부동산 취득세 자동 계산",
    propertyTypeLabel: "부동산 유형",
    propertyTypes: { house: "주택", land: "토지", commercial: "상가/오피스텔" },
    priceLabel: "취득 가액",
    pricePlaceholder: "예: 50000",
    priceUnit: "만원",
    homeCountLabel: "주택 보유 수 (취득 후)",
    homeCounts: { one: "1주택", two: "2주택", three: "3주택 이상" },
    firstTimeBuyerLabel: "생애최초 감면",
    firstTimeBuyerDesc: "생애 최초 주택 구입 (12억 이하)",
    regulatedAreaLabel: "조정대상지역",
    regulatedAreaDesc: "조정대상지역 내 주택",
    resultTitle: "세금 산출 내역",
    acquisitionTax: "취득세",
    localEducationTax: "지방교육세",
    specialRuralTax: "농어촌특별세",
    totalTax: "총 납부세액",
    effectiveRate: "실효세율",
    comparisonTitle: "가격대별 세금 비교",
    disclaimer:
      "실제 세금은 다를 수 있습니다. 참고용으로만 사용하세요.",
    won: "원",
    inputRequired: "취득 가액을 입력하세요.",
    firstTimeBuyerNote: "생애최초 감면 적용 (최대 200만원)",
  },
  en: {
    title: "Property Acquisition Tax Calculator",
    subtitle: "Korean Real Estate Transfer Tax",
    propertyTypeLabel: "Property Type",
    propertyTypes: { house: "House", land: "Land", commercial: "Commercial/Officetel" },
    priceLabel: "Purchase Price",
    pricePlaceholder: "e.g. 50000",
    priceUnit: "10k KRW",
    homeCountLabel: "Homes Owned After Purchase",
    homeCounts: { one: "1 Home", two: "2 Homes", three: "3+ Homes" },
    firstTimeBuyerLabel: "First-time Buyer Reduction",
    firstTimeBuyerDesc: "First home purchase (under 1.2B KRW)",
    regulatedAreaLabel: "Regulated Area",
    regulatedAreaDesc: "Property in regulated area",
    resultTitle: "Tax Breakdown",
    acquisitionTax: "Acquisition Tax",
    localEducationTax: "Local Education Tax",
    specialRuralTax: "Special Rural Tax",
    totalTax: "Total Tax",
    effectiveRate: "Effective Rate",
    comparisonTitle: "Tax by Price Range",
    disclaimer:
      "Actual taxes may differ. For reference only.",
    won: "KRW",
    inputRequired: "Please enter the purchase price.",
    firstTimeBuyerNote: "First-time buyer reduction applied (max 2M KRW)",
  },
  ja: {
    title: "不動産取得税計算機",
    subtitle: "韓国不動産取得税の自動計算",
    propertyTypeLabel: "不動産の種類",
    propertyTypes: { house: "住宅", land: "土地", commercial: "商業施設/オフィステル" },
    priceLabel: "取得価額",
    pricePlaceholder: "例: 50000",
    priceUnit: "万ウォン",
    homeCountLabel: "取得後の住宅保有数",
    homeCounts: { one: "1戸", two: "2戸", three: "3戸以上" },
    firstTimeBuyerLabel: "初回購入者控除",
    firstTimeBuyerDesc: "生涯初めての住宅購入（12億ウォン以下）",
    regulatedAreaLabel: "調整対象地域",
    regulatedAreaDesc: "調整対象地域内の住宅",
    resultTitle: "税金内訳",
    acquisitionTax: "取得税",
    localEducationTax: "地方教育税",
    specialRuralTax: "農漁村特別税",
    totalTax: "合計税額",
    effectiveRate: "実効税率",
    comparisonTitle: "価格帯別税金比較",
    disclaimer:
      "実際の税金は異なる場合があります。参考用としてのみご利用ください。",
    won: "ウォン",
    inputRequired: "取得価額を入力してください。",
    firstTimeBuyerNote: "初回購入者控除適用（最大200万ウォン）",
  },
  zh: {
    title: "房产取得税计算器",
    subtitle: "韩国房产取得税自动计算",
    propertyTypeLabel: "房产类型",
    propertyTypes: { house: "住宅", land: "土地", commercial: "商铺/写字楼" },
    priceLabel: "取得价格",
    pricePlaceholder: "例如：50000",
    priceUnit: "万韩元",
    homeCountLabel: "取得后持有套数",
    homeCounts: { one: "1套", two: "2套", three: "3套及以上" },
    firstTimeBuyerLabel: "首次购房减免",
    firstTimeBuyerDesc: "生平首次购房「12亿韩元以下」",
    regulatedAreaLabel: "调整对象地区",
    regulatedAreaDesc: "位于调整对象地区内的住宅",
    resultTitle: "税金明细",
    acquisitionTax: "取得税",
    localEducationTax: "地方教育税",
    specialRuralTax: "农渔村特别税",
    totalTax: "合计税额",
    effectiveRate: "实际税率",
    comparisonTitle: "各价格区间税金对比",
    disclaimer:
      "实际税金可能有所不同，仅供参考。",
    won: "韩元",
    inputRequired: "请输入取得价格。",
    firstTimeBuyerNote: "已适用首次购房减免「最高200万韩元」",
  },
  es: {
    title: "Calculadora de Impuesto de Adquisición",
    subtitle: "Impuesto de adquisición inmobiliaria en Corea",
    propertyTypeLabel: "Tipo de propiedad",
    propertyTypes: { house: "Vivienda", land: "Terreno", commercial: "Comercial/Officetel" },
    priceLabel: "Precio de compra",
    pricePlaceholder: "p. ej. 50000",
    priceUnit: "10k KRW",
    homeCountLabel: "Viviendas tras la compra",
    homeCounts: { one: "1 vivienda", two: "2 viviendas", three: "3+ viviendas" },
    firstTimeBuyerLabel: "Reducción primera compra",
    firstTimeBuyerDesc: "Primera compra de vivienda (menos de 1.200M KRW)",
    regulatedAreaLabel: "Área regulada",
    regulatedAreaDesc: "Propiedad en área regulada",
    resultTitle: "Desglose de impuestos",
    acquisitionTax: "Impuesto de adquisición",
    localEducationTax: "Impuesto educación local",
    specialRuralTax: "Impuesto especial rural",
    totalTax: "Total a pagar",
    effectiveRate: "Tasa efectiva",
    comparisonTitle: "Impuesto por rango de precio",
    disclaimer:
      "Los impuestos reales pueden variar. Úselo solo como referencia.",
    won: "KRW",
    inputRequired: "Por favor, ingrese el precio de compra.",
    firstTimeBuyerNote: "Reducción primera compra aplicada (máx. 2M KRW)",
  },
};

type PropertyType = "house" | "land" | "commercial";
type HomeCount = "one" | "two" | "three";

interface TaxResult {
  acquisitionTaxRate: number;
  acquisitionTax: number;
  localEducationTax: number;
  specialRuralTax: number;
  totalTax: number;
  effectiveRate: number;
  firstTimeBuyerReduction: number;
}

function calcAcquisitionTaxRate(
  priceMan: number,
  propertyType: PropertyType,
  homeCount: HomeCount,
  firstTimeBuyer: boolean,
  regulatedArea: boolean
): number {
  if (propertyType === "land" || propertyType === "commercial") {
    return 0.04;
  }
  // House
  if (homeCount === "three") {
    return 0.12;
  }
  if (homeCount === "two") {
    return regulatedArea ? 0.08 : calcHouseBaseRate(priceMan);
  }
  // 1주택 — base rate
  if (firstTimeBuyer) {
    return calcHouseBaseRate(priceMan);
  }
  return calcHouseBaseRate(priceMan);
}

function calcHouseBaseRate(priceMan: number): number {
  const price100m = priceMan / 10000; // 억 단위
  if (price100m <= 6) return 0.01;
  if (price100m <= 9) return 0.02;
  return 0.03;
}

function calcTax(
  priceMan: number,
  propertyType: PropertyType,
  homeCount: HomeCount,
  firstTimeBuyer: boolean,
  regulatedArea: boolean
): TaxResult {
  const priceWon = priceMan * 10000;
  const rate = calcAcquisitionTaxRate(priceMan, propertyType, homeCount, firstTimeBuyer, regulatedArea);
  let acquisitionTax = priceWon * rate;

  // 생애최초 감면: 1주택, 주택, 12억이하, 50% 감면, 최대 200만원
  let firstTimeBuyerReduction = 0;
  if (
    firstTimeBuyer &&
    propertyType === "house" &&
    homeCount === "one" &&
    priceMan <= 120000
  ) {
    const reduction = acquisitionTax * 0.5;
    firstTimeBuyerReduction = Math.min(reduction, 2000000);
    acquisitionTax = Math.max(0, acquisitionTax - firstTimeBuyerReduction);
  }

  // 지방교육세: 취득세의 10%
  const localEducationTax = acquisitionTax * 0.1;

  // 농어촌특별세:
  // - 주택 전용면적 85m² 초과, 또는 비주택: 취득세의 10%
  // - 주택 (85m² 이하): 비과세 → 단순화: 주택 2주택이상 or 비주택 시 0.2% 적용, 1주택 면제
  let specialRuralTax = 0;
  if (propertyType !== "house") {
    specialRuralTax = priceWon * 0.002;
  } else if (homeCount === "two" || homeCount === "three") {
    specialRuralTax = priceWon * 0.002;
  }
  // 1주택 주택 → 면적 85m² 기준 알 수 없으므로 면제로 처리

  const totalTax = acquisitionTax + localEducationTax + specialRuralTax;
  const effectiveRate = priceWon > 0 ? totalTax / priceWon : 0;

  return {
    acquisitionTaxRate: rate,
    acquisitionTax,
    localEducationTax,
    specialRuralTax,
    totalTax,
    effectiveRate,
    firstTimeBuyerReduction,
  };
}

function formatWon(amount: number): string {
  if (amount === 0) return "0원";
  if (amount >= 100000000) {
    const eok = Math.floor(amount / 100000000);
    const man = Math.floor((amount % 100000000) / 10000);
    if (man === 0) return `${eok.toLocaleString()}억원`;
    return `${eok.toLocaleString()}억 ${man.toLocaleString()}만원`;
  }
  if (amount >= 10000) {
    const man = Math.floor(amount / 10000);
    const rest = Math.floor(amount % 10000);
    if (rest === 0) return `${man.toLocaleString()}만원`;
    return `${man.toLocaleString()}만 ${rest.toLocaleString()}원`;
  }
  return `${Math.round(amount).toLocaleString()}원`;
}

const COMPARISON_PRICES = [10000, 30000, 50000, 70000, 100000];

export default function PropertyTaxPage() {
  const locale = useLocale() as Locale;
  const t = translations[locale] ?? translations.ko;

  const [propertyType, setPropertyType] = useState<PropertyType>("house");
  const [priceInput, setPriceInput] = useState<string>("");
  const [homeCount, setHomeCount] = useState<HomeCount>("one");
  const [firstTimeBuyer, setFirstTimeBuyer] = useState(false);
  const [regulatedArea, setRegulatedArea] = useState(false);

  const priceMan = parseFloat(priceInput) || 0;

  const result = useMemo<TaxResult | null>(() => {
    if (priceMan <= 0) return null;
    return calcTax(priceMan, propertyType, homeCount, firstTimeBuyer, regulatedArea);
  }, [priceMan, propertyType, homeCount, firstTimeBuyer, regulatedArea]);

  const comparisonData = useMemo(() => {
    return COMPARISON_PRICES.map((p) => ({
      price: p,
      tax: calcTax(p, propertyType, homeCount, firstTimeBuyer, regulatedArea),
    }));
  }, [propertyType, homeCount, firstTimeBuyer, regulatedArea]);

  const isHouse = propertyType === "house";

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50/30 to-blue-50/20 dark:from-slate-950 dark:via-sky-950/20 dark:to-blue-950/10">
        <div className="max-w-lg mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6 text-center"
          >
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="text-2xl">🏠</span>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-sky-500 to-blue-500 bg-clip-text text-transparent">
                {t.title}
              </h1>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">{t.subtitle}</p>
          </motion.div>

          {/* Top Ad */}
          <div className="mb-4">
            <AdBanner format="horizontal" />
          </div>

          {/* Property Type Selector */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-5 mb-4"
          >
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
              {t.propertyTypeLabel}
            </label>
            <div className="flex rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
              {(["house", "land", "commercial"] as PropertyType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => setPropertyType(type)}
                  className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
                    propertyType === type
                      ? "bg-gradient-to-r from-sky-500 to-blue-500 text-white"
                      : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                  }`}
                >
                  {t.propertyTypes[type]}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Price Input */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-5 mb-4"
          >
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              {t.priceLabel}
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={priceInput}
                onChange={(e) => setPriceInput(e.target.value)}
                placeholder={t.pricePlaceholder}
                className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 text-right tabular-nums text-lg font-semibold"
              />
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400 whitespace-nowrap">
                {t.priceUnit}
              </span>
            </div>
            {priceMan > 0 && (
              <p className="text-xs text-sky-600 dark:text-sky-400 mt-1.5 text-right tabular-nums">
                = {(priceMan * 10000).toLocaleString()}{t.won}
              </p>
            )}
          </motion.div>

          {/* Home Count (houses only) */}
          {isHouse && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-5 mb-4"
            >
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                {t.homeCountLabel}
              </label>
              <div className="flex rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                {(["one", "two", "three"] as HomeCount[]).map((count) => (
                  <button
                    key={count}
                    onClick={() => setHomeCount(count)}
                    className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
                      homeCount === count
                        ? "bg-gradient-to-r from-sky-500 to-blue-500 text-white"
                        : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                    }`}
                  >
                    {t.homeCounts[count]}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Toggles */}
          {isHouse && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-5 mb-4 space-y-4"
            >
              {/* First-time buyer */}
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {t.firstTimeBuyerLabel}
                  </p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                    {t.firstTimeBuyerDesc}
                  </p>
                </div>
                <button
                  onClick={() => setFirstTimeBuyer((v) => !v)}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 focus:outline-none ${
                    firstTimeBuyer
                      ? "bg-gradient-to-r from-sky-500 to-blue-500"
                      : "bg-slate-200 dark:bg-slate-600"
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform duration-200 mt-0.5 ${
                      firstTimeBuyer ? "translate-x-5" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>

              {/* Regulated area */}
              <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {t.regulatedAreaLabel}
                  </p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                    {t.regulatedAreaDesc}
                  </p>
                </div>
                <button
                  onClick={() => setRegulatedArea((v) => !v)}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 focus:outline-none ${
                    regulatedArea
                      ? "bg-gradient-to-r from-sky-500 to-blue-500"
                      : "bg-slate-200 dark:bg-slate-600"
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform duration-200 mt-0.5 ${
                      regulatedArea ? "translate-x-5" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>
            </motion.div>
          )}

          {/* Result */}
          {result ? (
            <motion.div
              key={`${priceMan}-${propertyType}-${homeCount}-${firstTimeBuyer}-${regulatedArea}`}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-br from-sky-500 to-blue-500 rounded-2xl shadow-md p-6 mb-4 text-white"
            >
              <p className="text-sm font-medium text-sky-100 mb-4 uppercase tracking-wide">
                {t.resultTitle}
              </p>

              {/* Total (large) */}
              <div className="text-center mb-5 pb-5 border-b border-white/20">
                <p className="text-xs text-sky-200 mb-1">{t.totalTax}</p>
                <motion.div
                  key={result.totalTax}
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="text-4xl font-black tabular-nums"
                >
                  {formatWon(result.totalTax)}
                </motion.div>
                <p className="text-xs text-sky-200 mt-1.5">
                  {t.effectiveRate}: {(result.effectiveRate * 100).toFixed(2)}%
                </p>
              </div>

              {/* Breakdown */}
              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-sky-100">
                    {t.acquisitionTax}{" "}
                    <span className="text-xs opacity-75">
                      ({(result.acquisitionTaxRate * 100).toFixed(1)}%)
                    </span>
                  </span>
                  <span className="font-semibold tabular-nums">
                    {formatWon(result.acquisitionTax)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sky-100">{t.localEducationTax}</span>
                  <span className="font-semibold tabular-nums">
                    {formatWon(result.localEducationTax)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sky-100">{t.specialRuralTax}</span>
                  <span className="font-semibold tabular-nums">
                    {formatWon(result.specialRuralTax)}
                  </span>
                </div>
                {result.firstTimeBuyerReduction > 0 && (
                  <div className="flex justify-between items-center pt-2 border-t border-white/20 text-yellow-200">
                    <span className="text-xs">{t.firstTimeBuyerNote}</span>
                    <span className="font-semibold tabular-nums text-xs">
                      -{formatWon(result.firstTimeBuyerReduction)}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-dashed border-slate-200 dark:border-slate-700 p-8 mb-4 text-center"
            >
              <p className="text-slate-400 dark:text-slate-500 text-sm">{t.inputRequired}</p>
            </motion.div>
          )}

          {/* In-article Ad */}
          <div className="mb-4">
            <AdBanner format="in-article" />
          </div>

          {/* Comparison Table */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-5 mb-4"
          >
            <h2 className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-3">
              {t.comparisonTitle}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-700">
                    <th className="text-left py-2 font-medium">{t.priceLabel}</th>
                    <th className="text-right py-2 font-medium">{t.acquisitionTax}</th>
                    <th className="text-right py-2 font-medium">{t.totalTax}</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row) => (
                    <tr
                      key={row.price}
                      className={`border-b border-slate-50 dark:border-slate-700/60 last:border-0 transition-colors ${
                        priceMan === row.price
                          ? "bg-sky-50 dark:bg-sky-950/30 font-bold text-sky-700 dark:text-sky-300"
                          : ""
                      }`}
                    >
                      <td className="py-2">
                        {priceMan === row.price && (
                          <span className="mr-1 text-sky-500">▶</span>
                        )}
                        {(row.price / 10000).toLocaleString()}억
                      </td>
                      <td className="py-2 text-right tabular-nums text-xs">
                        {formatWon(row.tax.acquisitionTax)}
                      </td>
                      <td className="py-2 text-right tabular-nums font-medium">
                        {formatWon(row.tax.totalTax)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Disclaimer */}
          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/50 rounded-xl p-4 mb-4">
            <p className="text-xs text-amber-700 dark:text-amber-400 text-center">
              ⚠️ {t.disclaimer}
            </p>
          </div>

          {/* Bottom Ad */}
          <div className="mt-2">
            <AdBanner format="rectangle" />
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
