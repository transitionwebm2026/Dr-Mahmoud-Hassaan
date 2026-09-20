/**
 * Resolves the current deployment's base URL for metadata, the sitemap, and
 * robots.txt. Checked in this order:
 *  1. `NEXT_PUBLIC_SITE_URL` — set this once a real custom domain is live.
 *  2. `VERCEL_PROJECT_PRODUCTION_URL` — Vercel's stable production domain
 *     (e.g. `project-name.vercel.app`), set automatically on every deploy.
 *  3. `VERCEL_URL` — the current deployment's own URL (falls back to this on
 *     preview deployments).
 *  4. `http://localhost:3000` for local dev.
 * Server-only: do not import from a Client Component.
 */
export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}
