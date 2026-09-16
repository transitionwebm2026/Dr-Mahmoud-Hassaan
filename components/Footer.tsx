"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Music2, Phone } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { pick } from "@/lib/i18n";
import { CONTACT, DOCTOR, NAV_LINKS, SOCIAL_LINKS } from "@/lib/constants";
import { FacebookIcon, InstagramIcon } from "./ui/SocialIcons";

export default function Footer() {
  const { lang } = useLanguage();
  const year = new Date().getFullYear();
  const [logoFailed, setLogoFailed] = useState(false);
  const logoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Same SSR/hydration race as the hero photo: the server-rendered <img>
    // can finish (and fail) loading before onError's listener attaches.
    const img = logoRef.current;
    if (img && img.complete && img.naturalWidth === 0) {
      setLogoFailed(true);
    }
  }, []);

  const services = [
    { ar: "جراحة أورام الثدي", en: "Breast Cancer Surgery" },
    { ar: "جراحة أورام الجهاز الهضمي", en: "GI Oncology Surgery" },
    { ar: "جراحة الأورام بالمنظار", en: "Laparoscopic Oncology Surgery" },
    { ar: "استشارات ما بعد الجراحة", en: "Post-Op Consultations" },
  ];

  const columns = [
    {
      title: { ar: "روابط سريعة", en: "Quick Links" },
      items: NAV_LINKS.map((link) => ({ label: link.label, href: link.href })),
    },
    {
      title: { ar: "أبرز الخدمات", en: "Key Services" },
      items: services.map((service) => ({ label: service, href: "/services" })),
    },
  ];

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
                  src="/images/logo-icon.png"
                  alt={pick(lang, DOCTOR.name)}
                  width={32}
                  height={32}
                  className="h-full w-full object-contain"
                />
              </span>
              <span className="font-arabic text-base font-extrabold text-white">
                {pick(lang, DOCTOR.name)}
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-white/65">{pick(lang, DOCTOR.title)}</p>
            <div className="mt-4 flex items-center justify-center gap-3">
              {[
                { icon: InstagramIcon, href: SOCIAL_LINKS.instagram, label: "Instagram" },
                { icon: FacebookIcon, href: SOCIAL_LINKS.facebook, label: "Facebook" },
                { icon: Music2, href: SOCIAL_LINKS.tiktok, label: "TikTok" },
              ].map(({ icon: Icon, href, label }) => (
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
          </div>

          {columns.map((column) => (
            <div key={column.title.en}>
              <h4 className="mb-3 text-sm font-extrabold text-white">
                {pick(lang, column.title)}
              </h4>
              <ul className="space-y-2">
                {column.items.map((item) => (
                  <li key={item.label.en}>
                    <Link
                      href={item.href}
                      className="text-sm text-white/65 transition-colors hover:text-white"
                    >
                      {pick(lang, item.label)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="mb-3 text-sm font-extrabold text-white">
              {pick(lang, { ar: "معلومات التواصل", en: "Contact Info" })}
            </h4>
            {/* w-fit + mx-auto centers this block as a whole, while each row stays
                start-aligned within it — keeps the three icons in one clean
                vertical line regardless of how long each line of text is. */}
            <ul className="mx-auto w-fit space-y-2.5">
              <li className="flex items-start gap-2.5 text-sm text-white/65">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white/70" />
                <span className="text-start">{pick(lang, CONTACT.address)}</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-white/65">
                <Phone className="h-4 w-4 shrink-0 text-white/70" />
                <a href={CONTACT.phoneHref} dir="ltr" className="hover:text-white">
                  {CONTACT.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-white/65">
                <Mail className="h-4 w-4 shrink-0 text-white/70" />
                <a href={`mailto:${CONTACT.email}`} dir="ltr" className="hover:text-white">
                  {CONTACT.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Centered bottom bar */}
        <div className="mx-auto mt-8 flex max-w-5xl flex-col items-center gap-4 border-t border-white/15 pt-6 text-center">
          <p className="text-xs text-white/60">
            © {year} {pick(lang, DOCTOR.name)} — {pick(lang, { ar: "جميع الحقوق محفوظة", en: "All rights reserved" })}
          </p>
          <p className="text-xs text-white/40">
            {pick(lang, {
              ar: "المحتوى الطبي لأغراض تعريفية ولا يغني عن استشارة الطبيب",
              en: "Medical content is for informational purposes and does not replace professional consultation",
            })}
          </p>

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
