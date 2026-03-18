import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        warm: {
          50: "#fdf8f3",
          100: "#faebd7",
          200: "#f5deb3",
          300: "#deb887",
          400: "#c4956a",
          500: "#a0764a",
          600: "#8b6914",
          700: "#6b4f1d",
          800: "#4a3728",
          900: "#2d1f12",
        },
        accent: {
          DEFAULT: "#e07b3c",
          light: "#f4a261",
          dark: "#c45e1a",
        },
        paw: {
          DEFAULT: "#8b5e3c",
          light: "#a67c5b",
        },
      },
    },
  },
  plugins: [],
};
export default config;
