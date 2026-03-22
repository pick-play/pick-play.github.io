"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import AdBanner from "@/components/AdBanner";
import { useLocale } from "@/hooks/useLocale";

type Locale = "ko" | "en" | "ja" | "zh" | "es";

const translations: Record<Locale, {
  title: string;
  subtitle: string;
  playerCount: string;
  playerRange: string;
  liarCount: string;
  liarRange: (max: number) => string;
  topicCategory: string;
  discussionTime: string;
  startGame: string;
  coverScreen: string;
  tapToSkip: string;
  playerWord: (n: number) => string;
  youAreLiar: string;
  topicHint: string;
  playerTurn: (n: number) => string;
  dontLook: string;
  confirm: string;
  discussionTitle: string;
  discussionDesc: string;
  liarsHiding: (n: number) => string;
  pause: string;
  startTimer: string;
  resume: string;
  revealLiar: string;
  liarIs: (n: number) => string;
  player: string;
  thisRoundWord: string;
  category: string;
  playAgain: string;
  discussionTimes: { label: string; seconds: number }[];
}> = {
  ko: {
    title: "라이어 게임",
    subtitle: "라이어를 찾아라! 친구들과 함께하는 파티 게임",
    playerCount: "플레이어 수",
    playerRange: "3명 ~ 20명",
    liarCount: "라이어 수",
    liarRange: (max) => `1명 ~ ${max}명 (전체의 절반까지)`,
    topicCategory: "주제 카테고리",
    discussionTime: "토론 시간",
    startGame: "게임 시작",
    coverScreen: "화면을 가려주세요",
    tapToSkip: "터치하면 바로 넘어갑니다",
    playerWord: (n) => `플레이어 ${n}의 단어`,
    youAreLiar: "당신은 라이어입니다!",
    topicHint: "주제 힌트:",
    playerTurn: (n) => `플레이어 ${n}의 차례`,
    dontLook: "다른 사람은 화면을 보지 마세요!",
    confirm: "확인하기",
    discussionTitle: "토론 시간!",
    discussionDesc: "단어를 직접 말하지 말고 설명하세요",
    liarsHiding: (n) => `라이어 ${n}명이 숨어있습니다`,
    pause: "일시정지",
    startTimer: "타이머 시작",
    resume: "계속",
    revealLiar: "라이어 공개",
    liarIs: (n) => n === 1 ? "라이어는..." : `라이어 ${n}명은...`,
    player: "플레이어",
    thisRoundWord: "이번 라운드의 단어",
    category: "카테고리:",
    playAgain: "다시 하기",
    discussionTimes: [
      { label: "1분", seconds: 60 },
      { label: "2분", seconds: 120 },
      { label: "3분", seconds: 180 },
    ],
  },
  en: {
    title: "Liar Game",
    subtitle: "Find the liar! A party game to play with friends",
    playerCount: "Players",
    playerRange: "3 – 20 players",
    liarCount: "Liars",
    liarRange: (max) => `1 – ${max} (up to half the players)`,
    topicCategory: "Topic Category",
    discussionTime: "Discussion Time",
    startGame: "Start Game",
    coverScreen: "Cover the screen",
    tapToSkip: "Tap to skip",
    playerWord: (n) => `Player ${n}'s word`,
    youAreLiar: "You are the Liar!",
    topicHint: "Topic hint:",
    playerTurn: (n) => `Player ${n}'s turn`,
    dontLook: "Others, don't look at the screen!",
    confirm: "Reveal",
    discussionTitle: "Discussion Time!",
    discussionDesc: "Describe without saying the word directly",
    liarsHiding: (n) => `${n} liar${n > 1 ? "s are" : " is"} hiding`,
    pause: "Pause",
    startTimer: "Start Timer",
    resume: "Resume",
    revealLiar: "Reveal Liar",
    liarIs: (n) => n === 1 ? "The liar is..." : `The ${n} liars are...`,
    player: "Player",
    thisRoundWord: "This round's word",
    category: "Category:",
    playAgain: "Play Again",
    discussionTimes: [
      { label: "1 min", seconds: 60 },
      { label: "2 min", seconds: 120 },
      { label: "3 min", seconds: 180 },
    ],
  },
  ja: {
    title: "ライアーゲーム",
    subtitle: "ライアーを見つけろ！友達と楽しむパーティーゲーム",
    playerCount: "プレイヤー数",
    playerRange: "3人 〜 20人",
    liarCount: "ライアー数",
    liarRange: (max) => `1人 〜 ${max}人（半数まで）`,
    topicCategory: "トピックカテゴリ",
    discussionTime: "討論時間",
    startGame: "ゲームスタート",
    coverScreen: "画面を隠してください",
    tapToSkip: "タップでスキップ",
    playerWord: (n) => `プレイヤー${n}の単語`,
    youAreLiar: "あなたはライアーです！",
    topicHint: "トピックヒント:",
    playerTurn: (n) => `プレイヤー${n}のターン`,
    dontLook: "他の人は画面を見ないでください！",
    confirm: "確認",
    discussionTitle: "討論タイム！",
    discussionDesc: "単語を直接言わずに説明してください",
    liarsHiding: (n) => `ライアーが${n}人潜んでいます`,
    pause: "一時停止",
    startTimer: "タイマー開始",
    resume: "再開",
    revealLiar: "ライアー公開",
    liarIs: (n) => n === 1 ? "ライアーは..." : `ライアー${n}人は...`,
    player: "プレイヤー",
    thisRoundWord: "今回のラウンドの単語",
    category: "カテゴリ:",
    playAgain: "もう一度",
    discussionTimes: [
      { label: "1分", seconds: 60 },
      { label: "2分", seconds: 120 },
      { label: "3分", seconds: 180 },
    ],
  },
  zh: {
    title: "说谎者游戏",
    subtitle: "找出说谎者！与朋友一起玩的派对游戏",
    playerCount: "玩家人数",
    playerRange: "3 ~ 20 人",
    liarCount: "说谎者数量",
    liarRange: (max) => `1 ~ ${max} 人（最多一半玩家）`,
    topicCategory: "主题类别",
    discussionTime: "讨论时间",
    startGame: "开始游戏",
    coverScreen: "请遮住屏幕",
    tapToSkip: "点击跳过",
    playerWord: (n) => `玩家 ${n} 的词语`,
    youAreLiar: "你是说谎者！",
    topicHint: "主题提示：",
    playerTurn: (n) => `玩家 ${n} 的回合`,
    dontLook: "其他人请不要看屏幕！",
    confirm: "查看",
    discussionTitle: "讨论时间！",
    discussionDesc: "请描述但不要直接说出词语",
    liarsHiding: (n) => `${n} 名说谎者正在隐藏`,
    pause: "暂停",
    startTimer: "开始计时",
    resume: "继续",
    revealLiar: "揭露说谎者",
    liarIs: (n) => n === 1 ? "说谎者是..." : `${n} 名说谎者是...`,
    player: "玩家",
    thisRoundWord: "本轮词语",
    category: "类别：",
    playAgain: "再来一局",
    discussionTimes: [
      { label: "1分钟", seconds: 60 },
      { label: "2分钟", seconds: 120 },
      { label: "3分钟", seconds: 180 },
    ],
  },
  es: {
    title: "El Juego del Mentiroso",
    subtitle: "¡Encuentra al mentiroso! Un juego de fiesta con amigos",
    playerCount: "Jugadores",
    playerRange: "3 – 20 jugadores",
    liarCount: "Mentirosos",
    liarRange: (max) => `1 – ${max} (hasta la mitad)`,
    topicCategory: "Categoría de tema",
    discussionTime: "Tiempo de discusión",
    startGame: "Iniciar juego",
    coverScreen: "Cubre la pantalla",
    tapToSkip: "Toca para saltar",
    playerWord: (n) => `Palabra del jugador ${n}`,
    youAreLiar: "¡Eres el mentiroso!",
    topicHint: "Pista del tema:",
    playerTurn: (n) => `Turno del jugador ${n}`,
    dontLook: "¡Los demás no miren la pantalla!",
    confirm: "Ver",
    discussionTitle: "¡Tiempo de discusión!",
    discussionDesc: "Describe sin decir la palabra directamente",
    liarsHiding: (n) => `${n} mentiroso${n > 1 ? "s están" : " está"} escondido${n > 1 ? "s" : ""}`,
    pause: "Pausar",
    startTimer: "Iniciar temporizador",
    resume: "Reanudar",
    revealLiar: "Revelar mentiroso",
    liarIs: (n) => n === 1 ? "El mentiroso es..." : `Los ${n} mentirosos son...`,
    player: "Jugador",
    thisRoundWord: "La palabra de esta ronda",
    category: "Categoría:",
    playAgain: "Jugar de nuevo",
    discussionTimes: [
      { label: "1 min", seconds: 60 },
      { label: "2 min", seconds: 120 },
      { label: "3 min", seconds: 180 },
    ],
  },
};

type Phase = "setup" | "assign" | "discuss" | "result";

const topics: Record<string, string[]> = {
  일반: [
    "학교", "병원", "경찰서", "소방서", "은행", "도서관", "우체국",
    "백화점", "놀이공원", "영화관", "수영장", "볼링장", "카페",
    "편의점", "마트", "약국", "헬스장", "공항", "지하철역", "주유소",
    "세탁소", "미용실", "법원", "시청", "동물병원",
  ],
  음식: [
    "김치찌개", "된장찌개", "비빔밥", "불고기", "삼겹살", "떡볶이",
    "치킨", "피자", "짜장면", "초밥", "라면", "팥빙수",
    "순대국밥", "감자탕", "갈비탕", "냉면", "파스타", "타코",
    "마라탕", "탕후루", "크로플", "케이크", "햄버거", "핫도그", "오므라이스",
  ],
  직업: [
    "의사", "변호사", "선생님", "소방관", "경찰관", "요리사",
    "간호사", "프로그래머", "디자이너", "배우", "가수", "운동선수",
    "기자", "군인", "파일럿", "약사", "건축가", "작가",
    "유튜버", "스트리머", "웹툰작가", "번역가", "심리상담사", "택배기사", "미용사",
  ],
  동물: [
    "강아지", "고양이", "토끼", "햄스터", "앵무새", "거북이",
    "금붕어", "사자", "코끼리", "펭귄", "돌고래", "판다",
    "기린", "호랑이", "곰", "원숭이", "뱀", "악어",
    "플라밍고", "카멜레온", "고릴라", "치타", "수달", "알파카", "캥거루",
  ],
  "영화/드라마": [
    "해리포터", "어벤져스", "기생충", "겨울왕국", "타이타닉", "부산행",
    "인터스텔라", "올드보이", "반지의제왕", "스파이더맨", "오징어게임", "이태원클라쓰",
    "더글로리", "무빙", "카지노", "킹덤", "비밀의숲", "사랑의불시착",
    "이상한변호사우영우", "도깨비", "미스터션샤인", "응답하라1988", "나의아저씨", "시그널", "굿플레이스",
  ],
  장소: [
    "제주도", "남산타워", "경복궁", "해운대", "명동", "한강공원",
    "에버랜드", "동대문", "인사동", "북촌한옥마을", "광안리", "성산일출봉",
    "롯데월드", "코엑스", "강남역", "홍대", "이태원", "여의도",
    "부산자갈치시장", "전주한옥마을", "설악산", "지리산", "독도", "울릉도", "통영",
  ],
  스포츠: [
    "축구", "야구", "농구", "배구", "테니스", "탁구",
    "골프", "수영", "스키", "볼링", "배드민턴", "태권도",
    "복싱", "레슬링", "유도", "클라이밍", "서핑", "사이클",
    "e스포츠", "펜싱", "양궁", "사격", "럭비", "크리켓", "스쿼시",
  ],
  음악: [
    "아이돌", "발라드", "힙합", "록밴드", "트로트", "클래식",
    "재즈", "EDM", "뮤지컬", "오케스트라", "기타", "피아노",
    "드럼", "바이올린", "플루트", "색소폰", "첼로", "하프",
    "R&B", "팝", "인디음악", "포크송", "레게", "펑크", "소울",
  ],
  "연예인/아이돌": [
    "RM", "진", "슈가", "제이홉", "지민", "뷔", "정국",
    "지수", "제니", "로제", "리사", "아이유", "유재석",
    "이영자", "박서준", "김태리", "송강", "현빈", "손예진",
    "이병헌", "전지현", "공유", "박보검", "차은우", "강다니엘",
  ],
  브랜드: [
    "삼성", "애플", "나이키", "스타벅스", "다이소", "올리브영",
    "쿠팡", "배달의민족", "카카오", "네이버", "LG", "현대",
    "아디다스", "구찌", "샤넬", "루이비통", "자라", "유니클로",
    "맥도날드", "버거킹", "이케아", "레고", "소니", "닌텐도", "토스",
  ],
  게임: [
    "리그오브레전드", "발로란트", "마인크래프트", "배틀그라운드", "원신", "메이플스토리",
    "오버워치", "스타크래프트", "디아블로", "피파", "피파온라인",
    "로블록스", "포트나이트", "에이펙스레전드", "클래시로얄",
    "모바일레전드", "브롤스타즈", "포켓몬고", "동물의숲", "젤다의전설", "마리오카트",
    "스플래툰", "엘든링", "사이버펑크", "어몽어스",
  ],
  "만화/애니": [
    "원피스", "나루토", "슬램덩크", "진격의거인", "귀멸의칼날", "짱구는못말려",
    "도라에몽", "드래곤볼", "블리치", "헌터헌터", "강철의연금술사", "원펀맨",
    "주술회전", "체인소맨", "블루록", "하이큐", "도쿄구울", "스파이패밀리",
    "신세기에반게리온", "카우보이비밥", "소드아트온라인", "리제로", "전생슬라임",
    "빈란드사가", "나의히어로아카데미아", "약속의네버랜드",
  ],
  "나라/도시": [
    "미국", "일본", "프랑스", "영국", "호주", "캐나다",
    "독일", "이탈리아", "스페인", "중국", "브라질", "인도",
    "뉴욕", "파리", "도쿄", "런던", "시드니", "두바이",
    "바르셀로나", "로마", "방콕", "싱가포르", "홍콩", "라스베이거스", "암스테르담",
  ],
  "과목/학교": [
    "수학", "영어", "체육", "음악", "과학", "급식",
    "교장실", "운동장", "도서관", "수학여행", "체육대회", "졸업식",
    "입학식", "수능", "중간고사", "기말고사", "역사", "지리",
    "미술", "기술가정", "생물", "화학", "물리", "한문", "윤리",
  ],
  "SNS/앱": [
    "인스타그램", "유튜브", "틱톡", "카카오톡", "네이버", "당근마켓",
    "트위터", "페이스북", "링크드인", "핀터레스트", "스냅챗", "왓츠앱",
    "넷플릭스", "유튜브뮤직", "스포티파이", "멜론", "지니뮤직",
    "쿠팡이츠", "요기요", "배달의민족", "카카오맵", "네이버지도", "토스", "카카오페이", "뱅크샐러드",
  ],
};

const topicIcons: Record<string, string> = {
  일반: "🏛️",
  음식: "🍜",
  직업: "💼",
  동물: "🐾",
  "영화/드라마": "🎬",
  장소: "📍",
  스포츠: "⚽",
  음악: "🎵",
  "연예인/아이돌": "🌟",
  브랜드: "🛍️",
  게임: "🎮",
  "만화/애니": "📺",
  "나라/도시": "🌍",
  "과목/학교": "📚",
  "SNS/앱": "📱",
};


function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickMultipleIndices(total: number, count: number): number[] {
  const indices: number[] = [];
  while (indices.length < count) {
    const idx = Math.floor(Math.random() * total);
    if (!indices.includes(idx)) indices.push(idx);
  }
  return indices;
}

export default function LiarGamePage() {
  const locale = useLocale() as Locale;
  const t = translations[locale] ?? translations.ko;

  // Setup state
  const [playerCount, setPlayerCount] = useState(5);
  const [liarCount, setLiarCount] = useState(1);
  const [selectedTopic, setSelectedTopic] = useState("일반");
  const [discussionTime, setDiscussionTime] = useState(120);

  // Game state
  const [phase, setPhase] = useState<Phase>("setup");
  const [word, setWord] = useState("");
  const [liarIndices, setLiarIndices] = useState<number[]>([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [showingWord, setShowingWord] = useState(false);
  const [coverCountdown, setCoverCountdown] = useState<number | null>(null);

  // Discussion timer
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  // Refs for tap-to-skip
  const wordTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Max liars = floor(playerCount / 2) - 1 (at least 1, at most half minus 1 to keep game fair)
  const maxLiars = Math.max(1, Math.floor(playerCount / 2));

  // Adjust liar count if player count changes
  useEffect(() => {
    if (liarCount > maxLiars) setLiarCount(maxLiars);
  }, [playerCount, liarCount, maxLiars]);

  // Timer effect
  useEffect(() => {
    if (!timerRunning || timeLeft <= 0) {
      if (timerRunning && timeLeft <= 0) setTimerRunning(false);
      return;
    }
    const id = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timerRunning, timeLeft]);

  const startGame = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const wordList = topics[selectedTopic];
    const chosenWord = pickRandom(wordList);
    const chosenLiars = pickMultipleIndices(playerCount, liarCount);
    setWord(chosenWord);
    setLiarIndices(chosenLiars);
    setCurrentPlayerIndex(0);
    setShowingWord(false);
    setCoverCountdown(null);
    setTimerRunning(false);
    setTimeLeft(0);
    setPhase("assign");
  }, [playerCount, liarCount, selectedTopic]);

  const advanceToNext = useCallback(() => {
    if (wordTimerRef.current) {
      clearTimeout(wordTimerRef.current);
      wordTimerRef.current = null;
    }
    setShowingWord(false);
    setCoverCountdown(null);
    const next = currentPlayerIndex + 1;
    if (next >= playerCount) {
      setTimeLeft(discussionTime);
      setTimerRunning(false);
      setPhase("discuss");
    } else {
      setCurrentPlayerIndex(next);
    }
  }, [currentPlayerIndex, playerCount, discussionTime]);

  const handleReveal = useCallback(() => {
    setShowingWord(true);
    wordTimerRef.current = setTimeout(() => {
      setShowingWord(false);
      setCoverCountdown(3);
    }, 3000);
  }, []);

  // Tap to skip word display
  const handleTapSkipWord = useCallback(() => {
    if (wordTimerRef.current) {
      clearTimeout(wordTimerRef.current);
      wordTimerRef.current = null;
    }
    setShowingWord(false);
    setCoverCountdown(3);
  }, []);

  // Cover countdown
  useEffect(() => {
    if (coverCountdown === null) return;
    if (coverCountdown <= 0) {
      advanceToNext();
      return;
    }
    const id = setTimeout(() => setCoverCountdown((c) => (c !== null ? c - 1 : null)), 1000);
    return () => clearTimeout(id);
  }, [coverCountdown, advanceToNext]);

  // Tap to skip countdown
  const handleTapSkipCountdown = useCallback(() => {
    setCoverCountdown(null);
    advanceToNext();
  }, [advanceToNext]);

  const resetGame = useCallback(() => {
    setPhase("setup");
    setWord("");
    setLiarIndices([]);
    setCurrentPlayerIndex(0);
    setShowingWord(false);
    setCoverCountdown(null);
    setTimerRunning(false);
    setTimeLeft(0);
    if (wordTimerRef.current) {
      clearTimeout(wordTimerRef.current);
      wordTimerRef.current = null;
    }
  }, []);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const timerPercent = discussionTime > 0 ? (timeLeft / discussionTime) * 100 : 0;
  const timerColor =
    timerPercent > 50
      ? "from-violet-500 to-fuchsia-500"
      : timerPercent > 20
      ? "from-amber-400 to-orange-500"
      : "from-red-400 to-rose-500";

  const isLiar = (index: number) => liarIndices.includes(index);

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50/30 to-fuchsia-50/20 dark:from-slate-950 dark:via-violet-950/20 dark:to-fuchsia-950/10">
        <div className="max-w-lg mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent mb-2">
              {t.title}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              {t.subtitle}
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {/* ── SETUP PHASE ── */}
            {phase === "setup" && (
              <motion.div
                key="setup"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Player count */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                  <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-4">
                    {t.playerCount}
                  </h2>
                  <div className="flex items-center justify-center gap-6">
                    <button
                      onClick={() => setPlayerCount((n) => Math.max(3, n - 1))}
                      className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-violet-100 dark:hover:bg-violet-900/40 text-slate-700 dark:text-slate-200 text-2xl font-bold transition-colors flex items-center justify-center"
                    >
                      −
                    </button>
                    <span className="text-5xl font-extrabold bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent w-16 text-center">
                      {playerCount}
                    </span>
                    <button
                      onClick={() => setPlayerCount((n) => Math.min(20, n + 1))}
                      className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-violet-100 dark:hover:bg-violet-900/40 text-slate-700 dark:text-slate-200 text-2xl font-bold transition-colors flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-center text-xs text-slate-400 mt-3">{t.playerRange}</p>
                </div>

                {/* Liar count */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                  <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-4">
                    {t.liarCount}
                  </h2>
                  <div className="flex items-center justify-center gap-6">
                    <button
                      onClick={() => setLiarCount((n) => Math.max(1, n - 1))}
                      className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-violet-100 dark:hover:bg-violet-900/40 text-slate-700 dark:text-slate-200 text-2xl font-bold transition-colors flex items-center justify-center"
                    >
                      −
                    </button>
                    <span className="text-5xl font-extrabold bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent w-16 text-center">
                      {liarCount}
                    </span>
                    <button
                      onClick={() => setLiarCount((n) => Math.min(maxLiars, n + 1))}
                      className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-violet-100 dark:hover:bg-violet-900/40 text-slate-700 dark:text-slate-200 text-2xl font-bold transition-colors flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-center text-xs text-slate-400 mt-3">
                    {t.liarRange(maxLiars)}
                  </p>
                </div>

                {/* Topic selection */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                  <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-4">
                    {t.topicCategory}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {Object.keys(topics).map((topic) => (
                      <button
                        key={topic}
                        onClick={() => setSelectedTopic(topic)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          selectedTopic === topic
                            ? "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-md scale-105"
                            : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-violet-50 dark:hover:bg-violet-900/30"
                        }`}
                      >
                        {topicIcons[topic]} {topic}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Discussion time */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                  <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-4">
                    {t.discussionTime}
                  </h2>
                  <div className="flex gap-3">
                    {t.discussionTimes.map((dt) => (
                      <button
                        key={dt.label}
                        onClick={() => setDiscussionTime(dt.seconds)}
                        className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all ${
                          discussionTime === dt.seconds
                            ? "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-md"
                            : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-violet-50 dark:hover:bg-violet-900/30"
                        }`}
                      >
                        {dt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Ad: between settings and start */}
                <AdBanner format="horizontal" className="rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2" />

                {/* Start button */}
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={startGame}
                  className="w-full py-5 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-xl font-bold shadow-lg hover:shadow-violet-500/30 transition-shadow"
                >
                  {t.startGame}
                </motion.button>
              </motion.div>
            )}

            {/* ── ASSIGN PHASE ── */}
            {phase === "assign" && (
              <motion.div
                key={`assign-${currentPlayerIndex}-${showingWord ? "word" : coverCountdown !== null ? "cover" : "ready"}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
              >
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-700 text-center min-h-72 flex flex-col items-center justify-center gap-6">
                  {/* Cover countdown */}
                  {coverCountdown !== null ? (
                    <button
                      onClick={handleTapSkipCountdown}
                      className="w-full flex flex-col items-center gap-6 focus:outline-none"
                    >
                      <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">
                        {t.coverScreen}
                      </p>
                      <motion.div
                        key={coverCountdown}
                        initial={{ scale: 1.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="text-8xl font-extrabold bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent"
                      >
                        {coverCountdown}
                      </motion.div>
                      <p className="text-slate-400 text-sm">
                        {t.tapToSkip}
                      </p>
                    </button>
                  ) : showingWord ? (
                    /* Word reveal - tap to skip */
                    <button
                      onClick={handleTapSkipWord}
                      className="w-full flex flex-col items-center gap-4 focus:outline-none"
                    >
                      <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                        {t.playerWord(currentPlayerIndex + 1)}
                      </p>
                      {isLiar(currentPlayerIndex) ? (
                        <motion.div
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: "spring", stiffness: 200 }}
                          className="space-y-2"
                        >
                          <div className="text-6xl">🕵️</div>
                          <p className="text-2xl font-extrabold text-rose-500">
                            {t.youAreLiar}
                          </p>
                          <p className="text-slate-400 text-sm mt-2">
                            {t.topicHint}{" "}
                            <span className="font-semibold text-violet-500">
                              {topicIcons[selectedTopic]} {selectedTopic}
                            </span>
                          </p>
                        </motion.div>
                      ) : (
                        <motion.div
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: "spring", stiffness: 200 }}
                          className="space-y-2"
                        >
                          <div className="text-6xl">{topicIcons[selectedTopic]}</div>
                          <p className="text-4xl font-extrabold bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
                            {word}
                          </p>
                        </motion.div>
                      )}
                      <p className="text-slate-400 text-xs animate-pulse">
                        {t.tapToSkip}
                      </p>
                    </button>
                  ) : (
                    /* Ready screen */
                    <>
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white text-3xl font-extrabold shadow-lg">
                        {currentPlayerIndex + 1}
                      </div>
                      <div className="space-y-1">
                        <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                          {t.playerTurn(currentPlayerIndex + 1)}
                        </p>
                        <p className="text-slate-400 text-sm">
                          {t.dontLook}
                        </p>
                      </div>
                      <motion.button
                        whileTap={{ scale: 0.96 }}
                        onClick={handleReveal}
                        className="w-full py-4 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-lg font-bold shadow-md hover:shadow-violet-500/30 transition-shadow"
                      >
                        {t.confirm}
                      </motion.button>
                    </>
                  )}
                </div>

                {/* Progress dots */}
                <div className="flex justify-center gap-2 mt-5">
                  {Array.from({ length: playerCount }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        i < currentPlayerIndex
                          ? "bg-violet-500"
                          : i === currentPlayerIndex
                          ? "bg-fuchsia-500 scale-125"
                          : "bg-slate-300 dark:bg-slate-600"
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── DISCUSS PHASE ── */}
            {phase === "discuss" && (
              <motion.div
                key="discuss"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-700 text-center">
                  <p className="text-4xl mb-3">🗣️</p>
                  <h2 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 mb-1">
                    {t.discussionTitle}
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-2">
                    {t.discussionDesc}
                  </p>
                  <p className="text-violet-500 dark:text-violet-400 text-xs font-medium mb-8">
                    {t.liarsHiding(liarCount)}
                  </p>

                  {/* Timer ring */}
                  <div className="relative w-44 h-44 mx-auto mb-6">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50" cy="50" r="44"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="6"
                        className="text-slate-200 dark:text-slate-700"
                      />
                      <circle
                        cx="50" cy="50" r="44"
                        fill="none"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 44}`}
                        strokeDashoffset={`${2 * Math.PI * 44 * (1 - timerPercent / 100)}`}
                        className={`transition-all duration-1000 ${
                          timerPercent > 50
                            ? "stroke-violet-500"
                            : timerPercent > 20
                            ? "stroke-amber-400"
                            : "stroke-red-400"
                        }`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span
                        className={`text-4xl font-extrabold bg-gradient-to-r ${timerColor} bg-clip-text text-transparent`}
                      >
                        {formatTime(timeLeft)}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setTimerRunning((r) => !r)}
                      className={`flex-1 py-4 rounded-xl font-bold text-white transition-all ${
                        timerRunning
                          ? "bg-slate-400 dark:bg-slate-600"
                          : "bg-gradient-to-r from-violet-500 to-fuchsia-500 shadow-md"
                      }`}
                    >
                      {timerRunning ? t.pause : timeLeft === discussionTime ? t.startTimer : t.resume}
                    </button>
                    <button
                      onClick={() => {
                        setTimerRunning(false);
                        setPhase("result");
                      }}
                      className="flex-1 py-4 rounded-xl font-bold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-violet-50 dark:hover:bg-violet-900/30 transition-colors"
                    >
                      {t.revealLiar}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── RESULT PHASE ── */}
            {phase === "result" && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-700 text-center">
                  {/* Liar reveal */}
                  <motion.div
                    initial={{ scale: 0, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 180, delay: 0.1 }}
                    className="mb-6"
                  >
                    <div className="text-7xl mb-4">🕵️</div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-3">
                      {t.liarIs(liarCount)}
                    </p>
                    <div className="flex flex-wrap justify-center gap-3 mb-2">
                      {liarIndices.map((idx, i) => (
                        <motion.span
                          key={idx}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: "spring", stiffness: 200, delay: 0.2 + i * 0.15 }}
                          className="text-3xl font-extrabold bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent"
                        >
                          #{idx + 1}
                        </motion.span>
                      ))}
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">{t.player}</p>
                  </motion.div>

                  {/* Word reveal */}
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-gradient-to-r from-violet-50 to-fuchsia-50 dark:from-violet-950/40 dark:to-fuchsia-950/40 rounded-2xl p-5 mb-6 border border-violet-200/50 dark:border-violet-700/50"
                  >
                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-2">
                      {t.thisRoundWord}
                    </p>
                    <p className="text-4xl font-extrabold bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
                      {topicIcons[selectedTopic]} {word}
                    </p>
                    <p className="text-slate-400 text-xs mt-1">{t.category} {selectedTopic}</p>
                  </motion.div>

                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={resetGame}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-bold text-lg shadow-md hover:shadow-violet-500/30 transition-shadow"
                  >
                    {t.playAgain}
                  </motion.button>
                  <AdBanner format="rectangle" className="mt-6 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2" />
                </div>
                <AdBanner format="in-article" className="mt-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
}
