"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import AdBanner from "@/components/AdBanner";

const categories = [
  {
    id: "life",
    name: "Life Tools",
    tagline: "Smarter, faster everyday decisions",
    services: [
      {
        title: "What to Eat?",
        description:
          "Choose from 130+ menus with a personalized taste map.",
        href: "/en/food",
        emoji: "🍽️",
        gradient: "from-orange-400 to-red-500",
        bg: "bg-orange-50 dark:bg-orange-950/20",
        stat: "130+ Menus",
      },
      {
        title: "Bill Splitter",
        description:
          "Split bills with custom exclusions, differential shares, and minimum transfers.",
        href: "/en/settlement",
        emoji: "💰",
        gradient: "from-green-400 to-emerald-500",
        bg: "bg-emerald-50 dark:bg-emerald-950/20",
        stat: "Min Transfer",
      },
      {
        title: "Date Ideas",
        description:
          "200 date routes across 10 Korean cities. Find the perfect vibe on our atmosphere map.",
        href: "/en/date-course",
        emoji: "💑",
        gradient: "from-pink-400 to-purple-500",
        bg: "bg-pink-50 dark:bg-pink-950/20",
        stat: "10 Cities",
      },
      {
        title: "Random Roulette",
        description:
          "Can't decide what to eat or who goes first? Spin the wheel!",
        href: "/en/roulette",
        emoji: "🎯",
        gradient: "from-cyan-400 to-blue-500",
        bg: "bg-cyan-50 dark:bg-cyan-950/20",
        stat: "Custom Wheel",
      },
      {
        title: "D-Day Counter",
        description:
          "Track days until exams, birthdays, anniversaries — at a glance.",
        href: "/en/d-day",
        emoji: "📅",
        gradient: "from-sky-400 to-indigo-500",
        bg: "bg-sky-50 dark:bg-sky-950/20",
        stat: "D-Day",
      },
      {
        title: "Lucky Draw",
        description:
          "Fair random picking with a dramatic card-flip reveal!",
        href: "/en/draw",
        emoji: "🎫",
        gradient: "from-yellow-400 to-amber-500",
        bg: "bg-yellow-50 dark:bg-yellow-950/20",
        stat: "Card Flip",
      },
      {
        title: "Seat Arranger",
        description:
          "Randomly assign seats for classrooms, offices, or study cafes.",
        href: "/en/seat",
        emoji: "💺",
        gradient: "from-slate-400 to-zinc-500",
        bg: "bg-slate-50 dark:bg-slate-950/20",
        stat: "Presets",
      },
      {
        title: "Nickname Generator",
        description:
          "Generate random nicknames in 6 different styles — cute, cool, funny, and more.",
        href: "/en/nickname",
        emoji: "✏️",
        gradient: "from-lime-400 to-green-500",
        bg: "bg-lime-50 dark:bg-lime-950/20",
        stat: "6 Styles",
      },
      {
        title: "PDF Tools",
        description:
          "Merge, split, convert to JPG, compress PDFs — all safely in your browser.",
        href: "/en/pdf",
        emoji: "📄",
        gradient: "from-red-400 to-rose-500",
        bg: "bg-red-50 dark:bg-red-950/20",
        stat: "7 Functions",
      },
      {
        title: "Image Tools",
        description:
          "Convert, compress, resize, and crop images. Batch processing supported.",
        href: "/en/image",
        emoji: "🖼️",
        gradient: "from-blue-400 to-cyan-500",
        bg: "bg-blue-50 dark:bg-blue-950/20",
        stat: "6 Functions",
      },
      {
        title: "Ladder Game",
        description:
          "Who will be chosen? Exciting path-tracing animation keeps everyone guessing!",
        href: "/en/ladder",
        emoji: "🪜",
        gradient: "from-emerald-400 to-teal-500",
        bg: "bg-emerald-50 dark:bg-emerald-950/20",
        stat: "Path Trace",
      },
    ],
  },
  {
    id: "party",
    name: "Party Games",
    tagline: "Real-time games to play with friends",
    services: [
      {
        title: "Liar Game",
        description:
          "Find the liar among your friends! The ultimate party game.",
        href: "/en/liar-game",
        emoji: "🎭",
        gradient: "from-violet-500 to-fuchsia-500",
        bg: "bg-violet-50 dark:bg-violet-950/20",
        stat: "8 Topics",
      },
      {
        title: "Team Picker",
        description:
          "Randomly divide into fair teams with suspenseful animations!",
        href: "/en/random-team",
        emoji: "🎲",
        gradient: "from-blue-500 to-cyan-500",
        bg: "bg-blue-50 dark:bg-blue-950/20",
        stat: "Random Draw",
      },
      {
        title: "This or That",
        description:
          "Pick your side on dozens of tricky dilemmas!",
        href: "/en/balance-game",
        emoji: "⚖️",
        gradient: "from-amber-400 to-orange-500",
        bg: "bg-amber-50 dark:bg-amber-950/20",
        stat: "50+ Questions",
      },
      {
        title: "Word Quiz",
        description:
          "Guess the word from its initial letters! With hints and a timer.",
        href: "/en/chosung-quiz",
        emoji: "🔤",
        gradient: "from-teal-400 to-green-500",
        bg: "bg-teal-50 dark:bg-teal-950/20",
        stat: "100+ Words",
      },
      {
        title: "Truth or Dare",
        description:
          "392 truths and dares! Party essential sorted by intensity level.",
        href: "/en/truth-dare",
        emoji: "🔥",
        gradient: "from-red-400 to-rose-500",
        bg: "bg-red-50 dark:bg-red-950/20",
        stat: "392 Dares",
      },
      {
        title: "Ideal Type World Cup",
        description:
          "6 categories, 96 candidates! Find your ideal type in a tournament bracket.",
        href: "/en/worldcup",
        emoji: "🏆",
        gradient: "from-yellow-400 to-orange-500",
        bg: "bg-yellow-50 dark:bg-yellow-950/20",
        stat: "96 Picks",
      },
    ],
  },
  {
    id: "test",
    name: "Tests",
    tagline: "Fun personality analysis to know yourself better",
    services: [
      {
        title: "Teto vs Egen",
        description:
          "Am I a Teto or an Egen? Find out with this personality test.",
        href: "/en/teto-egen",
        emoji: "🧠",
        gradient: "from-rose-400 to-pink-500",
        bg: "bg-rose-50 dark:bg-rose-950/20",
        stat: "Personality",
      },
      {
        title: "MBTI Test",
        description:
          "Discover your MBTI personality type and compatibility in just 20 questions.",
        href: "/en/mbti",
        emoji: "✨",
        gradient: "from-indigo-400 to-purple-500",
        bg: "bg-indigo-50 dark:bg-indigo-950/20",
        stat: "16 Types",
      },
      {
        title: "Couple Compatibility",
        description:
          "Test your compatibility by name! 5-category analysis.",
        href: "/en/couple-test",
        emoji: "💕",
        gradient: "from-pink-400 to-red-500",
        bg: "bg-pink-50 dark:bg-pink-950/20",
        stat: "5 Categories",
      },
      {
        title: "Color Personality",
        description:
          "What color represents you? 10-question color personality test.",
        href: "/en/color-test",
        emoji: "🎨",
        gradient: "from-fuchsia-400 to-purple-500",
        bg: "bg-fuchsia-50 dark:bg-fuchsia-950/20",
        stat: "8 Colors",
      },
      {
        title: "Yes or No Tarot",
        description:
          "Ask the tarot cards! 22 Major Arcana cards await your question.",
        href: "/en/tarot",
        emoji: "🔮",
        gradient: "from-purple-500 to-indigo-600",
        bg: "bg-purple-50 dark:bg-purple-950/20",
        stat: "22 Cards",
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

export default function EnHome() {
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
          22 Tools · Party Games · Personality Tests
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.08 }}
          className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight"
        >
          Less hesitation,
          <br />
          <span className="bg-gradient-to-r from-primary-500 via-pink-500 to-orange-400 bg-clip-text text-transparent">
            faster choices
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.18 }}
          className="text-lg md:text-xl text-slate-500 dark:text-slate-400 mb-10 max-w-xl mx-auto leading-relaxed"
        >
          What to eat, where to go, who&apos;s the liar
          <br className="hidden md:block" />
          — one click and you&apos;re done.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.28 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            href="/en/food"
            className="px-7 py-3 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold hover:shadow-lg hover:shadow-primary-500/25 transition-all hover:-translate-y-0.5"
          >
            🍽️ What to Eat?
          </Link>
          <Link
            href="/en/liar-game"
            className="px-7 py-3 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-semibold hover:shadow-lg hover:shadow-violet-500/25 transition-all hover:-translate-y-0.5"
          >
            🎭 Liar Game
          </Link>
          <Link
            href="/en/mbti"
            className="px-7 py-3 rounded-full border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all hover:-translate-y-0.5"
          >
            ✨ MBTI Test
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
                          Get Started
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
            PickPlay helps you decide
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            <div>
              <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-2">
                What should I eat today?
              </h3>
              <p>
                Stop agonizing over what to eat every day. PickPlay recommends
                from 130+ menus including Korean, Japanese, Chinese, Western,
                and dessert — matched to your taste with our flavor map.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-2">
                Party game collection
              </h3>
              <p>
                Liar game, balance game, word quiz, truth or dare, ladder game,
                ideal type world cup, and more! 7 party games ready to play with
                friends anytime.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-2">
                Everyday utility tools
              </h3>
              <p>
                Bill splitting, D-day counting, lucky draws, seat arranging, and
                nickname generation — all your daily tools gathered in one
                place.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-2">
                Personality &amp; psychology tests
              </h3>
              <p>
                MBTI test, Teto vs Egen, couple compatibility, color personality,
                and tarot. Explore yourself with fun and varied tests.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-2">
                Date course recommendations
              </h3>
              <p>
                Get 200 curated date routes across 10 cities including Seoul and
                Busan. Personalized by mood and time of day — day or night.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-2">
                Random decision tools
              </h3>
              <p>
                Roulette, lucky draw, ladder game, team picker — when you can&apos;t
                decide, let randomness choose fairly. With dramatic animations
                for extra fun!
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
