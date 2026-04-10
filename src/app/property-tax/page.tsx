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
    faqTitle: string;
    faqItems: { q: string; a: string }[];
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
    faqTitle: "자주 묻는 질문",
    faqItems: [
      {
        q: "취득세란 무엇인가요?",
        a: "취득세는 부동산, 차량, 기계 등의 자산을 취득할 때 납부하는 지방세입니다. 주택의 경우 취득 가액에 따라 1~12% 세율이 적용되며, 이에 지방교육세와 농어촌특별세가 추가로 부과됩니다. 잔금일로부터 60일 이내에 신고·납부해야 합니다.",
      },
      {
        q: "주택 수에 따라 취득세율이 달라지나요?",
        a: "네, 취득 후 주택 보유 수에 따라 세율이 크게 달라집니다. 1주택은 취득 가액에 따라 1~3%, 2주택은 조정대상지역에서 8%, 3주택 이상은 12%의 중과세율이 적용됩니다. 따라서 다주택자는 취득 전 반드시 세율을 확인해야 합니다.",
      },
      {
        q: "생애최초 주택 구입 감면이란 무엇인가요?",
        a: "생애 처음으로 주택을 구입하는 경우 취득세의 50%를 감면받을 수 있으며, 감면 한도는 최대 200만원입니다. 단, 주택 가격이 12억원 이하이고 1주택이어야 합니다. 이 계산기에서 해당 옵션을 켜면 자동으로 감면액이 반영됩니다.",
      },
      {
        q: "조정대상지역이란 무엇인가요?",
        a: "조정대상지역은 부동산 가격 급등, 투기 과열 등의 이유로 정부가 지정한 지역으로, 이 지역에서 2주택 이상을 취득할 경우 높은 취득세율이 적용됩니다. 현재 조정대상지역 여부는 국토교통부 공시를 통해 확인할 수 있습니다.",
      },
      {
        q: "이 계산기 결과는 정확한가요?",
        a: "이 계산기는 일반적인 기준을 적용한 참고용 계산 도구입니다. 실제 취득세는 주택 전용면적(85㎡ 초과 여부), 지역, 취득 방법 등 다양한 요인에 따라 달라질 수 있습니다. 정확한 세액은 관할 시·군·구청 세무과에 문의하세요.",
      },
    ],
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
    faqTitle: "Frequently Asked Questions",
    faqItems: [
      {
        q: "What is acquisition tax in Korea?",
        a: "Acquisition tax (취득세) is a local tax paid when acquiring real estate, vehicles, or other assets. For housing, rates range from 1% to 12% based on price and ownership count. Local education tax and special rural tax are also added. It must be filed and paid within 60 days of the payment date.",
      },
      {
        q: "Does owning multiple homes affect the tax rate?",
        a: "Yes, significantly. A first home is taxed at 1–3% based on price, a second home in a regulated area at 8%, and three or more homes at 12%. Multi-home owners face heavy surcharges, so it's crucial to check the rate before purchasing.",
      },
      {
        q: "What is the first-time buyer reduction?",
        a: "First-time buyers can receive a 50% reduction on acquisition tax, capped at 2 million KRW. Requirements include purchasing a home priced under 1.2 billion KRW as your first and only home. Enable the toggle in this calculator to see the reduction applied automatically.",
      },
      {
        q: "What is a regulated area (조정대상지역)?",
        a: "A regulated area is a government-designated zone where rapid price increases or speculative overheating has occurred. Purchasing a second or subsequent home in these areas triggers higher tax rates. Check the Ministry of Land, Infrastructure and Transport for the current list.",
      },
    ],
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
    faqTitle: "よくある質問",
    faqItems: [
      {
        q: "韓国の不動産取得税とは何ですか？",
        a: "取得税とは、不動産や車両などの資産を取得する際に課される地方税です。住宅の場合、取得価額や保有戸数に応じて1〜12%の税率が適用されます。さらに地方教育税と農漁村特別税が追加されます。残金支払日から60日以内に申告・納付が必要です。",
      },
      {
        q: "住宅保有数によって税率は変わりますか？",
        a: "はい、大きく変わります。1戸目は取得価額に応じて1〜3%、調整対象地域での2戸目は8%、3戸目以上は12%の重課税率が適用されます。多住宅保有者は購入前に必ず税率を確認してください。",
      },
      {
        q: "初回購入者控除とは何ですか？",
        a: "生涯初めて住宅を購入する場合、取得税の50%（最大200万ウォン）が軽減されます。住宅価格が12億ウォン以下で1戸目であることが条件です。このオプションをオンにすると自動的に控除額が反映されます。",
      },
      {
        q: "調整対象地域とは何ですか？",
        a: "調整対象地域とは、価格急騰や投機過熱などの理由で政府が指定した地域です。この地域で2戸目以上を取得する場合、高い取得税率が適用されます。最新の指定地域は国土交通省の公示で確認できます。",
      },
    ],
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
    faqTitle: "常见问题",
    faqItems: [
      {
        q: "「韩国房产取得税是什么？」",
        a: "取得税是购买房产、车辆等资产时需缴纳的地方税。住宅根据取得价格和持有套数适用1%至12%不同税率，并额外征收地方教育税和农渔村特别税。须在尾款支付日起60天内申报缴纳。",
      },
      {
        q: "「持有多套住宅会影响税率吗？」",
        a: "会产生重大影响。第1套住宅按取得价格适用1%至3%，调整对象地区第2套适用8%，第3套及以上适用12%重税率。多套房持有人购房前务必确认适用税率。",
      },
      {
        q: "「首次购房减免是什么？」",
        a: "生平首次购房可享受取得税50%减免，最高减免200万韩元。须满足住宅价格12亿韩元以下且为第1套住宅的条件。勾选此选项后计算器将自动反映减免金额。",
      },
      {
        q: "「调整对象地区是什么？」",
        a: "调整对象地区是政府因房价急涨或投机过热而指定的区域。在该区域购买第2套及以上住宅须适用更高税率。最新指定地区可通过韩国国土交通部公告查询。",
      },
    ],
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
    faqTitle: "Preguntas frecuentes",
    faqItems: [
      {
        q: "¿Qué es el impuesto de adquisición en Corea?",
        a: "El impuesto de adquisición (취득세) es un impuesto local que se paga al adquirir bienes inmuebles, vehículos u otros activos. Para viviendas, la tasa varía del 1% al 12% según el precio y el número de propiedades. Además se añaden el impuesto de educación local y el impuesto especial rural. Debe pagarse dentro de los 60 días del pago del saldo final.",
      },
      {
        q: "¿Afecta poseer varias viviendas a la tasa impositiva?",
        a: "Sí, considerablemente. La primera vivienda tributa entre el 1% y el 3% según el precio; la segunda en área regulada al 8%; y tres o más viviendas al 12%. Los propietarios de múltiples viviendas deben verificar la tasa antes de comprar.",
      },
      {
        q: "¿Qué es la reducción para compradores primerizos?",
        a: "Los compradores de su primera vivienda pueden obtener una reducción del 50% en el impuesto de adquisición, con un máximo de 2 millones KRW. Requisitos: vivienda de menos de 1.200 millones KRW y que sea la primera y única propiedad. Active la opción para verlo reflejado automáticamente.",
      },
      {
        q: "¿Qué es un área regulada?",
        a: "Un área regulada es una zona designada por el gobierno debido a subidas de precios o sobrecalentamiento especulativo. Comprar una segunda vivienda o más en estas zonas activa tasas impositivas más altas. Consulte el Ministerio de Territorio de Corea para la lista actualizada.",
      },
    ],
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
            <AdBanner format="horizontal" className="my-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2" />
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
            <AdBanner format="in-article" className="my-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2" />
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

          {/* FAQ Section */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 mt-4">
            <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
              {t.faqTitle}
            </h2>
            <div className="space-y-2">
              {t.faqItems.map((item: {q: string; a: string}, i: number) => (
                <details key={i} className="group">
                  <summary className="cursor-pointer text-sm font-medium text-slate-700 dark:text-slate-200 py-2 hover:text-primary-500">
                    {item.q}
                  </summary>
                  <p className="text-sm text-slate-500 dark:text-slate-400 pb-3 pl-4 leading-relaxed">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>

          {/* Bottom Ad */}
          <div className="mt-2">
            <AdBanner format="rectangle" className="my-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2" />
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
