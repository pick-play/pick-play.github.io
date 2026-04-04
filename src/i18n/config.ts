export const locales = ["ko", "en", "ja", "zh", "es"] as const;
export type Locale = (typeof locales)[number];

/** URL path prefix → internal locale code. "ko" is intentionally absent; root path falls through to default "ko" */
export const pathToLocale: Record<string, Locale> = {
  en: "en",
  jp: "ja",
  cn: "zh",
  es: "es",
};

/** Internal locale code → URL path prefix */
export const localePaths: Record<Locale, string> = {
  ko: "",
  en: "/en",
  ja: "/jp",
  zh: "/cn",
  es: "/es",
};

export const localeNames: Record<Locale, string> = {
  ko: "한국어",
  en: "English",
  ja: "日本語",
  zh: "中文",
  es: "Español",
};

export const htmlLangs: Record<Locale, string> = {
  ko: "ko",
  en: "en",
  ja: "ja",
  zh: "zh-CN",
  es: "es",
};

export const ogLocales: Record<Locale, string> = {
  ko: "ko_KR",
  en: "en_US",
  ja: "ja_JP",
  zh: "zh_CN",
  es: "es_ES",
};

export function getLocaleFromPath(pathname: string): Locale {
  const segment = pathname.split("/")[1];
  return pathToLocale[segment] || "ko";
}

export function getLocalePath(locale: Locale, path: string): string {
  return localePaths[locale] + path;
}

export const BASE_URL = "https://pick-play.github.io";

/** All 31 tool routes (Korean has no prefix; other locales add /en, /jp, /cn, /es) */
export const toolRoutes = [
  "food", "settlement", "date-course", "roulette", "d-day", "draw",
  "seat", "nickname", "pdf", "image", "ladder",
  "liar-game", "random-team", "balance-game", "chosung-quiz", "truth-dare", "worldcup",
  "teto-egen", "mbti", "couple-test", "color-test", "tarot",
  "password", "text-counter", "random-number", "timer",
  "qr-code", "age-calculator", "percentage", "bmi", "unit-converter",
] as const;
