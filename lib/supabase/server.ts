import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

/**
 * Server Supabase client — for Server Components, Server Actions, and Route
 * Handlers. Reads the admin's session from cookies so RLS policies keyed on
 * auth.uid() apply automatically.
 *
 * Server Components can only read cookies (Next.js forbids setting cookies
 * during render), so the `setAll` call is wrapped in try/catch: it throws
 * there but succeeds when this client is created from a Server Action or
 * Route Handler, where the session refresh actually gets persisted.
 *
 * Not parameterized with a `Database` generic — see the comment at the top
 * of `lib/supabase/types.ts` for why.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from a Server Component during render — the middleware
            // (proxy.ts) already refreshes the session on every request, so
            // this is safe to ignore.
          }
        },
      },
    }
  );
}
