"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import AdBanner from "@/components/AdBanner";
import nicknameData from "@/data/nickname.json";
import { useLocale } from "@/hooks/useLocale";

const translations = {
  ko: {
    title: "닉네임 생성기",
    subtitle: "스타일을 선택하고 나만의 닉네임을 찾아보세요",
    styleLabel: "스타일 선택",
    optionsLabel: "옵션",
    includeNumbers: "숫자 포함",
    includeSpecial: "특수문자 포함",
    maxLength: "최대 글자 수",
    maxLengthUnit: (n: number) => `${n}자`,
    minChars: "4자",
    maxChars: "12자",
    generateBtn: "닉네임 생성하기 ✨",
    generatedLabel: (n: number) => `생성된 닉네임 (${n}개)`,
    regenerateAll: "전체 다시 생성",
    copyAll: "복사 전체",
    copiedAll: "복사됨!",
    copyOne: "복사",
    copiedOne: "복사됨",
    like: "좋아요",
    reroll: "다시 생성",
    historyLabel: "최근 생성 기록",
    historyClickHint: "클릭해서 복사",
    faqTitle: "자주 묻는 질문",
    faq: [
      {
        q: "닉네임 생성기는 어떻게 사용하나요?",
        a: "원하는 스타일(귀여운, 웃긴, 멋있는, 게임용, 판타지, 감성적)을 선택하고 '닉네임 생성하기' 버튼을 누르면 8개의 닉네임이 자동으로 만들어집니다. 숫자 포함, 특수문자 포함, 최대 글자 수도 자유롭게 설정할 수 있어요.",
      },
      {
        q: "생성된 닉네임을 복사하려면 어떻게 하나요?",
        a: "각 닉네임 카드의 복사 버튼을 눌러 개별 닉네임을 복사하거나, '복사 전체' 버튼으로 8개를 한 번에 클립보드에 복사할 수 있습니다. 최근 생성 기록의 닉네임도 클릭하면 바로 복사됩니다.",
      },
      {
        q: "닉네임 생성기는 무료인가요?",
        a: "네, PickPlay의 닉네임 생성기는 완전 무료입니다. 회원가입 없이, 앱 설치 없이 웹 브라우저에서 바로 사용할 수 있습니다. 마음에 드는 닉네임이 나올 때까지 무제한으로 생성해보세요!",
      },
    ],
    styles: [
      { value: "귀여운" as const, label: "귀여운", emoji: "🐱", gradient: "from-pink-400 to-rose-400" },
      { value: "웃긴" as const, label: "웃긴", emoji: "😂", gradient: "from-yellow-400 to-orange-400" },
      { value: "멋있는" as const, label: "멋있는", emoji: "😎", gradient: "from-slate-500 to-slate-700" },
      { value: "게임용" as const, label: "게임용", emoji: "🎮", gradient: "from-blue-500 to-indigo-600" },
      { value: "판타지" as const, label: "판타지", emoji: "🐉", gradient: "from-purple-500 to-violet-600" },
      { value: "감성적" as const, label: "감성적", emoji: "🌙", gradient: "from-sky-400 to-blue-500" },
    ],
  },
  en: {
    title: "Nickname Generator",
    subtitle: "Choose a style and find your perfect nickname",
    styleLabel: "Select Style",
    optionsLabel: "Options",
    includeNumbers: "Include Numbers",
    includeSpecial: "Include Special Characters",
    maxLength: "Max Length",
    maxLengthUnit: (n: number) => `${n} chars`,
    minChars: "4",
    maxChars: "12",
    generateBtn: "Generate Nicknames ✨",
    generatedLabel: (n: number) => `Generated Nicknames (${n})`,
    regenerateAll: "Regenerate All",
    copyAll: "Copy All",
    copiedAll: "Copied!",
    copyOne: "Copy",
    copiedOne: "Copied",
    like: "Like",
    reroll: "Reroll",
    historyLabel: "Recent History",
    historyClickHint: "Click to copy",
    faqTitle: "FAQ",
    faq: [
      {
        q: "How do I use the nickname generator?",
        a: "Choose a style (Cute, Funny, Cool, Gaming, Fantasy, or Aesthetic) and press 'Generate Nicknames' to instantly create 8 options. You can also toggle numbers, special characters, and set a max length.",
      },
      {
        q: "How do I copy a nickname?",
        a: "Click the copy button on any nickname card to copy it individually, or use 'Copy All' to copy all 8 to your clipboard at once. Clicking any nickname in the recent history also copies it.",
      },
      {
        q: "Is the nickname generator free?",
        a: "Yes! PickPlay's nickname generator is completely free — no sign-up or app download needed. Generate as many nicknames as you want right in your browser.",
      },
    ],
    styles: [
      { value: "귀여운" as const, label: "Cute", emoji: "🐱", gradient: "from-pink-400 to-rose-400" },
      { value: "웃긴" as const, label: "Funny", emoji: "😂", gradient: "from-yellow-400 to-orange-400" },
      { value: "멋있는" as const, label: "Cool", emoji: "😎", gradient: "from-slate-500 to-slate-700" },
      { value: "게임용" as const, label: "Gaming", emoji: "🎮", gradient: "from-blue-500 to-indigo-600" },
      { value: "판타지" as const, label: "Fantasy", emoji: "🐉", gradient: "from-purple-500 to-violet-600" },
      { value: "감성적" as const, label: "Aesthetic", emoji: "🌙", gradient: "from-sky-400 to-blue-500" },
    ],
  },
  ja: {
    title: "ニックネームジェネレーター",
    subtitle: "スタイルを選んで自分だけのニックネームを見つけよう",
    styleLabel: "スタイル選択",
    optionsLabel: "オプション",
    includeNumbers: "数字を含む",
    includeSpecial: "特殊文字を含む",
    maxLength: "最大文字数",
    maxLengthUnit: (n: number) => `${n}文字`,
    minChars: "4",
    maxChars: "12",
    generateBtn: "ニックネームを生成 ✨",
    generatedLabel: (n: number) => `生成されたニックネーム（${n}個）`,
    regenerateAll: "全て再生成",
    copyAll: "全てコピー",
    copiedAll: "コピー済み！",
    copyOne: "コピー",
    copiedOne: "コピー済み",
    like: "いいね",
    reroll: "再生成",
    historyLabel: "最近の履歴",
    historyClickHint: "クリックでコピー",
    faqTitle: "よくある質問",
    faq: [
      {
        q: "ニックネームジェネレーターの使い方は？",
        a: "スタイル（かわいい・おもしろい・かっこいい・ゲーム用・ファンタジー・センチメンタル）を選んで「生成」ボタンを押すと8つのニックネームが作られます。数字・特殊文字の有無や最大文字数も設定できます。",
      },
      {
        q: "ニックネームをコピーするには？",
        a: "各カードのコピーボタンを押して個別にコピーするか、「全てコピー」ボタンで8つを一括コピーできます。履歴のニックネームもクリックするとコピーされます。",
      },
      {
        q: "無料で使えますか？",
        a: "はい、PickPlayのニックネームジェネレーターは完全無料です。会員登録・アプリのインストール不要でブラウザからすぐに使えます。",
      },
    ],
    styles: [
      { value: "귀여운" as const, label: "かわいい", emoji: "🐱", gradient: "from-pink-400 to-rose-400" },
      { value: "웃긴" as const, label: "おもしろい", emoji: "😂", gradient: "from-yellow-400 to-orange-400" },
      { value: "멋있는" as const, label: "かっこいい", emoji: "😎", gradient: "from-slate-500 to-slate-700" },
      { value: "게임용" as const, label: "ゲーム用", emoji: "🎮", gradient: "from-blue-500 to-indigo-600" },
      { value: "판타지" as const, label: "ファンタジー", emoji: "🐉", gradient: "from-purple-500 to-violet-600" },
      { value: "감성적" as const, label: "センチ", emoji: "🌙", gradient: "from-sky-400 to-blue-500" },
    ],
  },
  zh: {
    title: "昵称生成器",
    subtitle: "选择风格，找到属于你的专属昵称",
    styleLabel: "选择风格",
    optionsLabel: "选项",
    includeNumbers: "包含数字",
    includeSpecial: "包含特殊字符",
    maxLength: "最大字符数",
    maxLengthUnit: (n: number) => `${n}字`,
    minChars: "4",
    maxChars: "12",
    generateBtn: "生成昵称 ✨",
    generatedLabel: (n: number) => `已生成昵称（${n}个）`,
    regenerateAll: "重新生成全部",
    copyAll: "全部复制",
    copiedAll: "已复制！",
    copyOne: "复制",
    copiedOne: "已复制",
    like: "喜欢",
    reroll: "重新生成",
    historyLabel: "最近生成记录",
    historyClickHint: "点击复制",
    faqTitle: "常见问题",
    faq: [
      {
        q: "如何使用昵称生成器？",
        a: '选择风格（可爱、搞笑、酷炫、游戏、奇幻、文艺），点击"生成昵称"按钮，即可自动生成8个昵称。还可以设置是否包含数字、特殊字符及最大字符数。',
      },
      {
        q: "如何复制昵称？",
        a: '点击每张昵称卡片上的复制按钮单独复制，或使用"全部复制"按钮一次性复制所有8个到剪贴板。点击最近记录中的昵称也可直接复制。',
      },
      {
        q: "昵称生成器是免费的吗？",
        a: "是的，PickPlay的昵称生成器完全免费，无需注册或安装应用，直接在浏览器中使用，无限次生成。",
      },
    ],
    styles: [
      { value: "귀여운" as const, label: "可爱", emoji: "🐱", gradient: "from-pink-400 to-rose-400" },
      { value: "웃긴" as const, label: "搞笑", emoji: "😂", gradient: "from-yellow-400 to-orange-400" },
      { value: "멋있는" as const, label: "酷炫", emoji: "😎", gradient: "from-slate-500 to-slate-700" },
      { value: "게임용" as const, label: "游戏", emoji: "🎮", gradient: "from-blue-500 to-indigo-600" },
      { value: "판타지" as const, label: "奇幻", emoji: "🐉", gradient: "from-purple-500 to-violet-600" },
      { value: "감성적" as const, label: "文艺", emoji: "🌙", gradient: "from-sky-400 to-blue-500" },
    ],
  },
  es: {
    title: "Generador de apodos",
    subtitle: "Elige un estilo y encuentra tu apodo perfecto",
    styleLabel: "Seleccionar estilo",
    optionsLabel: "Opciones",
    includeNumbers: "Incluir números",
    includeSpecial: "Incluir caracteres especiales",
    maxLength: "Longitud máxima",
    maxLengthUnit: (n: number) => `${n} car.`,
    minChars: "4",
    maxChars: "12",
    generateBtn: "Generar apodos ✨",
    generatedLabel: (n: number) => `Apodos generados (${n})`,
    regenerateAll: "Regenerar todos",
    copyAll: "Copiar todo",
    copiedAll: "¡Copiado!",
    copyOne: "Copiar",
    copiedOne: "Copiado",
    like: "Me gusta",
    reroll: "Regenerar",
    historyLabel: "Historial reciente",
    historyClickHint: "Clic para copiar",
    faqTitle: "Preguntas frecuentes",
    faq: [
      {
        q: "¿Cómo se usa el generador de apodos?",
        a: "Elige un estilo (Lindo, Gracioso, Cool, Gaming, Fantasía o Estético) y pulsa 'Generar apodos' para crear 8 opciones al instante. También puedes activar números, caracteres especiales y ajustar la longitud máxima.",
      },
      {
        q: "¿Cómo copio un apodo?",
        a: "Pulsa el botón de copiar en cualquier tarjeta para copiarlo individualmente, o usa 'Copiar todo' para copiar los 8 al portapapeles a la vez. También puedes hacer clic en cualquier apodo del historial para copiarlo.",
      },
      {
        q: "¿Es gratuito el generador de apodos?",
        a: "¡Sí! El generador de apodos de PickPlay es completamente gratuito — sin registro ni descarga de aplicaciones. Genera tantos apodos como quieras directamente en tu navegador.",
      },
    ],
    styles: [
      { value: "귀여운" as const, label: "Lindo", emoji: "🐱", gradient: "from-pink-400 to-rose-400" },
      { value: "웃긴" as const, label: "Gracioso", emoji: "😂", gradient: "from-yellow-400 to-orange-400" },
      { value: "멋있는" as const, label: "Cool", emoji: "😎", gradient: "from-slate-500 to-slate-700" },
      { value: "게임용" as const, label: "Gaming", emoji: "🎮", gradient: "from-blue-500 to-indigo-600" },
      { value: "판타지" as const, label: "Fantasía", emoji: "🐉", gradient: "from-purple-500 to-violet-600" },
      { value: "감성적" as const, label: "Estético", emoji: "🌙", gradient: "from-sky-400 to-blue-500" },
    ],
  },
};

type Style = "귀여운" | "웃긴" | "멋있는" | "게임용" | "판타지" | "감성적";

type NicknameCard = {
  id: string;
  text: string;
  liked: boolean;
};

const STYLE_GRADIENTS: Record<Style, string> = {
  귀여운: "from-pink-400 to-rose-400",
  웃긴: "from-yellow-400 to-orange-400",
  멋있는: "from-slate-500 to-slate-700",
  게임용: "from-blue-500 to-indigo-600",
  판타지: "from-purple-500 to-violet-600",
  감성적: "from-sky-400 to-blue-500",
};

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateOne(style: Style, includeNumbers: boolean, includeSpecial: boolean, maxLength: number): string {
  const data = nicknameData[style];
  const prefix = randomItem(data.prefix);
  const suffix = randomItem(data.suffix);
  let name = prefix + suffix;

  if (name.length > maxLength) {
    name = name.slice(0, maxLength);
  }

  const extras: string[] = [];

  if (includeNumbers && name.length < maxLength) {
    const num = String(Math.floor(Math.random() * 9000) + 1000).slice(0, maxLength - name.length);
    extras.push(num);
  }

  if (includeSpecial && name.length + extras.join("").length < maxLength) {
    const specials = ["★", "♡", "_", ".", "!", "~", "♪", "☆", "♦", "▶"];
    extras.push(randomItem(specials));
  }

  let result = name + extras.join("");
  if (result.length > maxLength) {
    result = result.slice(0, maxLength);
  }
  return result;
}

function generateBatch(
  style: Style,
  includeNumbers: boolean,
  includeSpecial: boolean,
  maxLength: number,
  count = 8
): NicknameCard[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `${Date.now()}-${i}`,
    text: generateOne(style, includeNumbers, includeSpecial, maxLength),
    liked: false,
  }));
}

export default function NicknamePage() {
  const locale = useLocale();
  const t = translations[locale];

  const [style, setStyle] = useState<Style>("귀여운");
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSpecial, setIncludeSpecial] = useState(false);
  const [maxLength, setMaxLength] = useState(8);
  const [nicknames, setNicknames] = useState<NicknameCard[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [generated, setGenerated] = useState(false);

  const activeGradient = STYLE_GRADIENTS[style];

  const generate = useCallback(() => {
    const batch = generateBatch(style, includeNumbers, includeSpecial, maxLength);
    setNicknames(batch);
    setGenerated(true);
    setHistory((prev) => {
      const newItems = batch.map((n) => n.text);
      const combined = [...newItems, ...prev];
      const seen = new Set<string>();
      const deduped: string[] = [];
      for (const item of combined) {
        if (!seen.has(item) && deduped.length < 20) {
          seen.add(item);
          deduped.push(item);
        }
      }
      return deduped;
    });
  }, [style, includeNumbers, includeSpecial, maxLength]);

  const rerollOne = useCallback(
    (id: string) => {
      setNicknames((prev) =>
        prev.map((n) =>
          n.id === id
            ? { ...n, id: `${Date.now()}-r`, text: generateOne(style, includeNumbers, includeSpecial, maxLength) }
            : n
        )
      );
    },
    [style, includeNumbers, includeSpecial, maxLength]
  );

  const toggleLike = useCallback((id: string) => {
    setNicknames((prev) =>
      prev.map((n) => (n.id === id ? { ...n, liked: !n.liked } : n))
    );
  }, []);

  const copyOne = useCallback(async (card: NicknameCard) => {
    try {
      await navigator.clipboard.writeText(card.text);
      setCopiedId(card.id);
      setTimeout(() => setCopiedId(null), 1500);
    } catch {
      // fallback silent fail
    }
  }, []);

  const copyAll = useCallback(async () => {
    if (nicknames.length === 0) return;
    try {
      await navigator.clipboard.writeText(nicknames.map((n) => n.text).join("\n"));
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 1500);
    } catch {
      // fallback silent fail
    }
  }, [nicknames]);

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50/30 to-pink-50/20 dark:from-slate-950 dark:via-violet-950/20 dark:to-pink-950/10">
        <div className="max-w-2xl mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              <span className={`bg-gradient-to-r ${activeGradient} bg-clip-text text-transparent`}>
                {t.title}
              </span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400">
              {t.subtitle}
            </p>
          </motion.div>

          {/* Style Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 mb-4"
          >
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-3">{t.styleLabel}</p>
            <div className="grid grid-cols-3 gap-2">
              {t.styles.map((s) => {
                const active = style === s.value;
                return (
                  <button
                    key={s.value}
                    onClick={() => setStyle(s.value)}
                    className={`relative flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl text-sm font-medium transition-all border-2 ${
                      active
                        ? `bg-gradient-to-br ${s.gradient} text-white border-transparent shadow-md`
                        : "border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:border-violet-300 dark:hover:border-violet-500 hover:bg-violet-50 dark:hover:bg-violet-950/20"
                    }`}
                  >
                    <span className="text-xl">{s.emoji}</span>
                    <span>{s.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 mb-4"
          >
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-4">{t.optionsLabel}</p>
            <div className="flex flex-col gap-4">
              {/* Toggles row */}
              <div className="flex gap-3">
                {/* Numbers toggle */}
                <button
                  onClick={() => setIncludeNumbers((v) => !v)}
                  className={`flex-1 flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-all ${
                    includeNumbers
                      ? "border-violet-400 bg-violet-50 dark:bg-violet-950/30 text-violet-600 dark:text-violet-400"
                      : "border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400"
                  }`}
                >
                  <span className="text-sm font-medium">{t.includeNumbers}</span>
                  <div
                    className={`w-10 h-6 rounded-full transition-colors relative ${
                      includeNumbers ? "bg-violet-500" : "bg-slate-200 dark:bg-slate-600"
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                        includeNumbers ? "translate-x-5" : "translate-x-1"
                      }`}
                    />
                  </div>
                </button>

                {/* Special toggle */}
                <button
                  onClick={() => setIncludeSpecial((v) => !v)}
                  className={`flex-1 flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-all ${
                    includeSpecial
                      ? "border-violet-400 bg-violet-50 dark:bg-violet-950/30 text-violet-600 dark:text-violet-400"
                      : "border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400"
                  }`}
                >
                  <span className="text-sm font-medium">{t.includeSpecial}</span>
                  <div
                    className={`w-10 h-6 rounded-full transition-colors relative ${
                      includeSpecial ? "bg-violet-500" : "bg-slate-200 dark:bg-slate-600"
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                        includeSpecial ? "translate-x-5" : "translate-x-1"
                      }`}
                    />
                  </div>
                </button>
              </div>

              {/* Max length */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{t.maxLength}</span>
                  <span className={`text-sm font-bold bg-gradient-to-r ${activeGradient} bg-clip-text text-transparent`}>
                    {t.maxLengthUnit(maxLength)}
                  </span>
                </div>
                <input
                  type="range"
                  min={4}
                  max={12}
                  value={maxLength}
                  onChange={(e) => setMaxLength(Number(e.target.value))}
                  className="w-full h-2 rounded-full accent-violet-500 cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>{t.minChars}</span>
                  <span>{t.maxChars}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Ad banner after options */}
          <AdBanner format="horizontal" className="my-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2" />

          {/* Generate button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            onClick={generate}
            whileTap={{ scale: 0.97 }}
            className={`w-full py-4 rounded-2xl bg-gradient-to-r ${activeGradient} text-white font-bold text-lg shadow-lg hover:shadow-xl hover:opacity-90 transition-all mb-6`}
          >
            {t.generateBtn}
          </motion.button>

          {/* Nickname grid */}
          <AnimatePresence>
            {generated && nicknames.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-6"
              >
                {/* Action row */}
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                    {t.generatedLabel(nicknames.length)}
                  </h2>
                  <div className="flex gap-2">
                    <button
                      onClick={generate}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                    >
                      {t.regenerateAll}
                    </button>
                    <button
                      onClick={copyAll}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        copiedAll
                          ? "bg-green-500 text-white"
                          : `bg-gradient-to-r ${activeGradient} text-white hover:opacity-90`
                      }`}
                    >
                      {copiedAll ? t.copiedAll : t.copyAll}
                    </button>
                  </div>
                </div>

                {/* Cards grid */}
                <div className="grid grid-cols-2 gap-3">
                  {nicknames.map((card, idx) => (
                    <motion.div
                      key={card.id}
                      initial={{ opacity: 0, scale: 0.85, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: idx * 0.04, type: "spring", stiffness: 280, damping: 20 }}
                      className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 shadow-sm hover:shadow-md transition-shadow"
                    >
                      {/* Nickname text */}
                      <p className={`text-base font-bold mb-3 bg-gradient-to-r ${activeGradient} bg-clip-text text-transparent break-all leading-tight`}>
                        {card.text}
                      </p>

                      {/* Action buttons */}
                      <div className="flex items-center gap-1.5">
                        {/* Copy */}
                        <button
                          onClick={() => copyOne(card)}
                          title={t.copyOne}
                          className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-medium transition-all ${
                            copiedId === card.id
                              ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                              : "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600"
                          }`}
                        >
                          {copiedId === card.id ? (
                            <>
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                              </svg>
                              {t.copiedOne}
                            </>
                          ) : (
                            <>
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                              {t.copyOne}
                            </>
                          )}
                        </button>

                        {/* Like */}
                        <button
                          onClick={() => toggleLike(card.id)}
                          title={t.like}
                          className={`p-1.5 rounded-lg transition-all ${
                            card.liked
                              ? "text-rose-500 bg-rose-50 dark:bg-rose-950/30"
                              : "text-slate-400 bg-slate-100 dark:bg-slate-700 hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20"
                          }`}
                        >
                          <svg className="w-3.5 h-3.5" fill={card.liked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </button>

                        {/* Re-roll */}
                        <button
                          onClick={() => rerollOne(card.id)}
                          title={t.reroll}
                          className="p-1.5 rounded-lg text-slate-400 bg-slate-100 dark:bg-slate-700 hover:text-violet-500 hover:bg-violet-50 dark:hover:bg-violet-950/20 transition-all"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Ad between grid and history */}
          {generated && (
            <AdBanner format="in-article" className="my-6 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2" />
          )}

          {/* History */}
          <AnimatePresence>
            {history.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 mb-8"
              >
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                    {t.historyLabel}
                  </h2>
                  <span className="text-xs text-slate-400">{history.length}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {history.map((item, i) => (
                    <motion.button
                      key={`${item}-${i}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.02 }}
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(item);
                        } catch {
                          // silent
                        }
                      }}
                      className="px-3 py-1.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-violet-100 dark:hover:bg-violet-950/30 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                      title={t.historyClickHint}
                    >
                      {item}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom ad */}
          <AdBanner format="rectangle" className="my-6 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2" />

          {/* FAQ Section */}
          <section className="mt-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-center">{t.faqTitle}</h2>
            <div className="space-y-4">
              {t.faq.map((item, i) => (
                <details
                  key={i}
                  className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-slate-700 dark:text-slate-200 hover:text-violet-500 transition-colors">
                    {item.q}
                    <svg className="w-5 h-5 shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="px-5 pb-5 text-slate-500 dark:text-slate-400 leading-relaxed">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </section>
        </div>
      </div>
    </PageTransition>
  );
}
