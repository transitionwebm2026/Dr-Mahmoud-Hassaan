"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Music2, Phone } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { pick } from "@/lib/i18n";
import { DOCTOR } from "@/lib/constants";
import { getContactInfo } from "@/lib/site-contact";
import { getSiteChrome, linkLabel } from "@/lib/site-navigation";
import type { ClinicSettings } from "@/lib/supabase/types";
import { FacebookIcon, InstagramIcon } from "./ui/SocialIcons";

export default function Footer({ settings }: { settings: ClinicSettings | null }) {
  const { lang } = useLanguage();
  const year = new Date().getFullYear();
  const [logoFailed, setLogoFailed] = useState(false);
  const logoRef = useRef<HTMLImageElement>(null);

  const tagline = pick(lang, {
    ar: settings?.footer_tagline_ar || DOCTOR.title.ar,
    en: settings?.footer_tagline_en || DOCTOR.title.en,
  });
  const disclaimer = pick(lang, {
    ar:
      settings?.footer_disclaimer_ar ||
      "المحتوى الطبي لأغراض تعريفية ولا يغني عن استشارة الطبيب",
    en:
      settings?.footer_disclaimer_en ||
      "Medical content is for informational purposes and does not replace professional consultation",
  });
  const { addressAr, addressEn, phoneDisplay, phoneHref, email, instagramUrl, facebookUrl, tiktokUrl } =
    getContactInfo(settings);
  const { logoUrl, brandName, footerQuickLinks, footerServices, showFooterSocial } = getSiteChrome(settings);
  const copyright = pick(lang, {
    ar: settings?.footer_copyright_ar || `${brandName.ar} — جميع الحقوق محفوظة`,
    en: settings?.footer_copyright_en || `${brandName.en} — All rights reserved`,
  });
  const socialLinks = [
    { icon: InstagramIcon, href: instagramUrl, label: "Instagram" },
    { icon: FacebookIcon, href: facebookUrl, label: "Facebook" },
    { icon: Music2, href: tiktokUrl, label: "TikTok" },
  ];

  useEffect(() => {
    // Same SSR/hydration race as the hero photo: the server-rendered <img>
    // can finish (and fail) loading before onError's listener attaches.
    const img = logoRef.current;
    if (img && img.complete && img.naturalWidth === 0) {
      setLogoFailed(true);
    }
  }, []);

  const columns = [
    {
      title: {
        ar: settings?.footer_quicklinks_title_ar || "روابط سريعة",
        en: settings?.footer_quicklinks_title_en || "Quick Links",
      },
      items: footerQuickLinks,
    },
    {
      title: {
        ar: settings?.footer_services_title_ar || "أبرز الخدمات",
        en: settings?.footer_services_title_en || "Key Services",
      },
      items: footerServices,
    },
  ];
  const contactColumnTitle = pick(lang, {
    ar: settings?.footer_contact_title_ar || "معلومات التواصل",
    en: settings?.footer_contact_title_en || "Contact Info",
  });

  return (
    <footer className="relative mt-8 overflow-hidden bg-brand-gradient">
      <div className="pointer-events-none absolute inset-0 bg-mesh-medical opacity-30" />
      <div className="pointer-events-none absolute -top-24 start-1/4 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 end-1/4 h-72 w-72 rounded-full bg-deep-900/25 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Symmetric columns — logo, name, description & socials now form
            their own column (the rightmost one in RTL, since it's first in
            source order) instead of sitting centered in a separate row above
            everything else. */}
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/25 bg-white/90 p-1.5 backdrop-blur-md shadow-glow-brand">
                <Image
                  src={logoUrl}
                  alt={pick(lang, brandName)}
                  width={32}
                  height={32}
                  className="h-full w-full object-contain"
                />
              </span>
              <span className="font-arabic text-base font-extrabold text-white">
                {pick(lang, brandName)}
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-white/65">{tagline}</p>
            {showFooterSocial && (
              <div className="mt-4 flex items-center justify-center gap-3">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/25"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {columns.map((column) => (
            <div key={column.title.en}>
              <h4 className="mb-3 text-sm font-extrabold text-white">
                {pick(lang, column.title)}
              </h4>
              <ul className="space-y-2">
                {column.items.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="text-sm text-white/65 transition-colors hover:text-white"
                    >
                      {linkLabel(item, lang)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="mb-3 text-sm font-extrabold text-white">
              {contactColumnTitle}
            </h4>
            {/* w-fit + mx-auto centers this block as a whole, while each row stays
                start-aligned within it — keeps the three icons in one clean
                vertical line regardless of how long each line of text is. */}
            <ul className="mx-auto w-fit space-y-2.5">
              <li className="flex items-start gap-2.5 text-sm text-white/65">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white/70" />
                <span className="text-start">{pick(lang, { ar: addressAr, en: addressEn })}</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-white/65">
                <Phone className="h-4 w-4 shrink-0 text-white/70" />
                <a href={phoneHref} dir="ltr" className="hover:text-white">
                  {phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-white/65">
                <Mail className="h-4 w-4 shrink-0 text-white/70" />
                <a href={`mailto:${email}`} dir="ltr" className="hover:text-white">
                  {email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Centered bottom bar */}
        <div className="mx-auto mt-8 flex max-w-5xl flex-col items-center gap-4 border-t border-white/15 pt-6 text-center">
          <p className="text-xs text-white/60">
            © {year} {copyright}
          </p>
          <p className="text-xs text-white/40">{disclaimer}</p>

          {/* Agency credit */}
          <a
            href="https://transitioneg.com/"
            target="_blank"
            rel="noopener noreferrer"
            dir="ltr"
            className="mt-2 inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-deep-800 via-brand-600 to-brand-400 px-5 py-2.5 shadow-glass transition-transform duration-300 hover:scale-105"
          >
            <span className="font-english text-sm font-bold text-white">Transition</span>
            {!logoFailed && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                ref={logoRef}
                src="/images/logo-01.png"
                alt="Transition"
                onError={() => setLogoFailed(true)}
                className="h-5 w-5 object-contain"
              />
            )}
            <span className="font-arabic text-sm font-bold text-white/90">تصميم وتطوير</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
