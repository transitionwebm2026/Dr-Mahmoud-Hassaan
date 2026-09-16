"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CalendarCheck,
  ChevronDown,
  Music2,
  Phone,
  PlayCircle,
  Stethoscope,
  UserRound,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { pick, type Bilingual } from "@/lib/i18n";
import { CONTACT, DOCTOR, SOCIAL_LINKS } from "@/lib/constants";
import ImagePlaceholder from "./ui/ImagePlaceholder";
import { FacebookIcon, InstagramIcon } from "./ui/SocialIcons";

// Hero is a client component, but pages that customize its CTAs (like
// /services) are server components exporting `metadata` — a React Server
// Component can't pass a function (a Lucide icon component) as a prop to a
// Client Component, since props crossing that boundary must be
// serializable. So callers pass a string key here instead, and this map
// (defined inside the client component) resolves it to the real icon.
const CTA_ICONS = {
  calendar: CalendarCheck,
  video: PlayCircle,
  phone: Phone,
  services: Stethoscope,
} as const;

type CtaIconKey = keyof typeof CTA_ICONS;

interface HeroCta {
  label: Bilingual;
  href: string;
  icon?: CtaIconKey;
}

interface HeroProps {
  title?: Bilingual;
  subtitle?: Bilingual;
  description?: Bilingual;
  /**
   * Page-specific doctor photo. Drop a real image at this path (e.g.
   * /public/images/hero-doctor.jpg) and it renders automatically — no code
   * change needed. Until the file exists, the branded gradient placeholder
   * is shown instead.
   */
  photoSrc?: string;
  /** Overrides the default "Book Your Visit" primary button. */
  primaryCta?: HeroCta;
  /** Overrides the default "Watch Intro Video" secondary button. */
  secondaryCta?: HeroCta;
}

const DEFAULT_PHOTO_SRC = "/images/hero-doctor.jpg";

const DEFAULT_PRIMARY_CTA: HeroCta = {
  label: { ar: "احجز كشفك الآن", en: "Book Your Visit" },
  href: "/contact",
  icon: "calendar",
};

const DEFAULT_SECONDARY_CTA: HeroCta = {
  label: { ar: "شاهد الفيديو التعريفي", en: "Watch Intro Video" },
  href: "#doctor-intro",
  icon: "video",
};

const socials = [
  { icon: InstagramIcon, href: SOCIAL_LINKS.instagram, label: "Instagram" },
  { icon: FacebookIcon, href: SOCIAL_LINKS.facebook, label: "Facebook" },
  { icon: Music2, href: SOCIAL_LINKS.tiktok, label: "TikTok" },
];

/** Internal routes/hashes use next/link for client-side transitions; tel:, mailto:, and anchors use a plain anchor. */
function isClientRoute(href: string) {
  return href.startsWith("/");
}

export default function Hero({
  title,
  subtitle,
  description,
  photoSrc = DEFAULT_PHOTO_SRC,
  primaryCta = DEFAULT_PRIMARY_CTA,
  secondaryCta = DEFAULT_SECONDARY_CTA,
}: HeroProps) {
  const { lang } = useLanguage();
  const [photoFailed, setPhotoFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // The <img> is server-rendered, so the browser can start (and on a fast
    // local 404, finish) fetching it before hydration attaches onError —
    // error events don't bubble, so a failure in that window is otherwise
    // missed entirely. Catch it here as a one-time supplement to onError.
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) {
      setPhotoFailed(true);
    }
  }, []);

  return (
    <section className="relative flex min-h-screen w-full items-center overflow-hidden">
      {/* Page-specific doctor image background — full section height & width, doctor centered */}
      <div className="absolute inset-0 -z-20 bg-deep-900">
        {photoFailed ? (
          <ImagePlaceholder
            icon={UserRound}
            variant="deep"
            size="lg"
            label={pick(lang, { ar: "صورة الدكتور محمود حسان", en: "Dr. Mahmoud Hassan portrait" })}
            className="h-full w-full !rounded-none"
          />
        ) : (
          // Plain <img> (not next/image) so a missing file fails gracefully
          // onto the placeholder above instead of throwing a build/runtime error.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            ref={imgRef}
            src={photoSrc}
            alt={pick(lang, { ar: "صورة الدكتور محمود حسان", en: "Dr. Mahmoud Hassan portrait" })}
            onError={() => setPhotoFailed(true)}
            className="h-full w-full object-cover object-top"
          />
        )}
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-deep-950/65 via-deep-900/20 to-transparent" />
      <div className="hero-photo-fade absolute inset-0 -z-10" />
      <div className="absolute inset-0 -z-10 bg-mesh-medical opacity-25" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col justify-center px-4 pb-24 pt-32 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl text-center sm:text-start"
        >
          <h1 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
            {pick(lang, title ?? DOCTOR.name)}
          </h1>

          <p className="mt-3 text-base font-bold text-brand-100 sm:text-lg">
            {pick(lang, subtitle ?? DOCTOR.shortTitle)}
          </p>

          <p className="mt-4 text-sm leading-relaxed text-white/75 sm:text-base">
            {pick(lang, description ?? DOCTOR.title)}
          </p>

          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
            {(() => {
              const PrimaryIcon = CTA_ICONS[primaryCta.icon ?? "calendar"];
              return isClientRoute(primaryCta.href) ? (
                <Link href={primaryCta.href} className="btn-primary w-full sm:w-auto">
                  <PrimaryIcon className="h-4 w-4" />
                  {pick(lang, primaryCta.label)}
                </Link>
              ) : (
                <a href={primaryCta.href} className="btn-primary w-full sm:w-auto">
                  <PrimaryIcon className="h-4 w-4" />
                  {pick(lang, primaryCta.label)}
                </a>
              );
            })()}
            {(() => {
              const SecondaryIcon = CTA_ICONS[secondaryCta.icon ?? "video"];
              return isClientRoute(secondaryCta.href) ? (
                <Link href={secondaryCta.href} className="glass-button w-full sm:w-auto">
                  <SecondaryIcon className="h-4 w-4" />
                  {pick(lang, secondaryCta.label)}
                </Link>
              ) : (
                <a href={secondaryCta.href} className="glass-button w-full sm:w-auto">
                  <SecondaryIcon className="h-4 w-4" />
                  {pick(lang, secondaryCta.label)}
                </a>
              );
            })()}
          </div>
        </motion.div>
      </div>

      {/* Floating glassmorphic contact panel — aligned with the CTA buttons row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="glass-panel absolute top-[calc(50%+108px)] end-6 z-30 hidden -translate-y-1/2 flex-col gap-3 p-4 sm:flex"
      >
        <a
          href={CONTACT.phoneHref}
          dir="ltr"
          className="flex items-center gap-3 rounded-2xl px-1 py-1 text-sm font-bold text-white transition hover:bg-white/10"
        >
          <span className="icon-chip !h-9 !w-9">
            <Phone className="h-4 w-4" />
          </span>
          {CONTACT.phoneDisplay}
        </a>
        <div className="flex items-center justify-center gap-2 border-t border-white/20 pt-3">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/25"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-white/70 sm:block"
      >
        <ChevronDown className="h-6 w-6" />
      </motion.div>
    </section>
  );
}
