"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import AdBanner from "@/components/AdBanner";
import imageCompression from "browser-image-compression";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function convertImage(
  file: File,
  targetFormat: "image/jpeg" | "image/png" | "image/webp"
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      if (targetFormat === "image/jpeg") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(objectUrl);
      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error("변환 실패"))),
        targetFormat,
        0.92
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("이미지 로드 실패"));
    };
    img.src = objectUrl;
  });
}

function getOutputExt(mime: string): string {
  if (mime === "image/jpeg") return "jpg";
  if (mime === "image/png") return "png";
  if (mime === "image/webp") return "webp";
  return "jpg";
}

function stripExt(name: string): string {
  return name.replace(/\.[^.]+$/, "");
}

// ─── Types ────────────────────────────────────────────────────────────────────

type Tab =
  | "convert-png-jpg"
  | "convert-webp"
  | "compress"
  | "resize"
  | "crop"
  | "batch";

const TABS: { id: Tab; label: string; emoji: string }[] = [
  { id: "convert-png-jpg", label: "PNG↔JPG 변환", emoji: "🔄" },
  { id: "convert-webp", label: "WEBP→JPG 변환", emoji: "🖼️" },
  { id: "compress", label: "이미지 압축", emoji: "📦" },
  { id: "resize", label: "크기 변경", emoji: "↔️" },
  { id: "crop", label: "이미지 자르기", emoji: "✂️" },
  { id: "batch", label: "일괄 변환", emoji: "⚡" },
];

// ─── Drop Zone ────────────────────────────────────────────────────────────────

function DropZone({
  onFiles,
  accept,
  multiple = false,
  label,
}: {
  onFiles: (files: FileList) => void;
  accept: string;
  multiple?: boolean;
  label?: string;
}) {
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        if (e.dataTransfer.files.length) onFiles(e.dataTransfer.files);
      }}
      onClick={() => inputRef.current?.click()}
      className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-colors select-none ${
        dragOver
          ? "border-blue-400 bg-blue-50 dark:bg-blue-950/20"
          : "border-slate-300 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-500"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.length) {
            onFiles(e.target.files);
            e.target.value = "";
          }
        }}
      />
      <div className="text-4xl mb-3">📁</div>
      <p className="font-semibold text-slate-600 dark:text-slate-300">
        {label ?? "파일을 드래그하거나 클릭하여 업로드"}
      </p>
      <p className="text-sm text-slate-400 mt-1">({accept})</p>
    </div>
  );
}

// ─── Tab: PNG ↔ JPG 변환 ──────────────────────────────────────────────────────

function ConvertPngJpg() {
  type Item = {
    id: number;
    file: File;
    previewUrl: string;
    resultBlob: Blob | null;
    status: "idle" | "processing" | "done" | "error";
    errorMsg?: string;
  };

  const [items, setItems] = useState<Item[]>([]);
  let idCounter = useRef(0);

  const handleFiles = useCallback((files: FileList) => {
    const newItems: Item[] = Array.from(files)
      .filter((f) => f.type === "image/png" || f.type === "image/jpeg")
      .map((f) => ({
        id: ++idCounter.current,
        file: f,
        previewUrl: URL.createObjectURL(f),
        resultBlob: null,
        status: "idle" as const,
      }));
    setItems((prev) => [...prev, ...newItems]);
  }, []);

  const handleConvert = useCallback(async (id: number) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, status: "processing" } : it))
    );
    const item = items.find((it) => it.id === id);
    if (!item) return;
    const targetFormat =
      item.file.type === "image/png" ? "image/jpeg" : "image/png";
    try {
      const blob = await convertImage(item.file, targetFormat);
      setItems((prev) =>
        prev.map((it) =>
          it.id === id ? { ...it, resultBlob: blob, status: "done" } : it
        )
      );
    } catch (e) {
      setItems((prev) =>
        prev.map((it) =>
          it.id === id
            ? { ...it, status: "error", errorMsg: String(e) }
            : it
        )
      );
    }
  }, [items]);

  const handleDownload = useCallback((item: { file: File; resultBlob: Blob | null }) => {
    if (!item.resultBlob) return;
    const targetFormat =
      item.file.type === "image/png" ? "image/jpeg" : "image/png";
    const ext = getOutputExt(targetFormat);
    downloadBlob(item.resultBlob, `${stripExt(item.file.name)}.${ext}`);
  }, []);

  const handleRemove = useCallback((id: number) => {
    setItems((prev) => {
      const it = prev.find((x) => x.id === id);
      if (it) URL.revokeObjectURL(it.previewUrl);
      return prev.filter((x) => x.id !== id);
    });
  }, []);

  return (
    <div className="space-y-6">
      <DropZone
        onFiles={handleFiles}
        accept="image/png, image/jpeg"
        multiple
        label="PNG 또는 JPG 파일을 업로드하세요"
      />
      {items.length > 0 && (
        <div className="space-y-3">
          {items.map((item) => {
            const targetFormat =
              item.file.type === "image/png" ? "JPG" : "PNG";
            return (
              <div
                key={item.id}
                className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.previewUrl}
                  alt={item.file.name}
                  className="w-16 h-16 object-cover rounded-xl flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-700 dark:text-slate-200 truncate text-sm">
                    {item.file.name}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {formatBytes(item.file.size)} · {item.file.type === "image/png" ? "PNG" : "JPG"} → {targetFormat}
                  </p>
                  {item.status === "done" && item.resultBlob && (
                    <p className="text-xs text-emerald-500 mt-0.5">
                      완료 ({formatBytes(item.resultBlob.size)})
                    </p>
                  )}
                  {item.status === "error" && (
                    <p className="text-xs text-red-500 mt-0.5">오류 발생</p>
                  )}
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  {item.status !== "done" && (
                    <button
                      onClick={() => handleConvert(item.id)}
                      disabled={item.status === "processing"}
                      className="px-4 py-2 text-sm rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium disabled:opacity-50 hover:shadow-md transition-all"
                    >
                      {item.status === "processing" ? "변환 중..." : `→ ${targetFormat}`}
                    </button>
                  )}
                  {item.status === "done" && (
                    <button
                      onClick={() => handleDownload(item)}
                      className="px-4 py-2 text-sm rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium hover:shadow-md transition-all"
                    >
                      다운로드
                    </button>
                  )}
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Tab: WEBP → JPG 변환 ────────────────────────────────────────────────────

function ConvertWebp() {
  type Item = {
    id: number;
    file: File;
    previewUrl: string;
    resultBlob: Blob | null;
    status: "idle" | "processing" | "done" | "error";
  };

  const [items, setItems] = useState<Item[]>([]);
  const idCounter = useRef(0);

  const handleFiles = useCallback((files: FileList) => {
    const newItems: Item[] = Array.from(files)
      .filter((f) => f.type === "image/webp")
      .map((f) => ({
        id: ++idCounter.current,
        file: f,
        previewUrl: URL.createObjectURL(f),
        resultBlob: null,
        status: "idle" as const,
      }));
    if (newItems.length === 0) {
      alert("WEBP 파일만 업로드할 수 있습니다.");
      return;
    }
    setItems((prev) => [...prev, ...newItems]);
  }, []);

  const handleConvertAll = useCallback(async () => {
    const pending = items.filter((it) => it.status === "idle");
    for (const item of pending) {
      setItems((prev) =>
        prev.map((it) => (it.id === item.id ? { ...it, status: "processing" } : it))
      );
      try {
        const blob = await convertImage(item.file, "image/jpeg");
        setItems((prev) =>
          prev.map((it) =>
            it.id === item.id ? { ...it, resultBlob: blob, status: "done" } : it
          )
        );
      } catch {
        setItems((prev) =>
          prev.map((it) =>
            it.id === item.id ? { ...it, status: "error" } : it
          )
        );
      }
    }
  }, [items]);

  const handleRemove = useCallback((id: number) => {
    setItems((prev) => {
      const it = prev.find((x) => x.id === id);
      if (it) URL.revokeObjectURL(it.previewUrl);
      return prev.filter((x) => x.id !== id);
    });
  }, []);

  const hasPending = items.some((it) => it.status === "idle");

  return (
    <div className="space-y-6">
      <DropZone
        onFiles={handleFiles}
        accept="image/webp"
        multiple
        label="WEBP 파일을 업로드하세요"
      />
      {items.length > 0 && (
        <>
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.previewUrl}
                  alt={item.file.name}
                  className="w-16 h-16 object-cover rounded-xl flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-700 dark:text-slate-200 truncate text-sm">
                    {item.file.name}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {formatBytes(item.file.size)} · WEBP → JPG
                  </p>
                  {item.status === "done" && item.resultBlob && (
                    <p className="text-xs text-emerald-500 mt-0.5">
                      완료 ({formatBytes(item.resultBlob.size)})
                    </p>
                  )}
                  {item.status === "processing" && (
                    <p className="text-xs text-blue-500 mt-0.5">변환 중...</p>
                  )}
                  {item.status === "error" && (
                    <p className="text-xs text-red-500 mt-0.5">오류 발생</p>
                  )}
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  {item.status === "done" && item.resultBlob && (
                    <button
                      onClick={() =>
                        downloadBlob(
                          item.resultBlob!,
                          `${stripExt(item.file.name)}.jpg`
                        )
                      }
                      className="px-4 py-2 text-sm rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium hover:shadow-md transition-all"
                    >
                      다운로드
                    </button>
                  )}
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
          {hasPending && (
            <button
              onClick={handleConvertAll}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all"
            >
              전체 JPG로 변환
            </button>
          )}
        </>
      )}
    </div>
  );
}

// ─── Tab: 이미지 압축 ─────────────────────────────────────────────────────────

function CompressTab() {
  type Item = {
    id: number;
    file: File;
    previewUrl: string;
    resultBlob: Blob | null;
    resultUrl: string | null;
    status: "idle" | "processing" | "done" | "error";
  };

  const [items, setItems] = useState<Item[]>([]);
  const [targetMB, setTargetMB] = useState(0.5);
  const idCounter = useRef(0);

  const handleFiles = useCallback((files: FileList) => {
    const newItems: Item[] = Array.from(files)
      .filter((f) => f.type.startsWith("image/"))
      .map((f) => ({
        id: ++idCounter.current,
        file: f,
        previewUrl: URL.createObjectURL(f),
        resultBlob: null,
        resultUrl: null,
        status: "idle" as const,
      }));
    setItems((prev) => [...prev, ...newItems]);
  }, []);

  const handleCompressAll = useCallback(async () => {
    const pending = items.filter((it) => it.status === "idle");
    for (const item of pending) {
      setItems((prev) =>
        prev.map((it) => (it.id === item.id ? { ...it, status: "processing" } : it))
      );
      try {
        const compressed = await imageCompression(item.file, {
          maxSizeMB: targetMB,
          maxWidthOrHeight: 4096,
          useWebWorker: true,
        });
        const resultUrl = URL.createObjectURL(compressed);
        setItems((prev) =>
          prev.map((it) =>
            it.id === item.id
              ? { ...it, resultBlob: compressed, resultUrl, status: "done" }
              : it
          )
        );
      } catch {
        setItems((prev) =>
          prev.map((it) =>
            it.id === item.id ? { ...it, status: "error" } : it
          )
        );
      }
    }
  }, [items, targetMB]);

  const handleRemove = useCallback((id: number) => {
    setItems((prev) => {
      const it = prev.find((x) => x.id === id);
      if (it) {
        URL.revokeObjectURL(it.previewUrl);
        if (it.resultUrl) URL.revokeObjectURL(it.resultUrl);
      }
      return prev.filter((x) => x.id !== id);
    });
  }, []);

  const hasPending = items.some((it) => it.status === "idle");

  return (
    <div className="space-y-6">
      <DropZone
        onFiles={handleFiles}
        accept="image/*"
        multiple
        label="이미지 파일을 업로드하세요"
      />

      {/* Target size selector */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
        <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-3">
          목표 파일 크기
        </p>
        <div className="flex gap-2 flex-wrap">
          {[0.1, 0.3, 0.5, 1, 2].map((mb) => (
            <button
              key={mb}
              onClick={() => setTargetMB(mb)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                targetMB === mb
                  ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                  : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-900/30"
              }`}
            >
              {mb < 1 ? `${mb * 1000}KB` : `${mb}MB`} 이하
            </button>
          ))}
        </div>
      </div>

      {items.length > 0 && (
        <>
          <div className="space-y-3">
            {items.map((item) => {
              const ratio =
                item.resultBlob
                  ? Math.round((1 - item.resultBlob.size / item.file.size) * 100)
                  : 0;
              return (
                <div
                  key={item.id}
                  className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.previewUrl}
                      alt={item.file.name}
                      className="w-16 h-16 object-cover rounded-xl flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-700 dark:text-slate-200 truncate text-sm">
                        {item.file.name}
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-xs">
                        <span className="text-slate-400">원본: {formatBytes(item.file.size)}</span>
                        {item.status === "done" && item.resultBlob && (
                          <>
                            <span className="text-slate-300 dark:text-slate-600">→</span>
                            <span className="text-emerald-500 font-semibold">
                              {formatBytes(item.resultBlob.size)}
                            </span>
                            <span className="px-1.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 font-bold">
                              -{ratio}%
                            </span>
                          </>
                        )}
                        {item.status === "processing" && (
                          <span className="text-blue-500">압축 중...</span>
                        )}
                        {item.status === "error" && (
                          <span className="text-red-500">오류 발생</span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      {item.status === "done" && item.resultBlob && (
                        <button
                          onClick={() =>
                            downloadBlob(
                              item.resultBlob!,
                              `compressed_${item.file.name}`
                            )
                          }
                          className="px-4 py-2 text-sm rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium hover:shadow-md transition-all"
                        >
                          다운로드
                        </button>
                      )}
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  {/* Progress bar */}
                  {item.status === "done" && item.resultBlob && (
                    <div className="mt-3">
                      <div className="h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.max(5, 100 - ratio)}%` }}
                          transition={{ duration: 0.7, ease: "easeOut" }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-slate-400 mt-1">
                        <span>압축 후 {100 - ratio}%</span>
                        <span>절감 {ratio}%</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {hasPending && (
            <button
              onClick={handleCompressAll}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all"
            >
              전체 압축하기
            </button>
          )}
        </>
      )}
    </div>
  );
}

// ─── Tab: 크기 변경 ───────────────────────────────────────────────────────────

function ResizeTab() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [origW, setOrigW] = useState(0);
  const [origH, setOrigH] = useState(0);
  const [targetW, setTargetW] = useState(0);
  const [targetH, setTargetH] = useState(0);
  const [lockAspect, setLockAspect] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  const handleFiles = useCallback((files: FileList) => {
    const f = files[0];
    if (!f || !f.type.startsWith("image/")) return;
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setResultBlob(null);
    setResultUrl(null);
    const url = URL.createObjectURL(f);
    setFile(f);
    setPreviewUrl(url);
    const img = new Image();
    img.onload = () => {
      setOrigW(img.width);
      setOrigH(img.height);
      setTargetW(img.width);
      setTargetH(img.height);
    };
    img.src = url;
  }, [previewUrl, resultUrl]);

  const handleWidthChange = (val: number) => {
    setTargetW(val);
    if (lockAspect && origW > 0) {
      setTargetH(Math.round((val * origH) / origW));
    }
  };

  const handleHeightChange = (val: number) => {
    setTargetH(val);
    if (lockAspect && origH > 0) {
      setTargetW(Math.round((val * origW) / origH));
    }
  };

  const handleResize = useCallback(async () => {
    if (!file || targetW <= 0 || targetH <= 0) return;
    setProcessing(true);
    try {
      const img = new Image();
      const src = URL.createObjectURL(file);
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = reject;
        img.src = src;
      });
      const canvas = document.createElement("canvas");
      canvas.width = targetW;
      canvas.height = targetH;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, targetW, targetH);
      URL.revokeObjectURL(src);
      const mime =
        file.type === "image/png" ? "image/png" : "image/jpeg";
      await new Promise<void>((resolve, reject) => {
        canvas.toBlob(
          (blob) => {
            if (!blob) { reject(new Error("실패")); return; }
            if (resultUrl) URL.revokeObjectURL(resultUrl);
            const rUrl = URL.createObjectURL(blob);
            setResultBlob(blob);
            setResultUrl(rUrl);
            resolve();
          },
          mime,
          0.92
        );
      });
    } finally {
      setProcessing(false);
    }
  }, [file, targetW, targetH, resultUrl]);

  return (
    <div className="space-y-6">
      <DropZone onFiles={handleFiles} accept="image/*" label="이미지를 업로드하세요" />

      {file && previewUrl && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-5">
          <div className="flex gap-4 items-start">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={resultUrl ?? previewUrl}
              alt="preview"
              className="w-24 h-24 object-cover rounded-xl flex-shrink-0"
            />
            <div>
              <p className="font-medium text-slate-700 dark:text-slate-200 text-sm truncate">
                {file.name}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                원본: {origW} × {origH}px · {formatBytes(file.size)}
              </p>
              {resultBlob && (
                <p className="text-xs text-emerald-500 mt-0.5">
                  결과: {targetW} × {targetH}px · {formatBytes(resultBlob.size)}
                </p>
              )}
            </div>
          </div>

          {/* Dimension inputs */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-slate-500 w-10">너비</label>
              <input
                type="number"
                min={1}
                max={10000}
                value={targetW}
                onChange={(e) => handleWidthChange(Number(e.target.value))}
                className="w-28 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <span className="text-xs text-slate-400">px</span>
            </div>
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-slate-500 w-10">높이</label>
              <input
                type="number"
                min={1}
                max={10000}
                value={targetH}
                onChange={(e) => handleHeightChange(Number(e.target.value))}
                className="w-28 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <span className="text-xs text-slate-400">px</span>
            </div>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <div
                onClick={() => setLockAspect((v) => !v)}
                className={`w-10 h-5 rounded-full transition-colors ${lockAspect ? "bg-blue-500" : "bg-slate-300 dark:bg-slate-600"}`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white mt-0.5 transition-transform ${lockAspect ? "translate-x-5" : "translate-x-0.5"}`}
                />
              </div>
              <span className="text-sm text-slate-600 dark:text-slate-300">비율 유지</span>
            </label>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleResize}
              disabled={processing || targetW <= 0 || targetH <= 0}
              className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold disabled:opacity-50 hover:shadow-lg hover:shadow-blue-500/25 transition-all"
            >
              {processing ? "처리 중..." : "크기 변경"}
            </button>
            {resultBlob && (
              <button
                onClick={() => {
                  const ext = getOutputExt(
                    file.type === "image/png" ? "image/png" : "image/jpeg"
                  );
                  downloadBlob(resultBlob, `resized_${stripExt(file.name)}.${ext}`);
                }}
                className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold hover:shadow-lg hover:shadow-emerald-500/25 transition-all"
              >
                다운로드
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Tab: 이미지 자르기 ───────────────────────────────────────────────────────

type CropRect = { x: number; y: number; w: number; h: number };

function CropTab() {
  const [file, setFile] = useState<File | null>(null);
  const [imgNaturalW, setImgNaturalW] = useState(0);
  const [imgNaturalH, setImgNaturalH] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  // Crop selection state (in display coords)
  const [cropRect, setCropRect] = useState<CropRect | null>(null);
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const previewUrl = useRef<string | null>(null);

  const handleFiles = useCallback((files: FileList) => {
    const f = files[0];
    if (!f || !f.type.startsWith("image/")) return;
    if (previewUrl.current) URL.revokeObjectURL(previewUrl.current);
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setResultBlob(null);
    setResultUrl(null);
    setCropRect(null);
    previewUrl.current = URL.createObjectURL(f);
    setFile(f);
  }, [resultUrl]);

  const getRelativePos = (e: React.MouseEvent | React.TouchEvent) => {
    const el = containerRef.current;
    if (!el) return { x: 0, y: 0 };
    const rect = el.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    return {
      x: Math.max(0, Math.min(rect.width, clientX - rect.left)),
      y: Math.max(0, Math.min(rect.height, clientY - rect.top)),
    };
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (!file) return;
    e.preventDefault();
    const pos = getRelativePos(e);
    setDragStart(pos);
    setCropRect({ x: pos.x, y: pos.y, w: 0, h: 0 });
    setDragging(true);
    setResultBlob(null);
    setResultUrl(null);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging || !dragStart || !containerRef.current) return;
    e.preventDefault();
    const pos = getRelativePos(e);
    const x = Math.min(pos.x, dragStart.x);
    const y = Math.min(pos.y, dragStart.y);
    const w = Math.abs(pos.x - dragStart.x);
    const h = Math.abs(pos.y - dragStart.y);
    setCropRect({ x, y, w, h });
  };

  const onMouseUp = () => {
    setDragging(false);
  };

  const handleCrop = useCallback(async () => {
    if (!file || !cropRect || cropRect.w < 5 || cropRect.h < 5) return;
    if (!imgRef.current || !containerRef.current) return;
    const dispW = containerRef.current.getBoundingClientRect().width;
    const dispH = containerRef.current.getBoundingClientRect().height;
    const scaleX = imgNaturalW / dispW;
    const scaleY = imgNaturalH / dispH;
    const sx = Math.round(cropRect.x * scaleX);
    const sy = Math.round(cropRect.y * scaleY);
    const sw = Math.round(cropRect.w * scaleX);
    const sh = Math.round(cropRect.h * scaleY);

    setProcessing(true);
    try {
      const img = new Image();
      const src = URL.createObjectURL(file);
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = reject;
        img.src = src;
      });
      const canvas = document.createElement("canvas");
      canvas.width = sw;
      canvas.height = sh;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);
      URL.revokeObjectURL(src);
      const mime = file.type === "image/png" ? "image/png" : "image/jpeg";
      await new Promise<void>((resolve, reject) => {
        canvas.toBlob(
          (blob) => {
            if (!blob) { reject(new Error("실패")); return; }
            if (resultUrl) URL.revokeObjectURL(resultUrl);
            const rUrl = URL.createObjectURL(blob);
            setResultBlob(blob);
            setResultUrl(rUrl);
            resolve();
          },
          mime,
          0.92
        );
      });
    } finally {
      setProcessing(false);
    }
  }, [file, cropRect, imgNaturalW, imgNaturalH, resultUrl]);

  return (
    <div className="space-y-6">
      <DropZone onFiles={handleFiles} accept="image/*" label="이미지를 업로드하세요" />

      {file && previewUrl.current && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm">
            <p className="text-xs text-slate-400 mb-3 text-center">
              드래그하여 자를 영역을 선택하세요
            </p>
            {/* Image + crop overlay */}
            <div
              ref={containerRef}
              className="relative w-full select-none cursor-crosshair overflow-hidden rounded-xl"
              style={{ userSelect: "none" }}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseUp}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={imgRef}
                src={previewUrl.current}
                alt="crop source"
                className="w-full h-auto block pointer-events-none"
                onLoad={(e) => {
                  const img = e.currentTarget;
                  setImgNaturalW(img.naturalWidth);
                  setImgNaturalH(img.naturalHeight);
                }}
                draggable={false}
              />
              {/* Dim overlay */}
              {cropRect && cropRect.w > 2 && cropRect.h > 2 && (
                <>
                  {/* dark overlay via svg clip or simple divs */}
                  <div className="absolute inset-0 bg-black/40 pointer-events-none" />
                  {/* Crop window cutout */}
                  <div
                    className="absolute border-2 border-blue-400 pointer-events-none"
                    style={{
                      left: cropRect.x,
                      top: cropRect.y,
                      width: cropRect.w,
                      height: cropRect.h,
                      boxShadow: "0 0 0 9999px rgba(0,0,0,0.4)",
                    }}
                  >
                    {/* Corner handles */}
                    {["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"].map((pos) => (
                      <div
                        key={pos}
                        className={`absolute w-3 h-3 border-2 border-blue-400 bg-white rounded-sm ${pos} -translate-x-1/2 -translate-y-1/2`}
                        style={{ margin: 0 }}
                      />
                    ))}
                    {/* Size label */}
                    <div className="absolute -top-6 left-0 bg-blue-500 text-white text-xs px-2 py-0.5 rounded whitespace-nowrap">
                      {containerRef.current
                        ? `${Math.round(cropRect.w / containerRef.current.getBoundingClientRect().width * imgNaturalW)} × ${Math.round(cropRect.h / containerRef.current.getBoundingClientRect().height * imgNaturalH)}px`
                        : ""}
                    </div>
                  </div>
                </>
              )}
            </div>

            {cropRect && cropRect.w > 2 && cropRect.h > 2 && (
              <div className="mt-4 flex gap-3">
                <button
                  onClick={handleCrop}
                  disabled={processing}
                  className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold disabled:opacity-50 hover:shadow-lg hover:shadow-blue-500/25 transition-all"
                >
                  {processing ? "처리 중..." : "자르기"}
                </button>
                {resultBlob && (
                  <button
                    onClick={() => {
                      const ext = getOutputExt(
                        file.type === "image/png" ? "image/png" : "image/jpeg"
                      );
                      downloadBlob(resultBlob, `cropped_${stripExt(file.name)}.${ext}`);
                    }}
                    className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold hover:shadow-lg hover:shadow-emerald-500/25 transition-all"
                  >
                    다운로드
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Result preview */}
          {resultUrl && (
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm">
              <p className="text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">미리보기</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={resultUrl}
                alt="cropped result"
                className="max-w-full rounded-xl mx-auto block"
              />
              {resultBlob && (
                <p className="text-xs text-center text-emerald-500 mt-2">
                  {formatBytes(resultBlob.size)}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Tab: 일괄 변환 ───────────────────────────────────────────────────────────

function BatchTab() {
  type BatchItem = {
    id: number;
    file: File;
    previewUrl: string;
    resultBlob: Blob | null;
    status: "idle" | "processing" | "done" | "error";
  };

  type TargetFmt = "image/jpeg" | "image/png" | "image/webp";

  const [items, setItems] = useState<BatchItem[]>([]);
  const [targetFmt, setTargetFmt] = useState<TargetFmt>("image/jpeg");
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);
  const idCounter = useRef(0);

  const handleFiles = useCallback((files: FileList) => {
    const newItems: BatchItem[] = Array.from(files)
      .filter((f) => f.type.startsWith("image/"))
      .map((f) => ({
        id: ++idCounter.current,
        file: f,
        previewUrl: URL.createObjectURL(f),
        resultBlob: null,
        status: "idle" as const,
      }));
    setItems((prev) => [...prev, ...newItems]);
  }, []);

  const handleConvertAll = useCallback(async () => {
    const pending = items.filter((it) => it.status === "idle");
    if (pending.length === 0) return;
    setRunning(true);
    setProgress(0);
    for (let i = 0; i < pending.length; i++) {
      const item = pending[i];
      setItems((prev) =>
        prev.map((it) => (it.id === item.id ? { ...it, status: "processing" } : it))
      );
      try {
        const blob = await convertImage(item.file, targetFmt);
        setItems((prev) =>
          prev.map((it) =>
            it.id === item.id ? { ...it, resultBlob: blob, status: "done" } : it
          )
        );
      } catch {
        setItems((prev) =>
          prev.map((it) =>
            it.id === item.id ? { ...it, status: "error" } : it
          )
        );
      }
      setProgress(Math.round(((i + 1) / pending.length) * 100));
    }
    setRunning(false);
  }, [items, targetFmt]);

  const handleDownloadAll = useCallback(() => {
    const done = items.filter((it) => it.status === "done" && it.resultBlob);
    done.forEach((it) => {
      const ext = getOutputExt(targetFmt);
      downloadBlob(it.resultBlob!, `${stripExt(it.file.name)}.${ext}`);
    });
  }, [items, targetFmt]);

  const handleRemove = useCallback((id: number) => {
    setItems((prev) => {
      const it = prev.find((x) => x.id === id);
      if (it) URL.revokeObjectURL(it.previewUrl);
      return prev.filter((x) => x.id !== id);
    });
  }, []);

  const hasPending = items.some((it) => it.status === "idle");
  const doneCount = items.filter((it) => it.status === "done").length;

  return (
    <div className="space-y-6">
      <DropZone
        onFiles={handleFiles}
        accept="image/*"
        multiple
        label="여러 이미지를 한번에 업로드하세요"
      />

      {/* Format selector */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
        <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-3">
          변환 형식
        </p>
        <div className="flex gap-2">
          {(["image/jpeg", "image/png", "image/webp"] as TargetFmt[]).map((fmt) => (
            <button
              key={fmt}
              onClick={() => setTargetFmt(fmt)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-colors ${
                targetFmt === fmt
                  ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                  : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-900/30"
              }`}
            >
              {fmt === "image/jpeg" ? "JPG" : fmt === "image/png" ? "PNG" : "WEBP"}
            </button>
          ))}
        </div>
      </div>

      {items.length > 0 && (
        <>
          {/* Progress bar */}
          {running && (
            <div>
              <div className="flex justify-between text-xs text-slate-500 mb-1">
                <span>변환 중...</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          )}

          {/* File list */}
          <div className="space-y-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.previewUrl}
                  alt={item.file.name}
                  className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">
                    {item.file.name}
                  </p>
                  <p className="text-xs text-slate-400">{formatBytes(item.file.size)}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {item.status === "idle" && (
                    <span className="text-xs text-slate-400 px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-700">대기</span>
                  )}
                  {item.status === "processing" && (
                    <span className="text-xs text-blue-500 px-2 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20">변환 중</span>
                  )}
                  {item.status === "done" && item.resultBlob && (
                    <>
                      <span className="text-xs text-emerald-500 px-2 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/20">
                        {formatBytes(item.resultBlob.size)}
                      </span>
                      <button
                        onClick={() => {
                          const ext = getOutputExt(targetFmt);
                          downloadBlob(item.resultBlob!, `${stripExt(item.file.name)}.${ext}`);
                        }}
                        className="text-xs px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium"
                      >
                        저장
                      </button>
                    </>
                  )}
                  {item.status === "error" && (
                    <span className="text-xs text-red-500 px-2 py-1 rounded-full bg-red-50 dark:bg-red-900/20">오류</span>
                  )}
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="p-1.5 text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            {hasPending && (
              <button
                onClick={handleConvertAll}
                disabled={running}
                className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold disabled:opacity-50 hover:shadow-lg hover:shadow-blue-500/25 transition-all"
              >
                {running ? "변환 중..." : `전체 ${items.filter((it) => it.status === "idle").length}개 변환`}
              </button>
            )}
            {doneCount > 0 && (
              <button
                onClick={handleDownloadAll}
                className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold hover:shadow-lg hover:shadow-emerald-500/25 transition-all"
              >
                완료된 {doneCount}개 전체 다운로드
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ImagePage() {
  const [activeTab, setActiveTab] = useState<Tab>("convert-png-jpg");

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // nothing to do here; individual tools clean up their own URLs
    };
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/20 dark:from-slate-950 dark:via-blue-950/20 dark:to-cyan-950/10">
        <div className="max-w-3xl mx-auto px-4 py-8">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="text-5xl mb-3">🖼️</div>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
              <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                이미지 도구
              </span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              변환·압축·크기 변경·자르기까지. 모든 처리가 브라우저에서 이루어져 안전합니다.
            </p>
          </motion.div>

          {/* Ad - top */}
          <AdBanner
            format="horizontal"
            className="mb-6 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2"
          />

          {/* Tab buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide"
          >
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md shadow-blue-500/20"
                    : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600"
                }`}
              >
                <span>{tab.emoji}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </motion.div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "convert-png-jpg" && <ConvertPngJpg />}
              {activeTab === "convert-webp" && <ConvertWebp />}
              {activeTab === "compress" && <CompressTab />}
              {activeTab === "resize" && <ResizeTab />}
              {activeTab === "crop" && <CropTab />}
              {activeTab === "batch" && <BatchTab />}
            </motion.div>
          </AnimatePresence>

          {/* Ad - mid */}
          <AdBanner
            format="rectangle"
            className="mt-8 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2"
          />

          {/* FAQ Section */}
          <section className="mt-16 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-center">자주 묻는 질문</h2>
            <div className="space-y-4">

              <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-500 transition-colors">
                  이미지 파일이 서버에 업로드되나요?
                  <svg className="w-5 h-5 shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="px-5 pb-5 text-slate-500 dark:text-slate-400 leading-relaxed">
                  아니요. 모든 이미지 처리는 브라우저(Canvas API) 내에서 완전히 이루어집니다. 파일이 인터넷으로 전송되지 않아 개인정보와 기업 기밀 이미지도 안전하게 처리할 수 있습니다.
                </p>
              </details>

              <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-500 transition-colors">
                  PNG를 JPG로 변환하면 투명 배경은 어떻게 되나요?
                  <svg className="w-5 h-5 shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="px-5 pb-5 text-slate-500 dark:text-slate-400 leading-relaxed">
                  JPG 형식은 투명도(알파 채널)를 지원하지 않습니다. PNG의 투명한 영역은 흰색 배경으로 채워집니다. 투명 배경을 유지하려면 PNG 형식을 그대로 사용하세요.
                </p>
              </details>

              <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-500 transition-colors">
                  이미지 압축 후 화질이 많이 낮아지나요?
                  <svg className="w-5 h-5 shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="px-5 pb-5 text-slate-500 dark:text-slate-400 leading-relaxed">
                  목표 크기 설정에 따라 다르지만, 500KB 이상으로 설정하면 대부분 육안으로 거의 차이를 느낄 수 없습니다. 100KB 이하로 설정하면 고해상도 이미지에서 일부 화질 저하가 생길 수 있습니다. 압축 전후 파일 크기가 표시되므로 적절한 설정을 선택하세요.
                </p>
              </details>

              <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-500 transition-colors">
                  크기 변경 시 비율 유지는 어떻게 작동하나요?
                  <svg className="w-5 h-5 shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="px-5 pb-5 text-slate-500 dark:text-slate-400 leading-relaxed">
                  비율 유지 토글을 켜면 너비를 변경할 때 높이가 자동으로 계산되고, 높이를 변경할 때 너비가 자동으로 계산됩니다. 원본 이미지의 가로세로 비율이 그대로 유지됩니다. 자유롭게 크기를 설정하려면 토글을 끄세요.
                </p>
              </details>

              <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-500 transition-colors">
                  일괄 변환에서 처리 가능한 파일 수 제한이 있나요?
                  <svg className="w-5 h-5 shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="px-5 pb-5 text-slate-500 dark:text-slate-400 leading-relaxed">
                  파일 수 제한은 없지만, 모든 처리가 브라우저 메모리에서 이루어지므로 파일이 많거나 크면 처리 시간이 길어질 수 있습니다. 한 번에 20~30개 정도의 이미지를 처리하는 것을 권장합니다.
                </p>
              </details>

            </div>
          </section>

          {/* Ad - bottom */}
          <AdBanner
            format="in-article"
            className="mt-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2"
          />

        </div>
      </div>
    </PageTransition>
  );
}
