"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import AdBanner from "@/components/AdBanner";

const categories = [
  {
    id: "life",
    name: "便利ツール",
    tagline: "日常の選択をスピーディーにスマートに",
    services: [
      {
        title: "何食べる？",
        description: "130種類以上のメニューからお好みに合った料理を提案します。",
        href: "/jp/food",
        emoji: "🍽️",
        gradient: "from-orange-400 to-red-500",
        bg: "bg-orange-50 dark:bg-orange-950/20",
        stat: "130+ メニュー",
      },
      {
        title: "割り勘計算",
        description: "複雑な割り勘もスッキリ。項目別除外、差額分割、最小送金まで。",
        href: "/jp/settlement",
        emoji: "💰",
        gradient: "from-green-400 to-emerald-500",
        bg: "bg-emerald-50 dark:bg-emerald-950/20",
        stat: "最小送金",
      },
      {
        title: "デートコース",
        description: "韓国10都市、200種類のデートコース。雰囲気マップで完璧な動線を。",
        href: "/jp/date-course",
        emoji: "💑",
        gradient: "from-pink-400 to-purple-500",
        bg: "bg-pink-50 dark:bg-pink-950/20",
        stat: "10都市",
      },
      {
        title: "ランダムルーレット",
        description: "迷ったときに！回して決めましょう。",
        href: "/jp/roulette",
        emoji: "🎯",
        gradient: "from-cyan-400 to-blue-500",
        bg: "bg-cyan-50 dark:bg-cyan-950/20",
        stat: "カスタム対応",
      },
      {
        title: "D-Day計算機",
        description: "大切な日までの残り日数を一目で。試験、誕生日、記念日まで。",
        href: "/jp/d-day",
        emoji: "📅",
        gradient: "from-sky-400 to-indigo-500",
        bg: "bg-sky-50 dark:bg-sky-950/20",
        stat: "D-Day",
      },
      {
        title: "くじ引き",
        description: "公平なランダム抽選！カードめくりでドラマチックに。",
        href: "/jp/draw",
        emoji: "🎫",
        gradient: "from-yellow-400 to-amber-500",
        bg: "bg-yellow-50 dark:bg-yellow-950/20",
        stat: "カード抽選",
      },
      {
        title: "座席配置",
        description: "教室、会議室、スタディカフェの座席をランダムに配置。",
        href: "/jp/seat",
        emoji: "💺",
        gradient: "from-slate-400 to-zinc-500",
        bg: "bg-slate-50 dark:bg-slate-950/20",
        stat: "プリセット",
      },
      {
        title: "ニックネーム生成",
        description: "可愛い、カッコいい、面白いなど6スタイルのランダムニックネーム。",
        href: "/jp/nickname",
        emoji: "✏️",
        gradient: "from-lime-400 to-green-500",
        bg: "bg-lime-50 dark:bg-lime-950/20",
        stat: "6スタイル",
      },
      {
        title: "PDFツール",
        description: "PDF結合、分割、JPG変換、圧縮まで。ブラウザで安全に。",
        href: "/jp/pdf",
        emoji: "📄",
        gradient: "from-red-400 to-rose-500",
        bg: "bg-red-50 dark:bg-red-950/20",
        stat: "7つの機能",
      },
      {
        title: "画像ツール",
        description: "画像変換、圧縮、サイズ変更、切り抜き。一括処理も対応。",
        href: "/jp/image",
        emoji: "🖼️",
        gradient: "from-blue-400 to-cyan-500",
        bg: "bg-blue-50 dark:bg-blue-950/20",
        stat: "6つの機能",
      },
      {
        title: "あみだくじ",
        description: "誰が当たり？ドキドキの経路追跡アニメーション！",
        href: "/jp/ladder",
        emoji: "🪜",
        gradient: "from-emerald-400 to-teal-500",
        bg: "bg-emerald-50 dark:bg-emerald-950/20",
        stat: "経路追跡",
      },
    ],
  },
  {
    id: "party",
    name: "パーティーゲーム",
    tagline: "友達と一緒に楽しむリアルタイムゲーム",
    services: [
      {
        title: "ライアーゲーム",
        description: "友達と一緒にライアーを探せ！",
        href: "/jp/liar-game",
        emoji: "🎭",
        gradient: "from-violet-500 to-fuchsia-500",
        bg: "bg-violet-50 dark:bg-violet-950/20",
        stat: "8テーマ",
      },
      {
        title: "チーム分け",
        description: "ランダムで公平にチームを分けます。臨場感あるアニメーション！",
        href: "/jp/random-team",
        emoji: "🎲",
        gradient: "from-blue-500 to-cyan-500",
        bg: "bg-blue-50 dark:bg-blue-950/20",
        stat: "ランダム配分",
      },
      {
        title: "バランスゲーム",
        description: "これvsあれ！様々なテーマのバランスゲームを楽しもう。",
        href: "/jp/balance-game",
        emoji: "⚖️",
        gradient: "from-amber-400 to-orange-500",
        bg: "bg-amber-50 dark:bg-amber-950/20",
        stat: "50+ 質問",
      },
      {
        title: "ワードクイズ",
        description: "頭文字だけで単語を当てよう！ヒントとタイマー付き。",
        href: "/jp/chosung-quiz",
        emoji: "🔤",
        gradient: "from-teal-400 to-green-500",
        bg: "bg-teal-50 dark:bg-teal-950/20",
        stat: "100+ 単語",
      },
      {
        title: "真実か挑戦か",
        description: "392の質問とミッション！レベル別に楽しむパーティー必須ゲーム。",
        href: "/jp/truth-dare",
        emoji: "🔥",
        gradient: "from-red-400 to-rose-500",
        bg: "bg-red-50 dark:bg-red-950/20",
        stat: "392ミッション",
      },
      {
        title: "理想型ワールドカップ",
        description: "6カテゴリー、96人の候補！トーナメントであなたの理想型を見つけよう。",
        href: "/jp/worldcup",
        emoji: "🏆",
        gradient: "from-yellow-400 to-orange-500",
        bg: "bg-yellow-50 dark:bg-yellow-950/20",
        stat: "96候補",
      },
    ],
  },
  {
    id: "test",
    name: "テスト",
    tagline: "自分を知る楽しい性格分析",
    services: [
      {
        title: "テトvsエゲン",
        description: "外向型？内向型？韓国発の性格診断テストで確認しよう。",
        href: "/jp/teto-egen",
        emoji: "🧠",
        gradient: "from-rose-400 to-pink-500",
        bg: "bg-rose-50 dark:bg-rose-950/20",
        stat: "性格分析",
      },
      {
        title: "MBTI診断",
        description: "20問であなたのMBTI性格タイプと相性を診断。",
        href: "/jp/mbti",
        emoji: "✨",
        gradient: "from-indigo-400 to-purple-500",
        bg: "bg-indigo-50 dark:bg-indigo-950/20",
        stat: "16タイプ",
      },
      {
        title: "カップル相性",
        description: "名前で分かるふたりの相性！5カテゴリー分析。",
        href: "/jp/couple-test",
        emoji: "💕",
        gradient: "from-pink-400 to-red-500",
        bg: "bg-pink-50 dark:bg-pink-950/20",
        stat: "5つの分析",
      },
      {
        title: "カラー性格診断",
        description: "あなたを表す色は？10問で分かるカラー性格。",
        href: "/jp/color-test",
        emoji: "🎨",
        gradient: "from-fuchsia-400 to-purple-500",
        bg: "bg-fuchsia-50 dark:bg-fuchsia-950/20",
        stat: "8色",
      },
      {
        title: "Yes or No タロット",
        description: "悩みがあるときタロットカードに聞いてみよう！22枚のメジャーアルカナ。",
        href: "/jp/tarot",
        emoji: "🔮",
        gradient: "from-purple-500 to-indigo-600",
        bg: "bg-purple-50 dark:bg-purple-950/20",
        stat: "22枚のカード",
      },
    ],
  },
];

const floatingEmoji = [
  { emoji: "🍕", x: "10%", y: "20%", delay: 0, duration: 6 },
  { emoji: "🍜", x: "85%", y: "15%", delay: 1.5, duration: 7 },
  { emoji: "☕", x: "75%", y: "65%", delay: 0.8, duration: 5.5 },
  { emoji: "🎮", x: "15%", y: "70%", delay: 2.2, duration: 6.5 },
  { emoji: "💸", x: "90%", y: "45%", delay: 0.5, duration: 7.5 },
  { emoji: "🗺️", x: "5%", y: "45%", delay: 1.8, duration: 6.2 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const sectionHeaderVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

export default function JpHome() {
  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative max-w-6xl mx-auto px-4 pt-20 pb-20 text-center overflow-hidden">
        {/* Floating decorative emoji */}
        {floatingEmoji.map((item, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl md:text-4xl opacity-[0.12] dark:opacity-[0.08] pointer-events-none select-none"
            style={{ left: item.x, top: item.y }}
            animate={{
              y: [0, -18, 0, 18, 0],
              rotate: [0, 8, 0, -8, 0],
            }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              delay: item.delay,
              ease: "easeInOut",
            }}
          >
            {item.emoji}
          </motion.div>
        ))}

        {/* Gradient orbs */}
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-primary-400/10 dark:bg-primary-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-pink-400/10 dark:bg-pink-400/5 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="inline-block mb-6 px-4 py-1.5 rounded-full bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 text-primary-600 dark:text-primary-400 text-sm font-medium"
        >
          22のツール · パーティーゲーム · 性格診断
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.08 }}
          className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight"
        >
          悩みを減らし、
          <br />
          <span className="bg-gradient-to-r from-primary-500 via-pink-500 to-orange-400 bg-clip-text text-transparent">
            選択をスピーディーに
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.18 }}
          className="text-lg md:text-xl text-slate-500 dark:text-slate-400 mb-10 max-w-xl mx-auto leading-relaxed"
        >
          何食べる？どこ行く？誰がライアー？
          <br className="hidden md:block" />
          — ワンクリックで解決。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.28 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            href="/jp/food"
            className="px-7 py-3 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold hover:shadow-lg hover:shadow-primary-500/25 transition-all hover:-translate-y-0.5"
          >
            🍽️ 何食べる？
          </Link>
          <Link
            href="/jp/liar-game"
            className="px-7 py-3 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-semibold hover:shadow-lg hover:shadow-violet-500/25 transition-all hover:-translate-y-0.5"
          >
            🎭 ライアーゲーム
          </Link>
          <Link
            href="/jp/mbti"
            className="px-7 py-3 rounded-full border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all hover:-translate-y-0.5"
          >
            ✨ MBTI診断
          </Link>
        </motion.div>
      </section>

      <div className="max-w-6xl mx-auto px-4">
        <AdBanner
          format="horizontal"
          className="my-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2"
        />
      </div>

      {/* Categorized Service Cards */}
      <section className="max-w-6xl mx-auto px-4 pb-24 space-y-16">
        {categories.map((category, categoryIndex) => (
          <div key={category.id}>
            {/* Category Header */}
            <motion.div
              variants={sectionHeaderVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="flex items-center gap-4 mb-6"
            >
              <div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                  {category.name}
                </h2>
                <p className="text-sm text-slate-400 dark:text-slate-500 mt-0.5">
                  {category.tagline}
                </p>
              </div>
              <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700/60" />
            </motion.div>

            {/* Service Cards Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
            >
              {category.services.map((service) => (
                <motion.div key={service.href} variants={itemVariants}>
                  <Link href={service.href} className="block group h-full">
                    <div
                      className={`relative h-full p-7 rounded-2xl ${service.bg} border border-slate-200/60 dark:border-slate-700/60 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden`}
                    >
                      {/* Subtle gradient accent */}
                      <div
                        className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${service.gradient} opacity-[0.06] rounded-bl-full`}
                      />

                      <div className="relative">
                        <div className="text-4xl mb-4">{service.emoji}</div>
                        <div className="flex items-center gap-2 mb-3">
                          <h3 className="text-xl font-bold group-hover:text-primary-500 transition-colors">
                            {service.title}
                          </h3>
                          <span
                            className={`px-2 py-0.5 text-[11px] font-bold rounded-full bg-gradient-to-r ${service.gradient} text-white`}
                          >
                            {service.stat}
                          </span>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4">
                          {service.description}
                        </p>
                        <div className="flex items-center gap-1 text-sm font-medium text-primary-500 translate-x-0 group-hover:translate-x-1 transition-all">
                          始める
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {categoryIndex === 1 && (
              <div className="mt-10">
                <AdBanner
                  format="horizontal"
                  className="my-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2"
                />
              </div>
            )}
          </div>
        ))}
      </section>

      <div className="max-w-4xl mx-auto px-4 mb-8">
        <AdBanner
          format="horizontal"
          className="rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2"
        />
      </div>

      {/* SEO Content Section */}
      <section className="max-w-4xl mx-auto px-4 pb-20">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-bold mb-4 text-center">
            PickPlayがお手伝いします
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            <div>
              <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-2">
                今日何食べる？
              </h3>
              <p>
                毎日悩む食事の選択、PickPlayが解決します。和食、洋食、中華、韓国料理など130種類以上のメニューから、お好みマップで料理を提案します。
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-2">
                パーティーゲーム集
              </h3>
              <p>
                ライアーゲーム、バランスゲーム、ワードクイズ、真実か挑戦か、あみだくじ、理想型ワールドカップまで！友達と楽しめる7つのパーティーゲーム。
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-2">
                便利な生活ツール
              </h3>
              <p>
                割り勘計算、D-Day計算、くじ引き、座席配置、ニックネーム生成まで。日常でよく使うツールをひとまとめに。
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-2">
                性格・性向テスト
              </h3>
              <p>
                MBTI診断、テトvsエゲン、カップル相性、カラー性格診断、タロットまで。様々なテストで自分を発見しよう。
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-2">
                デートコース提案
              </h3>
              <p>
                韓国の10都市、200種類のデートコースを提案。昼・夜の時間帯に合わせたカスタムコースを提供します。
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-2">
                ランダム決定ツール
              </h3>
              <p>
                ルーレット、くじ引き、あみだくじ、チーム分けなど、決められないときはランダムで公平に！ドラマチックなアニメーションで楽しさも倍増。
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
