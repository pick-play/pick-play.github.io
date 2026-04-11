"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import AdBanner from "@/components/AdBanner";
import StatsCounter from "@/components/StatsCounter";
import ToolSearchBar, { Tool } from "@/components/ToolSearchBar";
import ShareButtons from "@/components/ShareButtons";

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
      {
        title: "PDF 도구",
        description: "PDF 합치기, 분할, JPG 변환, 압축까지. 브라우저에서 안전하게.",
        href: "/pdf",
        emoji: "📄",
        gradient: "from-red-400 to-rose-500",
        bg: "bg-red-50 dark:bg-red-950/20",
        stat: "7가지 기능",
      },
      {
        title: "이미지 도구",
        description: "이미지 변환, 압축, 크기 변경, 자르기. 한 번에 여러 장도 OK.",
        href: "/image",
        emoji: "🖼️",
        gradient: "from-blue-400 to-cyan-500",
        bg: "bg-blue-50 dark:bg-blue-950/20",
        stat: "6가지 기능",
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
        title: "비밀번호 생성기",
        description: "강력하고 안전한 랜덤 비밀번호를 즉시 생성. 강도 표시까지.",
        href: "/password",
        emoji: "🔐",
        gradient: "from-emerald-500 to-teal-500",
        bg: "bg-emerald-50 dark:bg-emerald-950/20",
        stat: "안전 생성",
      },
      {
        title: "글자수 세기",
        description: "글자수, 단어수, 바이트 수를 실시간으로 확인. 키워드 밀도까지.",
        href: "/text-counter",
        emoji: "📝",
        gradient: "from-blue-500 to-indigo-500",
        bg: "bg-blue-50 dark:bg-blue-950/20",
        stat: "실시간 카운트",
      },
      {
        title: "랜덤 숫자",
        description: "범위 지정 랜덤 숫자 생성. 로또 번호, 주사위 등 프리셋 제공.",
        href: "/random-number",
        emoji: "🔢",
        gradient: "from-amber-500 to-orange-500",
        bg: "bg-amber-50 dark:bg-amber-950/20",
        stat: "로또 프리셋",
      },
      {
        title: "타이머",
        description: "카운트다운 타이머와 스톱워치. 프리셋, 랩 타임, 알림까지.",
        href: "/timer",
        emoji: "⏱️",
        gradient: "from-rose-500 to-pink-500",
        bg: "bg-rose-50 dark:bg-rose-950/20",
        stat: "타이머+스톱워치",
      },
      {
        title: "QR 코드 생성기",
        description: "텍스트나 URL을 QR 코드로 변환. 색상 커스텀, 다운로드 지원.",
        href: "/qr-code",
        emoji: "📱",
        gradient: "from-violet-500 to-purple-500",
        bg: "bg-violet-50 dark:bg-violet-950/20",
        stat: "즉시 생성",
      },
      {
        title: "나이 계산기",
        description: "만 나이, 띠, 별자리, 생일 카운트다운까지 한 번에.",
        href: "/age-calculator",
        emoji: "🎂",
        gradient: "from-cyan-500 to-blue-500",
        bg: "bg-cyan-50 dark:bg-cyan-950/20",
        stat: "만 나이+띠",
      },
      {
        title: "퍼센트 계산기",
        description: "백분율 계산, 변화율, 팁 계산까지 간편하게.",
        href: "/percentage",
        emoji: "📊",
        gradient: "from-green-500 to-emerald-500",
        bg: "bg-green-50 dark:bg-green-950/20",
        stat: "3가지 모드",
      },
      {
        title: "BMI 계산기",
        description: "키와 체중으로 체질량지수 측정. 정상 체중 범위 안내.",
        href: "/bmi",
        emoji: "⚕️",
        gradient: "from-teal-500 to-cyan-500",
        bg: "bg-teal-50 dark:bg-teal-950/20",
        stat: "건강 체크",
      },
      {
        title: "단위 변환기",
        description: "길이, 무게, 온도, 넓이, 속도 등 7가지 단위 변환.",
        href: "/unit-converter",
        emoji: "📐",
        gradient: "from-indigo-500 to-violet-500",
        bg: "bg-indigo-50 dark:bg-indigo-950/20",
        stat: "7가지 카테고리",
      },
    ],
  },
  {
    id: "arcade",
    name: "아케이드",
    tagline: "중독성 있는 도전 게임으로 실력 테스트",
    services: [
      {
        title: "반응속도 테스트",
        description: "초록색이 되면 클릭! 나의 반응속도는 몇 ms?",
        href: "/reaction-test",
        emoji: "⚡",
        gradient: "from-red-500 to-orange-500",
        bg: "bg-red-50 dark:bg-red-950/20",
        stat: "ms 측정",
      },
      {
        title: "타이핑 속도",
        description: "60초 타이핑 테스트. WPM으로 실력을 확인하세요.",
        href: "/typing-test",
        emoji: "⌨️",
        gradient: "from-sky-500 to-blue-500",
        bg: "bg-sky-50 dark:bg-sky-950/20",
        stat: "WPM 측정",
      },
      {
        title: "기억력 게임",
        description: "카드를 뒤집어 짝을 맞추세요. 3단계 난이도.",
        href: "/memory-game",
        emoji: "🃏",
        gradient: "from-fuchsia-500 to-pink-500",
        bg: "bg-fuchsia-50 dark:bg-fuchsia-950/20",
        stat: "카드 매칭",
      },
      {
        title: "색깔 맞추기",
        description: "스트룹 테스트! 글자색과 단어를 구분하세요.",
        href: "/color-match",
        emoji: "🌈",
        gradient: "from-yellow-500 to-red-500",
        bg: "bg-yellow-50 dark:bg-yellow-950/20",
        stat: "콤보 도전",
      },
      {
        title: "에임 테스트",
        description: "나타나는 타겟을 빠르게 클릭! 정확도 훈련.",
        href: "/aim-test",
        emoji: "🎯",
        gradient: "from-orange-500 to-red-500",
        bg: "bg-orange-50 dark:bg-orange-950/20",
        stat: "정확도 %",
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
  {
    id: "finance",
    name: "금융 계산기",
    tagline: "대출, 연봉, 투자 — 돈 계산은 정확하게",
    services: [
      {
        title: "대출이자 계산기",
        description: "원리금균등, 원금균등, 만기일시 상환 비교. 월별 상환 스케줄까지.",
        href: "/loan-calculator",
        emoji: "🏦",
        gradient: "from-emerald-500 to-green-500",
        bg: "bg-emerald-50 dark:bg-emerald-950/20",
        stat: "3가지 상환",
      },
      {
        title: "퇴직금 계산기",
        description: "근속연수와 급여로 퇴직금 자동 계산. 퇴직소득세 포함.",
        href: "/severance-calculator",
        emoji: "💼",
        gradient: "from-blue-500 to-indigo-500",
        bg: "bg-blue-50 dark:bg-blue-950/20",
        stat: "세금 포함",
      },
      {
        title: "연봉 실수령액",
        description: "4대보험, 소득세 자동 공제. 연봉별 실수령액 비교.",
        href: "/salary-calculator",
        emoji: "💰",
        gradient: "from-violet-500 to-purple-500",
        bg: "bg-violet-50 dark:bg-violet-950/20",
        stat: "4대보험 계산",
      },
      {
        title: "복리 계산기",
        description: "단리/복리 비교, 적립식 투자 시뮬레이션. 72법칙 안내.",
        href: "/compound-calculator",
        emoji: "📈",
        gradient: "from-amber-500 to-yellow-500",
        bg: "bg-amber-50 dark:bg-amber-950/20",
        stat: "투자 시뮬",
      },
      {
        title: "취득세 계산기",
        description: "주택/토지/상가 취득세. 다주택·생애최초 감면 자동 적용.",
        href: "/property-tax",
        emoji: "🏠",
        gradient: "from-sky-500 to-blue-500",
        bg: "bg-sky-50 dark:bg-sky-950/20",
        stat: "부동산 세금",
      },
      {
        title: "환율 계산기",
        description: "실시간 환율로 20개국 통화 변환. 인기 환율 빠른 조회.",
        href: "/currency-converter",
        emoji: "💱",
        gradient: "from-teal-500 to-emerald-500",
        bg: "bg-teal-50 dark:bg-teal-950/20",
        stat: "실시간 환율",
      },
    ],
  },
];

// Derive flat tool list from categories for the search bar
const allTools: Tool[] = categories.flatMap((cat) =>
  cat.services.map((s) => ({
    title: s.title,
    description: s.description,
    href: s.href,
    emoji: s.emoji,
    category: cat.name,
  }))
);

const floatingEmoji = [
  { emoji: "⚡", x: "10%", y: "20%", delay: 0, duration: 6 },
  { emoji: "🎮", x: "85%", y: "15%", delay: 1.5, duration: 7 },
  { emoji: "🧠", x: "75%", y: "65%", delay: 0.8, duration: 5.5 },
  { emoji: "🎯", x: "15%", y: "70%", delay: 2.2, duration: 6.5 },
  { emoji: "📊", x: "90%", y: "45%", delay: 0.5, duration: 7.5 },
  { emoji: "🔮", x: "5%", y: "45%", delay: 1.8, duration: 6.2 },
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
          42가지 도구 · 금융 계산기 · 아케이드 · 파티 게임
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
          생활 도구, 금융 계산기, 아케이드, 파티 게임
          <br className="hidden md:block" />
          — 42가지 무료 도구를 지금 바로.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.28 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            href="#life"
            className="px-7 py-3 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold hover:shadow-lg hover:shadow-primary-500/25 transition-all hover:-translate-y-0.5"
          >
            🛠️ 생활 도구
          </Link>
          <Link
            href="#arcade"
            className="px-7 py-3 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-semibold hover:shadow-lg hover:shadow-violet-500/25 transition-all hover:-translate-y-0.5"
          >
            ⚡ 아케이드
          </Link>
          <Link
            href="#party"
            className="px-7 py-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold hover:shadow-lg hover:shadow-amber-500/25 transition-all hover:-translate-y-0.5"
          >
            🎭 파티 게임
          </Link>
          <Link
            href="#test"
            className="px-7 py-3 rounded-full border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all hover:-translate-y-0.5"
          >
            ✨ 심리 테스트
          </Link>
        </motion.div>

        {/* Tool Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.38 }}
          className="mt-10"
        >
          <ToolSearchBar tools={allTools} placeholder="어떤 도구를 찾으시나요?" />
        </motion.div>
      </section>

      {/* About PickPlay Section */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700">
          <h2 className="text-2xl font-bold mb-4">PickPlay란?</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
            PickPlay는 일상의 크고 작은 선택을 도와주는 무료 온라인 도구 모음입니다.
            회원가입 없이, 설치 없이, 브라우저만 있으면 바로 사용할 수 있습니다.
            뭐 먹을지 고민될 때, 팀을 나눠야 할 때, 대출 이자를 계산할 때,
            친구들과 파티 게임을 즐길 때 — PickPlay가 도와드립니다.
          </p>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
            현재 42가지 도구를 한국어, English, 日本語, 中文, Español 5개 언어로 제공하고 있으며,
            생활 도구, 금융 계산기, 아케이드 게임, 파티 게임, 심리 테스트 등
            다양한 카테고리의 도구를 무료로 이용할 수 있습니다.
          </p>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
            모든 데이터는 사용자의 브라우저에서 처리되며, 서버에 개인정보를 저장하지 않습니다.
            안심하고 사용하세요.
          </p>
        </div>
      </section>

      {/* Stats Counter - Social Proof */}
      <StatsCounter />

      <div className="max-w-6xl mx-auto px-4"><AdBanner format="in-article" className="my-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2" /></div>

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

          </div>
        ))}
      </section>

      {/* Share Buttons - Floating */}
      <ShareButtons />

      {/* Blog Highlight */}
      <section className="max-w-4xl mx-auto px-4 mb-8">
        <div className="bg-gradient-to-r from-primary-50 to-violet-50 dark:from-primary-950/20 dark:to-violet-950/20 rounded-2xl p-8 border border-primary-100 dark:border-primary-800">
          <h2 className="text-xl font-bold mb-2">PickPlay 블로그</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-4">
            유용한 팁과 가이드를 확인하세요. 비밀번호 보안, 복리의 마법, 대출 상환 방식 비교 등
            다양한 주제의 글을 읽어보실 수 있습니다.
          </p>
          <Link href="/blog" className="inline-flex items-center gap-1 text-primary-500 font-semibold hover:underline">
            블로그 보러가기 →
          </Link>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="max-w-4xl mx-auto px-4 pb-20">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-bold mb-4 text-center">PickPlay가 도와드릴게요</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            <div>
              <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-2">오늘 뭐 먹지?</h3>
              <p>매일 반복되는 메뉴 고민, PickPlay가 해결해 드립니다. 한식, 일식, 중식, 양식 등 130가지 메뉴 중에서 맛 지도로 취향에 맞는 음식을 추천받으세요. 매운 정도, 가격대, 분위기까지 조건을 설정하면 딱 맞는 메뉴를 바로 골라줍니다. 혼밥부터 단체 회식까지 어떤 상황에서도 유용하게 활용할 수 있습니다.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-2">파티 게임 모음</h3>
              <p>라이어 게임, 밸런스 게임, 초성 퀴즈, 진실 or 도전, 사다리 타기, 이상형 월드컵까지 7가지 파티 게임을 무료로 즐길 수 있습니다. 설치나 로그인 없이 링크 하나로 친구들과 바로 시작할 수 있어 모임이나 회식 자리에서 특히 인기입니다. 각 게임은 모바일에서도 쾌적하게 작동하도록 최적화되어 있습니다.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-2">생활 편의 도구</h3>
              <p>회식비 정산, D-Day 계산, 제비뽑기, 자리 배치, 닉네임 생성까지 일상에서 자주 쓰는 도구들을 한곳에 모았습니다. 회식비 정산은 항목별 제외와 차등 분할, 최소 송금 경로 계산까지 지원해 복잡한 더치페이도 깔끔하게 해결합니다. PDF 합치기·분할·변환, 이미지 압축·크기 변경 등 파일 작업 도구도 제공하며 모든 처리는 브라우저에서 안전하게 이루어집니다.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-2">심리 & 성향 테스트</h3>
              <p>MBTI 검사, 테토 vs 에겐, 커플 궁합, 색깔 테스트, 타로까지 5가지 성향 분석 도구로 나를 더 깊이 알아갈 수 있습니다. MBTI는 20문항으로 16가지 성격 유형과 궁합을 분석하며, 커플 궁합은 이름 기반으로 5가지 카테고리를 심층 분석합니다. 결과는 간결하면서도 재미있는 설명으로 제공되어 혼자 즐기거나 친구와 함께 보기 좋습니다.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-2">데이트 코스 추천</h3>
              <p>서울, 부산, 대구, 인천, 광주, 대전, 수원, 전주, 경주, 제주 등 전국 10개 도시의 200가지 데이트 코스를 추천받을 수 있습니다. 분위기 지도에서 로맨틱·활동적·힐링 등 원하는 분위기를 선택하면 취향에 맞는 동선을 제안합니다. 낮과 밤 시간대별 코스, 예산 범위, 교통 수단까지 고려해 현실적인 데이트 플랜을 짤 수 있습니다.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-2">랜덤 결정 도구</h3>
              <p>룰렛, 제비뽑기, 사다리 타기, 조 뽑기 등 어떤 결정이든 공정하게 랜덤으로 해결할 수 있습니다. 모든 도구는 드라마틱한 애니메이션 효과를 제공해 단순한 결정도 즐거운 이벤트로 만들어줍니다. 룰렛은 항목을 자유롭게 추가·삭제·가중치 조정이 가능하고, 조 뽑기는 인원 수와 조 수를 설정해 단체 배정에 활용하기 좋습니다.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-2">아케이드 게임</h3>
              <p>반응속도 테스트, 타이핑 연습, 기억력 카드 게임, 색깔 맞추기(스트룹 테스트), 에임 트레이너까지 5가지 아케이드 게임으로 실력을 측정하고 향상시킬 수 있습니다. 반응속도는 밀리초(ms) 단위로 정밀하게 측정하고, 타이핑은 WPM(분당 단어 수)을 실시간으로 확인합니다. 개인 최고 기록을 갱신하며 꾸준히 도전하는 재미가 있습니다.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-2">금융 계산기</h3>
              <p>대출이자, 퇴직금, 연봉 실수령액, 복리 계산, 취득세, 환율까지 6가지 금융 계산기를 무료로 사용할 수 있습니다. 대출이자 계산기는 원리금균등·원금균등·만기일시 3가지 상환 방식을 비교하고 월별 상환 스케줄 전체를 보여줍니다. 연봉 실수령액은 4대보험과 소득세를 자동으로 공제해 실제 수령액을 정확하게 계산합니다.</p>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
