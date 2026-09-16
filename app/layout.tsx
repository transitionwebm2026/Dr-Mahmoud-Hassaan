import type { Metadata } from "next";
import { Cairo, Montserrat } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingContactButtons from "@/components/FloatingContactButtons";
import { DOCTOR, SITE_URL } from "@/lib/constants";

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
  metadataBase: new URL(SITE_URL),
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ar"
      dir="rtl"
      data-scroll-behavior="smooth"
      className={`${arabicFont.variable} ${englishFont.variable}`}
    >
      <body className="min-h-screen overflow-x-hidden bg-mist text-ink antialiased">
        <LanguageProvider>
          <div className="relative flex min-h-screen flex-col">
            <div className="pointer-events-none fixed inset-0 -z-10 bg-radial-glow" />
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <FloatingContactButtons />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
