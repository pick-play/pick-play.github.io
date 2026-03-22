"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import AdBanner from "@/components/AdBanner";
import { useLocale } from "@/hooks/useLocale";

type Expense = {
  id: number;
  name: string;
  amount: number;
  payer: string;
  excluded: string[];
};

type Settlement = {
  name: string;
  spent: number;
  share: number;
  balance: number;
};

type Transfer = {
  from: string;
  to: string;
  amount: number;
};

const translations = {
  ko: {
    title: "회식비",
    titleHighlight: "정산",
    subtitle: "항목별 지출을 입력하면 최소 송금으로 정산해 드립니다",
    stepParticipants: "참여자 입력",
    participantPlaceholder: (i: number) => `참여자 ${i + 1}`,
    btnAddParticipant: "+ 참여자 추가",
    btnConfirmParticipants: "참여자 확정",
    stepExpenses: "지출 내역",
    participantsLabel: "참여자:",
    expensePlaceholder: "항목 (예: 저녁식사)",
    amountPlaceholder: "금액",
    payerPlaceholder: "지불자",
    excludeLabel: "제외:",
    btnAddExpense: "+ 지출 항목 추가",
    btnBack: "처음으로",
    btnSettle: "정산하기",
    resultExpenses: "지출 내역",
    colItem: "항목",
    colAmount: "금액",
    colPayer: "지불자",
    colExcluded: "제외",
    resultPerPerson: "참여자별 정산",
    colSpent: "지출",
    colShare: "부담",
    colResult: "결과",
    resultTransfers: "송금 방법",
    btnCopy: "결과 복사",
    btnCopied: "복사됨!",
    noTransfers: "정산할 금액이 없습니다.",
    currency: (amount: number) => `${amount.toLocaleString()}원`,
    copyHeader: "[ 정산 결과 ]",
    copySpent: (name: string, spent: number, share: number, balance: number) =>
      `${name}: 지출 ${spent.toLocaleString()}원 / 부담 ${share.toLocaleString()}원 / ${balance >= 0 ? "+" : ""}${balance.toLocaleString()}원`,
    copyTransferHeader: "[ 송금 방법 ]",
    copyTransfer: (from: string, to: string, amount: number) =>
      `${from} → ${to}: ${amount.toLocaleString()}원`,
    faqTitle: "자주 묻는 질문",
    faqItems: [
      {
        q: "회식비 정산은 어떻게 하나요?",
        a: "참여자 이름을 입력하고, 각 지출 항목(식사, 2차 등)의 금액과 지불자를 입력하면 자동으로 최소 송금 횟수로 정산 결과를 계산해 드립니다. 특정 항목에 참여하지 않은 사람은 제외할 수도 있습니다.",
      },
      {
        q: "더치페이와 N빵의 차이가 뭔가요?",
        a: "더치페이는 각자 먹은 만큼 내는 방식이고, N빵은 총액을 인원수로 균등하게 나누는 방식입니다. PickPlay 정산 계산기는 두 방식 모두 지원하며, 항목별로 참여자를 제외하는 차등 정산도 가능합니다.",
      },
      {
        q: "정산 결과를 공유할 수 있나요?",
        a: "네, 정산 결과 화면에서 '결과 복사' 버튼을 누르면 텍스트 형태로 클립보드에 복사됩니다. 카카오톡이나 메신저에 바로 붙여넣기하여 공유할 수 있습니다.",
      },
    ],
  },
  en: {
    title: "Bill",
    titleHighlight: "Splitter",
    subtitle: "Enter expenses by item and we'll calculate the minimum transfers to settle up",
    stepParticipants: "Enter Participants",
    participantPlaceholder: (i: number) => `Participant ${i + 1}`,
    btnAddParticipant: "+ Add Participant",
    btnConfirmParticipants: "Confirm Participants",
    stepExpenses: "Expenses",
    participantsLabel: "Participants:",
    expensePlaceholder: "Item (e.g. Dinner)",
    amountPlaceholder: "Amount",
    payerPlaceholder: "Paid by",
    excludeLabel: "Exclude:",
    btnAddExpense: "+ Add Expense",
    btnBack: "Start Over",
    btnSettle: "Calculate",
    resultExpenses: "Expense Summary",
    colItem: "Item",
    colAmount: "Amount",
    colPayer: "Paid by",
    colExcluded: "Excluded",
    resultPerPerson: "Per-Person Breakdown",
    colSpent: "Paid",
    colShare: "Share",
    colResult: "Balance",
    resultTransfers: "Transfers",
    btnCopy: "Copy Result",
    btnCopied: "Copied!",
    noTransfers: "Everyone is settled up!",
    currency: (amount: number) => `₩${amount.toLocaleString()}`,
    copyHeader: "[ Settlement Result ]",
    copySpent: (name: string, spent: number, share: number, balance: number) =>
      `${name}: Paid ₩${spent.toLocaleString()} / Share ₩${share.toLocaleString()} / ${balance >= 0 ? "+" : ""}₩${balance.toLocaleString()}`,
    copyTransferHeader: "[ Transfers ]",
    copyTransfer: (from: string, to: string, amount: number) =>
      `${from} → ${to}: ₩${amount.toLocaleString()}`,
    faqTitle: "Frequently Asked Questions",
    faqItems: [
      {
        q: "How does the bill splitter work?",
        a: "Enter participant names, then add each expense with the amount and who paid. The calculator automatically finds the minimum number of transfers to settle all debts. You can also exclude specific participants from individual expenses.",
      },
      {
        q: "What's the difference between Dutch pay and splitting evenly?",
        a: "Dutch pay means each person pays for what they consumed, while splitting evenly divides the total equally. PickPlay's calculator supports both methods, and you can mix them by excluding participants from specific items.",
      },
      {
        q: "Can I share the settlement result?",
        a: "Yes! Click the 'Copy Result' button on the results screen to copy the settlement summary as text to your clipboard. Paste it directly into a chat app to share with your group.",
      },
    ],
  },
  ja: {
    title: "割り勘",
    titleHighlight: "計算",
    subtitle: "項目ごとの支出を入力すると、最小振込回数で精算します",
    stepParticipants: "参加者の入力",
    participantPlaceholder: (i: number) => `参加者 ${i + 1}`,
    btnAddParticipant: "+ 参加者を追加",
    btnConfirmParticipants: "参加者を確定",
    stepExpenses: "支出内訳",
    participantsLabel: "参加者：",
    expensePlaceholder: "項目（例：夕食）",
    amountPlaceholder: "金額",
    payerPlaceholder: "支払者",
    excludeLabel: "除外：",
    btnAddExpense: "+ 支出を追加",
    btnBack: "最初から",
    btnSettle: "精算する",
    resultExpenses: "支出内訳",
    colItem: "項目",
    colAmount: "金額",
    colPayer: "支払者",
    colExcluded: "除外",
    resultPerPerson: "参加者別精算",
    colSpent: "支払",
    colShare: "負担",
    colResult: "結果",
    resultTransfers: "送金方法",
    btnCopy: "結果をコピー",
    btnCopied: "コピー済！",
    noTransfers: "精算する金額はありません。",
    currency: (amount: number) => `₩${amount.toLocaleString()}`,
    copyHeader: "[ 精算結果 ]",
    copySpent: (name: string, spent: number, share: number, balance: number) =>
      `${name}：支払 ₩${spent.toLocaleString()} / 負担 ₩${share.toLocaleString()} / ${balance >= 0 ? "+" : ""}₩${balance.toLocaleString()}`,
    copyTransferHeader: "[ 送金方法 ]",
    copyTransfer: (from: string, to: string, amount: number) =>
      `${from} → ${to}：₩${amount.toLocaleString()}`,
    faqTitle: "よくある質問",
    faqItems: [
      {
        q: "割り勘計算はどうやって使いますか？",
        a: "参加者の名前を入力し、各支出項目（食事、2次会など）の金額と支払者を入力すると、自動的に最小振込回数で精算結果を計算します。特定の項目に参加しない人を除外することもできます。",
      },
      {
        q: "割り勘と均等分割の違いは何ですか？",
        a: "割り勘は各自が消費した分を支払う方法で、均等分割は合計金額を人数で均等に分ける方法です。PickPlayの精算計算機は両方に対応しており、項目ごとに参加者を除外する差等精算も可能です。",
      },
      {
        q: "精算結果を共有できますか？",
        a: "はい、精算結果画面で「結果をコピー」ボタンを押すとテキスト形式でクリップボードにコピーされます。LINEやメッセンジャーに直接貼り付けて共有できます。",
      },
    ],
  },
  zh: {
    title: "账单",
    titleHighlight: "分摊",
    subtitle: "输入各项支出，自动以最少转账次数完成结算",
    stepParticipants: "输入参与者",
    participantPlaceholder: (i: number) => `参与者 ${i + 1}`,
    btnAddParticipant: "+ 添加参与者",
    btnConfirmParticipants: "确认参与者",
    stepExpenses: "支出明细",
    participantsLabel: "参与者：",
    expensePlaceholder: "项目（如：晚餐）",
    amountPlaceholder: "金额",
    payerPlaceholder: "付款人",
    excludeLabel: "排除：",
    btnAddExpense: "+ 添加支出项目",
    btnBack: "重新开始",
    btnSettle: "计算结算",
    resultExpenses: "支出明细",
    colItem: "项目",
    colAmount: "金额",
    colPayer: "付款人",
    colExcluded: "排除",
    resultPerPerson: "人均结算",
    colSpent: "支出",
    colShare: "应付",
    colResult: "结果",
    resultTransfers: "转账方式",
    btnCopy: "复制结果",
    btnCopied: "已复制！",
    noTransfers: "无需转账。",
    currency: (amount: number) => `₩${amount.toLocaleString()}`,
    copyHeader: "[ 结算结果 ]",
    copySpent: (name: string, spent: number, share: number, balance: number) =>
      `${name}：支出 ₩${spent.toLocaleString()} / 应付 ₩${share.toLocaleString()} / ${balance >= 0 ? "+" : ""}₩${balance.toLocaleString()}`,
    copyTransferHeader: "[ 转账方式 ]",
    copyTransfer: (from: string, to: string, amount: number) =>
      `${from} → ${to}：₩${amount.toLocaleString()}`,
    faqTitle: "常见问题",
    faqItems: [
      {
        q: "如何使用账单分摊功能？",
        a: "输入参与者姓名，然后添加各项支出（餐费、第二摊等）的金额和付款人，系统会自动以最少转账次数计算结算结果。也可以将特定参与者从某项支出中排除。",
      },
      {
        q: "AA制和平摊有什么区别？",
        a: "AA制是各自支付自己消费的金额，平摊是将总金额按人数均等分配。PickPlay结算计算器支持两种方式，还可以按项目排除参与者进行差额结算。",
      },
      {
        q: "可以分享结算结果吗？",
        a: "可以，在结算结果页面点击「复制结果」按钮，结算摘要将以文本形式复制到剪贴板，可直接粘贴到微信等聊天软件中分享。",
      },
    ],
  },
  es: {
    title: "División de",
    titleHighlight: "gastos",
    subtitle: "Ingresa los gastos por ítem y calculamos las transferencias mínimas para saldar cuentas",
    stepParticipants: "Participantes",
    participantPlaceholder: (i: number) => `Participante ${i + 1}`,
    btnAddParticipant: "+ Agregar participante",
    btnConfirmParticipants: "Confirmar participantes",
    stepExpenses: "Gastos",
    participantsLabel: "Participantes:",
    expensePlaceholder: "Ítem (ej. Cena)",
    amountPlaceholder: "Monto",
    payerPlaceholder: "Pagado por",
    excludeLabel: "Excluir:",
    btnAddExpense: "+ Agregar gasto",
    btnBack: "Volver al inicio",
    btnSettle: "Calcular",
    resultExpenses: "Resumen de gastos",
    colItem: "Ítem",
    colAmount: "Monto",
    colPayer: "Pagado por",
    colExcluded: "Excluidos",
    resultPerPerson: "Desglose por persona",
    colSpent: "Pagado",
    colShare: "Parte",
    colResult: "Saldo",
    resultTransfers: "Transferencias",
    btnCopy: "Copiar resultado",
    btnCopied: "¡Copiado!",
    noTransfers: "¡Todo saldado!",
    currency: (amount: number) => `₩${amount.toLocaleString()}`,
    copyHeader: "[ Resultado de la división ]",
    copySpent: (name: string, spent: number, share: number, balance: number) =>
      `${name}: Pagó ₩${spent.toLocaleString()} / Parte ₩${share.toLocaleString()} / ${balance >= 0 ? "+" : ""}₩${balance.toLocaleString()}`,
    copyTransferHeader: "[ Transferencias ]",
    copyTransfer: (from: string, to: string, amount: number) =>
      `${from} → ${to}: ₩${amount.toLocaleString()}`,
    faqTitle: "Preguntas frecuentes",
    faqItems: [
      {
        q: "¿Cómo funciona el divisor de gastos?",
        a: "Ingresa los nombres de los participantes, luego agrega cada gasto con el monto y quién pagó. El calculador encuentra automáticamente el número mínimo de transferencias para saldar todas las deudas. También puedes excluir participantes específicos de gastos individuales.",
      },
      {
        q: "¿Cuál es la diferencia entre pago holandés y división equitativa?",
        a: "El pago holandés significa que cada persona paga lo que consumió, mientras que la división equitativa divide el total de forma igualitaria. El calculador de PickPlay admite ambos métodos, y puedes combinarlos excluyendo participantes de ítems específicos.",
      },
      {
        q: "¿Puedo compartir el resultado?",
        a: "¡Sí! Haz clic en 'Copiar resultado' en la pantalla de resultados para copiar el resumen como texto al portapapeles. Pégalo directamente en una app de chat para compartirlo con tu grupo.",
      },
    ],
  },
};

function calculateSettlement(
  participants: string[],
  expenses: Expense[]
): { settlements: Settlement[]; transfers: Transfer[] } {
  const totalSpent: Record<string, number> = {};
  const totalShare: Record<string, number> = {};
  participants.forEach((name) => {
    totalSpent[name] = 0;
    totalShare[name] = 0;
  });

  expenses.forEach((expense) => {
    const { amount, payer, excluded } = expense;
    if (!amount || !payer) return;

    const validParticipants = participants.filter((p) => !excluded.includes(p));
    totalSpent[payer] = (totalSpent[payer] || 0) + amount;

    if (validParticipants.length > 0) {
      const sharePerPerson = Math.floor(amount / validParticipants.length);
      const remainder = amount - sharePerPerson * validParticipants.length;

      validParticipants.forEach((p) => {
        totalShare[p] += sharePerPerson;
      });
      totalShare[payer] += remainder;
    }
  });

  const settlements: Settlement[] = participants.map((name) => ({
    name,
    spent: totalSpent[name],
    share: totalShare[name],
    balance: totalSpent[name] - totalShare[name],
  }));

  const debtors = settlements
    .filter((s) => s.balance < 0)
    .map((s) => ({ ...s }))
    .sort((a, b) => a.balance - b.balance);
  const creditors = settlements
    .filter((s) => s.balance > 0)
    .map((s) => ({ ...s }))
    .sort((a, b) => b.balance - a.balance);

  const transfers: Transfer[] = [];
  let i = 0;
  let j = 0;

  while (i < debtors.length && j < creditors.length) {
    const amount = Math.min(-debtors[i].balance, creditors[j].balance);
    if (amount > 0) {
      transfers.push({
        from: debtors[i].name,
        to: creditors[j].name,
        amount,
      });
    }
    debtors[i].balance += amount;
    creditors[j].balance -= amount;
    if (debtors[i].balance === 0) i++;
    if (creditors[j].balance === 0) j++;
  }

  return { settlements, transfers };
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function SettlementPage() {
  const locale = useLocale();
  const t = translations[locale];

  const nextExpenseIdRef = useRef(1);
  const [participants, setParticipants] = useState<string[]>(["", ""]);
  const [participantsConfirmed, setParticipantsConfirmed] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [settlements, setSettlements] = useState<Settlement[]>([]);
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [copied, setCopied] = useState(false);

  const addParticipant = () => setParticipants([...participants, ""]);

  const removeParticipant = (index: number) => {
    if (participants.length <= 2) return;
    setParticipants(participants.filter((_, i) => i !== index));
  };

  const updateParticipant = (index: number, value: string) => {
    const updated = [...participants];
    updated[index] = value;
    setParticipants(updated);
  };

  const confirmParticipants = () => {
    const valid = participants.map((p) => p.trim()).filter(Boolean);
    if (valid.length < 2) return;
    if (new Set(valid).size !== valid.length) return;
    setParticipants(valid);
    setParticipantsConfirmed(true);
    setExpenses([
      { id: nextExpenseIdRef.current++, name: "", amount: 0, payer: "", excluded: [] },
      { id: nextExpenseIdRef.current++, name: "", amount: 0, payer: "", excluded: [] },
      { id: nextExpenseIdRef.current++, name: "", amount: 0, payer: "", excluded: [] },
    ]);
  };

  const addExpense = () => {
    setExpenses([
      ...expenses,
      { id: nextExpenseIdRef.current++, name: "", amount: 0, payer: "", excluded: [] },
    ]);
  };

  const removeExpense = (id: number) => {
    if (expenses.length <= 1) return;
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  const updateExpense = (id: number, field: keyof Expense, value: string | number | string[]) => {
    setExpenses(
      expenses.map((e) => (e.id === id ? { ...e, [field]: value } : e))
    );
  };

  const toggleExclude = (expenseId: number, participant: string) => {
    setExpenses(
      expenses.map((e) => {
        if (e.id !== expenseId) return e;
        const excluded = e.excluded.includes(participant)
          ? e.excluded.filter((p) => p !== participant)
          : [...e.excluded, participant];
        return { ...e, excluded };
      })
    );
  };

  const handleSettle = () => {
    const validExpenses = expenses.filter(
      (e) => e.name.trim() && e.amount > 0 && e.payer
    );
    if (validExpenses.length === 0) return;

    const result = calculateSettlement(participants, validExpenses);
    setSettlements(result.settlements);
    setTransfers(result.transfers);
    setShowResult(true);
  };

  const handleCopy = async () => {
    const lines = [
      t.copyHeader,
      "",
      ...settlements.map((s) => t.copySpent(s.name, s.spent, s.share, s.balance)),
      "",
      t.copyTransferHeader,
      ...transfers.map((tr) => t.copyTransfer(tr.from, tr.to, tr.amount)),
    ];
    try {
      await navigator.clipboard.writeText(lines.join("\n"));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReset = () => {
    setParticipantsConfirmed(false);
    setExpenses([]);
    setSettlements([]);
    setTransfers([]);
    setShowResult(false);
    setParticipants(["", ""]);
  };

  const formatAmount = (value: string): number => {
    return parseInt(value.replace(/,/g, "")) || 0;
  };

  const displayAmount = (amount: number): string => {
    return amount > 0 ? amount.toLocaleString() : "";
  };

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            {t.title}{" "}
            <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              {t.titleHighlight}
            </span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Step 1: Participants */}
        {!participantsConfirmed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700"
          >
            <h2 className="text-lg font-bold mb-4">{t.stepParticipants}</h2>
            <div className="space-y-3 mb-4">
              {participants.map((name, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => updateParticipant(i, e.target.value)}
                    placeholder={t.participantPlaceholder(i)}
                    className="flex-1 px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  {participants.length > 2 && (
                    <button
                      onClick={() => removeParticipant(i)}
                      className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={addParticipant}
              className="w-full py-2.5 mb-3 rounded-lg border border-dashed border-slate-300 dark:border-slate-600 text-slate-500 hover:border-green-400 hover:text-green-500 transition-colors"
            >
              {t.btnAddParticipant}
            </button>
            <AdBanner format="horizontal" className="mb-3 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2" />
            <button
              onClick={confirmParticipants}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-green-400 to-emerald-500 text-white font-semibold hover:shadow-lg hover:shadow-green-500/25 transition-all"
            >
              {t.btnConfirmParticipants}
            </button>
          </motion.div>
        )}

        {/* Step 2: Expenses */}
        {participantsConfirmed && !showResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">{t.stepExpenses}</h2>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <span>{t.participantsLabel}</span>
                  {participants.map((p) => (
                    <span key={p} className="px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-medium">
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {expenses.map((expense) => (
                  <div
                    key={expense.id}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-slate-700/30 border border-slate-200 dark:border-slate-600"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                      <input
                        type="text"
                        value={expense.name}
                        onChange={(e) =>
                          updateExpense(expense.id, "name", e.target.value)
                        }
                        placeholder={t.expensePlaceholder}
                        className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        inputMode="numeric"
                        value={displayAmount(expense.amount)}
                        onChange={(e) =>
                          updateExpense(
                            expense.id,
                            "amount",
                            formatAmount(e.target.value)
                          )
                        }
                        placeholder={t.amountPlaceholder}
                        className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                      <div className="flex gap-2">
                        <select
                          value={expense.payer}
                          onChange={(e) =>
                            updateExpense(expense.id, "payer", e.target.value)
                          }
                          className="flex-1 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          <option value="">{t.payerPlaceholder}</option>
                          {participants.map((p) => (
                            <option key={p} value={p}>{p}</option>
                          ))}
                        </select>
                        {expenses.length > 1 && (
                          <button
                            onClick={() => removeExpense(expense.id)}
                            className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                    {/* Exclude toggles */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs text-slate-400">{t.excludeLabel}</span>
                      {participants.map((p) => (
                        <button
                          key={p}
                          onClick={() => toggleExclude(expense.id, p)}
                          className={`px-2 py-0.5 text-xs rounded-full border transition-colors ${
                            expense.excluded.includes(p)
                              ? "border-red-400 bg-red-50 dark:bg-red-900/20 text-red-500"
                              : "border-slate-300 dark:border-slate-600 text-slate-400 hover:border-red-300"
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={addExpense}
                className="w-full py-2.5 mt-4 rounded-lg border border-dashed border-slate-300 dark:border-slate-600 text-slate-500 hover:border-green-400 hover:text-green-500 transition-colors"
              >
                {t.btnAddExpense}
              </button>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleReset}
                className="flex-1 py-3 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                {t.btnBack}
              </button>
              <button
                onClick={handleSettle}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-green-400 to-emerald-500 text-white font-semibold hover:shadow-lg hover:shadow-green-500/25 transition-all"
              >
                {t.btnSettle}
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Results */}
        <AnimatePresence>
          {showResult && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* Expense Summary */}
              <motion.div
                variants={itemVariants}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700"
              >
                <h2 className="text-lg font-bold mb-4">{t.resultExpenses}</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-700">
                        <th className="text-left py-2 font-medium text-slate-500">{t.colItem}</th>
                        <th className="text-right py-2 font-medium text-slate-500">{t.colAmount}</th>
                        <th className="text-left py-2 pl-4 font-medium text-slate-500">{t.colPayer}</th>
                        <th className="text-left py-2 pl-4 font-medium text-slate-500">{t.colExcluded}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {expenses
                        .filter((e) => e.name && e.amount > 0 && e.payer)
                        .map((e) => (
                          <tr key={e.id} className="border-b border-slate-100 dark:border-slate-700/50">
                            <td className="py-2">{e.name}</td>
                            <td className="py-2 text-right">{t.currency(e.amount)}</td>
                            <td className="py-2 pl-4">{e.payer}</td>
                            <td className="py-2 pl-4 text-slate-400">{e.excluded.join(", ") || "-"}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>

              {/* Per-person Summary */}
              <motion.div
                variants={itemVariants}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700"
              >
                <h2 className="text-lg font-bold mb-4">{t.resultPerPerson}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {settlements.map((s) => (
                    <div
                      key={s.name}
                      className="p-4 rounded-xl bg-slate-50 dark:bg-slate-700/30 border border-slate-200 dark:border-slate-600"
                    >
                      <div className="font-bold text-lg mb-2">{s.name}</div>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <div className="text-slate-400 text-xs">{t.colSpent}</div>
                          <div className="font-medium">{t.currency(s.spent)}</div>
                        </div>
                        <div>
                          <div className="text-slate-400 text-xs">{t.colShare}</div>
                          <div className="font-medium">{t.currency(s.share)}</div>
                        </div>
                        <div>
                          <div className="text-slate-400 text-xs">{t.colResult}</div>
                          <div
                            className={`font-bold ${
                              s.balance > 0
                                ? "text-green-500"
                                : s.balance < 0
                                ? "text-red-500"
                                : "text-slate-500"
                            }`}
                          >
                            {s.balance > 0 ? "+" : ""}
                            {t.currency(s.balance)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Transfer Methods */}
              <motion.div
                variants={itemVariants}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold">{t.resultTransfers}</h2>
                  <button
                    onClick={handleCopy}
                    className="px-4 py-1.5 text-sm rounded-lg border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                  >
                    {copied ? t.btnCopied : t.btnCopy}
                  </button>
                </div>
                {transfers.length === 0 ? (
                  <div className="text-center py-6 text-slate-500">
                    {t.noTransfers}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {transfers.map((tr, i) => (
                      <motion.div
                        key={i}
                        variants={itemVariants}
                        className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-700/30 border border-slate-200 dark:border-slate-600"
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-red-500">{tr.from}</span>
                          <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                          <span className="font-semibold text-green-500">{tr.to}</span>
                        </div>
                        <span className="text-lg font-bold">{t.currency(tr.amount)}</span>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>

              <button
                onClick={handleReset}
                className="w-full py-3 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                {t.btnBack}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        <AdBanner format="in-article" className="mt-8 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2" />
        <AdBanner format="rectangle" className="my-6 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2" />

        {/* SEO FAQ Section */}
        <section className="mt-16 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-center">{t.faqTitle}</h2>
          <div className="space-y-4">
            {t.faqItems.map((item, idx) => (
              <details key={idx} className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-slate-700 dark:text-slate-200 hover:text-emerald-500 transition-colors">
                  {item.q}
                  <svg className="w-5 h-5 shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <p className="px-5 pb-5 text-slate-500 dark:text-slate-400 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
