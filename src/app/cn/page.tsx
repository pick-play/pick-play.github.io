"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import AdBanner from "@/components/AdBanner";

const categories = [
  {
    id: "life",
    name: "生活工具",
    tagline: "日常决策，快速又聪明",
    services: [
      {
        title: "吃什么？",
        description: "从130多种菜品中，根据你的口味偏好推荐最合适的美食。",
        href: "/cn/food",
        emoji: "🍽️",
        gradient: "from-orange-400 to-red-500",
        bg: "bg-orange-50 dark:bg-orange-950/20",
        stat: "130+ 菜品",
      },
      {
        title: "AA算账",
        description: "复杂的AA也轻松搞定。支持项目排除、差额分摊、最小转账次数。",
        href: "/cn/settlement",
        emoji: "💰",
        gradient: "from-green-400 to-emerald-500",
        bg: "bg-emerald-50 dark:bg-emerald-950/20",
        stat: "最少转账",
      },
      {
        title: "约会路线",
        description: "韩国10个城市，200条约会路线。在氛围地图上找到完美动线。",
        href: "/cn/date-course",
        emoji: "💑",
        gradient: "from-pink-400 to-purple-500",
        bg: "bg-pink-50 dark:bg-pink-950/20",
        stat: "10个城市",
      },
      {
        title: "随机轮盘",
        description: "吃什么、谁来做，选择困难？转动轮盘帮你决定！",
        href: "/cn/roulette",
        emoji: "🎯",
        gradient: "from-cyan-400 to-blue-500",
        bg: "bg-cyan-50 dark:bg-cyan-950/20",
        stat: "自定义轮盘",
      },
      {
        title: "倒计时",
        description: "重要日期一目了然。考试、生日、纪念日倒计时全搞定。",
        href: "/cn/d-day",
        emoji: "📅",
        gradient: "from-sky-400 to-indigo-500",
        bg: "bg-sky-50 dark:bg-sky-950/20",
        stat: "D-Day",
      },
      {
        title: "抽签",
        description: "公平随机抽签！翻牌揭晓，戏剧性满分。",
        href: "/cn/draw",
        emoji: "🎫",
        gradient: "from-yellow-400 to-amber-500",
        bg: "bg-yellow-50 dark:bg-yellow-950/20",
        stat: "翻牌抽签",
      },
      {
        title: "座位安排",
        description: "教室、会议室、自习室座位随机分配，整齐高效。",
        href: "/cn/seat",
        emoji: "💺",
        gradient: "from-slate-400 to-zinc-500",
        bg: "bg-slate-50 dark:bg-slate-950/20",
        stat: "预设模板",
      },
      {
        title: "昵称生成器",
        description: "可爱、酷炫、搞笑等6种风格的随机昵称，一键生成。",
        href: "/cn/nickname",
        emoji: "✏️",
        gradient: "from-lime-400 to-green-500",
        bg: "bg-lime-50 dark:bg-lime-950/20",
        stat: "6种风格",
      },
      {
        title: "PDF工具",
        description: "PDF合并、拆分、转JPG、压缩，浏览器内安全处理，无需上传服务器。",
        href: "/cn/pdf",
        emoji: "📄",
        gradient: "from-red-400 to-rose-500",
        bg: "bg-red-50 dark:bg-red-950/20",
        stat: "7种功能",
      },
      {
        title: "图片工具",
        description: "图片转换、压缩、调整大小、裁剪。支持批量处理，一次搞定。",
        href: "/cn/image",
        emoji: "🖼️",
        gradient: "from-blue-400 to-cyan-500",
        bg: "bg-blue-50 dark:bg-blue-950/20",
        stat: "6种功能",
      },
      {
        title: "梯子游戏",
        description: "谁会中奖？精彩的路径追踪动画，结果悬念十足！",
        href: "/cn/ladder",
        emoji: "🪜",
        gradient: "from-emerald-400 to-teal-500",
        bg: "bg-emerald-50 dark:bg-emerald-950/20",
        stat: "路径追踪",
      },
    ],
  },
  {
    id: "party",
    name: "派对游戏",
    tagline: "和朋友一起玩的实时互动游戏",
    services: [
      {
        title: "谁是卧底",
        description: "和朋友们一起找出卧底！终极派对游戏，欢笑不停。",
        href: "/cn/liar-game",
        emoji: "🎭",
        gradient: "from-violet-500 to-fuchsia-500",
        bg: "bg-violet-50 dark:bg-violet-950/20",
        stat: "8个主题",
      },
      {
        title: "随机分组",
        description: "随机公平分组，配上紧张刺激的动画效果！",
        href: "/cn/random-team",
        emoji: "🎲",
        gradient: "from-blue-500 to-cyan-500",
        bg: "bg-blue-50 dark:bg-blue-950/20",
        stat: "随机分配",
      },
      {
        title: "二选一",
        description: "这个vs那个！各种主题的二选一平衡游戏，考验你的选择。",
        href: "/cn/balance-game",
        emoji: "⚖️",
        gradient: "from-amber-400 to-orange-500",
        bg: "bg-amber-50 dark:bg-amber-950/20",
        stat: "50+ 问题",
      },
      {
        title: "猜词游戏",
        description: "根据首字母猜单词（韩语猜词游戏）！带提示和计时器，越玩越上头。",
        href: "/cn/chosung-quiz",
        emoji: "🔤",
        gradient: "from-teal-400 to-green-500",
        bg: "bg-teal-50 dark:bg-teal-950/20",
        stat: "100+ 词汇",
      },
      {
        title: "真心话大冒险",
        description: "392个问题和任务！按难度等级享受派对必备游戏。",
        href: "/cn/truth-dare",
        emoji: "🔥",
        gradient: "from-red-400 to-rose-500",
        bg: "bg-red-50 dark:bg-red-950/20",
        stat: "392个任务",
      },
      {
        title: "理想型世界杯",
        description: "6大类别，96位候选人！淘汰赛找到你的完美理想型。",
        href: "/cn/worldcup",
        emoji: "🏆",
        gradient: "from-yellow-400 to-orange-500",
        bg: "bg-yellow-50 dark:bg-yellow-950/20",
        stat: "96位候选",
      },
    ],
  },
  {
    id: "test",
    name: "测试",
    tagline: "了解自己的有趣性格分析",
    services: [
      {
        title: "人格测试",
        description: "你是外向型(Teto)还是内向型(Egen)？韩国热门性格测试。",
        href: "/cn/teto-egen",
        emoji: "🧠",
        gradient: "from-rose-400 to-pink-500",
        bg: "bg-rose-50 dark:bg-rose-950/20",
        stat: "性格分析",
      },
      {
        title: "MBTI测试",
        description: "20道题了解你的MBTI性格类型和配对匹配度。",
        href: "/cn/mbti",
        emoji: "✨",
        gradient: "from-indigo-400 to-purple-500",
        bg: "bg-indigo-50 dark:bg-indigo-950/20",
        stat: "16种类型",
      },
      {
        title: "情侣配对",
        description: "通过名字测试你们的默契！5维度全面分析。",
        href: "/cn/couple-test",
        emoji: "💕",
        gradient: "from-pink-400 to-red-500",
        bg: "bg-pink-50 dark:bg-pink-950/20",
        stat: "5项分析",
      },
      {
        title: "颜色性格测试",
        description: "代表你的颜色是什么？10道题揭开你的颜色性格。",
        href: "/cn/color-test",
        emoji: "🎨",
        gradient: "from-fuchsia-400 to-purple-500",
        bg: "bg-fuchsia-50 dark:bg-fuchsia-950/20",
        stat: "8种颜色",
      },
      {
        title: "Yes or No 塔罗",
        description: "有烦恼时问问塔罗牌！22张大阿尔卡纳为你指引方向。",
        href: "/cn/tarot",
        emoji: "🔮",
        gradient: "from-purple-500 to-indigo-600",
        bg: "bg-purple-50 dark:bg-purple-950/20",
        stat: "22张牌",
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

export default function CnHome() {
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
          22种工具 · 派对游戏 · 性格测试
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.08 }}
          className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight"
        >
          减少纠结，
          <br />
          <span className="bg-gradient-to-r from-primary-500 via-pink-500 to-orange-400 bg-clip-text text-transparent">
            快速选择
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.18 }}
          className="text-lg md:text-xl text-slate-500 dark:text-slate-400 mb-10 max-w-xl mx-auto leading-relaxed"
        >
          吃什么、去哪里、谁是卧底
          <br className="hidden md:block" />
          — 一键搞定。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.28 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            href="/cn/food"
            className="px-7 py-3 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold hover:shadow-lg hover:shadow-primary-500/25 transition-all hover:-translate-y-0.5"
          >
            🍽️ 吃什么？
          </Link>
          <Link
            href="/cn/liar-game"
            className="px-7 py-3 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-semibold hover:shadow-lg hover:shadow-violet-500/25 transition-all hover:-translate-y-0.5"
          >
            🎭 谁是卧底
          </Link>
          <Link
            href="/cn/mbti"
            className="px-7 py-3 rounded-full border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all hover:-translate-y-0.5"
          >
            ✨ MBTI测试
          </Link>
        </motion.div>
      </section>

      <div className="max-w-6xl mx-auto px-4"><AdBanner format="horizontal" className="my-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2" /></div>

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
                          开始使用
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
                <AdBanner format="horizontal" className="my-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2" />
              </div>
            )}
          </div>
        ))}
      </section>

      <div className="max-w-4xl mx-auto px-4 mb-8"><AdBanner format="horizontal" className="rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2" /></div>

      {/* SEO Content Section */}
      <section className="max-w-4xl mx-auto px-4 pb-20">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-bold mb-4 text-center">PickPlay 为你解决这些烦恼</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            <div>
              <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-2">今天吃什么？</h3>
              <p>每天都在纠结吃什么？PickPlay帮你解决！中餐、日料、韩餐、西餐等130多种菜品，根据口味偏好智能推荐，告别选择困难。</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-2">派对游戏合集</h3>
              <p>谁是卧底、二选一、猜词游戏、真心话大冒险、梯子游戏、理想型世界杯！7款派对游戏，让聚会嗨翻天。</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-2">生活实用工具</h3>
              <p>AA算账、倒计时、抽签、座位安排、昵称生成器，日常高频工具一网打尽，全部免费使用。</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-2">性格与心理测试</h3>
              <p>MBTI测试、人格测试、情侣配对、颜色性格、塔罗占卜，多种测试帮你了解自己和身边的人。</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-2">约会路线推荐</h3>
              <p>韩国10个城市200条精选约会路线，按氛围和时段推荐，白天夜晚都有完美方案，约会不再发愁。</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-2">随机决策工具</h3>
              <p>轮盘、抽签、梯子游戏、随机分组，选择困难时交给随机来决定！精彩动画效果让结果更有趣。</p>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
