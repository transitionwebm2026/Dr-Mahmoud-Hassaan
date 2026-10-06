"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Mail, Phone } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { pick, type Lang } from "@/lib/i18n";
import type { FooterCtaButton, FooterCtaContent } from "@/lib/footer-cta";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";

/** Picks the button icon from where its (admin-editable) link goes. */
function ButtonIcon({ href, lang }: { href: string; lang: Lang }) {
  if (href.startsWith("tel:")) return <Phone className="h-4 w-4" />;
  if (/wa\.me|whatsapp/i.test(href)) return <WhatsAppIcon className="h-4 w-4" />;
  if (href.startsWith("mailto:")) return <Mail className="h-4 w-4" />;
  return lang === "ar" ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />;
}

function CtaButton({ button, className }: { button: FooterCtaButton; className: string }) {
  const { lang } = useLanguage();
  const external = /^https?:\/\//i.test(button.href);

  return (
    <a
      href={button.href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-3.5 font-bold transition-all duration-300 hover:-translate-y-0.5 sm:w-auto ${className}`}
    >
      <ButtonIcon href={button.href} lang={lang} />
      {pick(lang, button.label)}
    </a>
  );
}

export default function FooterCTA({ cta }: { cta: FooterCtaContent }) {
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
        {cta.backgroundUrl && (
          <>
            <Image src={cta.backgroundUrl} alt="" fill sizes="(min-width: 1152px) 1152px, 100vw" className="object-cover" />
            {/* Brand tint over the photo keeps the white text readable. */}
            <div className="absolute inset-0 bg-brand-gradient opacity-85" />
          </>
        )}
        <div className="pointer-events-none absolute -top-20 start-1/4 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 end-1/4 h-72 w-72 rounded-full bg-deep-900/20 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 animate-float-slow bg-mesh-medical opacity-30" />

        <div className="relative">
          <h2 className="mx-auto max-w-2xl text-2xl font-extrabold text-white sm:text-4xl">{pick(lang, cta.title)}</h2>
          {cta.subtitle && (
            <p className="mx-auto mt-4 max-w-xl text-sm text-white/80 sm:text-base">{pick(lang, cta.subtitle)}</p>
          )}

          {(cta.primary || cta.secondary) && (
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              {cta.primary && (
                <CtaButton
                  button={cta.primary}
                  className="border border-white/40 bg-white/15 text-white backdrop-blur-md hover:bg-white/25"
                />
              )}
              {cta.secondary && (
                <CtaButton button={cta.secondary} className="bg-white text-brand-700 shadow-glass hover:shadow-glass-lg" />
              )}
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
