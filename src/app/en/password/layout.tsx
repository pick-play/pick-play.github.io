import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Password Generator - Strong Random Passwords",
  description:
    "Generate strong and secure random passwords instantly. Customize length, uppercase, lowercase, numbers and special characters to create the perfect password.",
  keywords: [
    "password generator",
    "random password",
    "strong password",
    "secure password",
    "password maker",
    "password creator",
  ],
  openGraph: {
    title: "Password Generator - Strong Random Passwords",
    description:
      "Generate strong and secure random passwords instantly.",
    url: "https://pick-play.github.io/en/password/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PickPlay" }],
  },
  alternates: {
    canonical: "https://pick-play.github.io/en/password/",
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
      name: "Password Generator",
      description:
        "Generate strong and secure random passwords. Customize length, character types and copy instantly.",
      url: "https://pick-play.github.io/en/password/",
      applicationCategory: "UtilityApplication",
      operatingSystem: "Web",
      inLanguage: "en",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://pick-play.github.io/en/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Password Generator",
          item: "https://pick-play.github.io/en/password/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What makes a strong password?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A strong password combines uppercase, lowercase, numbers and special characters with a length of at least 16 characters. PickPlay's generator applies these rules automatically.",
          },
        },
        {
          "@type": "Question",
          name: "Are generated passwords stored on a server?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No — all password generation happens locally in your browser. Nothing is sent to any server, so your passwords are completely private.",
          },
        },
        {
          "@type": "Question",
          name: "Why are special characters important?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Special characters exponentially increase the number of possible combinations, making brute-force attacks significantly harder.",
          },
        },
      ],
    },
  ],
};

export default function PasswordEnLayout({
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
