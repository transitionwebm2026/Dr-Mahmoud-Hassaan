import type { Metadata } from "next";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: {
    template: "%s | Admin — Dr. Mahmoud Hassan",
    default: "Admin Dashboard | Dr. Mahmoud Hassan",
  },
  robots: { index: false, follow: false },
};

// English/LTR by design: the admin CMS is a separate console from the
// bilingual RTL/LTR public site, so it opts out of the root layout's
// `dir="rtl"` and Arabic font inheritance locally instead of following the
// LanguageProvider used by the public `(site)` route group.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div dir="ltr" lang="en" className="font-english min-h-screen bg-mesh-medical bg-mist">
      {children}
      <Toaster position="top-right" richColors closeButton />
    </div>
  );
}
