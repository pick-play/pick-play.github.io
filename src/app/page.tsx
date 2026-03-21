"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import AdBanner from "@/components/AdBanner";

const categories = [
  {
    id: "life",
    name: "생활 도구",
    tagline: "일상의 결정을 빠르고 스마트하게",
    services: [
      {
        title: "뭐 먹지?",
        description: "130가지 메뉴에서 취향 저격 맛 지도로 골라드립니다.",
        href: "/food",
        emoji: "🍽️",
        gradient: "from-orange-400 to-red-500",
        bg: "bg-orange-50 dark:bg-orange-950/20",
        stat: "130+ 메뉴",
      },
      {
        title: "회식비 정산",
        description: "복잡한 더치페이도 깔끔하게. 항목별 제외, 차등 분할, 최소 송금까지.",
        href: "/settlement",
        emoji: "💰",
        gradient: "from-green-400 to-emerald-500",
        bg: "bg-emerald-50 dark:bg-emerald-950/20",
        stat: "최소 송금",
      },
      {
        title: "데이트 코스",
        description: "전국 10개 도시, 200가지 코스. 분위기 지도에서 완벽한 동선을.",
        href: "/date-course",
        emoji: "💑",
        gradient: "from-pink-400 to-purple-500",
        bg: "bg-pink-50 dark:bg-pink-950/20",
        stat: "10개 도시",
      },
      {
        title: "랜덤 룰렛",
        description: "뭐 먹을지, 누가 할지 고민될 때! 돌려서 결정하세요.",
        href: "/roulette",
        emoji: "🎯",
        gradient: "from-cyan-400 to-blue-500",
        bg: "bg-cyan-50 dark:bg-cyan-950/20",
        stat: "커스텀 룰렛",
      },
      {
        title: "D-Day 계산기",
        description: "중요한 날까지 남은 일수를 한눈에. 수능, 생일, 기념일까지.",
        href: "/d-day",
        emoji: "📅",
        gradient: "from-sky-400 to-indigo-500",
        bg: "bg-sky-50 dark:bg-sky-950/20",
        stat: "D-Day",
      },
      {
        title: "제비뽑기",
        description: "공정한 랜덤 뽑기! 당첨자를 카드 뒤집기로 드라마틱하게.",
        href: "/draw",
        emoji: "🎫",
        gradient: "from-yellow-400 to-amber-500",
        bg: "bg-yellow-50 dark:bg-yellow-950/20",
        stat: "카드 뽑기",
      },
      {
        title: "자리 배치",
        description: "교실, 회의실, 스터디카페 자리를 랜덤으로 깔끔하게 배정.",
        href: "/seat",
        emoji: "💺",
        gradient: "from-slate-400 to-zinc-500",
        bg: "bg-slate-50 dark:bg-slate-950/20",
        stat: "프리셋",
      },
      {
        title: "닉네임 생성기",
        description: "귀여운, 멋진, 웃긴 등 6가지 스타일의 랜덤 닉네임 생성.",
        href: "/nickname",
        emoji: "✏️",
        gradient: "from-lime-400 to-green-500",
        bg: "bg-lime-50 dark:bg-lime-950/20",
        stat: "6가지 스타일",
      },
    ],
  },
  {
    id: "party",
    name: "파티 게임",
    tagline: "친구들과 함께 즐기는 실시간 게임",
    services: [
      {
        title: "라이어 게임",
        description: "친구들과 함께하는 파티 게임! 라이어를 찾아내세요.",
        href: "/liar-game",
        emoji: "🎭",
        gradient: "from-violet-500 to-fuchsia-500",
        bg: "bg-violet-50 dark:bg-violet-950/20",
        stat: "8개 주제",
      },
      {
        title: "조 뽑기",
        description: "랜덤으로 공정하게 조를 나눠드립니다. 긴장감 넘치는 애니메이션!",
        href: "/random-team",
        emoji: "🎲",
        gradient: "from-blue-500 to-cyan-500",
        bg: "bg-blue-50 dark:bg-blue-950/20",
        stat: "랜덤 배정",
      },
      {
        title: "밸런스 게임",
        description: "이거 vs 저거! 다양한 주제의 밸런스 게임을 즐겨보세요.",
        href: "/balance-game",
        emoji: "⚖️",
        gradient: "from-amber-400 to-orange-500",
        bg: "bg-amber-50 dark:bg-amber-950/20",
        stat: "50+ 질문",
      },
      {
        title: "초성 퀴즈",
        description: "초성만 보고 단어를 맞춰보세요! 힌트와 타이머로 더 재밌게.",
        href: "/chosung-quiz",
        emoji: "🔤",
        gradient: "from-teal-400 to-green-500",
        bg: "bg-teal-50 dark:bg-teal-950/20",
        stat: "100+ 단어",
      },
      {
        title: "사다리 타기",
        description: "누가 당첨될지 두근두근! 경로 추적 애니메이션으로 흥미진진하게.",
        href: "/ladder",
        emoji: "🪜",
        gradient: "from-emerald-400 to-teal-500",
        bg: "bg-emerald-50 dark:bg-emerald-950/20",
        stat: "경로 추적",
      },
      {
        title: "진실 or 도전",
        description: "392개의 질문과 미션! 강도별로 즐기는 파티 필수 게임.",
        href: "/truth-dare",
        emoji: "🔥",
        gradient: "from-red-400 to-rose-500",
        bg: "bg-red-50 dark:bg-red-950/20",
        stat: "392개 미션",
      },
      {
        title: "이상형 월드컵",
        description: "6가지 주제, 96명의 후보! 토너먼트로 나의 이상형을 찾아보세요.",
        href: "/worldcup",
        emoji: "🏆",
        gradient: "from-yellow-400 to-orange-500",
        bg: "bg-yellow-50 dark:bg-yellow-950/20",
        stat: "96 후보",
      },
    ],
  },
  {
    id: "test",
    name: "테스트",
    tagline: "나를 알아가는 재미있는 성향 분석",
    services: [
      {
        title: "테토 vs 에겐",
        description: "나는 테토일까 에겐일까? 성향 테스트로 알아보세요.",
        href: "/teto-egen",
        emoji: "🧠",
        gradient: "from-rose-400 to-pink-500",
        bg: "bg-rose-50 dark:bg-rose-950/20",
        stat: "성향 분석",
      },
      {
        title: "MBTI 검사",
        description: "20문항으로 알아보는 나의 MBTI 성격유형과 궁합.",
        href: "/mbti",
        emoji: "✨",
        gradient: "from-indigo-400 to-purple-500",
        bg: "bg-indigo-50 dark:bg-indigo-950/20",
        stat: "16가지 유형",
      },
      {
        title: "커플 궁합",
        description: "이름으로 알아보는 우리의 궁합! 5가지 카테고리 분석.",
        href: "/couple-test",
        emoji: "💕",
        gradient: "from-pink-400 to-red-500",
        bg: "bg-pink-50 dark:bg-pink-950/20",
        stat: "5가지 분석",
      },
      {
        title: "색깔 테스트",
        description: "나를 대표하는 색깔은? 10문항으로 알아보는 컬러 성격.",
        href: "/color-test",
        emoji: "🎨",
        gradient: "from-fuchsia-400 to-purple-500",
        bg: "bg-fuchsia-50 dark:bg-fuchsia-950/20",
        stat: "8가지 색깔",
      },
      {
        title: "Yes or No 타로",
        description: "고민이 있을 때 타로 카드에 물어보세요! 22장 메이저 아르카나.",
        href: "/tarot",
        emoji: "🔮",
        gradient: "from-purple-500 to-indigo-600",
        bg: "bg-purple-50 dark:bg-purple-950/20",
        stat: "22장 카드",
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

export default function Home() {
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
          20가지 도구 · 파티 게임 · 심리 테스트
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.08 }}
          className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight"
        >
          고민은 줄이고
          <br />
          <span className="bg-gradient-to-r from-primary-500 via-pink-500 to-orange-400 bg-clip-text text-transparent">
            선택은 빠르게
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.18 }}
          className="text-lg md:text-xl text-slate-500 dark:text-slate-400 mb-10 max-w-xl mx-auto leading-relaxed"
        >
          뭐 먹을지, 어디 갈지, 누가 라이어인지
          <br className="hidden md:block" />
          — 취향 지도 한 번이면 끝.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.28 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            href="/food"
            className="px-7 py-3 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold hover:shadow-lg hover:shadow-primary-500/25 transition-all hover:-translate-y-0.5"
          >
            🍽️ 뭐 먹지?
          </Link>
          <Link
            href="/liar-game"
            className="px-7 py-3 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-semibold hover:shadow-lg hover:shadow-violet-500/25 transition-all hover:-translate-y-0.5"
          >
            🎭 라이어 게임
          </Link>
          <Link
            href="/mbti"
            className="px-7 py-3 rounded-full border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all hover:-translate-y-0.5"
          >
            ✨ MBTI 검사
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
                        <div className="flex items-center gap-1 text-sm font-medium text-primary-500 opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all">
                          시작하기
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
          <h2 className="text-xl font-bold mb-4 text-center">PickPlay가 도와드릴게요</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            <div>
              <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-2">오늘 뭐 먹지?</h3>
              <p>매일 반복되는 메뉴 고민, PickPlay가 해결해 드립니다. 한식, 일식, 중식, 양식 등 130가지 메뉴 중에서 맛 지도로 취향에 맞는 음식을 추천받으세요.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-2">파티 게임 모음</h3>
              <p>라이어 게임, 밸런스 게임, 초성 퀴즈, 진실 or 도전, 사다리 타기, 이상형 월드컵까지! 친구들과 즐길 수 있는 7가지 파티 게임.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-2">생활 편의 도구</h3>
              <p>회식비 정산, D-Day 계산, 제비뽑기, 자리 배치, 닉네임 생성까지. 일상에서 자주 쓰는 도구들을 한곳에 모았습니다.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-2">심리 & 성향 테스트</h3>
              <p>MBTI 검사, 테토 vs 에겐, 커플 궁합, 색깔 테스트, 타로까지. 다양한 테스트로 나를 알아가세요.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-2">데이트 코스 추천</h3>
              <p>서울, 부산, 대구 등 전국 10개 도시의 200가지 데이트 코스를 추천받으세요. 취향별 맞춤 코스를 낮/밤 시간대에 맞게 제공합니다.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-2">랜덤 결정 도구</h3>
              <p>룰렛, 제비뽑기, 사다리 타기, 조 뽑기 등 결정이 어려울 때 랜덤으로 공정하게! 드라마틱한 애니메이션으로 재미까지.</p>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
