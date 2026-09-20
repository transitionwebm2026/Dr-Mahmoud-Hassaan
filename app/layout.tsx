import type { Metadata } from "next";
import { Cairo, Montserrat } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { DOCTOR, CONTACT, SOCIAL_LINKS } from "@/lib/constants";
import { getSiteUrl } from "@/lib/site-url";

const siteUrl = getSiteUrl();

// Cairo stands in for the licensed "FF Shamel Family" until the real font
// files are supplied (see the @font-face note in app/globals.css).
const arabicFont = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-arabic",
  display: "swap",
});

const englishFont = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-english",
  display: "swap",
});

const siteDescription =
  `${DOCTOR.shortTitle.ar} بالمعهد القومي للأورام - جامعة القاهرة، بخبرة تمتد لأكثر من 15 عامًا في جراحة أورام الثدي والجهاز الهضمي والرأس والرقبة. | ` +
  `${DOCTOR.shortTitle.en} at the National Cancer Institute, Cairo University, with 15+ years of experience in breast, GI, and head & neck oncology surgery.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: `%s | ${DOCTOR.name.ar} — ${DOCTOR.name.en}`,
    default: `${DOCTOR.name.ar} | ${DOCTOR.shortTitle.ar} — ${DOCTOR.name.en} | ${DOCTOR.shortTitle.en}`,
  },
  description: siteDescription,
  keywords: [
    "جراحة الأورام",
    "استشاري جراحة أورام",
    "دكتور محمود حسان",
    "المعهد القومي للأورام",
    "جراحة أورام الثدي",
    "جراحة أورام القولون",
    "surgical oncology",
    "Dr. Mahmoud Hassan",
    "cancer surgeon Cairo",
    "breast cancer surgery Egypt",
    "oncosurgery",
  ],
  authors: [{ name: DOCTOR.name.en }],
  applicationName: `${DOCTOR.name.ar} — ${DOCTOR.name.en}`,
  alternates: {
    canonical: "/",
  },
  // No `title`/`description` here on purpose: leaving them unset lets each
  // page's own resolved `title`/`description` (set in that page.tsx) flow
  // through as og:title/og:description automatically. Setting them here
  // would instead apply this exact root text to every page's social-share
  // preview, since a fully-defined `openGraph`/`twitter` object is inherited
  // wholesale by any child route that doesn't declare its own.
  openGraph: {
    type: "website",
    locale: "ar_EG",
    alternateLocale: "en_US",
    url: "/",
    siteName: `${DOCTOR.name.ar} — ${DOCTOR.name.en}`,
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

// Sitewide structured data — describes the practice once for every page, so
// search engines can attribute the whole site to a real Physician/medical
// business (name, specialty, contact, social profiles) regardless of which
// page a crawler lands on first.
const physicianJsonLd = {
  "@context": "https://schema.org",
  "@type": "Physician",
  name: DOCTOR.name.en,
  alternateName: DOCTOR.name.ar,
  description: DOCTOR.title.en,
  url: siteUrl,
  image: `${siteUrl}/images/logo-icon.png`,
  telephone: CONTACT.phoneHref.replace("tel:", ""),
  email: CONTACT.email,
  medicalSpecialty: "https://schema.org/Oncologic",
  address: {
    "@type": "PostalAddress",
    streetAddress: CONTACT.address.en,
    addressCountry: "EG",
  },
  sameAs: [SOCIAL_LINKS.facebook, SOCIAL_LINKS.instagram, SOCIAL_LINKS.tiktok],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ar"
      dir="rtl"
      data-scroll-behavior="smooth"
      className={`${arabicFont.variable} ${englishFont.variable}`}
    >
      <body className="min-h-screen overflow-x-hidden bg-mist text-ink antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(physicianJsonLd) }} />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
