import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "密码生成器 - 安全随机密码",
  description:
    "立即生成强大且安全的随机密码。自定义长度、大小写字母、数字和特殊字符，创建您想要的密码。",
  keywords: [
    "密码生成器",
    "随机密码",
    "强密码",
    "安全密码",
    "密码创建",
    "生成密码",
  ],
  openGraph: {
    title: "密码生成器 - 安全随机密码",
    description: "立即生成强大且安全的随机密码。",
    url: "https://pick-play.github.io/cn/password/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/cn/password/",
    languages: {
      "x-default": "https://pick-play.github.io/password/",
      ko: "https://pick-play.github.io/password/",
      en: "https://pick-play.github.io/en/password/",
      ja: "https://pick-play.github.io/jp/password/",
      "zh-CN": "https://pick-play.github.io/cn/password/",
      es: "https://pick-play.github.io/es/password/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "密码生成器",
      description:
        "生成强大且安全的随机密码。自定义长度和字符类型，一键复制。",
      url: "https://pick-play.github.io/cn/password/",
      applicationCategory: "UtilityApplication",
      operatingSystem: "Web",
      inLanguage: "zh-CN",
      offers: { "@type": "Offer", price: "0", priceCurrency: "CNY" },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "首页",
          item: "https://pick-play.github.io/cn/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "密码生成器",
          item: "https://pick-play.github.io/cn/password/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "什么样的密码是安全的？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "建议将大写字母、小写字母、数字和特殊字符组合使用，长度至少16位。PickPlay密码生成器会自动应用这些规则。",
          },
        },
        {
          "@type": "Question",
          name: "生成的密码会存储在服务器上吗？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "不会，所有密码生成均在您的浏览器本地完成，不会发送到任何服务器，完全保护您的隐私。",
          },
        },
        {
          "@type": "Question",
          name: "为什么包含特殊字符的密码更安全？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "加入特殊字符会使可能的组合数量呈指数级增长，使暴力破解攻击极为困难。",
          },
        },
      ],
    },
  ],
};

export default function PasswordCnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
