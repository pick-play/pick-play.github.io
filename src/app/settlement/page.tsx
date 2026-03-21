"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import AdBanner from "@/components/AdBanner";

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

let nextExpenseId = 1;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function SettlementPage() {
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
      { id: nextExpenseId++, name: "", amount: 0, payer: "", excluded: [] },
      { id: nextExpenseId++, name: "", amount: 0, payer: "", excluded: [] },
      { id: nextExpenseId++, name: "", amount: 0, payer: "", excluded: [] },
    ]);
  };

  const addExpense = () => {
    setExpenses([
      ...expenses,
      { id: nextExpenseId++, name: "", amount: 0, payer: "", excluded: [] },
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

  const handleCopy = () => {
    const lines = [
      "[ 정산 결과 ]",
      "",
      ...settlements.map(
        (s) =>
          `${s.name}: 지출 ${s.spent.toLocaleString()}원 / 부담 ${s.share.toLocaleString()}원 / ${s.balance >= 0 ? "+" : ""}${s.balance.toLocaleString()}원`
      ),
      "",
      "[ 송금 방법 ]",
      ...transfers.map(
        (t) => `${t.from} → ${t.to}: ${t.amount.toLocaleString()}원`
      ),
    ];
    navigator.clipboard.writeText(lines.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
            회식비{" "}
            <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              정산
            </span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            항목별 지출을 입력하면 최소 송금으로 정산해 드립니다
          </p>
        </motion.div>

        {/* Step 1: Participants */}
        {!participantsConfirmed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700"
          >
            <h2 className="text-lg font-bold mb-4">참여자 입력</h2>
            <div className="space-y-3 mb-4">
              {participants.map((name, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => updateParticipant(i, e.target.value)}
                    placeholder={`참여자 ${i + 1}`}
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
              + 참여자 추가
            </button>
            <AdBanner format="horizontal" className="mb-3 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2" />
            <button
              onClick={confirmParticipants}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-green-400 to-emerald-500 text-white font-semibold hover:shadow-lg hover:shadow-green-500/25 transition-all"
            >
              참여자 확정
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
                <h2 className="text-lg font-bold">지출 내역</h2>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <span>참여자:</span>
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
                        placeholder="항목 (예: 저녁식사)"
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
                        placeholder="금액"
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
                          <option value="">지불자</option>
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
                      <span className="text-xs text-slate-400">제외:</span>
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
                + 지출 항목 추가
              </button>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleReset}
                className="flex-1 py-3 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                처음으로
              </button>
              <button
                onClick={handleSettle}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-green-400 to-emerald-500 text-white font-semibold hover:shadow-lg hover:shadow-green-500/25 transition-all"
              >
                정산하기
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
                <h2 className="text-lg font-bold mb-4">지출 내역</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-700">
                        <th className="text-left py-2 font-medium text-slate-500">항목</th>
                        <th className="text-right py-2 font-medium text-slate-500">금액</th>
                        <th className="text-left py-2 pl-4 font-medium text-slate-500">지불자</th>
                        <th className="text-left py-2 pl-4 font-medium text-slate-500">제외</th>
                      </tr>
                    </thead>
                    <tbody>
                      {expenses
                        .filter((e) => e.name && e.amount > 0 && e.payer)
                        .map((e) => (
                          <tr key={e.id} className="border-b border-slate-100 dark:border-slate-700/50">
                            <td className="py-2">{e.name}</td>
                            <td className="py-2 text-right">{e.amount.toLocaleString()}원</td>
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
                <h2 className="text-lg font-bold mb-4">참여자별 정산</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {settlements.map((s) => (
                    <div
                      key={s.name}
                      className="p-4 rounded-xl bg-slate-50 dark:bg-slate-700/30 border border-slate-200 dark:border-slate-600"
                    >
                      <div className="font-bold text-lg mb-2">{s.name}</div>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <div className="text-slate-400 text-xs">지출</div>
                          <div className="font-medium">{s.spent.toLocaleString()}원</div>
                        </div>
                        <div>
                          <div className="text-slate-400 text-xs">부담</div>
                          <div className="font-medium">{s.share.toLocaleString()}원</div>
                        </div>
                        <div>
                          <div className="text-slate-400 text-xs">결과</div>
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
                            {s.balance.toLocaleString()}원
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
                  <h2 className="text-lg font-bold">송금 방법</h2>
                  <button
                    onClick={handleCopy}
                    className="px-4 py-1.5 text-sm rounded-lg border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                  >
                    {copied ? "복사됨!" : "결과 복사"}
                  </button>
                </div>
                {transfers.length === 0 ? (
                  <div className="text-center py-6 text-slate-500">
                    정산할 금액이 없습니다.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {transfers.map((t, i) => (
                      <motion.div
                        key={i}
                        variants={itemVariants}
                        className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-700/30 border border-slate-200 dark:border-slate-600"
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-red-500">{t.from}</span>
                          <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                          <span className="font-semibold text-green-500">{t.to}</span>
                        </div>
                        <span className="text-lg font-bold">{t.amount.toLocaleString()}원</span>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>

              <button
                onClick={handleReset}
                className="w-full py-3 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                처음으로
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        <AdBanner format="in-article" className="mt-8 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2" />
        <AdBanner format="rectangle" className="my-6 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2" />

        {/* SEO FAQ Section */}
        <section className="mt-16 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-center">자주 묻는 질문</h2>
          <div className="space-y-4">
            <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-slate-700 dark:text-slate-200 hover:text-emerald-500 transition-colors">
                회식비 정산은 어떻게 하나요?
                <svg className="w-5 h-5 shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <p className="px-5 pb-5 text-slate-500 dark:text-slate-400 leading-relaxed">
                참여자 이름을 입력하고, 각 지출 항목(식사, 2차 등)의 금액과 지불자를 입력하면 자동으로 최소 송금 횟수로 정산 결과를 계산해 드립니다. 특정 항목에 참여하지 않은 사람은 제외할 수도 있습니다.
              </p>
            </details>
            <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-slate-700 dark:text-slate-200 hover:text-emerald-500 transition-colors">
                더치페이와 N빵의 차이가 뭔가요?
                <svg className="w-5 h-5 shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <p className="px-5 pb-5 text-slate-500 dark:text-slate-400 leading-relaxed">
                더치페이는 각자 먹은 만큼 내는 방식이고, N빵은 총액을 인원수로 균등하게 나누는 방식입니다. PickPlay 정산 계산기는 두 방식 모두 지원하며, 항목별로 참여자를 제외하는 차등 정산도 가능합니다.
              </p>
            </details>
            <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-slate-700 dark:text-slate-200 hover:text-emerald-500 transition-colors">
                정산 결과를 공유할 수 있나요?
                <svg className="w-5 h-5 shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <p className="px-5 pb-5 text-slate-500 dark:text-slate-400 leading-relaxed">
                네, 정산 결과 화면에서 &apos;결과 복사&apos; 버튼을 누르면 텍스트 형태로 클립보드에 복사됩니다. 카카오톡이나 메신저에 바로 붙여넣기하여 공유할 수 있습니다.
              </p>
            </details>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
