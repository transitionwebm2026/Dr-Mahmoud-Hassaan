"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarCheck, Menu, Phone, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { pick } from "@/lib/i18n";
import { getContactInfo } from "@/lib/site-contact";
import { getSiteChrome, linkLabel } from "@/lib/site-navigation";
import type { ClinicSettings } from "@/lib/supabase/types";
import LanguageToggle from "./LanguageToggle";

export default function Navbar({ settings }: { settings: ClinicSettings | null }) {
  const { lang } = useLanguage();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const bookLabel = pick(lang, {
    ar: settings?.navbar_cta_text_ar || "حجز كشف",
    en: settings?.navbar_cta_text_en || "Book a Visit",
  });
  const bookHref = settings?.navbar_cta_link || "/contact";

  const { phoneDisplay, phoneHref } = getContactInfo(settings);
  const { logoUrl, brandName, brandSubtitle, navLinks, showNavbarCta, showNavbarPhone } = getSiteChrome(settings);

  return (
    <header className="sticky top-0 z-50 w-full py-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between rounded-full border px-3 py-2.5 backdrop-blur-xl transition-all duration-500 sm:px-5 ${
            scrolled
              ? "border-brand/25 bg-gradient-to-r from-white/85 via-brand-50/80 to-white/85 shadow-glass-lg"
              : "border-white/25 bg-white/10 shadow-[0_8px_32px_-4px_rgba(0,20,30,0.35)]"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-2.5 sm:gap-3">
            <span className="relative flex h-11 w-11 shrink-0 items-center justify-center">
              <Image
                src={logoUrl}
                alt={pick(lang, brandName)}
                width={44}
                height={44}
                priority
                className="h-full w-full object-contain drop-shadow-[0_2px_6px_rgba(0,40,60,0.25)]"
              />
            </span>
            <span className="hidden flex-col leading-tight sm:flex">
              <span
                className={`whitespace-nowrap font-arabic text-sm font-extrabold transition-colors duration-500 ${
                  scrolled ? "text-ink" : "text-white"
                }`}
              >
                {pick(lang, brandName)}
              </span>
              <span
                className={`whitespace-nowrap text-[11px] font-medium transition-colors duration-500 ${
                  scrolled ? "text-brand-700" : "text-brand-100"
                }`}
              >
                {pick(lang, brandSubtitle)}
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="no-scrollbar hidden min-w-0 items-center gap-1 overflow-x-auto xl:flex">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={`${link.href}-${link.label_en}`}
                  href={link.href}
                  className={`group relative shrink-0 whitespace-nowrap rounded-full px-3 py-2 text-sm font-semibold transition-colors duration-300 ${
                    active
                      ? "text-white"
                      : scrolled
                        ? "text-ink/70 hover:text-brand-700"
                        : "text-white/80 hover:text-white"
                  }`}
                >
                  {active ? (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-brand-gradient shadow-glow-brand"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  ) : (
                    <span
                      className={`absolute inset-0 -z-10 scale-x-50 rounded-full opacity-0 transition-all duration-300 ease-out group-hover:scale-x-100 group-hover:opacity-100 ${
                        scrolled ? "bg-brand/10" : "bg-white/15"
                      }`}
                    />
                  )}
                  {linkLabel(link, lang)}
                </Link>
              );
            })}
          </nav>

          {/* Right controls */}
          <div className="flex shrink-0 items-center gap-2">
            <LanguageToggle scrolled={scrolled} />

            {showNavbarCta && (
              <Link
                href={bookHref}
                className="btn-primary hidden shrink-0 whitespace-nowrap !px-5 !py-2.5 text-sm md:inline-flex"
              >
                <CalendarCheck className="h-4 w-4" />
                {bookLabel}
              </Link>
            )}

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors duration-500 xl:hidden ${
                scrolled
                  ? "border-white/40 bg-white/40 text-ink hover:bg-white/60"
                  : "border-white/25 bg-white/10 text-white hover:bg-white/20"
              }`}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden xl:hidden"
            >
              <div className="mt-3 flex flex-col gap-1 rounded-3xl border border-white/40 bg-white/80 p-4 shadow-glass backdrop-blur-lg">
                {navLinks.map((link) => (
                  <Link
                    key={`${link.href}-${link.label_en}`}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`rounded-2xl px-4 py-3 text-sm font-semibold transition-colors ${
                      pathname === link.href
                        ? "bg-brand-gradient text-white"
                        : "text-ink/70 hover:bg-brand/5"
                    }`}
                  >
                    {linkLabel(link, lang)}
                  </Link>
                ))}
                {showNavbarPhone && (
                  <a
                    href={phoneHref}
                    dir="ltr"
                    onClick={() => setOpen(false)}
                    className="mt-2 flex items-center gap-2 rounded-2xl border border-brand/20 bg-brand/5 px-4 py-3 text-sm font-bold text-brand-700"
                  >
                    <Phone className="h-4 w-4" />
                    {phoneDisplay}
                  </a>
                )}
                {showNavbarCta && (
                  <Link
                    href={bookHref}
                    onClick={() => setOpen(false)}
                    className="btn-primary mt-2 w-full"
                  >
                    <CalendarCheck className="h-4 w-4" />
                    {bookLabel}
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
