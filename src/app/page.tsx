"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";

const services = [
  {
    title: "뭐 먹지?",
    description: "130가지 메뉴에서 취향 저격 맛 지도로 골라드립니다. 담백한 것? 자극적인 것? 클릭 한 번이면 끝.",
    href: "/food",
    emoji: "🍽️",
    gradient: "from-orange-400 to-red-500",
    bg: "bg-orange-50 dark:bg-orange-950/20",
    stat: "130+ 메뉴",
  },
  {
    title: "회식비 정산",
    description: "복잡한 더치페이도 깔끔하게. 항목별 제외, 차등 분할, 최소 송금까지 한 번에.",
    href: "/settlement",
    emoji: "💰",
    gradient: "from-green-400 to-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-950/20",
    stat: "최소 송금",
  },
  {
    title: "데이트 코스",
    description: "전국 10개 도시, 100가지 코스. 분위기 지도에서 원하는 느낌을 찍으면 완벽한 동선을 짜드립니다.",
    href: "/date-course",
    emoji: "💑",
    gradient: "from-pink-400 to-purple-500",
    bg: "bg-pink-50 dark:bg-pink-950/20",
    stat: "10개 도시",
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
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
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
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-block mb-6 px-4 py-1.5 rounded-full bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 text-primary-600 dark:text-primary-400 text-sm font-medium"
        >
          전국 10개 도시 · 130+ 메뉴 · 100+ 데이트 코스
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight"
        >
          고민은 줄이고
          <br />
          <span className="bg-gradient-to-r from-primary-500 via-pink-500 to-orange-400 bg-clip-text text-transparent">
            선택은 빠르게
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-lg md:text-xl text-slate-500 dark:text-slate-400 mb-10 max-w-xl mx-auto leading-relaxed"
        >
          뭐 먹을지, 어디 갈지, 돈은 어떻게 나눌지
          <br className="hidden md:block" />
          — 취향 지도 한 번이면 끝.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-center gap-3"
        >
          <Link
            href="/food"
            className="px-7 py-3 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold hover:shadow-lg hover:shadow-primary-500/25 transition-all hover:-translate-y-0.5"
          >
            메뉴 추천받기
          </Link>
          <Link
            href="/date-course"
            className="px-7 py-3 rounded-full border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all hover:-translate-y-0.5"
          >
            코스 추천받기
          </Link>
        </motion.div>
      </section>

      {/* Service Cards */}
      <section className="max-w-6xl mx-auto px-4 pb-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {services.map((service) => (
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
      </section>
    </PageTransition>
  );
}
