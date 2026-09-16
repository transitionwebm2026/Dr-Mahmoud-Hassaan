import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#168e9f",
          50: "#eefbfc",
          100: "#d3f3f6",
          200: "#a8e6ec",
          300: "#71d2dc",
          400: "#3bb6c4",
          500: "#168e9f",
          600: "#137486",
          700: "#135d6c",
          800: "#154b58",
          900: "#153f4a",
          950: "#082730",
        },
        deep: {
          DEFAULT: "#005182",
          50: "#eef7ff",
          100: "#dcedff",
          200: "#b3daff",
          300: "#75bcff",
          400: "#3399ff",
          500: "#0b7ce0",
          600: "#0061b3",
          700: "#005182",
          800: "#08436a",
          900: "#0c3a59",
          950: "#08243b",
        },
        teal: {
          DEFAULT: "#1c9ea6",
        },
        ink: "#0b2530",
        mist: "#f4fafb",
      },
      fontFamily: {
        arabic: ["var(--font-arabic)", "Tahoma", "sans-serif"],
        english: ["var(--font-english)", "Arial", "sans-serif"],
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #005182 0%, #168e9f 55%, #1c9ea6 100%)",
        "brand-gradient-soft": "linear-gradient(135deg, rgba(0,81,130,0.9) 0%, rgba(22,142,159,0.85) 55%, rgba(28,158,166,0.9) 100%)",
        "radial-glow": "radial-gradient(circle at 50% 0%, rgba(22,142,159,0.25) 0%, rgba(0,81,130,0) 60%)",
        "mesh-medical": "radial-gradient(at 0% 0%, rgba(22,142,159,0.15) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(0,81,130,0.15) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(28,158,166,0.12) 0px, transparent 50%), radial-gradient(at 0% 100%, rgba(0,81,130,0.1) 0px, transparent 50%)",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(0, 40, 60, 0.12)",
        "glass-lg": "0 20px 60px -10px rgba(0, 40, 60, 0.25)",
        "glow-brand": "0 0 0 1px rgba(22,142,159,0.3), 0 0 24px 0 rgba(22,142,159,0.35)",
        "glow-deep": "0 0 0 1px rgba(0,81,130,0.3), 0 0 30px 0 rgba(0,81,130,0.3)",
        "inner-glass": "inset 0 1px 0 0 rgba(255,255,255,0.4)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-10px) rotate(2deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1", boxShadow: "0 0 0 0 rgba(22,142,159,0.5)" },
          "50%": { opacity: "0.85", boxShadow: "0 0 0 10px rgba(22,142,159,0)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 8s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "pulse-glow": "pulse-glow 2.4s ease-in-out infinite",
        "spin-slow": "spin-slow 12s linear infinite",
        "fade-up": "fade-up 0.6s ease-out forwards",
      },
      backdropBlur: {
        xs: "2px",
      },
      screens: {
        xs: "420px",
      },
    },
  },
  plugins: [],
};

export default config;
