"use client";

import { motion } from "framer-motion";
import { CalendarCheck } from "lucide-react";
import type { ClinicSettings } from "@/lib/supabase/types";
import BookingForm from "./BookingForm";
import ClinicInfoMap from "./ClinicInfoMap";
import SectionHeading from "@/components/ui/SectionHeading";
import type { SectionHeadingContent } from "@/lib/section-headings";

export interface ContactFormMapSectionProps {
  heading: SectionHeadingContent;
  clinicSettings: ClinicSettings | null;
}

export default function ContactFormMapSection({ clinicSettings, heading }: ContactFormMapSectionProps) {
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
          <SectionHeading heading={heading} icon={CalendarCheck} descriptionClassName="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink/60 sm:text-base" />
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
