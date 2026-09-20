import { createElement } from "react";
import {
  Activity,
  Award,
  BadgeCheck,
  BookOpen,
  CircleHelp,
  ClipboardCheck,
  ClipboardList,
  GraduationCap,
  Globe2,
  HeartHandshake,
  HeartPulse,
  Layers,
  ListChecks,
  Microscope,
  Milestone,
  ScanSearch,
  Scissors,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Trophy,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

/**
 * Admin-editable content stores an icon by name (e.g. "Award") in an
 * `icon_tag` column — this resolves that string back to the matching
 * lucide-react component at render time, falling back to a generic icon
 * for anything unrecognized so a typo never breaks the page.
 */
const ICON_REGISTRY: Record<string, LucideIcon> = {
  Activity,
  Award,
  BadgeCheck,
  BookOpen,
  CircleHelp,
  ClipboardCheck,
  ClipboardList,
  GraduationCap,
  Globe2,
  HeartHandshake,
  HeartPulse,
  Layers,
  ListChecks,
  Microscope,
  Milestone,
  ScanSearch,
  Scissors,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Trophy,
  UsersRound,
};

export function resolveIcon(tag: string | null | undefined): LucideIcon {
  return (tag && ICON_REGISTRY[tag]) || CircleHelp;
}

/**
 * Renders an admin-editable `icon_tag` as its matching lucide icon. A stable,
 * module-level component (rather than resolving to a local `const Icon = ...`
 * inside a render function) so the icon lookup never counts as "creating a
 * component during render".
 */
export function DynamicIcon({
  tag,
  ...props
}: { tag: string | null | undefined } & React.ComponentProps<LucideIcon>) {
  // Uses createElement rather than JSX: resolving `tag` to a component value
  // at runtime is exactly what this helper is for, but the React Compiler's
  // lint rule flags any `<Variable />` JSX tag as "creating a component
  // during render" — createElement sidesteps that false positive.
  return createElement(resolveIcon(tag), props);
}
