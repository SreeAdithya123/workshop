import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#E8E2D8", // Beige
        foreground: "#2F3A33", // Deep Sage (Derived from #6F8F72 for contrast but same hue)
        primary: {
          DEFAULT: "#6F8F72", // Sage Green
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#F2A65A", // Orange
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#F2A65A", // Orange
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#BFC6C4", // Grayish (User provided)
          foreground: "#4B5563", // Darker gray for readable muted text
        },
        card: {
          DEFAULT: "#F5F2EB", // Slightly lighter beige for cards
          foreground: "#2F3A33",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        heading: ["var(--font-poppins)"],
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
