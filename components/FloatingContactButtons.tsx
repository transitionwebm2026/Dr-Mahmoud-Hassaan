"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Phone, type LucideIcon } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { pick, type Bilingual } from "@/lib/i18n";
import { CONTACT } from "@/lib/constants";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";

interface FloatingButton {
  key: string;
  href: string;
  external: boolean;
  icon: LucideIcon | typeof WhatsAppIcon;
  label: Bilingual;
  bgClassName: string;
  ringClassName: string;
}

const buttons: FloatingButton[] = [
  {
    key: "whatsapp",
    href: CONTACT.whatsappHref,
    external: true,
    icon: WhatsAppIcon,
    label: { ar: "تواصل عبر واتساب", en: "Chat on WhatsApp" },
    // WhatsApp's own brand green — kept distinct from the site's teal/deep
    // gradient on purpose, so the channel reads instantly at a glance.
    bgClassName: "bg-[#25D366]",
    ringClassName: "bg-[#25D366]",
  },
  {
    key: "phone",
    href: CONTACT.phoneHref,
    external: false,
    icon: Phone,
    label: { ar: "اتصل بنا الآن", en: "Call Us Now" },
    bgClassName: "bg-brand-gradient",
    ringClassName: "bg-brand-400",
  },
];

/**
 * Persistent bottom-left contact shortcuts, fixed to the viewport and
 * rendered once in the root layout so they follow the visitor across every
 * page and the full length of every page.
 */
export default function FloatingContactButtons() {
  const { lang } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Every page's Hero has its own contextual phone/social panel pinned to
    // this same corner while scrolled to the very top (it's `absolute`
    // inside the hero, not `fixed`, so it scrolls away with the page). These
    // buttons only fade in once that panel has scrolled out of the way,
    // which avoids the two ever overlapping instead of chasing exact pixel
    // math across every viewport height.
    function updateVisibility() {
      setVisible(window.scrollY > 120);
    }
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={`fixed bottom-5 left-5 z-40 flex flex-col gap-4 sm:bottom-8 sm:left-8 ${visible ? "" : "pointer-events-none"}`}
    >
      {buttons.map(({ key, href, external, icon: Icon, label, bgClassName, ringClassName }, i) => (
        <motion.a
          key={key}
          href={href}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          aria-label={pick(lang, label)}
          tabIndex={visible ? 0 : -1}
          animate={visible ? { scale: 1, opacity: 1, y: 0 } : { scale: 0.4, opacity: 0, y: 24 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: visible ? i * 0.12 : 0 }}
          className="group relative flex h-12 w-12 items-center justify-center sm:h-14 sm:w-14"
        >
          {/* breathing radar ring, tinted to match each channel's own color */}
          <motion.span
            aria-hidden
            className={`absolute inset-0 rounded-full ${ringClassName}`}
            animate={{ scale: [1, 1.55, 1], opacity: [0.55, 0, 0.55] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.45 }}
          />

          {/* button body */}
          <span
            className={`relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full text-white shadow-glass-lg ring-1 ring-white/30 transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:scale-110 group-active:scale-95 sm:h-14 sm:w-14 ${bgClassName}`}
          >
            <span className="shimmer-overlay absolute inset-0 animate-shimmer" />
            <Icon className="relative h-5 w-5 sm:h-6 sm:w-6" />
          </span>

          {/* hover tooltip */}
          <span className="pointer-events-none absolute left-full ms-3 origin-left scale-95 whitespace-nowrap rounded-full bg-deep-950/90 px-3.5 py-2 text-xs font-bold text-white opacity-0 shadow-glass backdrop-blur-md transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
            {pick(lang, label)}
          </span>
        </motion.a>
      ))}
    </div>
  );
}
