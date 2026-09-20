"use client";

import { useEffect, useState, type FormEvent } from "react";
import { motion, type Variants } from "framer-motion";
import {
  CalendarCheck,
  CheckCircle2,
  ChevronDown,
  FileText,
  Phone,
  Stethoscope,
  UserRound,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { pick, type Bilingual } from "@/lib/i18n";
import { CONTACT } from "@/lib/constants";
import { useTilt3D } from "@/lib/useTilt3D";
import { useIsMobile } from "@/lib/useIsMobile";
import { createClient } from "@/lib/supabase/client";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";

const SERVICES: { value: string; label: Bilingual }[] = [
  { value: "breast", label: { ar: "جراحة أورام الثدي", en: "Breast Cancer Surgery" } },
  { value: "gi", label: { ar: "جراحة أورام الجهاز الهضمي", en: "GI Oncology Surgery" } },
  { value: "head-neck", label: { ar: "جراحة الغدد والرقبة", en: "Head & Neck / Thyroid Surgery" } },
  { value: "laparoscopic", label: { ar: "جراحة الأورام بالمناظير", en: "Laparoscopic Oncology Surgery" } },
  { value: "consultation", label: { ar: "استشارة عامة", en: "General Consultation" } },
  { value: "other", label: { ar: "أخرى", en: "Other" } },
];

const fieldClass =
  "w-full rounded-2xl border border-brand/20 bg-white/55 px-4 py-3.5 text-sm text-ink placeholder:text-ink/40 backdrop-blur-md transition-all duration-300 focus:border-brand focus:bg-white/85 focus:shadow-glow-brand focus:outline-none";

const labelClass = "mb-2 flex items-center gap-2 text-sm font-bold text-ink/80";

const fieldContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

const fieldItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function BookingForm() {
  const { lang, dir } = useLanguage();
  const { ref: tiltRef, rotateX, rotateY, onMouseMove, onMouseLeave } = useTilt3D();
  const isMobile = useIsMobile();
  // This card renders first in the split layout, so it sits on the reading
  // "start" side (right in RTL, left in LTR) — it slides in from that same
  // edge so the reveal always converges toward the center, in either
  // language. Below `lg` the two columns stack into one, so a sideways
  // offset has nowhere to go but off the edge of a narrow viewport — rise
  // from below there instead.
  const cardEnter = isMobile ? { opacity: 0, y: 36 } : { opacity: 0, x: dir === "rtl" ? 88 : -88, y: 24 };
  const cardSettled = isMobile ? { opacity: 1, y: 0 } : { opacity: 1, x: 0, y: 0 };
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [service, setService] = useState("");
  const [notes, setNotes] = useState("");
  const [minDate, setMinDate] = useState<string | undefined>(undefined);
  const [sent, setSent] = useState(false);

  // Computed after mount only, so the server-rendered markup (no `min`) always
  // matches the client's first render — avoids a hydration mismatch that a
  // date-dependent attribute would otherwise risk around a UTC day boundary.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMinDate(new Date().toISOString().slice(0, 10));
  }, []);

  function formatDate(value: string) {
    if (!value) return "";
    try {
      return new Intl.DateTimeFormat(lang === "ar" ? "ar-EG" : "en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(`${value}T00:00:00`));
    } catch {
      return value;
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const serviceLabel = SERVICES.find((s) => s.value === service)?.label;

    const lines =
      lang === "ar"
        ? [
            "مرحبًا، أرغب في حجز استشارة مع د. محمود حسان.",
            "",
            `👤 الاسم: ${name}`,
            `📞 الهاتف: ${phone}`,
            date ? `📅 التاريخ المفضل: ${formatDate(date)}` : null,
            serviceLabel ? `🏥 نوع الاستشارة: ${pick(lang, serviceLabel)}` : null,
            notes ? `📝 ملاحظات: ${notes}` : null,
          ]
        : [
            "Hello, I'd like to book a consultation with Dr. Mahmoud Hassan.",
            "",
            `Name: ${name}`,
            `Phone: ${phone}`,
            date ? `Preferred date: ${formatDate(date)}` : null,
            serviceLabel ? `Service: ${pick(lang, serviceLabel)}` : null,
            notes ? `Notes: ${notes}` : null,
          ];

    const message = lines.filter((line): line is string => line !== null).join("\n");
    window.open(`${CONTACT.whatsappHref}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setSent(true);

    // Also record the request for the clinic's admin dashboard. Fire-and-forget:
    // WhatsApp is the primary channel the patient actually sees, so a Supabase
    // hiccup here shouldn't block or alarm them — only surface it to developers.
    createClient()
      .from("contact_appointments")
      .insert({
        name,
        phone,
        preferred_date: date || null,
        specialty: serviceLabel ? pick(lang, serviceLabel) : null,
        notes: notes || null,
      })
      .then(({ error }) => {
        if (error) console.error("Failed to record consultation request:", error.message);
      });
  }

  return (
    <motion.div
      // Framer Motion only reads `initial` at mount, so `isMobile` flipping
      // from its false default to its real value shortly after mount
      // wouldn't retroactively reposition this element — keying on it forces
      // a fresh mount with the correct offset.
      key={isMobile ? "form-mobile" : "form-desktop"}
      ref={tiltRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      initial={cardEnter}
      whileInView={cardSettled}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card relative overflow-hidden p-6 sm:p-8 lg:p-10"
    >
      <div className="pointer-events-none absolute -top-16 start-1/3 h-64 w-64 animate-float-slow rounded-full bg-brand/10 blur-3xl" />

      <div className="relative">
        <motion.form
          onSubmit={handleSubmit}
          noValidate
          variants={fieldContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="space-y-5"
        >
          <motion.div variants={fieldItem}>
            <label htmlFor="cf-name" className={labelClass}>
              <UserRound className="h-4 w-4 text-brand" />
              {pick(lang, { ar: "الاسم بالكامل", en: "Full Name" })}
            </label>
            <input
              id="cf-name"
              name="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={pick(lang, { ar: "اكتب اسمك بالكامل", en: "Enter your full name" })}
              className={fieldClass}
            />
          </motion.div>

          <motion.div variants={fieldItem}>
            <label htmlFor="cf-phone" className={labelClass}>
              <Phone className="h-4 w-4 text-brand" />
              {pick(lang, { ar: "رقم الهاتف", en: "Phone Number" })}
            </label>
            <input
              id="cf-phone"
              name="phone"
              type="tel"
              required
              dir="ltr"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+20 1xx xxx xxxx"
              className={`${fieldClass} text-start`}
            />
          </motion.div>

          <motion.div variants={fieldItem} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="cf-date" className={labelClass}>
                <CalendarCheck className="h-4 w-4 text-brand" />
                {pick(lang, { ar: "تاريخ الحجز المفضل", en: "Preferred Date" })}
              </label>
              <input
                id="cf-date"
                name="date"
                type="date"
                min={minDate}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={`${fieldClass} font-english`}
              />
            </div>

            <div>
              <label htmlFor="cf-service" className={labelClass}>
                <Stethoscope className="h-4 w-4 text-brand" />
                {pick(lang, { ar: "نوع الجراحة أو الاستشارة", en: "Service / Specialty" })}
              </label>
              <div className="relative">
                <select
                  id="cf-service"
                  name="service"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className={`${fieldClass} appearance-none pe-10`}
                >
                  <option value="">{pick(lang, { ar: "اختر النوع", en: "Select a service" })}</option>
                  {SERVICES.map((s) => (
                    <option key={s.value} value={s.value}>
                      {pick(lang, s.label)}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute end-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand/60" />
              </div>
            </div>
          </motion.div>

          <motion.div variants={fieldItem}>
            <label htmlFor="cf-notes" className={labelClass}>
              <FileText className="h-4 w-4 text-brand" />
              {pick(lang, { ar: "ملاحظات إضافية", en: "Additional Notes" })}
            </label>
            <textarea
              id="cf-notes"
              name="notes"
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={pick(lang, {
                ar: "أي تفاصيل تود إضافتها عن حالتك...",
                en: "Any details you'd like to share about your case...",
              })}
              className={`${fieldClass} resize-none`}
            />
          </motion.div>

          <motion.button variants={fieldItem} type="submit" whileTap={{ scale: 0.97 }} className="btn-primary w-full">
            <WhatsAppIcon className="h-4 w-4" />
            {pick(lang, { ar: "تأكيد الحجز عبر واتساب", en: "Confirm Booking via WhatsApp" })}
          </motion.button>

          {sent && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 rounded-2xl border border-brand/30 bg-brand/10 px-4 py-3 text-sm font-semibold text-brand-700"
            >
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              {pick(lang, {
                ar: "تم تجهيز رسالتك — أكمل الإرسال من واتساب الذي فتحناه لك.",
                en: "Your message is ready — finish sending it from the WhatsApp tab we opened.",
              })}
            </motion.p>
          )}
        </motion.form>
      </div>
    </motion.div>
  );
}
