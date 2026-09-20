"use client";

import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import {
  Building2,
  Clock,
  ExternalLink,
  GraduationCap,
  MapPin,
  PhoneCall,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { pick, type Bilingual } from "@/lib/i18n";
import { CONTACT } from "@/lib/constants";
import { useTilt3D } from "@/lib/useTilt3D";
import { useIsMobile } from "@/lib/useIsMobile";
import type { ClinicSettings } from "@/lib/supabase/types";

const AFFILIATIONS: { icon: LucideIcon; text: Bilingual }[] = [
  { icon: Building2, text: { ar: "جامعة القاهرة", en: "Cairo University" } },
  { icon: GraduationCap, text: { ar: "المعهد القومي للأورام", en: "National Cancer Institute" } },
];

export interface ClinicInfoMapProps {
  settings: ClinicSettings | null;
}

const rowContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const rowItem: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

function InfoRow({
  icon: Icon,
  label,
  children,
  pulse = false,
}: {
  icon: LucideIcon;
  label: Bilingual;
  children: ReactNode;
  pulse?: boolean;
}) {
  const { lang } = useLanguage();
  return (
    <motion.div variants={rowItem} className="flex items-start gap-4 py-4 first:pt-0 last:pb-0">
      <span className="icon-chip relative !h-11 !w-11 shrink-0">
        {pulse && (
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-2xl bg-brand-400"
            animate={{ scale: [1, 1.45, 1], opacity: [0.55, 0, 0.55] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        <Icon className="relative h-5 w-5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-bold uppercase tracking-wide text-ink/45">{pick(lang, label)}</p>
        <div className="mt-1 text-sm font-semibold leading-relaxed text-ink">{children}</div>
      </div>
    </motion.div>
  );
}

export default function ClinicInfoMap({ settings }: ClinicInfoMapProps) {
  const { lang, dir } = useLanguage();
  const { ref: tiltRef, rotateX, rotateY, onMouseMove, onMouseLeave } = useTilt3D();
  const isMobile = useIsMobile();
  // This column renders second, on the reading "end" side (left in RTL,
  // right in LTR) — it slides in from that edge, mirroring BookingForm's
  // start-side entrance so the two converge toward the center. Below `lg`
  // the columns stack into one, so rise from below instead of sideways.
  const cardEnter = isMobile ? { opacity: 0, y: 36 } : { opacity: 0, x: dir === "rtl" ? -88 : 88, y: 24 };
  const cardSettled = isMobile ? { opacity: 1, y: 0 } : { opacity: 1, x: 0, y: 0 };

  const addressAr = settings?.address_ar || CONTACT.address.ar;
  const addressEn = settings?.address_en || CONTACT.address.en;
  const phoneDisplay = settings?.emergency_line || settings?.phone_primary || CONTACT.phoneDisplay;
  const phoneHref = phoneDisplay === CONTACT.phoneDisplay ? CONTACT.phoneHref : `tel:${phoneDisplay.replace(/[^\d+]/g, "")}`;

  // Admin-editable "Days: Hours" lines (one per line); falls back to the
  // site's original two-row schedule when nothing has been set yet.
  const workingHoursRows = (lang === "ar" ? settings?.working_hours_ar : settings?.working_hours_en)
    ?.split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [days, ...rest] = line.split(":");
      return { days: days?.trim() ?? line, hours: rest.join(":").trim() };
    }) ?? [
    { days: pick(lang, { ar: "السبت – الخميس", en: "Saturday – Thursday" }), hours: pick(lang, { ar: "5 م – 9 م", en: "5 PM – 9 PM" }) },
    { days: pick(lang, { ar: "الجمعة", en: "Friday" }), hours: pick(lang, { ar: "مغلق", en: "Closed" }) },
  ];

  const mapQuery = encodeURIComponent(addressEn);
  const mapEmbedSrc = settings?.map_embed_url || `https://www.google.com/maps?q=${mapQuery}&output=embed`;
  const mapExternalHref = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

  return (
    <motion.div
      // Framer Motion only reads `initial` at mount, so `isMobile` flipping
      // from its false default to its real value shortly after mount
      // wouldn't retroactively reposition this element — keying on it forces
      // a fresh mount with the correct offset.
      key={isMobile ? "clinic-mobile" : "clinic-desktop"}
      initial={cardEnter}
      whileInView={cardSettled}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-6"
    >
      {/* Unified glass card — affiliations, address, working hours & hotline
          in one place. Starts flush with the top of the column, same as the
          booking form's card on the other side, so the two stay aligned. */}
      <motion.div
        ref={tiltRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{ rotateX, rotateY, transformPerspective: 1000 }}
        variants={rowContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="glass-card relative overflow-hidden p-6 sm:p-7"
      >
        <div className="pointer-events-none absolute -bottom-16 -end-14 h-56 w-56 animate-float-slow rounded-full bg-brand/10 blur-3xl" />
        <div className="pointer-events-none absolute -top-16 -start-14 h-48 w-48 animate-float rounded-full bg-deep/10 blur-3xl" />

        <motion.div variants={rowItem} className="relative flex flex-wrap gap-2">
          {AFFILIATIONS.map(({ icon: Icon, text }) => (
            <span
              key={text.en}
              className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/10 px-3.5 py-1.5 text-xs font-bold text-brand-700"
            >
              <Icon className="h-3.5 w-3.5" />
              {pick(lang, text)}
            </span>
          ))}
        </motion.div>

        <div className="relative mt-2 divide-y divide-brand/10">
          <InfoRow icon={MapPin} label={{ ar: "العنوان", en: "Address" }}>
            {pick(lang, { ar: addressAr, en: addressEn })}
          </InfoRow>

          <InfoRow icon={Clock} label={{ ar: "مواعيد العمل", en: "Working Hours" }}>
            <ul className="space-y-1">
              {workingHoursRows.map((row) => (
                <li key={row.days} className="flex items-center justify-between gap-3 text-xs text-ink/70">
                  <span className="font-bold text-ink">{row.days}</span>
                  <span className="font-english">{row.hours}</span>
                </li>
              ))}
            </ul>
          </InfoRow>

          <InfoRow icon={PhoneCall} label={{ ar: "خط الطوارئ والحجز", en: "Emergency & Booking Hotline" }} pulse>
            <a
              href={phoneHref}
              dir="ltr"
              className="font-english text-brand-700 transition hover:text-brand-500"
            >
              {phoneDisplay}
            </a>
          </InfoRow>
        </div>
      </motion.div>

      {/* Interactive map */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="glass-card relative overflow-hidden !rounded-4xl"
      >
        <motion.span
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute start-5 top-5 z-10 flex items-center gap-1.5 rounded-full border border-white/50 bg-white/85 px-3 py-1.5 text-xs font-bold text-brand-700 shadow-glass backdrop-blur-md"
        >
          <MapPin className="h-3.5 w-3.5 fill-brand-500 text-brand-600" />
          {pick(lang, { ar: "معهد الأورام القومي", en: "National Cancer Institute" })}
        </motion.span>

        <iframe
          src={mapEmbedSrc}
          title={pick(lang, { ar: "خريطة موقع العيادة", en: "Clinic location map" })}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-48 w-full border-0 sm:h-56"
        />

        <a
          href={mapExternalHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 border-t border-brand/10 bg-white/70 px-5 py-3 text-sm font-bold text-brand-700 backdrop-blur-md transition-colors duration-300 hover:bg-white/90"
        >
          <ExternalLink className="h-4 w-4" />
          {pick(lang, { ar: "افتح في خرائط جوجل", en: "Open in Google Maps" })}
        </a>
      </motion.div>
    </motion.div>
  );
}
