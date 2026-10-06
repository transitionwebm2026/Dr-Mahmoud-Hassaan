"use client";

import type { LucideIcon } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { pick } from "@/lib/i18n";
import type { SectionHeadingContent } from "@/lib/section-headings";

/** Renders heading text, coloring any `*wrapped*` part with the brand gradient. */
function HighlightText({ text }: { text: string }) {
  return (
    <>
      {text.split(/\*([^*]+)\*/).map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="text-gradient-brand">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
}

/**
 * The admin-editable eyebrow chip + <h2> + description shared by every page
 * section. Renders only the text; each section keeps its own wrapper (and
 * entrance animation) around it.
 */
export default function SectionHeading({
  heading,
  icon: Icon,
  descriptionClassName = "mt-4 text-sm leading-relaxed text-ink/60 sm:text-base",
}: {
  heading: SectionHeadingContent;
  icon: LucideIcon;
  descriptionClassName?: string;
}) {
  const { lang } = useLanguage();

  return (
    <>
      {heading.eyebrow && (
        <span className="section-eyebrow">
          <Icon className="h-4 w-4" />
          {pick(lang, heading.eyebrow)}
        </span>
      )}
      <h2 className={`${heading.eyebrow ? "mt-5 " : ""}text-2xl font-extrabold text-ink sm:text-3xl lg:text-4xl`}>
        <HighlightText text={pick(lang, heading.title)} />
      </h2>
      {heading.description && <p className={descriptionClassName}>{pick(lang, heading.description)}</p>}
    </>
  );
}
