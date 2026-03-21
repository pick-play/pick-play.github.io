"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";

type Phase = "setup" | "assign" | "discuss" | "vote" | "result";

const topics: Record<string, string[]> = {
  일반: [
    "학교", "병원", "경찰서", "소방서", "은행", "도서관", "우체국",
    "백화점", "놀이공원", "영화관", "수영장", "볼링장",
  ],
  음식: [
    "김치찌개", "된장찌개", "비빔밥", "불고기", "삼겹살", "떡볶이",
    "치킨", "피자", "짜장면", "초밥", "라면", "팥빙수",
  ],
  직업: [
    "의사", "변호사", "선생님", "소방관", "경찰관", "요리사",
    "간호사", "프로그래머", "디자이너", "배우", "가수", "운동선수",
  ],
  동물: [
    "강아지", "고양이", "토끼", "햄스터", "앵무새", "거북이",
    "금붕어", "사자", "코끼리", "펭귄", "돌고래", "판다",
  ],
  "영화/드라마": [
    "해리포터", "어벤져스", "기생충", "겨울왕국", "타이타닉", "부산행",
    "인터스텔라", "올드보이", "반지의제왕", "스파이더맨", "오징어게임", "이태원클라쓰",
  ],
  장소: [
    "제주도", "남산타워", "경복궁", "해운대", "명동", "한강공원",
    "에버랜드", "동대문", "인사동", "북촌한옥마을", "광안리", "성산일출봉",
  ],
  스포츠: [
    "축구", "야구", "농구", "배구", "테니스", "탁구",
    "골프", "수영", "스키", "볼링", "배드민턴", "태권도",
  ],
  음악: [
    "아이돌", "발라드", "힙합", "록밴드", "트로트", "클래식",
    "재즈", "EDM", "뮤지컬", "오케스트라", "기타", "피아노",
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
};

const discussionTimes = [
  { label: "1분", seconds: 60 },
  { label: "2분", seconds: 120 },
  { label: "3분", seconds: 180 },
];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function LiarGamePage() {
  // Setup state
  const [playerCount, setPlayerCount] = useState(5);
  const [selectedTopic, setSelectedTopic] = useState("일반");
  const [discussionTime, setDiscussionTime] = useState(120);

  // Game state
  const [phase, setPhase] = useState<Phase>("setup");
  const [word, setWord] = useState("");
  const [liarIndex, setLiarIndex] = useState(0); // 0-based
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0); // 0-based, for assign phase
  const [showingWord, setShowingWord] = useState(false);
  const [coverCountdown, setCoverCountdown] = useState<number | null>(null);

  // Discussion timer
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  // Voting state
  const [votes, setVotes] = useState<Record<number, number>>({}); // playerNum -> voteCount
  const [selectedVote, setSelectedVote] = useState<number | null>(null);
  const [votingDone, setVotingDone] = useState(false);

  // Result
  const [mostVoted, setMostVoted] = useState<number | null>(null);

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
    const wordList = topics[selectedTopic];
    const chosenWord = pickRandom(wordList);
    const chosenLiar = Math.floor(Math.random() * playerCount);
    setWord(chosenWord);
    setLiarIndex(chosenLiar);
    setCurrentPlayerIndex(0);
    setShowingWord(false);
    setCoverCountdown(null);
    setVotes({});
    setSelectedVote(null);
    setVotingDone(false);
    setMostVoted(null);
    setPhase("assign");
  }, [playerCount, selectedTopic]);

  const handleReveal = useCallback(() => {
    setShowingWord(true);
    setTimeout(() => {
      setShowingWord(false);
      // Start cover countdown
      setCoverCountdown(3);
    }, 3000);
  }, []);

  useEffect(() => {
    if (coverCountdown === null) return;
    if (coverCountdown <= 0) {
      setCoverCountdown(null);
      const next = currentPlayerIndex + 1;
      if (next >= playerCount) {
        // All players assigned — go to discuss
        setTimeLeft(discussionTime);
        setTimerRunning(false);
        setPhase("discuss");
      } else {
        setCurrentPlayerIndex(next);
        setShowingWord(false);
      }
      return;
    }
    const id = setTimeout(() => setCoverCountdown((c) => (c !== null ? c - 1 : null)), 1000);
    return () => clearTimeout(id);
  }, [coverCountdown, currentPlayerIndex, playerCount, discussionTime]);

  const submitVote = useCallback(() => {
    if (selectedVote === null) return;
    const newVotes = { ...votes };
    newVotes[selectedVote] = (newVotes[selectedVote] ?? 0) + 1;
    setVotes(newVotes);
    setVotingDone(true);

    // Determine most voted
    let maxVotes = 0;
    let maxPlayer = selectedVote;
    Object.entries(newVotes).forEach(([p, v]) => {
      if (v > maxVotes) {
        maxVotes = v;
        maxPlayer = Number(p);
      }
    });
    setMostVoted(maxPlayer);
  }, [selectedVote, votes]);

  const resetGame = useCallback(() => {
    setPhase("setup");
    setWord("");
    setLiarIndex(0);
    setCurrentPlayerIndex(0);
    setShowingWord(false);
    setCoverCountdown(null);
    setVotes({});
    setSelectedVote(null);
    setVotingDone(false);
    setMostVoted(null);
    setTimerRunning(false);
    setTimeLeft(0);
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
              라이어 게임
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              라이어를 찾아라! 친구들과 함께하는 파티 게임
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
                    플레이어 수
                  </h2>
                  <div className="flex items-center justify-center gap-6">
                    <button
                      onClick={() => setPlayerCount((n) => Math.max(3, n - 1))}
                      className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-violet-100 dark:hover:bg-violet-900/40 text-slate-700 dark:text-slate-200 text-2xl font-bold transition-colors flex items-center justify-center"
                      aria-label="플레이어 줄이기"
                    >
                      −
                    </button>
                    <span className="text-5xl font-extrabold bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent w-16 text-center">
                      {playerCount}
                    </span>
                    <button
                      onClick={() => setPlayerCount((n) => Math.min(10, n + 1))}
                      className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-violet-100 dark:hover:bg-violet-900/40 text-slate-700 dark:text-slate-200 text-2xl font-bold transition-colors flex items-center justify-center"
                      aria-label="플레이어 늘리기"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-center text-xs text-slate-400 mt-3">3명 ~ 10명</p>
                </div>

                {/* Topic selection */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                  <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-4">
                    주제 카테고리
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
                    토론 시간
                  </h2>
                  <div className="flex gap-3">
                    {discussionTimes.map((dt) => (
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

                {/* Start button */}
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={startGame}
                  className="w-full py-5 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-xl font-bold shadow-lg hover:shadow-violet-500/30 transition-shadow"
                >
                  게임 시작
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
                    <>
                      <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">
                        화면을 가려주세요
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
                        다음 플레이어에게 화면을 넘겨주세요
                      </p>
                    </>
                  ) : showingWord ? (
                    /* Word reveal */
                    <>
                      <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                        플레이어 {currentPlayerIndex + 1}의 단어
                      </p>
                      {currentPlayerIndex === liarIndex ? (
                        <motion.div
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: "spring", stiffness: 200 }}
                          className="space-y-2"
                        >
                          <div className="text-6xl">🕵️</div>
                          <p className="text-2xl font-extrabold text-rose-500">
                            당신은 라이어입니다!
                          </p>
                          <p className="text-slate-400 text-sm mt-2">
                            주제 힌트:{" "}
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
                        3초 후 자동으로 가려집니다
                      </p>
                    </>
                  ) : (
                    /* Ready screen */
                    <>
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white text-3xl font-extrabold shadow-lg">
                        {currentPlayerIndex + 1}
                      </div>
                      <div className="space-y-1">
                        <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                          플레이어 {currentPlayerIndex + 1}의 차례
                        </p>
                        <p className="text-slate-400 text-sm">
                          다른 사람은 화면을 보지 마세요!
                        </p>
                      </div>
                      <motion.button
                        whileTap={{ scale: 0.96 }}
                        onClick={handleReveal}
                        className="w-full py-4 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-lg font-bold shadow-md hover:shadow-violet-500/30 transition-shadow"
                      >
                        확인하기
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
                    토론 시간!
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">
                    단어를 직접 말하지 말고 설명하세요
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
                      {timerRunning ? "일시정지" : timeLeft === discussionTime ? "타이머 시작" : "계속"}
                    </button>
                    <button
                      onClick={() => {
                        setTimerRunning(false);
                        setPhase("vote");
                      }}
                      className="flex-1 py-4 rounded-xl font-bold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-violet-50 dark:hover:bg-violet-900/30 transition-colors"
                    >
                      투표하기
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── VOTE PHASE ── */}
            {phase === "vote" && (
              <motion.div
                key="vote"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                  <p className="text-3xl text-center mb-3">🗳️</p>
                  <h2 className="text-xl font-extrabold text-slate-800 dark:text-slate-100 text-center mb-1">
                    라이어를 지목하세요!
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm text-center mb-6">
                    누가 라이어라고 생각하나요?
                  </p>

                  {!votingDone ? (
                    <>
                      <div className="grid grid-cols-3 gap-3 mb-6">
                        {Array.from({ length: playerCount }).map((_, i) => (
                          <motion.button
                            key={i}
                            whileTap={{ scale: 0.94 }}
                            onClick={() => setSelectedVote(i + 1)}
                            className={`py-4 rounded-xl font-bold text-lg transition-all ${
                              selectedVote === i + 1
                                ? "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-md scale-105"
                                : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-violet-50 dark:hover:bg-violet-900/30"
                            }`}
                          >
                            {i + 1}번
                          </motion.button>
                        ))}
                      </div>
                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={submitVote}
                        disabled={selectedVote === null}
                        className={`w-full py-4 rounded-2xl font-bold text-lg transition-all ${
                          selectedVote !== null
                            ? "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-md"
                            : "bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed"
                        }`}
                      >
                        투표 완료
                      </motion.button>
                    </>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center space-y-4"
                    >
                      <p className="text-slate-500 dark:text-slate-400">
                        가장 많은 표를 받은 플레이어
                      </p>
                      <div className="text-6xl font-extrabold bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
                        {mostVoted}번
                      </div>
                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setPhase("result")}
                        className="w-full py-4 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-bold text-lg shadow-md"
                      >
                        결과 공개
                      </motion.button>
                    </motion.div>
                  )}
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
                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-2">
                      라이어는...
                    </p>
                    <p className="text-5xl font-extrabold bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent mb-1">
                      {liarIndex + 1}번 플레이어
                    </p>
                    <p className="text-slate-400 text-sm">
                      {mostVoted === liarIndex + 1
                        ? "정답! 라이어를 찾았습니다 🎉"
                        : "아쉽! 라이어가 살아남았습니다 😈"}
                    </p>
                  </motion.div>

                  {/* Word reveal */}
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-gradient-to-r from-violet-50 to-fuchsia-50 dark:from-violet-950/40 dark:to-fuchsia-950/40 rounded-2xl p-5 mb-6 border border-violet-200/50 dark:border-violet-700/50"
                  >
                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-2">
                      이번 라운드의 단어
                    </p>
                    <p className="text-4xl font-extrabold bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
                      {topicIcons[selectedTopic]} {word}
                    </p>
                    <p className="text-slate-400 text-xs mt-1">카테고리: {selectedTopic}</p>
                  </motion.div>

                  {/* Win/lose banner */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className={`rounded-xl py-4 px-5 mb-6 font-bold text-lg ${
                      mostVoted === liarIndex + 1
                        ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300"
                        : "bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300"
                    }`}
                  >
                    {mostVoted === liarIndex + 1
                      ? "일반 플레이어 승리!"
                      : "라이어 승리!"}
                  </motion.div>

                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={resetGame}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-bold text-lg shadow-md hover:shadow-violet-500/30 transition-shadow"
                  >
                    다시 하기
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
}
