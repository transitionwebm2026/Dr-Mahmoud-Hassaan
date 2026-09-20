import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

// Next.js 16 renamed `middleware.ts` to `proxy.ts` (same behavior, new file
// and export name) — see node_modules/next/dist/docs/.../proxy.md.
export function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Run on every route except static assets and image optimization files,
     * so the admin session cookie stays fresh across the whole app without
     * blocking CSS/JS/image loading.
     */
    "/((?!_next/static|_next/image|favicon.ico|apple-icon.png|icon.png|opengraph-image|twitter-image|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
