"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import AdBanner from "@/components/AdBanner";
import { PDFDocument } from "pdf-lib";
import JSZip from "jszip";

// Lazy-load pdfjs-dist only in the browser to avoid SSR DOMMatrix errors
async function getPdfJs() {
  const pdfjsLib = await import("pdfjs-dist");
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
  return pdfjsLib;
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}

function parsePageRanges(input: string, totalPages: number): number[] {
  const pages: number[] = [];
  const parts = input.split(",").map((s) => s.trim());
  for (const part of parts) {
    if (part.includes("-")) {
      const [startStr, endStr] = part.split("-");
      const start = parseInt(startStr.trim(), 10);
      const end = parseInt(endStr.trim(), 10);
      if (!isNaN(start) && !isNaN(end)) {
        for (let i = start; i <= end; i++) {
          if (i >= 1 && i <= totalPages) pages.push(i);
        }
      }
    } else {
      const n = parseInt(part, 10);
      if (!isNaN(n) && n >= 1 && n <= totalPages) pages.push(n);
    }
  }
  return Array.from(new Set(pages)).sort((a, b) => a - b);
}

// ─── Tab types ───────────────────────────────────────────────────────────────

type Tab =
  | "merge"
  | "split"
  | "pdf2jpg"
  | "jpg2pdf"
  | "compress"
  | "reorder"
  | "extract";

const TABS: { id: Tab; label: string; emoji: string }[] = [
  { id: "merge", label: "PDF 합치기", emoji: "🔗" },
  { id: "split", label: "페이지 추출", emoji: "✂️" },
  { id: "pdf2jpg", label: "PDF → JPG", emoji: "🖼️" },
  { id: "jpg2pdf", label: "JPG → PDF", emoji: "📄" },
  { id: "compress", label: "PDF 압축", emoji: "🗜️" },
  { id: "reorder", label: "페이지 편집", emoji: "📑" },
  { id: "extract", label: "텍스트 추출", emoji: "📝" },
];

// ─── Drop Zone ───────────────────────────────────────────────────────────────

interface DropZoneProps {
  accept: string;
  multiple?: boolean;
  onFiles: (files: File[]) => void;
  label?: string;
  sublabel?: string;
}

function DropZone({
  accept,
  multiple = false,
  onFiles,
  label = "파일을 여기에 드래그하거나 클릭하여 업로드",
  sublabel,
}: DropZoneProps) {
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    (fileList: FileList | null) => {
      if (!fileList) return;
      onFiles(Array.from(fileList));
    },
    [onFiles]
  );

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
        handleFiles(e.dataTransfer.files);
      }}
      onClick={() => inputRef.current?.click()}
      className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-colors ${
        dragOver
          ? "border-red-400 bg-red-50 dark:bg-red-950/20"
          : "border-slate-300 dark:border-slate-600 hover:border-red-300 dark:hover:border-red-700"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      <div className="text-4xl mb-3">📂</div>
      <p className="text-slate-600 dark:text-slate-300 font-medium">{label}</p>
      {sublabel && (
        <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
          {sublabel}
        </p>
      )}
    </div>
  );
}

// ─── File List ────────────────────────────────────────────────────────────────

interface FileListProps {
  files: File[];
  onRemove?: (index: number) => void;
  onMoveUp?: (index: number) => void;
  onMoveDown?: (index: number) => void;
}

function FileListDisplay({ files, onRemove, onMoveUp, onMoveDown }: FileListProps) {
  if (files.length === 0) return null;
  return (
    <div className="space-y-2 mt-4">
      {files.map((file, i) => (
        <div
          key={`${file.name}-${i}`}
          className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600"
        >
          <span className="text-red-500 text-lg">📄</span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">
              {file.name}
            </p>
            <p className="text-xs text-slate-400">{formatSize(file.size)}</p>
          </div>
          {onMoveUp && (
            <button
              onClick={() => onMoveUp(i)}
              disabled={i === 0}
              className="p-1 text-slate-400 hover:text-slate-600 disabled:opacity-30"
              title="위로"
            >
              ▲
            </button>
          )}
          {onMoveDown && (
            <button
              onClick={() => onMoveDown(i)}
              disabled={i === files.length - 1}
              className="p-1 text-slate-400 hover:text-slate-600 disabled:opacity-30"
              title="아래로"
            >
              ▼
            </button>
          )}
          {onRemove && (
            <button
              onClick={() => onRemove(i)}
              className="p-1 text-slate-400 hover:text-red-500 transition-colors"
              title="제거"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Status Badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  return (
    <div className="flex items-center gap-2 mt-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800">
      <svg className="w-4 h-4 text-red-500 animate-spin" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
      </svg>
      <span className="text-sm text-red-700 dark:text-red-300">{status}</span>
    </div>
  );
}

// ─── Merge Tab ────────────────────────────────────────────────────────────────

function MergeTab() {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState("");
  const [processing, setProcessing] = useState(false);

  const handleFiles = useCallback((newFiles: File[]) => {
    setFiles((prev) => [...prev, ...newFiles.filter((f) => f.type === "application/pdf")]);
  }, []);

  const removeFile = (i: number) => setFiles((prev) => prev.filter((_, idx) => idx !== i));
  const moveUp = (i: number) => {
    if (i === 0) return;
    setFiles((prev) => {
      const arr = [...prev];
      [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
      return arr;
    });
  };
  const moveDown = (i: number) => {
    setFiles((prev) => {
      if (i === prev.length - 1) return prev;
      const arr = [...prev];
      [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
      return arr;
    });
  };

  const handleMerge = async () => {
    if (files.length < 2) return;
    setProcessing(true);
    setStatus("PDF 병합 중...");
    try {
      const merged = await PDFDocument.create();
      for (let i = 0; i < files.length; i++) {
        setStatus(`파일 ${i + 1}/${files.length} 처리 중...`);
        const bytes = await files[i].arrayBuffer();
        const doc = await PDFDocument.load(bytes);
        const pages = await merged.copyPages(doc, doc.getPageIndices());
        pages.forEach((page) => merged.addPage(page));
      }
      setStatus("파일 생성 중...");
      const pdfBytes = await merged.save();
      downloadBlob(new Blob([pdfBytes as BlobPart], { type: "application/pdf" }), "merged.pdf");
      setStatus("");
    } catch (e) {
      setStatus("오류가 발생했습니다. 파일을 확인해주세요.");
      console.error(e);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="space-y-4">
      <DropZone
        accept=".pdf"
        multiple
        onFiles={handleFiles}
        label="PDF 파일들을 드래그하거나 클릭하여 추가"
        sublabel="여러 파일을 한 번에 선택할 수 있습니다"
      />
      <FileListDisplay files={files} onRemove={removeFile} onMoveUp={moveUp} onMoveDown={moveDown} />
      {processing && <StatusBadge status={status} />}
      {files.length >= 2 && !processing && (
        <button
          onClick={handleMerge}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 text-white font-semibold hover:shadow-lg hover:shadow-red-500/25 transition-all"
        >
          {files.length}개 PDF 합치기
        </button>
      )}
      {files.length < 2 && files.length > 0 && (
        <p className="text-sm text-center text-slate-400">PDF를 2개 이상 추가해주세요</p>
      )}
    </div>
  );
}

// ─── Split Tab ────────────────────────────────────────────────────────────────

function SplitTab() {
  const [file, setFile] = useState<File | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [rangeInput, setRangeInput] = useState("");
  const [status, setStatus] = useState("");
  const [processing, setProcessing] = useState(false);

  const handleFiles = useCallback(async (files: File[]) => {
    const f = files.find((f) => f.type === "application/pdf");
    if (!f) return;
    setFile(f);
    setStatus("페이지 수 확인 중...");
    try {
      const bytes = await f.arrayBuffer();
      const doc = await PDFDocument.load(bytes);
      setTotalPages(doc.getPageCount());
      setStatus("");
    } catch {
      setStatus("파일을 읽을 수 없습니다.");
    }
  }, []);

  const handleSplit = async () => {
    if (!file || !rangeInput.trim()) return;
    setProcessing(true);
    setStatus("분할 중...");
    try {
      const bytes = await file.arrayBuffer();
      const sourceDoc = await PDFDocument.load(bytes);
      const pages = parsePageRanges(rangeInput, totalPages);

      if (pages.length === 0) {
        setStatus("유효한 페이지 범위를 입력해주세요.");
        setProcessing(false);
        return;
      }

      const newDoc = await PDFDocument.create();
      const copied = await newDoc.copyPages(
        sourceDoc,
        pages.map((p) => p - 1)
      );
      copied.forEach((page) => newDoc.addPage(page));
      const pdfBytes = await newDoc.save();
      downloadBlob(
        new Blob([pdfBytes as BlobPart], { type: "application/pdf" }),
        `split_${rangeInput.replace(/[^0-9,-]/g, "")}.pdf`
      );
      setStatus("");
    } catch (e) {
      setStatus("오류가 발생했습니다.");
      console.error(e);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="space-y-4">
      {!file ? (
        <DropZone
          accept=".pdf"
          onFiles={handleFiles}
          label="PDF 파일을 드래그하거나 클릭하여 업로드"
        />
      ) : (
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 flex items-center gap-3">
          <span className="text-red-500 text-2xl">📄</span>
          <div className="flex-1">
            <p className="font-medium text-slate-700 dark:text-slate-200 truncate">{file.name}</p>
            <p className="text-sm text-slate-400">
              {formatSize(file.size)} · 총 {totalPages}페이지
            </p>
          </div>
          <button
            onClick={() => { setFile(null); setTotalPages(0); setRangeInput(""); }}
            className="p-1 text-slate-400 hover:text-red-500 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {file && totalPages > 0 && (
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              추출할 페이지 범위
            </label>
            <input
              type="text"
              value={rangeInput}
              onChange={(e) => setRangeInput(e.target.value)}
              placeholder={`예: 1-3, 5, 7-${Math.min(totalPages, 10)}`}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <p className="text-xs text-slate-400 mt-1">
              쉼표(,)로 구분, 하이픈(-)으로 범위 지정. 전체 {totalPages}페이지
            </p>
          </div>
          {processing && <StatusBadge status={status} />}
          {!processing && (
            <button
              onClick={handleSplit}
              disabled={!rangeInput.trim()}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 text-white font-semibold hover:shadow-lg hover:shadow-red-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              분할하여 다운로드
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ─── PDF → JPG Tab ────────────────────────────────────────────────────────────

function Pdf2JpgTab() {
  const [file, setFile] = useState<File | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [status, setStatus] = useState("");
  const [processing, setProcessing] = useState(false);

  const handleFiles = useCallback((files: File[]) => {
    const f = files.find((f) => f.type === "application/pdf");
    if (f) { setFile(f); setImages([]); }
  }, []);

  const handleConvert = async () => {
    if (!file) return;
    setProcessing(true);
    setImages([]);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfjsLib = await getPdfJs();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const total = pdf.numPages;
      const results: string[] = [];

      for (let i = 1; i <= total; i++) {
        setStatus(`페이지 ${i}/${total} 변환 중...`);
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext("2d")!;
        await page.render({ canvas, canvasContext: ctx, viewport }).promise;
        results.push(canvas.toDataURL("image/jpeg", 0.92));
      }
      setImages(results);
      setStatus("");
    } catch (e) {
      setStatus("변환 중 오류가 발생했습니다.");
      console.error(e);
    } finally {
      setProcessing(false);
    }
  };

  const downloadImage = (dataUrl: string, pageNum: number) => {
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `page_${String(pageNum).padStart(3, "0")}.jpg`;
    a.click();
  };

  const downloadAll = async () => {
    const zip = new JSZip();
    images.forEach((dataUrl, i) => {
      const base64 = dataUrl.split(",")[1];
      zip.file(`page_${String(i + 1).padStart(3, "0")}.jpg`, base64, { base64: true });
    });
    const blob = await zip.generateAsync({ type: "blob" });
    downloadBlob(blob, "pdf_images.zip");
  };

  return (
    <div className="space-y-4">
      {!file ? (
        <DropZone
          accept=".pdf"
          onFiles={handleFiles}
          label="PDF 파일을 드래그하거나 클릭하여 업로드"
          sublabel="각 페이지가 JPG 이미지로 변환됩니다"
        />
      ) : (
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 flex items-center gap-3">
          <span className="text-red-500 text-2xl">📄</span>
          <div className="flex-1">
            <p className="font-medium text-slate-700 dark:text-slate-200 truncate">{file.name}</p>
            <p className="text-sm text-slate-400">{formatSize(file.size)}</p>
          </div>
          <button
            onClick={() => { setFile(null); setImages([]); }}
            className="p-1 text-slate-400 hover:text-red-500 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {file && !processing && images.length === 0 && (
        <button
          onClick={handleConvert}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 text-white font-semibold hover:shadow-lg hover:shadow-red-500/25 transition-all"
        >
          JPG로 변환하기
        </button>
      )}

      {processing && <StatusBadge status={status} />}

      {images.length > 0 && (
        <div className="space-y-4">
          <div className="flex gap-3">
            <button
              onClick={downloadAll}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 text-white font-semibold hover:shadow-lg hover:shadow-red-500/25 transition-all"
            >
              전체 ZIP 다운로드 ({images.length}장)
            </button>
            <button
              onClick={() => { setFile(null); setImages([]); }}
              className="px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              초기화
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {images.map((src, i) => (
              <div
                key={i}
                className="relative group rounded-xl overflow-hidden border border-slate-200 dark:border-slate-600 cursor-pointer"
                onClick={() => downloadImage(src, i + 1)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`페이지 ${i + 1}`} className="w-full h-auto" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-sm font-medium">클릭하여 다운로드</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs text-center py-1">
                  페이지 {i + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── JPG → PDF Tab ────────────────────────────────────────────────────────────

function Jpg2PdfTab() {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState("");
  const [processing, setProcessing] = useState(false);

  const handleFiles = useCallback((newFiles: File[]) => {
    const valid = newFiles.filter(
      (f) => f.type === "image/jpeg" || f.type === "image/png"
    );
    setFiles((prev) => [...prev, ...valid]);
  }, []);

  const removeFile = (i: number) => setFiles((prev) => prev.filter((_, idx) => idx !== i));
  const moveUp = (i: number) => {
    if (i === 0) return;
    setFiles((prev) => {
      const arr = [...prev];
      [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
      return arr;
    });
  };
  const moveDown = (i: number) => {
    setFiles((prev) => {
      if (i === prev.length - 1) return prev;
      const arr = [...prev];
      [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
      return arr;
    });
  };

  const handleConvert = async () => {
    if (files.length === 0) return;
    setProcessing(true);
    setStatus("PDF 생성 중...");
    try {
      const doc = await PDFDocument.create();
      for (let i = 0; i < files.length; i++) {
        setStatus(`이미지 ${i + 1}/${files.length} 처리 중...`);
        const buf = await files[i].arrayBuffer();
        const bytes = new Uint8Array(buf) as Uint8Array<ArrayBuffer>;
        const isJpeg =
          files[i].type === "image/jpeg" || files[i].name.toLowerCase().endsWith(".jpg");
        const img = isJpeg
          ? await doc.embedJpg(bytes)
          : await doc.embedPng(bytes);
        const page = doc.addPage([img.width, img.height]);
        page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
      }
      setStatus("파일 생성 중...");
      const pdfBytes = await doc.save();
      downloadBlob(new Blob([pdfBytes as BlobPart], { type: "application/pdf" }), "images.pdf");
      setStatus("");
    } catch (e) {
      setStatus("오류가 발생했습니다. 이미지 파일을 확인해주세요.");
      console.error(e);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="space-y-4">
      <DropZone
        accept=".jpg,.jpeg,.png"
        multiple
        onFiles={handleFiles}
        label="JPG / PNG 이미지를 드래그하거나 클릭하여 추가"
        sublabel="이미지 순서대로 PDF 페이지가 생성됩니다"
      />
      <FileListDisplay files={files} onRemove={removeFile} onMoveUp={moveUp} onMoveDown={moveDown} />
      {processing && <StatusBadge status={status} />}
      {files.length > 0 && !processing && (
        <button
          onClick={handleConvert}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 text-white font-semibold hover:shadow-lg hover:shadow-red-500/25 transition-all"
        >
          PDF로 변환하기 ({files.length}장)
        </button>
      )}
    </div>
  );
}

// ─── Compress Tab ─────────────────────────────────────────────────────────────

function CompressTab() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<{ original: number; compressed: number } | null>(null);

  const handleFiles = useCallback((files: File[]) => {
    const f = files.find((f) => f.type === "application/pdf");
    if (f) { setFile(f); setResult(null); }
  }, []);

  const handleCompress = async () => {
    if (!file) return;
    setProcessing(true);
    setStatus("PDF 최적화 중...");
    try {
      const bytes = await file.arrayBuffer();
      const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
      // Remove metadata to reduce size
      doc.setTitle("");
      doc.setAuthor("");
      doc.setSubject("");
      doc.setKeywords([]);
      doc.setProducer("");
      doc.setCreator("");
      const compressed = await doc.save({ useObjectStreams: true });
      const blob = new Blob([compressed as BlobPart], { type: "application/pdf" });
      setResult({ original: file.size, compressed: compressed.length });
      downloadBlob(blob, `compressed_${file.name}`);
      setStatus("");
    } catch (e) {
      setStatus("오류가 발생했습니다.");
      console.error(e);
    } finally {
      setProcessing(false);
    }
  };

  const ratio = result
    ? Math.round((1 - result.compressed / result.original) * 100)
    : 0;

  return (
    <div className="space-y-4">
      {!file ? (
        <DropZone
          accept=".pdf"
          onFiles={handleFiles}
          label="PDF 파일을 드래그하거나 클릭하여 업로드"
          sublabel="메타데이터 제거 및 객체 스트림 최적화로 파일 크기를 줄입니다"
        />
      ) : (
        <>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 flex items-center gap-3">
            <span className="text-red-500 text-2xl">📄</span>
            <div className="flex-1">
              <p className="font-medium text-slate-700 dark:text-slate-200 truncate">{file.name}</p>
              <p className="text-sm text-slate-400">{formatSize(file.size)}</p>
            </div>
            <button
              onClick={() => { setFile(null); setResult(null); }}
              className="p-1 text-slate-400 hover:text-red-500 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {result && (
            <div className="p-4 rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-xs text-slate-500 mb-1">원본</p>
                  <p className="font-bold text-slate-700 dark:text-slate-200">{formatSize(result.original)}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">압축 후</p>
                  <p className="font-bold text-green-600 dark:text-green-400">{formatSize(result.compressed)}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">절감</p>
                  <p className={`font-bold ${ratio > 0 ? "text-green-600 dark:text-green-400" : ratio < 0 ? "text-red-500" : "text-slate-500"}`}>
                    {ratio > 0 ? `-${ratio}%` : ratio < 0 ? `+${Math.abs(ratio)}%` : "변화 없음"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {processing && <StatusBadge status={status} />}
          {!processing && (
            <button
              onClick={handleCompress}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 text-white font-semibold hover:shadow-lg hover:shadow-red-500/25 transition-all"
            >
              압축하여 다운로드
            </button>
          )}
        </>
      )}
    </div>
  );
}

// ─── Reorder Tab ─────────────────────────────────────────────────────────────

interface PageThumb {
  index: number;
  dataUrl: string;
}

function ReorderTab() {
  const [file, setFile] = useState<File | null>(null);
  const [thumbs, setThumbs] = useState<PageThumb[]>([]);
  const [deleted, setDeleted] = useState<Set<number>>(new Set());
  const [order, setOrder] = useState<number[]>([]);
  const [status, setStatus] = useState("");
  const [processing, setProcessing] = useState(false);

  const handleFiles = useCallback(async (files: File[]) => {
    const f = files.find((f) => f.type === "application/pdf");
    if (!f) return;
    setFile(f);
    setThumbs([]);
    setDeleted(new Set());
    setStatus("썸네일 생성 중...");
    setProcessing(true);
    try {
      const arrayBuffer = await f.arrayBuffer();
      const pdfjsLib = await getPdfJs();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const total = pdf.numPages;
      const results: PageThumb[] = [];
      for (let i = 1; i <= total; i++) {
        setStatus(`페이지 ${i}/${total} 미리보기 생성 중...`);
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 0.5 });
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext("2d")!;
        await page.render({ canvas, canvasContext: ctx, viewport }).promise;
        results.push({ index: i - 1, dataUrl: canvas.toDataURL("image/jpeg", 0.7) });
      }
      setThumbs(results);
      setOrder(results.map((_, i) => i));
      setStatus("");
    } catch (e) {
      setStatus("파일을 읽을 수 없습니다.");
      console.error(e);
    } finally {
      setProcessing(false);
    }
  }, []);

  const toggleDelete = (originalIndex: number) => {
    setDeleted((prev) => {
      const next = new Set(prev);
      if (next.has(originalIndex)) next.delete(originalIndex);
      else next.add(originalIndex);
      return next;
    });
  };

  const movePageUp = (pos: number) => {
    if (pos === 0) return;
    setOrder((prev) => {
      const arr = [...prev];
      [arr[pos - 1], arr[pos]] = [arr[pos], arr[pos - 1]];
      return arr;
    });
  };

  const movePageDown = (pos: number) => {
    setOrder((prev) => {
      if (pos === prev.length - 1) return prev;
      const arr = [...prev];
      [arr[pos], arr[pos + 1]] = [arr[pos + 1], arr[pos]];
      return arr;
    });
  };

  const handleApply = async () => {
    if (!file) return;
    setProcessing(true);
    setStatus("PDF 생성 중...");
    try {
      const bytes = await file.arrayBuffer();
      const sourceDoc = await PDFDocument.load(bytes);
      const newDoc = await PDFDocument.create();
      const activePages = order.filter((idx) => !deleted.has(idx));
      const copied = await newDoc.copyPages(sourceDoc, activePages);
      copied.forEach((page) => newDoc.addPage(page));
      const pdfBytes = await newDoc.save();
      downloadBlob(new Blob([pdfBytes as BlobPart], { type: "application/pdf" }), `edited_${file.name}`);
      setStatus("");
    } catch (e) {
      setStatus("오류가 발생했습니다.");
      console.error(e);
    } finally {
      setProcessing(false);
    }
  };

  const activeCount = order.filter((idx) => !deleted.has(idx)).length;

  return (
    <div className="space-y-4">
      {!file ? (
        <DropZone
          accept=".pdf"
          onFiles={handleFiles}
          label="PDF 파일을 드래그하거나 클릭하여 업로드"
          sublabel="페이지 썸네일을 보며 순서 변경 및 삭제할 수 있습니다"
        />
      ) : (
        <>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 flex items-center gap-3">
            <span className="text-red-500 text-2xl">📄</span>
            <div className="flex-1">
              <p className="font-medium text-slate-700 dark:text-slate-200 truncate">{file.name}</p>
              <p className="text-sm text-slate-400">
                {thumbs.length}페이지 · 활성 {activeCount}페이지
              </p>
            </div>
            <button
              onClick={() => { setFile(null); setThumbs([]); setDeleted(new Set()); setOrder([]); }}
              className="p-1 text-slate-400 hover:text-red-500 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {processing && <StatusBadge status={status} />}

          {thumbs.length > 0 && (
            <>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                빨간 X 버튼으로 페이지를 삭제하고, 화살표로 순서를 변경하세요. 삭제된 페이지를 다시 클릭하면 복원됩니다.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {order.map((originalIdx, pos) => {
                  const thumb = thumbs[originalIdx];
                  const isDeleted = deleted.has(originalIdx);
                  return (
                    <div
                      key={`${originalIdx}-${pos}`}
                      className={`relative rounded-xl overflow-hidden border-2 transition-all ${
                        isDeleted
                          ? "border-red-400 opacity-40"
                          : "border-slate-200 dark:border-slate-600"
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={thumb.dataUrl}
                        alt={`페이지 ${pos + 1}`}
                        className="w-full h-auto"
                      />
                      <div className="absolute top-1 right-1 flex gap-1">
                        <button
                          onClick={() => movePageUp(pos)}
                          disabled={pos === 0}
                          className="w-6 h-6 rounded bg-black/60 text-white text-xs hover:bg-black/80 disabled:opacity-30"
                        >
                          ▲
                        </button>
                        <button
                          onClick={() => movePageDown(pos)}
                          disabled={pos === order.length - 1}
                          className="w-6 h-6 rounded bg-black/60 text-white text-xs hover:bg-black/80 disabled:opacity-30"
                        >
                          ▼
                        </button>
                        <button
                          onClick={() => toggleDelete(originalIdx)}
                          className="w-6 h-6 rounded bg-red-500 text-white text-xs hover:bg-red-600"
                        >
                          {isDeleted ? "↩" : "✕"}
                        </button>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs text-center py-1">
                        {isDeleted ? "삭제됨" : `${pos + 1}번`}
                      </div>
                    </div>
                  );
                })}
              </div>

              {!processing && (
                <button
                  onClick={handleApply}
                  disabled={activeCount === 0}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 text-white font-semibold hover:shadow-lg hover:shadow-red-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  변경사항 적용하여 다운로드 ({activeCount}페이지)
                </button>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

// ─── Extract Tab ──────────────────────────────────────────────────────────────

function ExtractTab() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [status, setStatus] = useState("");
  const [processing, setProcessing] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleFiles = useCallback((files: File[]) => {
    const f = files.find((f) => f.type === "application/pdf");
    if (f) { setFile(f); setText(""); }
  }, []);

  const handleExtract = async () => {
    if (!file) return;
    setProcessing(true);
    setText("");
    setStatus("텍스트 추출 중...");
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfjsLib = await getPdfJs();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const total = pdf.numPages;
      const lines: string[] = [];

      for (let i = 1; i <= total; i++) {
        setStatus(`페이지 ${i}/${total} 처리 중...`);
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items
          .map((item) => ("str" in item ? item.str : ""))
          .join(" ");
        if (pageText.trim()) {
          lines.push(`[페이지 ${i}]`);
          lines.push(pageText.trim());
          lines.push("");
        }
      }
      setText(lines.join("\n"));
      setStatus("");
    } catch (e) {
      setStatus("텍스트 추출에 실패했습니다.");
      console.error(e);
    } finally {
      setProcessing(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    downloadBlob(blob, `${file?.name.replace(".pdf", "")}_text.txt`);
  };

  return (
    <div className="space-y-4">
      {!file ? (
        <DropZone
          accept=".pdf"
          onFiles={handleFiles}
          label="PDF 파일을 드래그하거나 클릭하여 업로드"
          sublabel="PDF 내의 텍스트를 추출하여 복사하거나 저장할 수 있습니다"
        />
      ) : (
        <>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 flex items-center gap-3">
            <span className="text-red-500 text-2xl">📄</span>
            <div className="flex-1">
              <p className="font-medium text-slate-700 dark:text-slate-200 truncate">{file.name}</p>
              <p className="text-sm text-slate-400">{formatSize(file.size)}</p>
            </div>
            <button
              onClick={() => { setFile(null); setText(""); }}
              className="p-1 text-slate-400 hover:text-red-500 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {processing && <StatusBadge status={status} />}

          {!processing && text === "" && (
            <button
              onClick={handleExtract}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 text-white font-semibold hover:shadow-lg hover:shadow-red-500/25 transition-all"
            >
              텍스트 추출하기
            </button>
          )}

          {text && (
            <div className="space-y-3">
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 text-white font-semibold text-sm hover:shadow-lg hover:shadow-red-500/25 transition-all"
                >
                  {copied ? "복사됨!" : "클립보드에 복사"}
                </button>
                <button
                  onClick={handleDownload}
                  className="flex-1 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  TXT 다운로드
                </button>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 max-h-80 overflow-y-auto">
                <pre className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap font-sans leading-relaxed">
                  {text}
                </pre>
              </div>
              <p className="text-xs text-slate-400 text-right">
                총 {text.length.toLocaleString()}자
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function PdfPage() {
  const [activeTab, setActiveTab] = useState<Tab>("merge");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50/30 to-rose-50/20 dark:from-slate-950 dark:via-red-950/20 dark:to-rose-950/10">
        <div className="max-w-3xl mx-auto px-4 py-8">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="text-5xl mb-3">📋</div>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
              <span className="bg-gradient-to-r from-red-500 to-rose-500 bg-clip-text text-transparent">
                PDF 도구
              </span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              모든 처리가 브라우저에서 이루어져 파일이 서버에 업로드되지 않습니다
            </p>
          </motion.div>

          {/* Ad - top */}
          <AdBanner
            format="horizontal"
            className="mb-6 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2"
          />

          {/* Tab bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide"
          >
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-md shadow-red-500/20"
                    : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-red-300 dark:hover:border-red-700"
                }`}
              >
                <span>{tab.emoji}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </motion.div>

          {/* Tool content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700"
            >
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4">
                {TABS.find((t) => t.id === activeTab)?.emoji}{" "}
                {TABS.find((t) => t.id === activeTab)?.label}
              </h2>

              {activeTab === "merge" && <MergeTab />}
              {activeTab === "split" && <SplitTab />}
              {activeTab === "pdf2jpg" && <Pdf2JpgTab />}
              {activeTab === "jpg2pdf" && <Jpg2PdfTab />}
              {activeTab === "compress" && <CompressTab />}
              {activeTab === "reorder" && <ReorderTab />}
              {activeTab === "extract" && <ExtractTab />}
            </motion.div>
          </AnimatePresence>

          {/* Ad - mid */}
          <AdBanner
            format="rectangle"
            className="mt-6 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2"
          />

          {/* Safety note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-6 p-4 rounded-2xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800"
          >
            <div className="flex items-start gap-3">
              <span className="text-green-500 text-xl flex-shrink-0">🔒</span>
              <div>
                <p className="text-sm font-semibold text-green-700 dark:text-green-400">
                  100% 브라우저에서 처리
                </p>
                <p className="text-xs text-green-600 dark:text-green-500 mt-0.5 leading-relaxed">
                  파일이 서버로 전송되지 않습니다. 모든 PDF 처리는 사용자의 기기에서 직접
                  이루어지므로 개인 정보가 완전히 보호됩니다.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Ad - in-article */}
          <AdBanner
            format="in-article"
            className="mt-6 rounded-2xl bg-white/50 dark:bg-slate-800/50 p-2"
          />

          {/* FAQ */}
          <section className="mt-12 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-center">자주 묻는 질문</h2>
            <div className="space-y-4">
              <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-slate-700 dark:text-slate-200 hover:text-red-500 transition-colors">
                  PDF 파일을 합치려면 어떻게 하나요?
                  <svg className="w-5 h-5 shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="px-5 pb-5 text-slate-500 dark:text-slate-400 leading-relaxed">
                  &apos;PDF 합치기&apos; 탭에서 여러 PDF 파일을 업로드하면 됩니다. 파일을 드래그하거나 클릭하여 추가하고, 위아래 화살표로 순서를 조정한 뒤 &apos;PDF 합치기&apos; 버튼을 누르면 하나의 PDF로 합쳐져 다운로드됩니다.
                </p>
              </details>

              <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-slate-700 dark:text-slate-200 hover:text-red-500 transition-colors">
                  PDF를 JPG로 변환할 수 있나요?
                  <svg className="w-5 h-5 shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="px-5 pb-5 text-slate-500 dark:text-slate-400 leading-relaxed">
                  &apos;PDF → JPG&apos; 탭에서 PDF를 업로드하고 &apos;JPG로 변환하기&apos; 버튼을 누르면 각 페이지가 JPG 이미지로 변환됩니다. 개별 이미지를 클릭하여 다운로드하거나, 전체를 ZIP 파일로 묶어서 한 번에 다운로드할 수 있습니다.
                </p>
              </details>

              <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-slate-700 dark:text-slate-200 hover:text-red-500 transition-colors">
                  업로드한 파일이 서버에 저장되나요?
                  <svg className="w-5 h-5 shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="px-5 pb-5 text-slate-500 dark:text-slate-400 leading-relaxed">
                  아니요, 모든 PDF 처리는 사용자의 브라우저(기기)에서만 이루어집니다. 파일이 인터넷으로 전송되거나 어떤 서버에도 저장되지 않아 개인 문서를 안전하게 처리할 수 있습니다.
                </p>
              </details>

              <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-slate-700 dark:text-slate-200 hover:text-red-500 transition-colors">
                  PDF 압축은 얼마나 효과적인가요?
                  <svg className="w-5 h-5 shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="px-5 pb-5 text-slate-500 dark:text-slate-400 leading-relaxed">
                  브라우저 기반 PDF 압축은 메타데이터 제거와 객체 스트림 최적화를 통해 파일 크기를 줄입니다. 이미 최적화된 PDF는 크게 줄지 않을 수 있으며, 이미지가 많은 PDF는 별도의 이미지 압축 없이는 용량이 크게 감소하지 않을 수 있습니다.
                </p>
              </details>

              <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-slate-700 dark:text-slate-200 hover:text-red-500 transition-colors">
                  특정 페이지만 추출할 수 있나요?
                  <svg className="w-5 h-5 shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="px-5 pb-5 text-slate-500 dark:text-slate-400 leading-relaxed">
                  네, &apos;페이지 추출&apos; 탭에서 원하는 페이지 범위를 입력하면 됩니다. 예를 들어 &apos;1-3, 5, 7-10&apos;처럼 입력하면 1~3페이지, 5페이지, 7~10페이지만 추출하여 새로운 PDF로 저장합니다. &apos;페이지 편집&apos; 탭에서는 썸네일을 보며 삭제할 페이지를 직접 선택할 수도 있습니다.
                </p>
              </details>
            </div>
          </section>

        </div>
      </div>
    </PageTransition>
  );
}
