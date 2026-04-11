"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import AdBanner from "@/components/AdBanner";
import { useLocale } from "@/hooks/useLocale";
import type { Locale } from "@/i18n/config";

// ── Audio Engine ──────────────────────────────────────────────────────────────

function playNote(frequency: number, duration = 1.5) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
  const ctx: AudioContext = new AudioCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.value = frequency;
  gain.gain.setValueAtTime(0.5, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + duration);
}

// ── Note Definitions ──────────────────────────────────────────────────────────

interface NoteInfo {
  name: string;
  frequency: number;
  isBlack: boolean;
  octave: number;
}

const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

const BASE_FREQUENCIES: Record<string, number> = {
  C3: 130.81, "C#3": 138.59, D3: 146.83, "D#3": 155.56,
  E3: 164.81, F3: 174.61, "F#3": 185.00, G3: 196.00,
  "G#3": 207.65, A3: 220.00, "A#3": 233.08, B3: 246.94,
  C4: 261.63, "C#4": 277.18, D4: 293.66, "D#4": 311.13,
  E4: 329.63, F4: 349.23, "F#4": 369.99, G4: 392.00,
  "G#4": 415.30, A4: 440.00, "A#4": 466.16, B4: 493.88,
  C5: 523.25, "C#5": 554.37, D5: 587.33, "D#5": 622.25,
  E5: 659.25, F5: 698.46, "F#5": 739.99, G5: 783.99,
  "G#5": 830.61, A5: 880.00, "A#5": 932.33, B5: 987.77,
};

function buildNotes(octaves: number[]): NoteInfo[] {
  const notes: NoteInfo[] = [];
  for (const oct of octaves) {
    for (const name of NOTE_NAMES) {
      const key = `${name}${oct}`;
      notes.push({
        name: key,
        frequency: BASE_FREQUENCIES[key],
        isBlack: name.includes("#"),
        octave: oct,
      });
    }
  }
  return notes;
}

const WHITE_NOTES_NAMES = ["C", "D", "E", "F", "G", "A", "B"];

// ── Difficulty Config ─────────────────────────────────────────────────────────

type Difficulty = "easy" | "medium" | "hard" | "expert";
type GameState = "idle" | "playing" | "result";

interface DifficultyConfig {
  octaves: number[];
  whiteOnly: boolean;
  rounds: number;
  penaltyReplay: boolean;
}

const DIFFICULTY_CONFIG: Record<Difficulty, DifficultyConfig> = {
  easy:   { octaves: [4], whiteOnly: true,  rounds: 10, penaltyReplay: false },
  medium: { octaves: [4], whiteOnly: false, rounds: 10, penaltyReplay: false },
  hard:   { octaves: [3, 4], whiteOnly: false, rounds: 10, penaltyReplay: true },
  expert: { octaves: [3, 4, 5], whiteOnly: false, rounds: 20, penaltyReplay: true },
};

// ── Note name localization ────────────────────────────────────────────────────

type NoteLocale = Record<string, string>;

const NOTE_DISPLAY: Record<Locale, NoteLocale> = {
  ko: {
    C: "도", "C#": "도#", D: "레", "D#": "레#", E: "미",
    F: "파", "F#": "파#", G: "솔", "G#": "솔#", A: "라", "A#": "라#", B: "시",
  },
  en: {
    C: "C", "C#": "C#", D: "D", "D#": "D#", E: "E",
    F: "F", "F#": "F#", G: "G", "G#": "G#", A: "A", "A#": "A#", B: "B",
  },
  ja: {
    C: "ド", "C#": "ド#", D: "レ", "D#": "レ#", E: "ミ",
    F: "ファ", "F#": "ファ#", G: "ソ", "G#": "ソ#", A: "ラ", "A#": "ラ#", B: "シ",
  },
  zh: {
    C: "哆", "C#": "哆#", D: "来", "D#": "来#", E: "咪",
    F: "发", "F#": "发#", G: "嗦", "G#": "嗦#", A: "拉", "A#": "拉#", B: "西",
  },
  es: {
    C: "Do", "C#": "Do#", D: "Re", "D#": "Re#", E: "Mi",
    F: "Fa", "F#": "Fa#", G: "Sol", "G#": "Sol#", A: "La", "A#": "La#", B: "Si",
  },
};

// ── Translations ──────────────────────────────────────────────────────────────

const translations: Record<Locale, {
  title: string;
  subtitle: string;
  easy: string;
  medium: string;
  hard: string;
  expert: string;
  easyDesc: string;
  mediumDesc: string;
  hardDesc: string;
  expertDesc: string;
  start: string;
  playSound: string;
  replay: string;
  replayLeft: string;
  replayPenalty: string;
  round: string;
  of: string;
  correct: string;
  wrong: string;
  correctWas: string;
  result: string;
  accuracy: string;
  rating100: string;
  rating80: string;
  rating60: string;
  rating40: string;
  ratingLow: string;
  missedNotes: string;
  bestScore: string;
  tryAgain: string;
  changeDiff: string;
  score: string;
  faqTitle: string;
  faqItems: { q: string; a: string }[];
}> = {
  ko: {
    title: "절대음감 테스트",
    subtitle: "음을 듣고 맞는 음을 선택하세요",
    easy: "초급",
    medium: "중급",
    hard: "고급",
    expert: "전문가",
    easyDesc: "흰 건반만 (C~B) · 7음",
    mediumDesc: "모든 음 · 12음 (1옥타브)",
    hardDesc: "2옥타브 · 24음 · 재생 페널티",
    expertDesc: "3옥타브 · 36음 · 재생 페널티",
    start: "시작하기",
    playSound: "음 재생",
    replay: "다시 듣기",
    replayLeft: "남은 재생",
    replayPenalty: "(고급·전문가: 재생 시 -1점)",
    round: "라운드",
    of: "/",
    correct: "정답!",
    wrong: "틀렸어요",
    correctWas: "정답은",
    result: "결과",
    accuracy: "정확도",
    rating100: "절대음감!",
    rating80: "뛰어난 음감",
    rating60: "좋은 음감",
    rating40: "평균",
    ratingLow: "연습이 필요해요",
    missedNotes: "자주 틀린 음",
    bestScore: "최고 기록",
    tryAgain: "다시 하기",
    changeDiff: "난이도 변경",
    score: "점수",
    faqTitle: "자주 묻는 질문",
    faqItems: [
      {
        q: "절대음감이란 무엇인가요?",
        a: "절대음감(Perfect Pitch)은 어떤 참고음 없이도 들리는 음의 이름(도·레·미 등)을 즉시 알아내는 능력입니다. 전 세계 인구의 약 0.01~1%만이 가지고 있으며, 주로 어린 시절 음악 교육과 연관됩니다.",
      },
      {
        q: "상대음감과 절대음감의 차이는 무엇인가요?",
        a: "절대음감은 기준음 없이 음을 인식하는 능력이고, 상대음감은 기준음을 듣고 다른 음과의 관계를 파악하는 능력입니다. 대부분의 음악가들은 상대음감을 훈련을 통해 개발할 수 있습니다.",
      },
      {
        q: "이 테스트는 어떻게 작동하나요?",
        a: "Web Audio API를 사용해 순수 사인파 음을 생성합니다. 음을 들은 후 피아노 건반에서 해당하는 음을 클릭하세요. 초급은 흰 건반(7음), 중급은 12음, 고급/전문가는 2~3옥타브에 걸친 24~36음 중에서 맞춰야 합니다.",
      },
      {
        q: "다시 듣기 기능이 있나요?",
        a: "라운드당 최대 2번까지 다시 듣기가 가능합니다. 단, 고급과 전문가 모드에서는 다시 듣기를 사용할 때마다 1점이 차감됩니다. 음을 잘 기억하고 신중하게 선택하세요.",
      },
      {
        q: "절대음감은 훈련으로 개발할 수 있나요?",
        a: "성인이 된 후 진정한 절대음감을 개발하기는 매우 어렵습니다. 하지만 규칙적인 음감 훈련을 통해 특정 음을 기억하거나 상대음감을 크게 향상시킬 수 있습니다. 이 테스트를 반복하면 음 인식 능력 향상에 도움이 됩니다.",
      },
    ],
  },
  en: {
    title: "Absolute Pitch Test",
    subtitle: "Listen to the tone and identify the correct note",
    easy: "Easy",
    medium: "Medium",
    hard: "Hard",
    expert: "Expert",
    easyDesc: "White keys only (C–B) · 7 notes",
    mediumDesc: "All 12 notes · 1 octave",
    hardDesc: "2 octaves · 24 notes · replay penalty",
    expertDesc: "3 octaves · 36 notes · replay penalty",
    start: "Start",
    playSound: "Play Sound",
    replay: "Replay",
    replayLeft: "Replays left",
    replayPenalty: "(Hard/Expert: replay costs −1 pt)",
    round: "Round",
    of: "/",
    correct: "Correct!",
    wrong: "Wrong",
    correctWas: "The answer was",
    result: "Results",
    accuracy: "Accuracy",
    rating100: "Perfect Pitch!",
    rating80: "Excellent Ear",
    rating60: "Good Ear",
    rating40: "Average",
    ratingLow: "Keep Practicing",
    missedNotes: "Most Missed Notes",
    bestScore: "Best Score",
    tryAgain: "Try Again",
    changeDiff: "Change Difficulty",
    score: "Score",
    faqTitle: "Frequently Asked Questions",
    faqItems: [
      {
        q: "What is absolute pitch?",
        a: "Absolute pitch (perfect pitch) is the ability to identify the name of any musical note without a reference tone. It is estimated to occur in about 0.01–1% of the population and is often linked to early musical training.",
      },
      {
        q: "What is the difference between absolute and relative pitch?",
        a: "Absolute pitch lets you name a note without any reference, while relative pitch lets you identify notes by their relationship to a known reference note. Most musicians can develop strong relative pitch through training.",
      },
      {
        q: "How does this test work?",
        a: "Pure sine wave tones are generated using the Web Audio API. After listening, click the matching key on the piano keyboard. Easy uses white keys only (7 notes), Medium uses all 12 notes, and Hard/Expert spans 2–3 octaves (24–36 notes).",
      },
      {
        q: "Can I replay a note?",
        a: "You can replay each note up to 2 times per round. However, in Hard and Expert modes each replay costs 1 point. Try to rely on memory and choose carefully.",
      },
      {
        q: "Can absolute pitch be trained?",
        a: "Developing true absolute pitch as an adult is very difficult. However, regular ear training can help you memorize specific tones and greatly improve your relative pitch. Repeating this test can help sharpen your note recognition skills.",
      },
    ],
  },
  ja: {
    title: "絶対音感テスト",
    subtitle: "音を聴いて正しい音名を選んでください",
    easy: "初級",
    medium: "中級",
    hard: "上級",
    expert: "プロ",
    easyDesc: "白鍵のみ (C〜B) · 7音",
    mediumDesc: "全12音 · 1オクターブ",
    hardDesc: "2オクターブ · 24音 · 再生ペナルティ",
    expertDesc: "3オクターブ · 36音 · 再生ペナルティ",
    start: "スタート",
    playSound: "音を再生",
    replay: "もう一度聴く",
    replayLeft: "残り再生回数",
    replayPenalty: "(上級・プロ：再生で−1点)",
    round: "ラウンド",
    of: "/",
    correct: "正解！",
    wrong: "不正解",
    correctWas: "正解は",
    result: "結果",
    accuracy: "正解率",
    rating100: "絶対音感！",
    rating80: "優れた音感",
    rating60: "良い音感",
    rating40: "平均的",
    ratingLow: "練習が必要です",
    missedNotes: "よく間違えた音",
    bestScore: "ベストスコア",
    tryAgain: "もう一度",
    changeDiff: "難易度変更",
    score: "スコア",
    faqTitle: "よくある質問",
    faqItems: [
      {
        q: "絶対音感とは何ですか？",
        a: "絶対音感とは、基準音なしで聴いた音の音名を即座に識別できる能力です。世界人口の約0.01〜1%しか持っておらず、幼少期の音楽教育と関連していることが多いです。",
      },
      {
        q: "絶対音感と相対音感の違いは何ですか？",
        a: "絶対音感は基準音なしで音名を識別できる能力で、相対音感は基準音を聴いた上で他の音との関係を把握する能力です。ほとんどの音楽家は訓練によって相対音感を鍛えることができます。",
      },
      {
        q: "このテストはどのように機能しますか？",
        a: "Web Audio APIを使って純粋なサイン波音を生成します。音を聴いた後、ピアノの鍵盤から該当する音をクリックしてください。初級は白鍵のみ（7音）、中級は全12音、上級・プロは2〜3オクターブにわたる24〜36音です。",
      },
      {
        q: "音を繰り返し聴くことはできますか？",
        a: "1ラウンドにつき最大2回まで再生できます。ただし上級とプロモードでは再生のたびに1点が減点されます。記憶を頼りに慎重に選択してください。",
      },
      {
        q: "絶対音感は訓練で身につきますか？",
        a: "大人になってから真の絶対音感を身につけるのは非常に困難です。しかし、定期的な耳のトレーニングで特定の音を記憶したり、相対音感を大きく向上させることはできます。このテストを繰り返すことで音の識別能力の向上に役立ちます。",
      },
    ],
  },
  zh: {
    title: "绝对音感测试",
    subtitle: "「聆听音符，选出正确的音名」",
    easy: "初级",
    medium: "中级",
    hard: "高级",
    expert: "专家",
    easyDesc: "「仅白键 (C~B) · 7音」",
    mediumDesc: "「全部12音 · 1个八度」",
    hardDesc: "「2个八度 · 24音 · 重播扣分」",
    expertDesc: "「3个八度 · 36音 · 重播扣分」",
    start: "开始",
    playSound: "播放音符",
    replay: "重新播放",
    replayLeft: "剩余重播次数",
    replayPenalty: "「高级·专家：重播扣1分」",
    round: "回合",
    of: "/",
    correct: "正确！",
    wrong: "错误",
    correctWas: "「正确答案是」",
    result: "结果",
    accuracy: "正确率",
    rating100: "「绝对音感！」",
    rating80: "「出色的音感」",
    rating60: "「良好的音感」",
    rating40: "「一般水平」",
    ratingLow: "「需要多加练习」",
    missedNotes: "「最常答错的音」",
    bestScore: "「最高记录」",
    tryAgain: "再试一次",
    changeDiff: "更改难度",
    score: "分数",
    faqTitle: "常见问题",
    faqItems: [
      {
        q: "「什么是绝对音感？」",
        a: "绝对音感（Perfect Pitch）是指无需参考音，就能立即识别所听到音符名称的能力。全球仅约0.01~1%的人拥有此能力，通常与幼年时期的音乐教育密切相关。",
      },
      {
        q: "「绝对音感与相对音感有什么区别？」",
        a: "绝对音感无需参考音即可识别音名，而相对音感是在听到参考音后，通过与其他音的关系来判断音名。大多数音乐家可以通过训练来发展相对音感。",
      },
      {
        q: "「这个测试是如何工作的？」",
        a: "使用Web Audio API生成纯正弦波音。聆听后，在钢琴键盘上点击相应的键。初级仅用白键（7音），中级全部12音，高级·专家跨越2~3个八度（24~36音）。",
      },
      {
        q: "「可以重复收听吗？」",
        a: "每回合最多可重播2次。但在高级和专家模式中，每次重播将扣除1分。请尽量依靠记忆，谨慎选择。",
      },
      {
        q: "「绝对音感可以通过训练获得吗？」",
        a: "成年后要培养真正的绝对音感非常困难。但通过规律的听音训练，可以记住特定音符并大幅提升相对音感。反复进行此测试有助于提高音符识别能力。",
      },
    ],
  },
  es: {
    title: "Test de Oído Absoluto",
    subtitle: "Escucha el tono e identifica la nota correcta",
    easy: "Fácil",
    medium: "Medio",
    hard: "Difícil",
    expert: "Experto",
    easyDesc: "Solo teclas blancas (C–B) · 7 notas",
    mediumDesc: "Las 12 notas · 1 octava",
    hardDesc: "2 octavas · 24 notas · penalización replay",
    expertDesc: "3 octavas · 36 notas · penalización replay",
    start: "Comenzar",
    playSound: "Reproducir",
    replay: "Repetir",
    replayLeft: "Repeticiones restantes",
    replayPenalty: "(Difícil/Experto: repetir cuesta −1 pt)",
    round: "Ronda",
    of: "/",
    correct: "¡Correcto!",
    wrong: "Incorrecto",
    correctWas: "La respuesta era",
    result: "Resultados",
    accuracy: "Precisión",
    rating100: "¡Oído Absoluto!",
    rating80: "Oído Excelente",
    rating60: "Buen Oído",
    rating40: "Promedio",
    ratingLow: "Sigue Practicando",
    missedNotes: "Notas más falladas",
    bestScore: "Mejor puntuación",
    tryAgain: "Intentar de nuevo",
    changeDiff: "Cambiar dificultad",
    score: "Puntuación",
    faqTitle: "Preguntas frecuentes",
    faqItems: [
      {
        q: "¿Qué es el oído absoluto?",
        a: "El oído absoluto (perfect pitch) es la capacidad de identificar el nombre de cualquier nota musical sin necesidad de una nota de referencia. Se estima que lo posee el 0,01–1% de la población y suele estar relacionado con la formación musical temprana.",
      },
      {
        q: "¿Cuál es la diferencia entre oído absoluto y oído relativo?",
        a: "El oído absoluto permite nombrar una nota sin referencia alguna, mientras que el oído relativo permite identificar notas por su relación con una nota de referencia conocida. La mayoría de los músicos pueden desarrollar un buen oído relativo con entrenamiento.",
      },
      {
        q: "¿Cómo funciona este test?",
        a: "Se generan tonos de onda sinusoidal pura usando la Web Audio API. Tras escuchar, haz clic en la tecla correspondiente del teclado. Fácil usa solo teclas blancas (7 notas), Medio usa las 12 notas, y Difícil/Experto abarca 2–3 octavas (24–36 notas).",
      },
      {
        q: "¿Puedo repetir una nota?",
        a: "Puedes repetir cada nota hasta 2 veces por ronda. Sin embargo, en los modos Difícil y Experto cada repetición cuesta 1 punto. Intenta confiar en tu memoria y elegir con cuidado.",
      },
      {
        q: "¿Se puede entrenar el oído absoluto?",
        a: "Desarrollar verdadero oído absoluto de adulto es muy difícil. Sin embargo, el entrenamiento auditivo regular puede ayudarte a memorizar tonos específicos y mejorar mucho el oído relativo. Repetir este test puede ayudar a afinar tu reconocimiento de notas.",
      },
    ],
  },
};

// ── Piano Keyboard Component ──────────────────────────────────────────────────

interface PianoOctaveProps {
  octave: number;
  availableNotes: NoteInfo[];
  onKeyClick: (note: NoteInfo) => void;
  highlightCorrect: string | null;
  highlightWrong: string | null;
  answered: boolean;
  locale: Locale;
  whiteOnly: boolean;
}

function PianoOctave({
  octave,
  availableNotes,
  onKeyClick,
  highlightCorrect,
  highlightWrong,
  answered,
  locale,
  whiteOnly,
}: PianoOctaveProps) {
  const noteDisplay = NOTE_DISPLAY[locale];

  const whiteKeys = availableNotes.filter((n) => n.octave === octave && !n.isBlack);
  const blackKeys = availableNotes.filter((n) => n.octave === octave && n.isBlack);

  // Black key positions relative to white keys (0-indexed white key gap)
  const blackKeyPositions: Record<string, number> = {
    "C#": 0.65, "D#": 1.65, "F#": 3.65, "G#": 4.65, "A#": 5.65,
  };

  return (
    <div className="relative inline-flex" style={{ height: "160px" }}>
      {/* White keys */}
      {whiteKeys.map((note) => {
        const baseName = note.name.replace(/\d/, "");
        const isCorrect = highlightCorrect === note.name;
        const isWrong = highlightWrong === note.name;
        return (
          <button
            key={note.name}
            disabled={answered}
            onClick={() => onKeyClick(note)}
            className={`
              relative border border-slate-300 rounded-b-md transition-all select-none
              flex items-end justify-center pb-2 text-xs font-semibold
              ${isCorrect ? "bg-green-400 border-green-500 text-white" : ""}
              ${isWrong ? "bg-red-400 border-red-500 text-white" : ""}
              ${!isCorrect && !isWrong ? "bg-white hover:bg-purple-50 active:bg-purple-100 text-slate-600" : ""}
              ${answered ? "cursor-default" : "cursor-pointer"}
            `}
            style={{ width: "44px", height: "160px", zIndex: 1 }}
          >
            {noteDisplay[baseName]}
            {whiteOnly ? null : <span className="text-[10px] block text-slate-400">{octave}</span>}
          </button>
        );
      })}

      {/* Black keys (absolutely positioned) */}
      {!whiteOnly && blackKeys.map((note) => {
        const baseName = note.name.replace(/\d/, "");
        const position = blackKeyPositions[baseName] ?? 0;
        const isCorrect = highlightCorrect === note.name;
        const isWrong = highlightWrong === note.name;
        return (
          <button
            key={note.name}
            disabled={answered}
            onClick={() => onKeyClick(note)}
            className={`
              absolute rounded-b-md transition-all select-none z-10
              flex items-end justify-center pb-1 text-[10px] font-semibold text-white
              ${isCorrect ? "bg-green-500" : ""}
              ${isWrong ? "bg-red-500" : ""}
              ${!isCorrect && !isWrong ? "bg-slate-900 hover:bg-slate-700 active:bg-slate-600" : ""}
              ${answered ? "cursor-default" : "cursor-pointer"}
            `}
            style={{
              width: "30px",
              height: "96px",
              left: `${position * 44 + 29}px`,
              top: 0,
              zIndex: 10,
            }}
          >
            {noteDisplay[baseName]}
          </button>
        );
      })}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function PitchTestPage() {
  const locale = useLocale();
  const t = translations[locale];

  const [gameState, setGameState] = useState<GameState>("idle");
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [currentNote, setCurrentNote] = useState<NoteInfo | null>(null);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [lastCorrect, setLastCorrect] = useState<boolean | null>(null);
  const [highlightCorrect, setHighlightCorrect] = useState<string | null>(null);
  const [highlightWrong, setHighlightWrong] = useState<string | null>(null);
  const [replaysLeft, setReplaysLeft] = useState(2);
  const [missedNotes, setMissedNotes] = useState<Record<string, number>>({});
  const [bestScores, setBestScores] = useState<Record<Difficulty, number>>({
    easy: 0, medium: 0, hard: 0, expert: 0,
  });
  const [roundHistory, setRoundHistory] = useState<{ note: string; correct: boolean }[]>([]);

  const availableNotesRef = useRef<NoteInfo[]>([]);
  const scoreRef = useRef(0);

  // Load best scores
  const loadBestScores = useCallback(() => {
    try {
      const saved = localStorage.getItem("pitch-test-bestscores");
      if (saved) setBestScores(JSON.parse(saved));
    } catch { /* ignore */ }
  }, []);

  const saveBestScore = useCallback((diff: Difficulty, s: number) => {
    setBestScores((prev) => {
      const next = { ...prev, [diff]: Math.max(prev[diff], s) };
      try { localStorage.setItem("pitch-test-bestscores", JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  }, []);

  const config = DIFFICULTY_CONFIG[difficulty];

  const buildAvailableNotes = useCallback((diff: Difficulty) => {
    const cfg = DIFFICULTY_CONFIG[diff];
    let notes = buildNotes(cfg.octaves);
    if (cfg.whiteOnly) notes = notes.filter((n) => !n.isBlack);
    return notes;
  }, []);

  const pickRandomNote = useCallback((notes: NoteInfo[]): NoteInfo => {
    return notes[Math.floor(Math.random() * notes.length)];
  }, []);

  const startGame = useCallback(() => {
    const notes = buildAvailableNotes(difficulty);
    availableNotesRef.current = notes;
    scoreRef.current = 0;
    setScore(0);
    setRound(1);
    setAnswered(false);
    setLastCorrect(null);
    setHighlightCorrect(null);
    setHighlightWrong(null);
    setReplaysLeft(2);
    setMissedNotes({});
    setRoundHistory([]);
    loadBestScores();

    const first = pickRandomNote(notes);
    setCurrentNote(first);
    setGameState("playing");

    setTimeout(() => {
      playNote(first.frequency);
    }, 300);
  }, [difficulty, buildAvailableNotes, pickRandomNote, loadBestScores]);

  const handlePlaySound = useCallback(() => {
    if (!currentNote) return;
    playNote(currentNote.frequency);
  }, [currentNote]);

  const handleReplay = useCallback(() => {
    if (replaysLeft <= 0 || !currentNote) return;
    const newLeft = replaysLeft - 1;
    setReplaysLeft(newLeft);

    // Penalty for hard/expert
    if (config.penaltyReplay) {
      const newScore = Math.max(0, scoreRef.current - 1);
      scoreRef.current = newScore;
      setScore(newScore);
    }

    playNote(currentNote.frequency);
  }, [replaysLeft, currentNote, config.penaltyReplay]);

  const handleNextRound = useCallback(() => {
    const nextRound = round + 1;
    if (nextRound > config.rounds) {
      // Game over
      saveBestScore(difficulty, scoreRef.current);
      setGameState("result");
      return;
    }
    setRound(nextRound);
    setAnswered(false);
    setLastCorrect(null);
    setHighlightCorrect(null);
    setHighlightWrong(null);
    setReplaysLeft(2);

    const nextNote = pickRandomNote(availableNotesRef.current);
    setCurrentNote(nextNote);

    setTimeout(() => {
      playNote(nextNote.frequency);
    }, 200);
  }, [round, config.rounds, difficulty, saveBestScore, pickRandomNote]);

  const handleKeyClick = useCallback((note: NoteInfo) => {
    if (answered || !currentNote) return;
    setAnswered(true);

    const isCorrect = note.name === currentNote.name;
    setLastCorrect(isCorrect);
    setHighlightCorrect(currentNote.name);

    if (isCorrect) {
      scoreRef.current += 1;
      setScore(scoreRef.current);
      setRoundHistory((prev) => [...prev, { note: currentNote.name, correct: true }]);
    } else {
      setHighlightWrong(note.name);
      setMissedNotes((prev) => ({
        ...prev,
        [currentNote.name]: (prev[currentNote.name] || 0) + 1,
      }));
      setRoundHistory((prev) => [...prev, { note: currentNote.name, correct: false }]);
    }

    setTimeout(() => {
      handleNextRound();
    }, 1500);
  }, [answered, currentNote, handleNextRound]);

  const accuracy = config.rounds > 0 ? Math.round((score / config.rounds) * 100) : 0;

  const getRating = () => {
    if (accuracy === 100) return { label: t.rating100, color: "from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent" };
    if (accuracy >= 80) return { label: t.rating80, color: "text-green-500" };
    if (accuracy >= 60) return { label: t.rating60, color: "text-blue-500" };
    if (accuracy >= 40) return { label: t.rating40, color: "text-yellow-500" };
    return { label: t.ratingLow, color: "text-red-500" };
  };

  const topMissed = Object.entries(missedNotes)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  const availableNotes = buildAvailableNotes(difficulty);
  const octaves = DIFFICULTY_CONFIG[difficulty].octaves;
  const whiteOnly = DIFFICULTY_CONFIG[difficulty].whiteOnly;

  const difficultyButtons: { key: Difficulty; label: string; desc: string; ring: string }[] = [
    { key: "easy",   label: t.easy,   desc: t.easyDesc,   ring: "ring-green-400" },
    { key: "medium", label: t.medium, desc: t.mediumDesc, ring: "ring-blue-400" },
    { key: "hard",   label: t.hard,   desc: t.hardDesc,   ring: "ring-orange-400" },
    { key: "expert", label: t.expert, desc: t.expertDesc, ring: "ring-red-400" },
  ];

  return (
    <PageTransition>
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-violet-50/20 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-8 px-4">
        <div className="max-w-2xl mx-auto">

          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-block bg-gradient-to-r from-purple-500 to-violet-600 rounded-2xl px-6 py-4 mb-3 shadow-lg">
              <h1 className="text-3xl font-bold text-white drop-shadow">{t.title}</h1>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm">{t.subtitle}</p>
          </div>

          <AdBanner format="horizontal" className="my-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2" />

          {/* Idle Screen */}
          <AnimatePresence mode="wait">
            {gameState === "idle" && (
              <motion.div
                key="idle"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700"
              >
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {difficultyButtons.map(({ key, label, desc, ring }) => (
                    <button
                      key={key}
                      onClick={() => setDifficulty(key)}
                      className={`rounded-xl p-4 text-left transition-all border-2 ${
                        difficulty === key
                          ? `border-purple-500 bg-purple-50 dark:bg-purple-900/20 ring-2 ${ring} shadow-md`
                          : "border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 hover:border-purple-300"
                      }`}
                    >
                      <div className={`font-bold text-base ${difficulty === key ? "text-purple-600 dark:text-purple-400" : "text-slate-700 dark:text-slate-200"}`}>
                        {label}
                      </div>
                      <div className="text-xs mt-1 text-slate-500 dark:text-slate-400">{desc}</div>
                      {bestScores[key] > 0 && (
                        <div className="text-xs mt-2 font-semibold text-purple-500">
                          {t.bestScore}: {bestScores[key]}/{DIFFICULTY_CONFIG[key].rounds}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                <button
                  onClick={startGame}
                  className="w-full py-4 bg-gradient-to-r from-purple-500 to-violet-600 text-white font-bold text-xl rounded-xl hover:opacity-90 active:scale-95 transition-all shadow-lg"
                >
                  {t.start}
                </button>
              </motion.div>
            )}

            {/* Playing Screen */}
            {gameState === "playing" && currentNote && (
              <motion.div
                key="playing"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                className="space-y-4"
              >
                {/* Score bar */}
                <div className="bg-white dark:bg-slate-800 rounded-xl px-4 py-3 flex items-center justify-between shadow-sm border border-slate-200 dark:border-slate-700">
                  <div className="text-center">
                    <div className="text-xl font-bold text-purple-600 dark:text-purple-400 tabular-nums">
                      {round}{t.of}{config.rounds}
                    </div>
                    <div className="text-xs text-slate-400">{t.round}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-slate-700 dark:text-slate-200 tabular-nums">{score}</div>
                    <div className="text-xs text-slate-400">{t.score}</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-xl font-bold tabular-nums ${replaysLeft > 0 ? "text-blue-500" : "text-slate-400"}`}>
                      {replaysLeft}
                    </div>
                    <div className="text-xs text-slate-400">{t.replayLeft}</div>
                  </div>
                </div>

                {/* Play / Replay buttons */}
                <div className="bg-gradient-to-r from-purple-500 to-violet-600 rounded-2xl p-5 text-center shadow-lg">
                  <p className="text-purple-100 text-sm mb-3">{t.replayPenalty}</p>
                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={handlePlaySound}
                      className="px-6 py-3 bg-white text-purple-600 font-bold rounded-xl hover:bg-purple-50 active:scale-95 transition-all shadow"
                    >
                      ♪ {t.playSound}
                    </button>
                    <button
                      onClick={handleReplay}
                      disabled={replaysLeft <= 0 || answered}
                      className={`px-6 py-3 font-bold rounded-xl transition-all shadow ${
                        replaysLeft > 0 && !answered
                          ? "bg-white/20 text-white hover:bg-white/30 active:scale-95"
                          : "bg-white/10 text-white/40 cursor-not-allowed"
                      }`}
                    >
                      ↩ {t.replay} ({replaysLeft})
                    </button>
                  </div>
                </div>

                {/* Feedback */}
                <AnimatePresence>
                  {lastCorrect !== null && (
                    <motion.div
                      key="feedback"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className={`text-center py-3 rounded-xl font-bold text-lg ${
                        lastCorrect
                          ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                          : "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                      }`}
                    >
                      {lastCorrect ? t.correct : `${t.wrong} — ${t.correctWas} ${currentNote.name}`}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Piano Keyboard */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-slate-200 dark:border-slate-700 overflow-x-auto">
                  <div className="flex gap-1 justify-center">
                    {octaves.map((oct) => (
                      <PianoOctave
                        key={oct}
                        octave={oct}
                        availableNotes={availableNotes}
                        onKeyClick={handleKeyClick}
                        highlightCorrect={highlightCorrect}
                        highlightWrong={highlightWrong}
                        answered={answered}
                        locale={locale}
                        whiteOnly={whiteOnly}
                      />
                    ))}
                  </div>
                </div>

                {/* Progress dots */}
                <div className="flex gap-1 justify-center flex-wrap">
                  {roundHistory.map((h, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-full ${h.correct ? "bg-green-400" : "bg-red-400"}`}
                      title={h.note}
                    />
                  ))}
                  {Array.from({ length: config.rounds - roundHistory.length }).map((_, i) => (
                    <div key={`empty-${i}`} className="w-3 h-3 rounded-full bg-slate-200 dark:bg-slate-600" />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Result Screen */}
            {gameState === "result" && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700"
              >
                <h2 className="text-2xl font-bold text-center text-slate-700 dark:text-slate-200 mb-2">{t.result}</h2>

                {(() => {
                  const rating = getRating();
                  return (
                    <div className={`text-center text-3xl font-black mb-4 bg-gradient-to-r ${
                      accuracy === 100 ? "from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent" : ""
                    } ${accuracy < 100 ? rating.color : ""}`}>
                      {rating.label}
                    </div>
                  );
                })()}

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{score}/{config.rounds}</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">{t.score}</div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{accuracy}%</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">{t.accuracy}</div>
                  </div>
                </div>

                {topMissed.length > 0 && (
                  <div className="mb-4 bg-red-50 dark:bg-red-900/20 rounded-xl p-4">
                    <div className="text-sm font-semibold text-red-600 dark:text-red-400 mb-2">{t.missedNotes}</div>
                    <div className="flex gap-2 flex-wrap">
                      {topMissed.map(([noteName, count]) => (
                        <span key={noteName} className="bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 text-sm px-3 py-1 rounded-full font-medium">
                          {noteName} ×{count}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3 mb-4 text-center text-sm text-slate-500 dark:text-slate-400">
                  {t.bestScore}: {bestScores[difficulty]}/{config.rounds}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={startGame}
                    className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-violet-600 text-white font-bold rounded-xl hover:opacity-90 active:scale-95 transition-all"
                  >
                    {t.tryAgain}
                  </button>
                  <button
                    onClick={() => setGameState("idle")}
                    className="flex-1 py-3 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 active:scale-95 transition-all"
                  >
                    {t.changeDiff}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AdBanner format="in-article" className="my-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2" />

          {/* FAQ */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 mt-4">
            <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
              {t.faqTitle}
            </h2>
            <div className="space-y-2">
              {t.faqItems.map((item, i) => (
                <details key={i} className="group">
                  <summary className="cursor-pointer text-sm font-medium text-slate-700 dark:text-slate-200 py-2 hover:text-purple-500">
                    {item.q}
                  </summary>
                  <p className="text-sm text-slate-500 dark:text-slate-400 pb-3 pl-4 leading-relaxed">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>

          <AdBanner format="rectangle" className="my-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2" />

        </div>
      </main>
    </PageTransition>
  );
}
