export const DOCTOR = {
  name: {
    ar: "د. محمود حسان",
    en: "Dr. Mahmoud Hassan",
  },
  title: {
    ar: "مدرس واستشاري جراحة الأورام بالمعهد القومي للأورام - جامعة القاهرة - عضو الجمعية المصرية لجراحة الأورام",
    en: "Lecturer & Consultant of Surgical Oncology — National Cancer Institute, Cairo University | Member of the Egyptian Society of Surgical Oncology",
  },
  shortTitle: {
    ar: "استشاري جراحة الأورام",
    en: "Consultant Surgical Oncologist",
  },
};

/**
 * Placeholder contact details — replace with the real practice numbers
 * and social handles before going live.
 */
export const CONTACT = {
  phoneDisplay: "+20 100 123 4567",
  phoneHref: "tel:+201001234567",
  whatsappNumber: "201001234567",
  get whatsappHref() {
    return `https://wa.me/${this.whatsappNumber}`;
  },
  email: "info@dr-mahmoudhassan.com",
  address: {
    ar: "المعهد القومي للأورام، جامعة القاهرة، القاهرة، مصر",
    en: "National Cancer Institute, Cairo University, Cairo, Egypt",
  },
};

export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/dr.mahmoudhassan",
  facebook: "https://facebook.com/dr.mahmoudhassan",
  tiktok: "https://tiktok.com/@dr.mahmoudhassan",
};

export const NAV_LINKS = [
  { href: "/", label: { ar: "الرئيسية", en: "Home" } },
  { href: "/about", label: { ar: "عن الدكتور", en: "About" } },
  { href: "/services", label: { ar: "الخدمات", en: "Services" } },
  { href: "/videos", label: { ar: "الفيديوهات", en: "Videos" } },
  { href: "/articles", label: { ar: "المقالات", en: "Articles" } },
  { href: "/reviews", label: { ar: "آراء المرضى", en: "Reviews" } },
  { href: "/contact", label: { ar: "تواصل معنا", en: "Contact" } },
];
