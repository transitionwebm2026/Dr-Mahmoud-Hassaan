"use client";

import { motion } from "framer-motion";
import { CalendarCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { pick } from "@/lib/i18n";
import type { ClinicSettings } from "@/lib/supabase/types";
import BookingForm from "./BookingForm";
import ClinicInfoMap from "./ClinicInfoMap";

export interface ContactFormMapSectionProps {
  clinicSettings: ClinicSettings | null;
}

export default function ContactFormMapSection({ clinicSettings }: ContactFormMapSectionProps) {
  const { lang } = useLanguage();

  return (
    <section id="booking-form" className="relative px-4 py-20 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-mesh-medical opacity-20" />

      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="section-eyebrow">
            <CalendarCheck className="h-4 w-4" />
            {pick(lang, { ar: "الحجز والتواصل", en: "Booking & Contact" })}
          </span>
          <h2 className="mt-5 text-2xl font-extrabold text-ink sm:text-3xl lg:text-4xl">
            {pick(lang, { ar: "احجز استشارتك أو تواصل معنا مباشرة", en: "Book Your Consultation or Reach Us Directly" })}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink/60 sm:text-base">
            {pick(lang, {
              ar: "املأ الفورم لحجز استشارتك عبر واتساب، أو تعرف على موقع العيادة ومواعيد العمل وخط الطوارئ.",
              en: "Fill in the form to book your consultation via WhatsApp, or find the clinic's location, hours, and emergency hotline.",
            })}
          </p>
        </motion.div>

        {/* items-start (not the grid default of stretch): the form and the
            info+map column are naturally different heights, and stretching
            the shorter one just left dead space inside its own card. */}
        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start lg:gap-12">
          {/* Source order follows reading direction: in RTL (Arabic, default)
              the form renders on the right and clinic info/map on the left;
              switching the language toggle to English (LTR) mirrors both
              automatically, moving the form to the left. */}
          <BookingForm />
          <ClinicInfoMap settings={clinicSettings} />
        </div>
      </div>
    </section>
  );
}
