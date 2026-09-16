export type Lang = "ar" | "en";

export type Bilingual<T = string> = {
  ar: T;
  en: T;
};

export function pick<T>(lang: Lang, value: Bilingual<T>): T {
  return value[lang];
}
