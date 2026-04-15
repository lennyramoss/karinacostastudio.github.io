import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "var(--color-canvas)",
        surface: "var(--color-surface)",
        line: "var(--color-line)",
        text: "var(--color-text)",
        muted: "var(--color-muted)",
        accent: "var(--color-accent)",
        "accent-soft": "var(--color-accent-soft)",
      },
      maxWidth: {
        content: "68rem",
        narrow: "42rem",
      },
      boxShadow: {
        card: "0 18px 50px rgba(17, 24, 39, 0.08)",
        soft: "0 10px 30px rgba(17, 24, 39, 0.05)",
      },
      borderRadius: {
        xl2: "1.5rem",
      },
      fontFamily: {
        sans: [
          "Avenir Next",
          "Segoe UI",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        display: [
          "Iowan Old Style",
          "Palatino Linotype",
          "Book Antiqua",
          "Georgia",
          "serif",
        ],
      },
      letterSpacing: {
        soft: "0.08em",
      },
    },
  },
  plugins: [],
};

export default config;
