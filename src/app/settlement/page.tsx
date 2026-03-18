"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";

type Participant = {
  id: number;
  name: string;
  paid: number;
  shouldPay: number;
};

type Transfer = {
  from: string;
  to: string;
  amount: number;
};

type Mode = "equal" | "custom";

function calculateMinTransfers(participants: Participant[]): Transfer[] {
  const balances: { name: string; balance: number }[] = participants.map((p) => ({
    name: p.name,
    balance: p.paid - p.shouldPay,
  }));

  const debtors = balances
    .filter((b) => b.balance < 0)
    .sort((a, b) => a.balance - b.balance);
  const creditors = balances
    .filter((b) => b.balance > 0)
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
        amount: Math.round(amount),
      });
    }
    debtors[i].balance += amount;
    creditors[j].balance -= amount;

    if (Math.abs(debtors[i].balance) < 1) i++;
    if (Math.abs(creditors[j].balance) < 1) j++;
  }

  return transfers;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function SettlementPage() {
  const [totalAmount, setTotalAmount] = useState("");
  const [names, setNames] = useState("");
  const [mode, setMode] = useState<Mode>("equal");
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [setupDone, setSetupDone] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSetup = (e: React.FormEvent) => {
    e.preventDefault();
    const nameList = names
      .split(",")
      .map((n) => n.trim())
      .filter(Boolean);
    if (nameList.length < 2) return;

    const total = parseInt(totalAmount);
    if (!total || total <= 0) return;

    const perPerson = Math.floor(total / nameList.length);
    const remainder = total - perPerson * nameList.length;
    const newParticipants: Participant[] = nameList.map((name, i) => ({
      id: i,
      name,
      paid: 0,
      shouldPay: mode === "equal" ? perPerson + (i < remainder ? 1 : 0) : 0,
    }));

    setParticipants(newParticipants);
    setSetupDone(true);
    setShowResult(false);
  };

  const updatePaid = (id: number, value: string) => {
    setParticipants((prev) =>
      prev.map((p) => (p.id === id ? { ...p, paid: parseInt(value) || 0 } : p))
    );
  };

  const updateShouldPay = (id: number, value: string) => {
    setParticipants((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, shouldPay: parseInt(value) || 0 } : p
      )
    );
  };

  const handleCalculate = () => {
    const result = calculateMinTransfers(participants);
    setTransfers(result);
    setShowResult(true);
  };

  const handleCopy = () => {
    const text = transfers
      .map((t) => `${t.from} → ${t.to}: ${t.amount.toLocaleString()}원`)
      .join("\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setSetupDone(false);
    setShowResult(false);
    setParticipants([]);
    setTransfers([]);
    setTotalAmount("");
    setNames("");
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
            최소 송금으로 깔끔하게 정산하세요
          </p>
        </motion.div>

        {!setupDone ? (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSetup}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700"
          >
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  총 금액 (원)
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={totalAmount}
                  onChange={(e) => setTotalAmount(e.target.value)}
                  placeholder="예: 150000"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  참여자 이름 (쉼표로 구분)
                </label>
                <input
                  type="text"
                  required
                  value={names}
                  onChange={(e) => setNames(e.target.value)}
                  placeholder="예: 철수, 영희, 민수, 지영"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  정산 방식
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setMode("equal")}
                    className={`flex-1 py-2.5 rounded-lg border font-medium transition-all ${
                      mode === "equal"
                        ? "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-600"
                        : "border-slate-300 dark:border-slate-600 text-slate-500"
                    }`}
                  >
                    균등 분할 (더치페이)
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode("custom")}
                    className={`flex-1 py-2.5 rounded-lg border font-medium transition-all ${
                      mode === "custom"
                        ? "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-600"
                        : "border-slate-300 dark:border-slate-600 text-slate-500"
                    }`}
                  >
                    차등 분할
                  </button>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-green-400 to-emerald-500 text-white font-semibold hover:shadow-lg hover:shadow-green-500/25 transition-all"
            >
              다음 단계로
            </button>
          </motion.form>
        ) : (
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">결제 금액 입력</h2>
                <span className="text-sm text-slate-500">
                  총 {parseInt(totalAmount).toLocaleString()}원
                </span>
              </div>
              <div className="space-y-3">
                {participants.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center gap-3 flex-wrap"
                  >
                    <span className="w-16 font-medium text-sm truncate">
                      {p.name}
                    </span>
                    <div className="flex-1 min-w-[120px]">
                      <label className="text-xs text-slate-400 mb-1 block">
                        실제 결제액
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={p.paid || ""}
                        onChange={(e) => updatePaid(p.id, e.target.value)}
                        placeholder="0"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    {mode === "custom" && (
                      <div className="flex-1 min-w-[120px]">
                        <label className="text-xs text-slate-400 mb-1 block">
                          부담해야 할 금액
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={p.shouldPay || ""}
                          onChange={(e) =>
                            updateShouldPay(p.id, e.target.value)
                          }
                          placeholder="0"
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleReset}
                  className="flex-1 py-3 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  처음으로
                </button>
                <button
                  onClick={handleCalculate}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-green-400 to-emerald-500 text-white font-semibold hover:shadow-lg hover:shadow-green-500/25 transition-all"
                >
                  정산하기
                </button>
              </div>
            </motion.div>

            <AnimatePresence>
              {showResult && (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0 }}
                  className="space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold">정산 결과</h2>
                    <button
                      onClick={handleCopy}
                      className="px-4 py-1.5 text-sm rounded-lg border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                    >
                      {copied ? "복사됨!" : "결과 복사"}
                    </button>
                  </div>
                  {transfers.length === 0 ? (
                    <motion.div
                      variants={itemVariants}
                      className="text-center py-8 text-slate-500 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700"
                    >
                      정산할 내역이 없습니다.
                    </motion.div>
                  ) : (
                    transfers.map((t, i) => (
                      <motion.div
                        key={i}
                        variants={itemVariants}
                        className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="font-semibold text-red-500">
                              {t.from}
                            </span>
                            <svg
                              className="w-5 h-5 text-slate-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                              />
                            </svg>
                            <span className="font-semibold text-green-500">
                              {t.to}
                            </span>
                          </div>
                          <span className="text-lg font-bold">
                            {t.amount.toLocaleString()}원
                          </span>
                        </div>
                      </motion.div>
                    ))
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
