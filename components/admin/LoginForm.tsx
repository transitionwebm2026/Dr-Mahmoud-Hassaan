"use client";

import { useActionState, useRef, useState, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Lock, Mail, Eye, EyeOff, ShieldCheck, AlertCircle, Loader2 } from "lucide-react";
import { login, type LoginState } from "@/app/admin/login/actions";

export default function LoginForm({ next }: { next: string }) {
  const [state, formAction, isPending] = useActionState<LoginState, FormData>(login, undefined);
  const [showPassword, setShowPassword] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 260, damping: 26 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 260, damping: 26 });

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="glass-panel relative w-full max-w-md overflow-hidden p-8 sm:p-10"
    >
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-white/40 via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/40" />

      <div className="relative">
        <div className="mb-8 flex flex-col items-center text-center">
          <span className="icon-chip mb-4 !h-14 !w-14">
            <ShieldCheck className="h-6 w-6" />
          </span>
          <h1 className="text-2xl font-extrabold text-ink">Admin Sign In</h1>
          <p className="mt-1 text-sm text-ink/60">Dr. Mahmoud Hassan — Content Management</p>
        </div>

        <form action={formAction} className="space-y-5">
          <input type="hidden" name="next" value={next} />

          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-ink/80">
              Email
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute start-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-ink/40" />
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="admin@example.com"
                className="w-full rounded-xl border border-ink/10 bg-white/80 py-3 ps-10 pe-3.5 text-sm text-ink shadow-inner-glass outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/25"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-ink/80">
              Password
            </label>
            <div className="relative">
              <Lock className="pointer-events-none absolute start-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-ink/40" />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full rounded-xl border border-ink/10 bg-white/80 py-3 ps-10 pe-10 text-sm text-ink shadow-inner-glass outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/25"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute end-3.5 top-1/2 -translate-y-1/2 text-ink/40 transition hover:text-brand"
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
              </button>
            </div>
          </div>

          {state?.error && (
            <div className="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2.5 text-sm font-medium text-rose-600">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{state.error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="btn-primary w-full !py-3.5 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isPending ? (
              <>
                <Loader2 className="h-4.5 w-4.5 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <p className="mt-6 flex items-center justify-center gap-1.5 text-xs text-ink/45">
          <Lock className="h-3.5 w-3.5" />
          Secured with Supabase Auth
        </p>
      </div>
    </motion.div>
  );
}
