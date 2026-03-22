"use client";

import { useState, useRef, useCallback, useEffect, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import AdBanner from "@/components/AdBanner";
import { PDFDocument } from "pdf-lib";
import JSZip from "jszip";
import { useLocale } from "@/hooks/useLocale";

type Locale = "ko" | "en" | "ja" | "zh" | "es";

type PdfTranslations = {
  // Tabs
  tabMerge: string;
  tabSplit: string;
  tabCompress: string;
  tabReorder: string;
  tabExtract: string;
  // DropZone default label
  dropDefault: string;
  // File list buttons
  btnUp: string;
  btnDown: string;
  btnRemove: string;
  // Merge tab
  mergeDropLabel: string;
  mergeDropSublabel: string;
  mergeMerging: string;
  mergeProcessing: (i: number, total: number) => string;
  mergeCreating: string;
  mergeError: string;
  mergeBtnLabel: (n: number) => string;
  mergeNeedMore: string;
  // Split tab
  splitDropLabel: string;
  splitCheckingPages: string;
  splitCantRead: string;
  splitSplitting: string;
  splitInvalidRange: string;
  splitError: string;
  splitPageInfo: (size: string, pages: number) => string;
  splitRangeLabel: string;
  splitRangePlaceholder: (max: number) => string;
  splitRangeHint: (total: number) => string;
  splitBtnDownload: string;
  // PDF→JPG tab
  pdf2jpgDropLabel: string;
  pdf2jpgDropSublabel: string;
  pdf2jpgConverting: (i: number, total: number) => string;
  pdf2jpgError: string;
  pdf2jpgBtnConvert: string;
  pdf2jpgBtnDownloadAll: (n: number) => string;
  pdf2jpgBtnReset: string;
  pdf2jpgPageAlt: (n: number) => string;
  pdf2jpgClickDownload: string;
  pdf2jpgPageLabel: (n: number) => string;
  // JPG→PDF tab
  jpg2pdfDropLabel: string;
  jpg2pdfDropSublabel: string;
  jpg2pdfCreating: string;
  jpg2pdfProcessing: (i: number, total: number) => string;
  jpg2pdfCreatingFile: string;
  jpg2pdfError: string;
  jpg2pdfBtnConvert: (n: number) => string;
  // Compress tab
  compressDropLabel: string;
  compressDropSublabel: string;
  compressOptimizing: string;
  compressError: string;
  compressOriginal: string;
  compressAfter: string;
  compressSaved: string;
  compressNoChange: string;
  compressBtnDownload: string;
  // Reorder tab
  reorderDropLabel: string;
  reorderDropSublabel: string;
  reorderGenerating: string;
  reorderGeneratingPage: (i: number, total: number) => string;
  reorderCantRead: string;
  reorderCreating: string;
  reorderError: string;
  reorderPageInfo: (total: number, active: number) => string;
  reorderHint: string;
  reorderPageAlt: (n: number) => string;
  reorderDeleted: string;
  reorderPageNum: (n: number) => string;
  reorderBtnApply: (n: number) => string;
  // Extract tab
  extractDropLabel: string;
  extractDropSublabel: string;
  extractExtracting: string;
  extractProcessing: (i: number, total: number) => string;
  extractPageMarker: (n: number) => string;
  extractError: string;
  extractBtnExtract: string;
  extractBtnCopied: string;
  extractBtnCopy: string;
  extractBtnDownload: string;
  extractCharCount: (n: number) => string;
  // Main page
  pageTitle: string;
  pageSubtitle: string;
  safeTitle: string;
  safeDesc: string;
  faqTitle: string;
  faq1q: string;
  faq1a: string;
  faq2q: string;
  faq2a: string;
  faq3q: string;
  faq3a: string;
  faq4q: string;
  faq4a: string;
  faq5q: string;
  faq5a: string;
};

const pdfTranslations: Record<Locale, PdfTranslations> = {
  ko: {
    tabMerge: "PDF 합치기",
    tabSplit: "페이지 추출",
    tabCompress: "PDF 압축",
    tabReorder: "페이지 편집",
    tabExtract: "텍스트 추출",
    dropDefault: "파일을 여기에 드래그하거나 클릭하여 업로드",
    btnUp: "위로",
    btnDown: "아래로",
    btnRemove: "제거",
    mergeDropLabel: "PDF 파일들을 드래그하거나 클릭하여 추가",
    mergeDropSublabel: "여러 파일을 한 번에 선택할 수 있습니다",
    mergeMerging: "PDF 병합 중...",
    mergeProcessing: (i, total) => `파일 ${i}/${total} 처리 중...`,
    mergeCreating: "파일 생성 중...",
    mergeError: "오류가 발생했습니다. 파일을 확인해주세요.",
    mergeBtnLabel: (n) => `${n}개 PDF 합치기`,
    mergeNeedMore: "PDF를 2개 이상 추가해주세요",
    splitDropLabel: "PDF 파일을 드래그하거나 클릭하여 업로드",
    splitCheckingPages: "페이지 수 확인 중...",
    splitCantRead: "파일을 읽을 수 없습니다.",
    splitSplitting: "분할 중...",
    splitInvalidRange: "유효한 페이지 범위를 입력해주세요.",
    splitError: "오류가 발생했습니다.",
    splitPageInfo: (size, pages) => `${size} · 총 ${pages}페이지`,
    splitRangeLabel: "추출할 페이지 범위",
    splitRangePlaceholder: (max) => `예: 1-3, 5, 7-${max}`,
    splitRangeHint: (total) => `쉼표(,)로 구분, 하이픈(-)으로 범위 지정. 전체 ${total}페이지`,
    splitBtnDownload: "분할하여 다운로드",
    pdf2jpgDropLabel: "PDF 파일을 드래그하거나 클릭하여 업로드",
    pdf2jpgDropSublabel: "각 페이지가 JPG 이미지로 변환됩니다",
    pdf2jpgConverting: (i, total) => `페이지 ${i}/${total} 변환 중...`,
    pdf2jpgError: "변환 중 오류가 발생했습니다.",
    pdf2jpgBtnConvert: "JPG로 변환하기",
    pdf2jpgBtnDownloadAll: (n) => `전체 ZIP 다운로드 (${n}장)`,
    pdf2jpgBtnReset: "초기화",
    pdf2jpgPageAlt: (n) => `페이지 ${n}`,
    pdf2jpgClickDownload: "클릭하여 다운로드",
    pdf2jpgPageLabel: (n) => `페이지 ${n}`,
    jpg2pdfDropLabel: "JPG / PNG 이미지를 드래그하거나 클릭하여 추가",
    jpg2pdfDropSublabel: "이미지 순서대로 PDF 페이지가 생성됩니다",
    jpg2pdfCreating: "PDF 생성 중...",
    jpg2pdfProcessing: (i, total) => `이미지 ${i}/${total} 처리 중...`,
    jpg2pdfCreatingFile: "파일 생성 중...",
    jpg2pdfError: "오류가 발생했습니다. 이미지 파일을 확인해주세요.",
    jpg2pdfBtnConvert: (n) => `PDF로 변환하기 (${n}장)`,
    compressDropLabel: "PDF 파일을 드래그하거나 클릭하여 업로드",
    compressDropSublabel: "메타데이터 제거 및 객체 스트림 최적화로 파일 크기를 줄입니다",
    compressOptimizing: "PDF 최적화 중...",
    compressError: "오류가 발생했습니다.",
    compressOriginal: "원본",
    compressAfter: "압축 후",
    compressSaved: "절감",
    compressNoChange: "변화 없음",
    compressBtnDownload: "압축하여 다운로드",
    reorderDropLabel: "PDF 파일을 드래그하거나 클릭하여 업로드",
    reorderDropSublabel: "페이지 썸네일을 보며 순서 변경 및 삭제할 수 있습니다",
    reorderGenerating: "썸네일 생성 중...",
    reorderGeneratingPage: (i, total) => `페이지 ${i}/${total} 미리보기 생성 중...`,
    reorderCantRead: "파일을 읽을 수 없습니다.",
    reorderCreating: "PDF 생성 중...",
    reorderError: "오류가 발생했습니다.",
    reorderPageInfo: (total, active) => `${total}페이지 · 활성 ${active}페이지`,
    reorderHint: "빨간 X 버튼으로 페이지를 삭제하고, 화살표로 순서를 변경하세요. 삭제된 페이지를 다시 클릭하면 복원됩니다.",
    reorderPageAlt: (n) => `페이지 ${n}`,
    reorderDeleted: "삭제됨",
    reorderPageNum: (n) => `${n}번`,
    reorderBtnApply: (n) => `변경사항 적용하여 다운로드 (${n}페이지)`,
    extractDropLabel: "PDF 파일을 드래그하거나 클릭하여 업로드",
    extractDropSublabel: "PDF 내의 텍스트를 추출하여 복사하거나 저장할 수 있습니다",
    extractExtracting: "텍스트 추출 중...",
    extractProcessing: (i, total) => `페이지 ${i}/${total} 처리 중...`,
    extractPageMarker: (n) => `[페이지 ${n}]`,
    extractError: "텍스트 추출에 실패했습니다.",
    extractBtnExtract: "텍스트 추출하기",
    extractBtnCopied: "복사됨!",
    extractBtnCopy: "클립보드에 복사",
    extractBtnDownload: "TXT 다운로드",
    extractCharCount: (n) => `총 ${n.toLocaleString()}자`,
    pageTitle: "PDF 도구",
    pageSubtitle: "모든 처리가 브라우저에서 이루어져 파일이 서버에 업로드되지 않습니다",
    safeTitle: "100% 브라우저에서 처리",
    safeDesc: "파일이 서버로 전송되지 않습니다. 모든 PDF 처리는 사용자의 기기에서 직접 이루어지므로 개인 정보가 완전히 보호됩니다.",
    faqTitle: "자주 묻는 질문",
    faq1q: "PDF 파일을 합치려면 어떻게 하나요?",
    faq1a: "'PDF 합치기' 탭에서 여러 PDF 파일을 업로드하면 됩니다. 파일을 드래그하거나 클릭하여 추가하고, 위아래 화살표로 순서를 조정한 뒤 'PDF 합치기' 버튼을 누르면 하나의 PDF로 합쳐져 다운로드됩니다.",
    faq2q: "PDF를 JPG로 변환할 수 있나요?",
    faq2a: "'PDF → JPG' 탭에서 PDF를 업로드하고 'JPG로 변환하기' 버튼을 누르면 각 페이지가 JPG 이미지로 변환됩니다. 개별 이미지를 클릭하여 다운로드하거나, 전체를 ZIP 파일로 묶어서 한 번에 다운로드할 수 있습니다.",
    faq3q: "업로드한 파일이 서버에 저장되나요?",
    faq3a: "아니요, 모든 PDF 처리는 사용자의 브라우저(기기)에서만 이루어집니다. 파일이 인터넷으로 전송되거나 어떤 서버에도 저장되지 않아 개인 문서를 안전하게 처리할 수 있습니다.",
    faq4q: "PDF 압축은 얼마나 효과적인가요?",
    faq4a: "브라우저 기반 PDF 압축은 메타데이터 제거와 객체 스트림 최적화를 통해 파일 크기를 줄입니다. 이미 최적화된 PDF는 크게 줄지 않을 수 있으며, 이미지가 많은 PDF는 별도의 이미지 압축 없이는 용량이 크게 감소하지 않을 수 있습니다.",
    faq5q: "특정 페이지만 추출할 수 있나요?",
    faq5a: "네, '페이지 추출' 탭에서 원하는 페이지 범위를 입력하면 됩니다. 예를 들어 '1-3, 5, 7-10'처럼 입력하면 1~3페이지, 5페이지, 7~10페이지만 추출하여 새로운 PDF로 저장합니다. '페이지 편집' 탭에서는 썸네일을 보며 삭제할 페이지를 직접 선택할 수도 있습니다.",
  },
  en: {
    tabMerge: "Merge PDF",
    tabSplit: "Extract Pages",
    tabCompress: "Compress PDF",
    tabReorder: "Edit Pages",
    tabExtract: "Extract Text",
    dropDefault: "Drag files here or click to upload",
    btnUp: "Move up",
    btnDown: "Move down",
    btnRemove: "Remove",
    mergeDropLabel: "Drag PDF files here or click to add",
    mergeDropSublabel: "You can select multiple files at once",
    mergeMerging: "Merging PDFs...",
    mergeProcessing: (i, total) => `Processing file ${i}/${total}...`,
    mergeCreating: "Creating file...",
    mergeError: "An error occurred. Please check your files.",
    mergeBtnLabel: (n) => `Merge ${n} PDFs`,
    mergeNeedMore: "Please add at least 2 PDFs",
    splitDropLabel: "Drag a PDF file here or click to upload",
    splitCheckingPages: "Checking page count...",
    splitCantRead: "Cannot read the file.",
    splitSplitting: "Splitting...",
    splitInvalidRange: "Please enter a valid page range.",
    splitError: "An error occurred.",
    splitPageInfo: (size, pages) => `${size} · ${pages} pages total`,
    splitRangeLabel: "Page range to extract",
    splitRangePlaceholder: (max) => `e.g. 1-3, 5, 7-${max}`,
    splitRangeHint: (total) => `Comma-separated, hyphen for ranges. Total ${total} pages`,
    splitBtnDownload: "Split & Download",
    pdf2jpgDropLabel: "Drag a PDF file here or click to upload",
    pdf2jpgDropSublabel: "Each page will be converted to a JPG image",
    pdf2jpgConverting: (i, total) => `Converting page ${i}/${total}...`,
    pdf2jpgError: "An error occurred during conversion.",
    pdf2jpgBtnConvert: "Convert to JPG",
    pdf2jpgBtnDownloadAll: (n) => `Download all as ZIP (${n} images)`,
    pdf2jpgBtnReset: "Reset",
    pdf2jpgPageAlt: (n) => `Page ${n}`,
    pdf2jpgClickDownload: "Click to download",
    pdf2jpgPageLabel: (n) => `Page ${n}`,
    jpg2pdfDropLabel: "Drag JPG / PNG images here or click to add",
    jpg2pdfDropSublabel: "PDF pages will be created in the order of the images",
    jpg2pdfCreating: "Creating PDF...",
    jpg2pdfProcessing: (i, total) => `Processing image ${i}/${total}...`,
    jpg2pdfCreatingFile: "Creating file...",
    jpg2pdfError: "An error occurred. Please check your image files.",
    jpg2pdfBtnConvert: (n) => `Convert to PDF (${n} images)`,
    compressDropLabel: "Drag a PDF file here or click to upload",
    compressDropSublabel: "Reduces file size by removing metadata and optimizing object streams",
    compressOptimizing: "Optimizing PDF...",
    compressError: "An error occurred.",
    compressOriginal: "Original",
    compressAfter: "Compressed",
    compressSaved: "Saved",
    compressNoChange: "No change",
    compressBtnDownload: "Compress & Download",
    reorderDropLabel: "Drag a PDF file here or click to upload",
    reorderDropSublabel: "Reorder or delete pages using thumbnails",
    reorderGenerating: "Generating thumbnails...",
    reorderGeneratingPage: (i, total) => `Generating preview for page ${i}/${total}...`,
    reorderCantRead: "Cannot read the file.",
    reorderCreating: "Creating PDF...",
    reorderError: "An error occurred.",
    reorderPageInfo: (total, active) => `${total} pages · ${active} active`,
    reorderHint: "Use the red X to delete pages and arrows to reorder. Click a deleted page to restore it.",
    reorderPageAlt: (n) => `Page ${n}`,
    reorderDeleted: "Deleted",
    reorderPageNum: (n) => `#${n}`,
    reorderBtnApply: (n) => `Apply changes & Download (${n} pages)`,
    extractDropLabel: "Drag a PDF file here or click to upload",
    extractDropSublabel: "Extract text from PDF to copy or save",
    extractExtracting: "Extracting text...",
    extractProcessing: (i, total) => `Processing page ${i}/${total}...`,
    extractPageMarker: (n) => `[Page ${n}]`,
    extractError: "Failed to extract text.",
    extractBtnExtract: "Extract Text",
    extractBtnCopied: "Copied!",
    extractBtnCopy: "Copy to Clipboard",
    extractBtnDownload: "Download TXT",
    extractCharCount: (n) => `${n.toLocaleString()} characters total`,
    pageTitle: "PDF Tools",
    pageSubtitle: "All processing happens in your browser — files are never uploaded to a server",
    safeTitle: "100% Browser-Based",
    safeDesc: "Files are never sent to a server. All PDF processing happens directly on your device, keeping your documents completely private.",
    faqTitle: "Frequently Asked Questions",
    faq1q: "How do I merge PDF files?",
    faq1a: "Go to the 'Merge PDF' tab and upload your PDF files. Drag or click to add them, use the arrows to reorder, then click 'Merge PDFs' to download the combined file.",
    faq2q: "Can I convert a PDF to JPG?",
    faq2a: "Yes! Go to the 'PDF → JPG' tab, upload your PDF, and click 'Convert to JPG'. Each page becomes a JPG image you can download individually or as a ZIP archive.",
    faq3q: "Are uploaded files saved on a server?",
    faq3a: "No. All processing happens entirely in your browser. Files are never transmitted over the internet or stored on any server.",
    faq4q: "How effective is PDF compression?",
    faq4a: "Browser-based compression reduces file size by removing metadata and optimizing object streams. Already-optimized PDFs may not shrink much, and image-heavy PDFs may need separate image compression for large reductions.",
    faq5q: "Can I extract specific pages only?",
    faq5a: "Yes! In the 'Extract Pages' tab, enter a page range such as '1-3, 5, 7-10' to extract only those pages into a new PDF. The 'Edit Pages' tab lets you visually select pages to delete using thumbnails.",
  },
  ja: {
    tabMerge: "PDF結合",
    tabSplit: "ページ抽出",
    tabCompress: "PDF圧縮",
    tabReorder: "ページ編集",
    tabExtract: "テキスト抽出",
    dropDefault: "ここにファイルをドラッグするかクリックしてアップロード",
    btnUp: "上へ",
    btnDown: "下へ",
    btnRemove: "削除",
    mergeDropLabel: "PDFファイルをドラッグまたはクリックして追加",
    mergeDropSublabel: "複数ファイルを一度に選択できます",
    mergeMerging: "PDF結合中...",
    mergeProcessing: (i, total) => `ファイル ${i}/${total} 処理中...`,
    mergeCreating: "ファイル作成中...",
    mergeError: "エラーが発生しました。ファイルを確認してください。",
    mergeBtnLabel: (n) => `${n}個のPDFを結合`,
    mergeNeedMore: "PDFを2つ以上追加してください",
    splitDropLabel: "PDFファイルをドラッグまたはクリックしてアップロード",
    splitCheckingPages: "ページ数確認中...",
    splitCantRead: "ファイルを読み込めません。",
    splitSplitting: "分割中...",
    splitInvalidRange: "有効なページ範囲を入力してください。",
    splitError: "エラーが発生しました。",
    splitPageInfo: (size, pages) => `${size} · 全${pages}ページ`,
    splitRangeLabel: "抽出するページ範囲",
    splitRangePlaceholder: (max) => `例: 1-3, 5, 7-${max}`,
    splitRangeHint: (total) => `カンマ区切り、ハイフンで範囲指定。全${total}ページ`,
    splitBtnDownload: "分割してダウンロード",
    pdf2jpgDropLabel: "PDFファイルをドラッグまたはクリックしてアップロード",
    pdf2jpgDropSublabel: "各ページがJPG画像に変換されます",
    pdf2jpgConverting: (i, total) => `ページ ${i}/${total} 変換中...`,
    pdf2jpgError: "変換中にエラーが発生しました。",
    pdf2jpgBtnConvert: "JPGに変換",
    pdf2jpgBtnDownloadAll: (n) => `全ZIPダウンロード (${n}枚)`,
    pdf2jpgBtnReset: "リセット",
    pdf2jpgPageAlt: (n) => `ページ ${n}`,
    pdf2jpgClickDownload: "クリックしてダウンロード",
    pdf2jpgPageLabel: (n) => `ページ ${n}`,
    jpg2pdfDropLabel: "JPG / PNG画像をドラッグまたはクリックして追加",
    jpg2pdfDropSublabel: "画像の順番でPDFページが作成されます",
    jpg2pdfCreating: "PDF作成中...",
    jpg2pdfProcessing: (i, total) => `画像 ${i}/${total} 処理中...`,
    jpg2pdfCreatingFile: "ファイル作成中...",
    jpg2pdfError: "エラーが発生しました。画像ファイルを確認してください。",
    jpg2pdfBtnConvert: (n) => `PDFに変換 (${n}枚)`,
    compressDropLabel: "PDFファイルをドラッグまたはクリックしてアップロード",
    compressDropSublabel: "メタデータ削除とオブジェクトストリーム最適化でサイズを削減",
    compressOptimizing: "PDF最適化中...",
    compressError: "エラーが発生しました。",
    compressOriginal: "元のサイズ",
    compressAfter: "圧縮後",
    compressSaved: "削減",
    compressNoChange: "変化なし",
    compressBtnDownload: "圧縮してダウンロード",
    reorderDropLabel: "PDFファイルをドラッグまたはクリックしてアップロード",
    reorderDropSublabel: "サムネイルで順序変更・削除ができます",
    reorderGenerating: "サムネイル生成中...",
    reorderGeneratingPage: (i, total) => `ページ ${i}/${total} プレビュー生成中...`,
    reorderCantRead: "ファイルを読み込めません。",
    reorderCreating: "PDF作成中...",
    reorderError: "エラーが発生しました。",
    reorderPageInfo: (total, active) => `${total}ページ · 有効 ${active}ページ`,
    reorderHint: "赤いXでページを削除、矢印で順序変更。削除済みページをクリックすると復元できます。",
    reorderPageAlt: (n) => `ページ ${n}`,
    reorderDeleted: "削除済み",
    reorderPageNum: (n) => `${n}番`,
    reorderBtnApply: (n) => `変更を適用してダウンロード (${n}ページ)`,
    extractDropLabel: "PDFファイルをドラッグまたはクリックしてアップロード",
    extractDropSublabel: "PDF内のテキストを抽出してコピー・保存できます",
    extractExtracting: "テキスト抽出中...",
    extractProcessing: (i, total) => `ページ ${i}/${total} 処理中...`,
    extractPageMarker: (n) => `[ページ ${n}]`,
    extractError: "テキストの抽出に失敗しました。",
    extractBtnExtract: "テキストを抽出",
    extractBtnCopied: "コピーしました！",
    extractBtnCopy: "クリップボードにコピー",
    extractBtnDownload: "TXTダウンロード",
    extractCharCount: (n) => `合計 ${n.toLocaleString()} 文字`,
    pageTitle: "PDFツール",
    pageSubtitle: "すべての処理はブラウザ内で行われ、ファイルはサーバーにアップロードされません",
    safeTitle: "100%ブラウザ処理",
    safeDesc: "ファイルはサーバーに送信されません。すべてのPDF処理はお使いのデバイスで直接行われるため、個人情報が完全に保護されます。",
    faqTitle: "よくある質問",
    faq1q: "PDFファイルを結合するには？",
    faq1a: "「PDF結合」タブで複数のPDFをアップロードしてください。ドラッグまたはクリックで追加し、矢印で順序を調整してから」PDF結合」ボタンを押すと1つのPDFがダウンロードされます。",
    faq2q: "PDFをJPGに変換できますか？",
    faq2a: "「PDF → JPG」タブでPDFをアップロードし」JPGに変換」ボタンを押すと各ページがJPG画像になります。個別にダウンロードするか、ZIPファイルでまとめてダウンロードできます。",
    faq3q: "アップロードしたファイルはサーバーに保存されますか？",
    faq3a: "いいえ。すべての処理はブラウザ内のみで行われます。ファイルはインターネット経由で送信されず、どのサーバーにも保存されません。",
    faq4q: "PDF圧縮はどの程度効果がありますか？",
    faq4a: "ブラウザベースの圧縮はメタデータの削除とオブジェクトストリームの最適化でサイズを削減します。すでに最適化されたPDFはあまり縮小しない場合があります。",
    faq5q: "特定のページだけ抽出できますか？",
    faq5a: "はい。「ページ抽出」タブでページ範囲を入力してください。例えば」1-3, 5, 7-10」と入力すると該当ページのみ新しいPDFとして保存します。「ページ編集」タブではサムネイルを見ながら削除するページを選択できます。",
  },
  zh: {
    tabMerge: "合并PDF",
    tabSplit: "提取页面",
    tabCompress: "压缩PDF",
    tabReorder: "编辑页面",
    tabExtract: "提取文本",
    dropDefault: "将文件拖到此处或点击上传",
    btnUp: "上移",
    btnDown: "下移",
    btnRemove: "删除",
    mergeDropLabel: "拖动PDF文件或点击添加",
    mergeDropSublabel: "可以一次选择多个文件",
    mergeMerging: "正在合并PDF...",
    mergeProcessing: (i, total) => `正在处理文件 ${i}/${total}...`,
    mergeCreating: "正在创建文件...",
    mergeError: "发生错误，请检查文件。",
    mergeBtnLabel: (n) => `合并 ${n} 个PDF`,
    mergeNeedMore: "请至少添加2个PDF",
    splitDropLabel: "拖动PDF文件或点击上传",
    splitCheckingPages: "正在检查页数...",
    splitCantRead: "无法读取文件。",
    splitSplitting: "正在分割...",
    splitInvalidRange: "请输入有效的页面范围。",
    splitError: "发生错误。",
    splitPageInfo: (size, pages) => `${size} · 共${pages}页`,
    splitRangeLabel: "要提取的页面范围",
    splitRangePlaceholder: (max) => `例如: 1-3, 5, 7-${max}`,
    splitRangeHint: (total) => `逗号分隔，连字符表示范围。共${total}页`,
    splitBtnDownload: "分割并下载",
    pdf2jpgDropLabel: "拖动PDF文件或点击上传",
    pdf2jpgDropSublabel: "每页将转换为JPG图片",
    pdf2jpgConverting: (i, total) => `正在转换第 ${i}/${total} 页...`,
    pdf2jpgError: "转换过程中发生错误。",
    pdf2jpgBtnConvert: "转换为JPG",
    pdf2jpgBtnDownloadAll: (n) => `下载全部ZIP (${n}张)`,
    pdf2jpgBtnReset: "重置",
    pdf2jpgPageAlt: (n) => `第 ${n} 页`,
    pdf2jpgClickDownload: "点击下载",
    pdf2jpgPageLabel: (n) => `第 ${n} 页`,
    jpg2pdfDropLabel: "拖动JPG / PNG图片或点击添加",
    jpg2pdfDropSublabel: "将按图片顺序生成PDF页面",
    jpg2pdfCreating: "正在创建PDF...",
    jpg2pdfProcessing: (i, total) => `正在处理图片 ${i}/${total}...`,
    jpg2pdfCreatingFile: "正在创建文件...",
    jpg2pdfError: "发生错误，请检查图片文件。",
    jpg2pdfBtnConvert: (n) => `转换为PDF (${n}张)`,
    compressDropLabel: "拖动PDF文件或点击上传",
    compressDropSublabel: "通过删除元数据和优化对象流来减小文件大小",
    compressOptimizing: "正在优化PDF...",
    compressError: "发生错误。",
    compressOriginal: "原始大小",
    compressAfter: "压缩后",
    compressSaved: "节省",
    compressNoChange: "无变化",
    compressBtnDownload: "压缩并下载",
    reorderDropLabel: "拖动PDF文件或点击上传",
    reorderDropSublabel: "可通过缩略图重新排序或删除页面",
    reorderGenerating: "正在生成缩略图...",
    reorderGeneratingPage: (i, total) => `正在生成第 ${i}/${total} 页预览...`,
    reorderCantRead: "无法读取文件。",
    reorderCreating: "正在创建PDF...",
    reorderError: "发生错误。",
    reorderPageInfo: (total, active) => `共${total}页 · 活跃${active}页`,
    reorderHint: "点击红色X删除页面，用箭头调整顺序。再次点击已删除页面可恢复。",
    reorderPageAlt: (n) => `第 ${n} 页`,
    reorderDeleted: "已删除",
    reorderPageNum: (n) => `第${n}页`,
    reorderBtnApply: (n) => `应用更改并下载 (${n}页)`,
    extractDropLabel: "拖动PDF文件或点击上传",
    extractDropSublabel: "提取PDF中的文本以复制或保存",
    extractExtracting: "正在提取文本...",
    extractProcessing: (i, total) => `正在处理第 ${i}/${total} 页...`,
    extractPageMarker: (n) => `[第 ${n} 页]`,
    extractError: "文本提取失败。",
    extractBtnExtract: "提取文本",
    extractBtnCopied: "已复制！",
    extractBtnCopy: "复制到剪贴板",
    extractBtnDownload: "下载TXT",
    extractCharCount: (n) => `共 ${n.toLocaleString()} 个字符`,
    pageTitle: "PDF工具",
    pageSubtitle: "所有处理均在浏览器中进行，文件不会上传到服务器",
    safeTitle: "100%本地处理",
    safeDesc: "文件不会发送到服务器。所有PDF处理直接在您的设备上进行，个人信息完全受到保护。",
    faqTitle: "常见问题",
    faq1q: "如何合并PDF文件？",
    faq1a: "在\"合并PDF\"选项卡中上传多个PDF文件。拖放或点击添加，用箭头调整顺序，然后点击\"合并PDF\"即可下载合并后的文件。",
    faq2q: "可以将PDF转换为JPG吗？",
    faq2a: "可以！在\"PDF→JPG\"选项卡上传PDF并点击\"转换为JPG\"，每页将转换为JPG图片。可单独下载或打包为ZIP下载。",
    faq3q: "上传的文件会保存在服务器上吗？",
    faq3a: "不会。所有处理完全在浏览器中进行，文件不会通过互联网传输或存储在任何服务器上。",
    faq4q: "PDF压缩效果如何？",
    faq4a: "基于浏览器的压缩通过删除元数据和优化对象流来减小文件大小。已经优化过的PDF可能压缩效果不明显。",
    faq5q: "可以只提取特定页面吗？",
    faq5a: "可以！在\"提取页面\"选项卡输入页面范围，例如\"1-3, 5, 7-10\"，即可将这些页面提取为新PDF。\"编辑页面\"选项卡可以通过缩略图可视化选择要删除的页面。",
  },
  es: {
    tabMerge: "Unir PDF",
    tabSplit: "Extraer páginas",
    tabCompress: "Comprimir PDF",
    tabReorder: "Editar páginas",
    tabExtract: "Extraer texto",
    dropDefault: "Arrastra archivos aquí o haz clic para subir",
    btnUp: "Subir",
    btnDown: "Bajar",
    btnRemove: "Eliminar",
    mergeDropLabel: "Arrastra archivos PDF o haz clic para agregar",
    mergeDropSublabel: "Puedes seleccionar varios archivos a la vez",
    mergeMerging: "Uniendo PDFs...",
    mergeProcessing: (i, total) => `Procesando archivo ${i}/${total}...`,
    mergeCreating: "Creando archivo...",
    mergeError: "Ocurrió un error. Verifica los archivos.",
    mergeBtnLabel: (n) => `Unir ${n} PDFs`,
    mergeNeedMore: "Agrega al menos 2 PDFs",
    splitDropLabel: "Arrastra un PDF o haz clic para subir",
    splitCheckingPages: "Verificando páginas...",
    splitCantRead: "No se puede leer el archivo.",
    splitSplitting: "Dividiendo...",
    splitInvalidRange: "Ingresa un rango de páginas válido.",
    splitError: "Ocurrió un error.",
    splitPageInfo: (size, pages) => `${size} · ${pages} páginas en total`,
    splitRangeLabel: "Rango de páginas a extraer",
    splitRangePlaceholder: (max) => `ej. 1-3, 5, 7-${max}`,
    splitRangeHint: (total) => `Separado por comas, guión para rangos. Total ${total} páginas`,
    splitBtnDownload: "Dividir y descargar",
    pdf2jpgDropLabel: "Arrastra un PDF o haz clic para subir",
    pdf2jpgDropSublabel: "Cada página se convertirá en una imagen JPG",
    pdf2jpgConverting: (i, total) => `Convirtiendo página ${i}/${total}...`,
    pdf2jpgError: "Ocurrió un error durante la conversión.",
    pdf2jpgBtnConvert: "Convertir a JPG",
    pdf2jpgBtnDownloadAll: (n) => `Descargar todo como ZIP (${n} imágenes)`,
    pdf2jpgBtnReset: "Reiniciar",
    pdf2jpgPageAlt: (n) => `Página ${n}`,
    pdf2jpgClickDownload: "Clic para descargar",
    pdf2jpgPageLabel: (n) => `Página ${n}`,
    jpg2pdfDropLabel: "Arrastra imágenes JPG / PNG o haz clic para agregar",
    jpg2pdfDropSublabel: "Las páginas del PDF se crearán en el orden de las imágenes",
    jpg2pdfCreating: "Creando PDF...",
    jpg2pdfProcessing: (i, total) => `Procesando imagen ${i}/${total}...`,
    jpg2pdfCreatingFile: "Creando archivo...",
    jpg2pdfError: "Ocurrió un error. Verifica las imágenes.",
    jpg2pdfBtnConvert: (n) => `Convertir a PDF (${n} imágenes)`,
    compressDropLabel: "Arrastra un PDF o haz clic para subir",
    compressDropSublabel: "Reduce el tamaño eliminando metadatos y optimizando flujos de objetos",
    compressOptimizing: "Optimizando PDF...",
    compressError: "Ocurrió un error.",
    compressOriginal: "Original",
    compressAfter: "Comprimido",
    compressSaved: "Ahorrado",
    compressNoChange: "Sin cambio",
    compressBtnDownload: "Comprimir y descargar",
    reorderDropLabel: "Arrastra un PDF o haz clic para subir",
    reorderDropSublabel: "Reordena o elimina páginas usando miniaturas",
    reorderGenerating: "Generando miniaturas...",
    reorderGeneratingPage: (i, total) => `Generando vista previa de página ${i}/${total}...`,
    reorderCantRead: "No se puede leer el archivo.",
    reorderCreating: "Creando PDF...",
    reorderError: "Ocurrió un error.",
    reorderPageInfo: (total, active) => `${total} páginas · ${active} activas`,
    reorderHint: "Usa la X roja para eliminar páginas y las flechas para reordenar. Haz clic en una página eliminada para restaurarla.",
    reorderPageAlt: (n) => `Página ${n}`,
    reorderDeleted: "Eliminada",
    reorderPageNum: (n) => `#${n}`,
    reorderBtnApply: (n) => `Aplicar cambios y descargar (${n} páginas)`,
    extractDropLabel: "Arrastra un PDF o haz clic para subir",
    extractDropSublabel: "Extrae texto del PDF para copiarlo o guardarlo",
    extractExtracting: "Extrayendo texto...",
    extractProcessing: (i, total) => `Procesando página ${i}/${total}...`,
    extractPageMarker: (n) => `[Página ${n}]`,
    extractError: "Error al extraer el texto.",
    extractBtnExtract: "Extraer texto",
    extractBtnCopied: "¡Copiado!",
    extractBtnCopy: "Copiar al portapapeles",
    extractBtnDownload: "Descargar TXT",
    extractCharCount: (n) => `${n.toLocaleString()} caracteres en total`,
    pageTitle: "Herramientas PDF",
    pageSubtitle: "Todo el procesamiento ocurre en tu navegador — los archivos nunca se suben a un servidor",
    safeTitle: "100% en el navegador",
    safeDesc: "Los archivos nunca se envían a un servidor. Todo el procesamiento PDF ocurre directamente en tu dispositivo, manteniendo tus documentos completamente privados.",
    faqTitle: "Preguntas frecuentes",
    faq1q: "¿Cómo uno archivos PDF?",
    faq1a: "Ve a la pestaña 'Unir PDF' y sube tus archivos PDF. Arrástralos o haz clic para agregarlos, usa las flechas para reordenar y luego haz clic en 'Unir PDFs' para descargar el archivo combinado.",
    faq2q: "¿Puedo convertir un PDF a JPG?",
    faq2a: "¡Sí! Ve a la pestaña 'PDF → JPG', sube tu PDF y haz clic en 'Convertir a JPG'. Cada página se convierte en una imagen JPG que puedes descargar individualmente o como archivo ZIP.",
    faq3q: "¿Los archivos subidos se guardan en un servidor?",
    faq3a: "No. Todo el procesamiento ocurre completamente en tu navegador. Los archivos nunca se transmiten por internet ni se almacenan en ningún servidor.",
    faq4q: "¿Qué tan efectiva es la compresión de PDF?",
    faq4a: "La compresión basada en navegador reduce el tamaño eliminando metadatos y optimizando flujos de objetos. Los PDFs ya optimizados pueden no reducirse mucho.",
    faq5q: "¿Puedo extraer solo páginas específicas?",
    faq5a: "¡Sí! En la pestaña 'Extraer páginas', ingresa un rango como '1-3, 5, 7-10' para extraer solo esas páginas en un nuevo PDF. La pestaña 'Editar páginas' te permite seleccionar visualmente páginas para eliminar usando miniaturas.",
  },
};

const PdfTContext = createContext<PdfTranslations>(pdfTranslations.ko);

// Lazy-load pdfjs-dist only in the browser to avoid SSR DOMMatrix errors
async function getPdfJs() {
  const pdfjsLib = await import("pdfjs-dist");
  pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
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
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 60000);
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
        const lo = Math.min(start, end);
        const hi = Math.max(start, end);
        for (let i = lo; i <= hi; i++) {
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

function useTabs(): { id: Tab; label: string; emoji: string }[] {
  const t = useContext(PdfTContext);
  return [
    { id: "merge", label: t.tabMerge, emoji: "🔗" },
    { id: "split", label: t.tabSplit, emoji: "✂️" },
    { id: "pdf2jpg", label: "PDF → JPG", emoji: "🖼️" },
    { id: "jpg2pdf", label: "JPG → PDF", emoji: "📄" },
    { id: "compress", label: t.tabCompress, emoji: "🗜️" },
    { id: "reorder", label: t.tabReorder, emoji: "📑" },
    { id: "extract", label: t.tabExtract, emoji: "📝" },
  ];
}

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
  label,
  sublabel,
}: DropZoneProps) {
  const t = useContext(PdfTContext);
  const resolvedLabel = label ?? t.dropDefault;
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
      <p className="text-slate-600 dark:text-slate-300 font-medium">{resolvedLabel}</p>
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
  const t = useContext(PdfTContext);
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
              title={t.btnUp}
            >
              ▲
            </button>
          )}
          {onMoveDown && (
            <button
              onClick={() => onMoveDown(i)}
              disabled={i === files.length - 1}
              className="p-1 text-slate-400 hover:text-slate-600 disabled:opacity-30"
              title={t.btnDown}
            >
              ▼
            </button>
          )}
          {onRemove && (
            <button
              onClick={() => onRemove(i)}
              className="p-1 text-slate-400 hover:text-red-500 transition-colors"
              title={t.btnRemove}
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
  const t = useContext(PdfTContext);
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
    setStatus(t.mergeMerging);
    try {
      const merged = await PDFDocument.create();
      for (let i = 0; i < files.length; i++) {
        setStatus(t.mergeProcessing(i + 1, files.length));
        const bytes = await files[i].arrayBuffer();
        const doc = await PDFDocument.load(bytes);
        const pages = await merged.copyPages(doc, doc.getPageIndices());
        pages.forEach((page) => merged.addPage(page));
      }
      setStatus(t.mergeCreating);
      const pdfBytes = await merged.save();
      downloadBlob(new Blob([pdfBytes as BlobPart], { type: "application/pdf" }), "merged.pdf");
      setStatus("");
    } catch (e) {
      setStatus(t.mergeError);
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
        label={t.mergeDropLabel}
        sublabel={t.mergeDropSublabel}
      />
      <FileListDisplay files={files} onRemove={removeFile} onMoveUp={moveUp} onMoveDown={moveDown} />
      {processing && <StatusBadge status={status} />}
      {files.length >= 2 && !processing && (
        <button
          onClick={handleMerge}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 text-white font-semibold hover:shadow-lg hover:shadow-red-500/25 transition-all"
        >
          {t.mergeBtnLabel(files.length)}
        </button>
      )}
      {files.length < 2 && files.length > 0 && (
        <p className="text-sm text-center text-slate-400">{t.mergeNeedMore}</p>
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
          {status && <StatusBadge status={status} />}
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
    let pdf: Awaited<ReturnType<Awaited<ReturnType<typeof getPdfJs>>["getDocument"]>["promise"]> | null = null;
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfjsLib = await getPdfJs();
      pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
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
        canvas.width = 0;
        canvas.height = 0;
      }
      setImages(results);
      setStatus("");
    } catch (e) {
      setStatus("변환 중 오류가 발생했습니다.");
      console.error(e);
    } finally {
      if (pdf) pdf.destroy();
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
    let pdf: Awaited<ReturnType<Awaited<ReturnType<typeof getPdfJs>>["getDocument"]>["promise"]> | null = null;
    try {
      const arrayBuffer = await f.arrayBuffer();
      const pdfjsLib = await getPdfJs();
      pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
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
        canvas.width = 0;
        canvas.height = 0;
      }
      setThumbs(results);
      setOrder(results.map((_, i) => i));
      setStatus("");
    } catch (e) {
      setStatus("파일을 읽을 수 없습니다.");
      console.error(e);
    } finally {
      if (pdf) pdf.destroy();
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
    let pdf: Awaited<ReturnType<Awaited<ReturnType<typeof getPdfJs>>["getDocument"]>["promise"]> | null = null;
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfjsLib = await getPdfJs();
      pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
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
      if (pdf) pdf.destroy();
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
  const tabs = useTabs();

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
            {tabs.map((tab) => (
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
                {tabs.find((t) => t.id === activeTab)?.emoji}{" "}
                {tabs.find((t) => t.id === activeTab)?.label}
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
