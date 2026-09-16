"use client";

import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { pick, type Bilingual } from "@/lib/i18n";
import { CONTACT } from "@/lib/constants";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";

interface FooterCTAProps {
  title?: Bilingual;
  subtitle?: Bilingual;
}

const defaultTitle: Bilingual = {
  ar: "مستعد لبدء رحلة علاجك؟",
  en: "Ready to start your treatment journey?",
};

const defaultSubtitle: Bilingual = {
  ar: "تواصل مع عيادة د. محمود حسان اليوم لحجز استشارتك والحصول على خطة علاجية مخصصة لحالتك.",
  en: "Reach out to Dr. Mahmoud Hassan's clinic today to book your consultation and get a treatment plan tailored to your case.",
};

export default function FooterCTA({ title, subtitle }: FooterCTAProps) {
  const { lang } = useLanguage();

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-6xl overflow-hidden rounded-4xl bg-brand-gradient p-10 text-center shadow-glass-lg sm:p-16"
      >
        <div className="pointer-events-none absolute -top-20 start-1/4 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 end-1/4 h-72 w-72 rounded-full bg-deep-900/20 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 animate-float-slow bg-mesh-medical opacity-30" />

        <div className="relative">
          <h2 className="mx-auto max-w-2xl text-2xl font-extrabold text-white sm:text-4xl">
            {pick(lang, title ?? defaultTitle)}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-white/80 sm:text-base">
            {pick(lang, subtitle ?? defaultSubtitle)}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={CONTACT.phoneHref}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/40 bg-white/15 px-8 py-3.5 font-bold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/25 sm:w-auto"
            >
              <Phone className="h-4 w-4" />
              {pick(lang, { ar: "اتصل بنا", en: "Contact Us" })}
            </a>
            <a
              href={CONTACT.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 font-bold text-brand-700 shadow-glass transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glass-lg sm:w-auto"
            >
              <WhatsAppIcon className="h-4 w-4" />
              {pick(lang, { ar: "واتساب", en: "WhatsApp" })}
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
