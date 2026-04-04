"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import AdBanner from "@/components/AdBanner";
import { useLocale } from "@/hooks/useLocale";
import type { Locale } from "@/i18n/config";

const translations: Record<Locale, {
  title: string;
  subtitle: string;
  length: string;
  options: string;
  uppercase: string;
  lowercase: string;
  numbers: string;
  special: string;
  generate: string;
  copy: string;
  copied: string;
  strength: string;
  strengthWeak: string;
  strengthMedium: string;
  strengthStrong: string;
  strengthVeryStrong: string;
  history: string;
  historyEmpty: string;
  noOptions: string;
  faqTitle: string;
  faq: { q: string; a: string }[];
}> = {
  ko: {
    title: "비밀번호 생성기",
    subtitle: "강력하고 안전한 랜덤 비밀번호를 즉시 생성하세요",
    length: "비밀번호 길이",
    options: "포함 옵션",
    uppercase: "대문자 (A-Z)",
    lowercase: "소문자 (a-z)",
    numbers: "숫자 (0-9)",
    special: "특수문자 (!@#$...)",
    generate: "비밀번호 생성",
    copy: "복사",
    copied: "복사 완료!",
    strength: "비밀번호 강도",
    strengthWeak: "약함",
    strengthMedium: "보통",
    strengthStrong: "강함",
    strengthVeryStrong: "매우 강함",
    history: "최근 생성 기록",
    historyEmpty: "아직 생성된 비밀번호가 없어요",
    noOptions: "최소 하나의 옵션을 선택해주세요",
    faqTitle: "자주 묻는 질문",
    faq: [
      {
        q: "안전한 비밀번호를 만들려면 어떻게 해야 하나요?",
        a: "대소문자, 숫자, 특수문자를 모두 조합하고 최소 16자 이상을 권장합니다. PickPlay 비밀번호 생성기는 이러한 규칙을 자동으로 적용해 드립니다.",
      },
      {
        q: "생성된 비밀번호는 서버에 저장되나요?",
        a: "아니요, 모든 비밀번호 생성은 사용자의 브라우저에서만 이루어집니다. 서버에 전송되거나 저장되지 않아 완전히 안전합니다.",
      },
      {
        q: "특수문자가 포함된 비밀번호는 왜 더 안전한가요?",
        a: "특수문자를 포함하면 가능한 조합의 수가 기하급수적으로 늘어납니다. 예를 들어 16자 비밀번호에 특수문자를 추가하면 해킹에 수천 년이 걸릴 수 있습니다.",
      },
    ],
  },
  en: {
    title: "Password Generator",
    subtitle: "Generate strong and secure random passwords instantly",
    length: "Password Length",
    options: "Include Options",
    uppercase: "Uppercase (A-Z)",
    lowercase: "Lowercase (a-z)",
    numbers: "Numbers (0-9)",
    special: "Special chars (!@#$...)",
    generate: "Generate Password",
    copy: "Copy",
    copied: "Copied!",
    strength: "Password Strength",
    strengthWeak: "Weak",
    strengthMedium: "Medium",
    strengthStrong: "Strong",
    strengthVeryStrong: "Very Strong",
    history: "Recent History",
    historyEmpty: "No passwords generated yet",
    noOptions: "Please select at least one option",
    faqTitle: "FAQ",
    faq: [
      {
        q: "What makes a strong password?",
        a: "A strong password combines uppercase, lowercase, numbers and special characters with a length of at least 16 characters. PickPlay's generator applies these rules automatically.",
      },
      {
        q: "Are generated passwords stored on a server?",
        a: "No — all password generation happens locally in your browser. Nothing is sent to any server, so your passwords are completely private.",
      },
      {
        q: "Why are special characters important?",
        a: "Special characters exponentially increase the number of possible combinations, making brute-force attacks significantly harder. A 16-character password with special chars can take thousands of years to crack.",
      },
    ],
  },
  ja: {
    title: "パスワード生成ツール",
    subtitle: "安全でランダムなパスワードを今すぐ生成",
    length: "パスワードの長さ",
    options: "含めるオプション",
    uppercase: "大文字 (A-Z)",
    lowercase: "小文字 (a-z)",
    numbers: "数字 (0-9)",
    special: "記号 (!@#$...)",
    generate: "パスワードを生成",
    copy: "コピー",
    copied: "コピーしました！",
    strength: "パスワード強度",
    strengthWeak: "弱い",
    strengthMedium: "普通",
    strengthStrong: "強い",
    strengthVeryStrong: "非常に強い",
    history: "最近の生成履歴",
    historyEmpty: "まだパスワードが生成されていません",
    noOptions: "少なくとも1つのオプションを選択してください",
    faqTitle: "よくある質問",
    faq: [
      {
        q: "強いパスワードの条件は何ですか？",
        a: "大文字・小文字・数字・記号を組み合わせ、16文字以上にすることを推奨します。PickPlayのパスワード生成ツールはこれらのルールを自動で適用します。",
      },
      {
        q: "生成されたパスワードはサーバーに保存されますか？",
        a: "いいえ、すべての処理はブラウザ内のみで行われます。サーバーには何も送信されないため、パスワードは完全にプライベートです。",
      },
      {
        q: "なぜ記号を含めるとより安全なのですか？",
        a: "記号を含めることで使用できる文字の組み合わせ数が指数的に増加し、ブルートフォース攻撃が格段に困難になります。",
      },
    ],
  },
  zh: {
    title: "密码生成器",
    subtitle: "立即生成强大且安全的随机密码",
    length: "密码长度",
    options: "包含选项",
    uppercase: "大写字母 (A-Z)",
    lowercase: "小写字母 (a-z)",
    numbers: "数字 (0-9)",
    special: "特殊字符 (!@#$...)",
    generate: "生成密码",
    copy: "复制",
    copied: "已复制！",
    strength: "密码强度",
    strengthWeak: "弱",
    strengthMedium: "中等",
    strengthStrong: "强",
    strengthVeryStrong: "非常强",
    history: "最近生成记录",
    historyEmpty: "尚未生成任何密码",
    noOptions: "请至少选择一个选项",
    faqTitle: "常见问题",
    faq: [
      {
        q: "什么样的密码是安全的？",
        a: "建议将大写字母、小写字母、数字和特殊字符组合使用，长度至少16位。PickPlay密码生成器会自动应用这些规则。",
      },
      {
        q: "生成的密码会存储在服务器上吗？",
        a: "不会，所有密码生成均在您的浏览器本地完成，不会发送到任何服务器，完全保护您的隐私。",
      },
      {
        q: "为什么包含特殊字符的密码更安全？",
        a: "加入特殊字符会使可能的组合数量呈指数级增长，使暴力破解攻击极为困难。",
      },
    ],
  },
  es: {
    title: "Generador de Contraseñas",
    subtitle: "Genera contraseñas seguras y aleatorias al instante",
    length: "Longitud de la contraseña",
    options: "Opciones de inclusión",
    uppercase: "Mayúsculas (A-Z)",
    lowercase: "Minúsculas (a-z)",
    numbers: "Números (0-9)",
    special: "Caracteres especiales (!@#$...)",
    generate: "Generar contraseña",
    copy: "Copiar",
    copied: "¡Copiado!",
    strength: "Fortaleza de la contraseña",
    strengthWeak: "Débil",
    strengthMedium: "Media",
    strengthStrong: "Fuerte",
    strengthVeryStrong: "Muy fuerte",
    history: "Historial reciente",
    historyEmpty: "Aún no se han generado contraseñas",
    noOptions: "Selecciona al menos una opción",
    faqTitle: "Preguntas frecuentes",
    faq: [
      {
        q: "¿Qué hace que una contraseña sea segura?",
        a: "Una contraseña segura combina mayúsculas, minúsculas, números y caracteres especiales con una longitud mínima de 16 caracteres. El generador de PickPlay aplica estas reglas automáticamente.",
      },
      {
        q: "¿Las contraseñas generadas se almacenan en un servidor?",
        a: "No, toda la generación de contraseñas ocurre localmente en tu navegador. Nada se envía a ningún servidor, por lo que tus contraseñas son completamente privadas.",
      },
      {
        q: "¿Por qué los caracteres especiales hacen la contraseña más segura?",
        a: "Los caracteres especiales aumentan exponencialmente el número de combinaciones posibles, haciendo los ataques de fuerza bruta significativamente más difíciles.",
      },
    ],
  },
};

const CHAR_SETS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  special: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

function getStrength(password: string): 0 | 1 | 2 | 3 {
  if (password.length === 0) return 0;
  let score = 0;
  if (password.length >= 12) score++;
  if (password.length >= 20) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (score <= 2) return 0;
  if (score === 3) return 1;
  if (score === 4) return 2;
  return 3;
}

export default function PasswordPage() {
  const locale = useLocale() as Locale;
  const t = translations[locale] ?? translations.ko;

  const [length, setLength] = useState(16);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSpecial, setUseSpecial] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState<string[]>([]);

  const generatePassword = useCallback(() => {
    let chars = "";
    if (useUpper) chars += CHAR_SETS.uppercase;
    if (useLower) chars += CHAR_SETS.lowercase;
    if (useNumbers) chars += CHAR_SETS.numbers;
    if (useSpecial) chars += CHAR_SETS.special;

    if (!chars) {
      setError(t.noOptions);
      return;
    }
    setError("");

    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    const result = Array.from(array)
      .map((n) => chars[n % chars.length])
      .join("");
    setPassword(result);
    setHistory((prev) => [result, ...prev].slice(0, 5));
  }, [length, useUpper, useLower, useNumbers, useSpecial, t.noOptions]);

  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, []);

  const strength = getStrength(password);
  const strengthLabels = [
    t.strengthWeak,
    t.strengthMedium,
    t.strengthStrong,
    t.strengthVeryStrong,
  ];
  const strengthColors = [
    "bg-red-500",
    "bg-yellow-500",
    "bg-blue-500",
    "bg-emerald-500",
  ];
  const strengthWidths = ["w-1/4", "w-2/4", "w-3/4", "w-full"];

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/20 dark:from-slate-950 dark:via-emerald-950/20 dark:to-teal-950/10">
        <div className="max-w-lg mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white text-2xl mb-4 shadow-lg">
              🔐
            </div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
              {t.title}
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {t.subtitle}
            </p>
          </motion.div>

          {/* Settings card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 mb-4"
          >
            {/* Length slider */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {t.length}
                </span>
                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2.5 py-0.5 rounded-full">
                  {length}
                </span>
              </div>
              <input
                type="range"
                min={8}
                max={64}
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none bg-slate-200 dark:bg-slate-600 accent-emerald-500 cursor-pointer"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>8</span>
                <span>64</span>
              </div>
            </div>

            {/* Toggle options */}
            <div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                {t.options}
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: t.uppercase, value: useUpper, setter: setUseUpper },
                  { label: t.lowercase, value: useLower, setter: setUseLower },
                  { label: t.numbers, value: useNumbers, setter: setUseNumbers },
                  { label: t.special, value: useSpecial, setter: setUseSpecial },
                ].map(({ label, value, setter }) => (
                  <button
                    key={label}
                    onClick={() => setter(!value)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                      value
                        ? "bg-emerald-50 dark:bg-emerald-900/30 border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300"
                        : "bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    <span
                      className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                        value
                          ? "bg-emerald-500 border-emerald-500"
                          : "border-slate-300 dark:border-slate-500"
                      }`}
                    >
                      {value && (
                        <svg
                          className="w-2.5 h-2.5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </span>
                    {label}
                  </button>
                ))}
              </div>
              {error && (
                <p className="mt-2 text-xs text-red-500">{error}</p>
              )}
            </div>
          </motion.div>

          {/* Generate button */}
          <motion.button
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            onClick={generatePassword}
            whileTap={{ scale: 0.97 }}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-base shadow-md hover:shadow-lg transition-shadow mb-4"
          >
            {t.generate}
          </motion.button>

          <AdBanner format="horizontal" />

          {/* Password output */}
          {password && (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 mb-4"
            >
              {/* Password display */}
              <div className="flex items-center gap-2 mb-4">
                <p className="flex-1 font-mono text-lg font-bold text-slate-800 dark:text-slate-100 break-all leading-relaxed">
                  {password}
                </p>
                <button
                  onClick={() => copyToClipboard(password)}
                  className={`flex-shrink-0 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                    copied
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:text-emerald-600"
                  }`}
                >
                  {copied ? t.copied : t.copy}
                </button>
              </div>

              {/* Strength indicator */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {t.strength}
                  </span>
                  <span
                    className={`text-xs font-semibold ${
                      strength === 0
                        ? "text-red-500"
                        : strength === 1
                        ? "text-yellow-500"
                        : strength === 2
                        ? "text-blue-500"
                        : "text-emerald-500"
                    }`}
                  >
                    {strengthLabels[strength]}
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${strengthColors[strength]} ${strengthWidths[strength]}`}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* History */}
          {history.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 mb-4"
            >
              <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                {t.history}
              </h2>
              <ul className="space-y-2">
                {history.map((pw, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between gap-2 py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-700/50"
                  >
                    <span className="font-mono text-sm text-slate-700 dark:text-slate-300 truncate">
                      {pw}
                    </span>
                    <button
                      onClick={() => copyToClipboard(pw)}
                      className="text-xs text-slate-400 hover:text-emerald-500 transition-colors flex-shrink-0"
                    >
                      {t.copy}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 mb-4"
          >
            <h2 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-4">
              {t.faqTitle}
            </h2>
            <div className="space-y-4">
              {t.faq.map((item, i) => (
                <div key={i}>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {item.q}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <AdBanner format="rectangle" />
        </div>
      </div>
    </PageTransition>
  );
}
