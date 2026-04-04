"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import AdBanner from "@/components/AdBanner";
import { useLocale } from "@/hooks/useLocale";
import type { Locale } from "@/i18n/config";

const translations: Record<Locale, {
  title: string;
  subtitle: string;
  inputLabel: string;
  inputPlaceholder: string;
  generate: string;
  sizeLabel: string;
  fgColor: string;
  bgColor: string;
  download: string;
  copyUrl: string;
  copied: string;
  errorEmpty: string;
  faqTitle: string;
  faq: { q: string; a: string }[];
}> = {
  ko: {
    title: "QR 코드 생성기",
    subtitle: "URL이나 텍스트를 QR 코드로 즉시 변환하세요",
    inputLabel: "텍스트 또는 URL",
    inputPlaceholder: "https://example.com 또는 원하는 텍스트를 입력하세요",
    generate: "QR 코드 생성",
    sizeLabel: "크기",
    fgColor: "전경색",
    bgColor: "배경색",
    download: "다운로드",
    copyUrl: "URL 복사",
    copied: "복사 완료!",
    errorEmpty: "텍스트 또는 URL을 입력해주세요",
    faqTitle: "자주 묻는 질문",
    faq: [
      {
        q: "QR 코드란 무엇인가요?",
        a: "QR 코드(Quick Response Code)는 스마트폰 카메라로 스캔하면 URL, 텍스트, 연락처 등 다양한 정보를 빠르게 읽을 수 있는 2차원 바코드입니다.",
      },
      {
        q: "생성된 QR 코드는 어떻게 사용하나요?",
        a: "다운로드 버튼을 눌러 이미지를 저장한 후 명함, 포스터, 웹사이트 등에 자유롭게 활용하세요. 스마트폰 카메라로 스캔하면 바로 연결됩니다.",
      },
      {
        q: "QR 코드에 포함할 수 있는 내용은 무엇인가요?",
        a: "웹사이트 URL, 일반 텍스트, 이메일 주소, 전화번호 등 다양한 정보를 담을 수 있습니다. 텍스트가 짧을수록 QR 코드가 더 단순하고 스캔이 쉬워집니다.",
      },
    ],
  },
  en: {
    title: "QR Code Generator",
    subtitle: "Convert any URL or text into a QR code instantly",
    inputLabel: "Text or URL",
    inputPlaceholder: "https://example.com or enter any text",
    generate: "Generate QR Code",
    sizeLabel: "Size",
    fgColor: "Foreground",
    bgColor: "Background",
    download: "Download",
    copyUrl: "Copy URL",
    copied: "Copied!",
    errorEmpty: "Please enter a URL or text",
    faqTitle: "FAQ",
    faq: [
      {
        q: "What is a QR code?",
        a: "A QR code (Quick Response Code) is a two-dimensional barcode that smartphones can scan to instantly access URLs, text, contacts, and more.",
      },
      {
        q: "How do I use the generated QR code?",
        a: "Click the download button to save the image, then use it freely on business cards, posters, or websites. Scanning it with a smartphone camera links directly to the content.",
      },
      {
        q: "What content can I put in a QR code?",
        a: "You can encode website URLs, plain text, email addresses, phone numbers, and more. Shorter text produces a simpler QR code that is easier to scan.",
      },
    ],
  },
  ja: {
    title: "QRコード生成ツール",
    subtitle: "URLやテキストを今すぐQRコードに変換",
    inputLabel: "テキストまたはURL",
    inputPlaceholder: "https://example.com またはテキストを入力",
    generate: "QRコードを生成",
    sizeLabel: "サイズ",
    fgColor: "前景色",
    bgColor: "背景色",
    download: "ダウンロード",
    copyUrl: "URLをコピー",
    copied: "コピーしました！",
    errorEmpty: "テキストまたはURLを入力してください",
    faqTitle: "よくある質問",
    faq: [
      {
        q: "QRコードとは何ですか？",
        a: "QRコード（Quick Response Code）はスマートフォンのカメラでスキャンすることで、URLやテキスト、連絡先などの情報を素早く読み取れる2次元バーコードです。",
      },
      {
        q: "生成したQRコードはどう使えますか？",
        a: "ダウンロードボタンで画像を保存し、名刺やポスター、ウェブサイトなどに自由に活用できます。スマートフォンでスキャンするとすぐにリンク先へ移動します。",
      },
      {
        q: "QRコードにどんな情報を入れられますか？",
        a: "ウェブサイトのURL、テキスト、メールアドレス、電話番号など様々な情報を含められます。テキストが短いほどQRコードがシンプルになりスキャンしやすくなります。",
      },
    ],
  },
  zh: {
    title: "QR码生成器",
    subtitle: "将任意网址或文本即时转换为QR码",
    inputLabel: "文本或网址",
    inputPlaceholder: "https://example.com 或输入任意文本",
    generate: "生成QR码",
    sizeLabel: "尺寸",
    fgColor: "前景色",
    bgColor: "背景色",
    download: "下载",
    copyUrl: "复制网址",
    copied: "已复制！",
    errorEmpty: "请输入网址或文本",
    faqTitle: "常见问题",
    faq: [
      {
        q: "什么是QR码？",
        a: "QR码（快速响应码）是一种二维条形码，智能手机摄像头扫描后可快速获取网址、文字、联系方式等各种信息。",
      },
      {
        q: "如何使用生成的QR码？",
        a: "点击下载按钮保存图片，然后可自由用于名片、海报或网站等。用智能手机摄像头扫描即可直接访问对应内容。",
      },
      {
        q: "QR码中可以包含哪些内容？",
        a: "可以编码网站网址、纯文本、电子邮件地址、电话号码等多种信息。文本越短，QR码越简单，越容易扫描。",
      },
    ],
  },
  es: {
    title: "Generador de Código QR",
    subtitle: "Convierte cualquier URL o texto en un código QR al instante",
    inputLabel: "Texto o URL",
    inputPlaceholder: "https://example.com o ingresa cualquier texto",
    generate: "Generar código QR",
    sizeLabel: "Tamaño",
    fgColor: "Color frontal",
    bgColor: "Color de fondo",
    download: "Descargar",
    copyUrl: "Copiar URL",
    copied: "¡Copiado!",
    errorEmpty: "Por favor ingresa una URL o texto",
    faqTitle: "Preguntas frecuentes",
    faq: [
      {
        q: "¿Qué es un código QR?",
        a: "Un código QR (Quick Response Code) es un código de barras bidimensional que los smartphones pueden escanear para acceder instantáneamente a URLs, texto, contactos y más.",
      },
      {
        q: "¿Cómo uso el código QR generado?",
        a: "Haz clic en el botón de descarga para guardar la imagen y úsala libremente en tarjetas de visita, carteles o sitios web. Al escanearlo con un smartphone te lleva directamente al contenido.",
      },
      {
        q: "¿Qué contenido puedo poner en un código QR?",
        a: "Puedes codificar URLs de sitios web, texto plano, direcciones de correo electrónico, números de teléfono y más. El texto más corto genera un código QR más simple y fácil de escanear.",
      },
    ],
  },
};

const SIZE_OPTIONS = [128, 256, 512] as const;
type QRSize = (typeof SIZE_OPTIONS)[number];

function buildQRUrl(
  text: string,
  size: QRSize,
  fgColor: string,
  bgColor: string
): string {
  const encoded = encodeURIComponent(text);
  const fg = fgColor.replace("#", "");
  const bg = bgColor.replace("#", "");
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encoded}&color=${fg}&bgcolor=${bg}&margin=10`;
}

export default function QrCodePage() {
  const locale = useLocale() as Locale;
  const t = translations[locale] ?? translations.ko;

  const [inputText, setInputText] = useState("");
  const [qrText, setQrText] = useState("");
  const [size, setSize] = useState<QRSize>(256);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const handleGenerate = useCallback(() => {
    if (!inputText.trim()) {
      setError(t.errorEmpty);
      return;
    }
    setError("");
    setQrText(inputText.trim());
  }, [inputText, t.errorEmpty]);

  const qrUrl = qrText ? buildQRUrl(qrText, size, fgColor, bgColor) : "";

  const handleDownload = useCallback(() => {
    if (!qrUrl) return;
    const link = document.createElement("a");
    link.href = qrUrl;
    link.download = "qr-code.png";
    link.rel = "noopener noreferrer";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [qrUrl]);

  const handleCopyUrl = useCallback(() => {
    if (!qrUrl) return;
    navigator.clipboard.writeText(qrUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [qrUrl]);

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50/30 to-purple-50/20 dark:from-slate-950 dark:via-violet-950/20 dark:to-purple-950/10">
        <div className="max-w-lg mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 text-white text-2xl mb-4 shadow-lg">
              ▦
            </div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
              {t.title}
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {t.subtitle}
            </p>
          </motion.div>

          {/* Input card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 mb-4"
          >
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              {t.inputLabel}
            </label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={t.inputPlaceholder}
              rows={3}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 px-3 py-2.5 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-400 resize-none"
            />
            {error && (
              <p className="mt-1.5 text-xs text-red-500">{error}</p>
            )}

            {/* Size selector */}
            <div className="mt-4">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                {t.sizeLabel}
              </p>
              <div className="flex gap-2">
                {SIZE_OPTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all border ${
                      size === s
                        ? "bg-violet-50 dark:bg-violet-900/30 border-violet-300 dark:border-violet-700 text-violet-700 dark:text-violet-300"
                        : "bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    {s}px
                  </button>
                ))}
              </div>
            </div>

            {/* Color pickers */}
            <div className="mt-4 flex gap-4">
              <div className="flex-1">
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
                  {t.fgColor}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-600 cursor-pointer p-0.5 bg-white dark:bg-slate-700"
                  />
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                    {fgColor.toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
                  {t.bgColor}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-600 cursor-pointer p-0.5 bg-white dark:bg-slate-700"
                  />
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                    {bgColor.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Generate button */}
          <motion.button
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            onClick={handleGenerate}
            whileTap={{ scale: 0.97 }}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-violet-500 to-purple-500 text-white font-bold text-base shadow-md hover:shadow-lg transition-shadow mb-4"
          >
            {t.generate}
          </motion.button>

          <AdBanner format="horizontal" />

          {/* QR Code output */}
          {qrUrl && (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 mb-4"
            >
              <div className="flex justify-center mb-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={qrUrl}
                  alt="QR Code"
                  width={size}
                  height={size}
                  className="rounded-xl border border-slate-100 dark:border-slate-700"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </div>
              <div className="flex gap-2">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleDownload}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-purple-500 text-white font-semibold text-sm shadow-sm hover:shadow-md transition-shadow"
                >
                  {t.download}
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleCopyUrl}
                  className={`flex-1 py-2.5 rounded-xl font-semibold text-sm border transition-all ${
                    copied
                      ? "bg-violet-500 text-white border-violet-500"
                      : "bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:bg-violet-50 dark:hover:bg-violet-900/30 hover:text-violet-600 hover:border-violet-300"
                  }`}
                >
                  {copied ? t.copied : t.copyUrl}
                </motion.button>
              </div>
            </motion.div>
          )}

          <AdBanner format="in-article" />

          {/* FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 mb-4"
          >
            <h2 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-4">
              {t.faqTitle}
            </h2>
            <div className="space-y-4">
              {t.faq.map((item, i) => (
                <div key={i}>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {item.q}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <AdBanner format="rectangle" />
        </div>
      </div>
    </PageTransition>
  );
}
