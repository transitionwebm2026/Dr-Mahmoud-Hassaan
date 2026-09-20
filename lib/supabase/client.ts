"use client";

import { createBrowserClient } from "@supabase/ssr";

/**
 * Browser Supabase client — safe to import from Client Components.
 * Uses the publishable key only; RLS enforces what it can read/write.
 *
 * Not parameterized with a `Database` generic: the `@supabase/supabase-js`
 * version pinned here has a generic-inference bug that collapses every
 * table's Row/Insert/Update to `never` (see the comment at the top of
 * `lib/supabase/types.ts`). Call sites annotate results against the plain
 * interfaces in `./types` instead.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}
