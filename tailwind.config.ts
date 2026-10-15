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
        background: "#F0F0F0",
        foreground: "#121212",
        bauhaus: {
          bg: "#F0F0F0",
          black: "#121212",
          red: "#D02020",
          blue: "#1040C0",
          yellow: "#F0C020",
          white: "#FFFFFF",
          muted: "#E0E0E0",
          border: "#121212",
        },
      },
      fontFamily: {
        sans: ["var(--font-outfit)", "Outfit", "system-ui", "-apple-system", "sans-serif"],
        display: ["var(--font-outfit)", "Outfit", "sans-serif"],
      },
      boxShadow: {
        "hard-sm": "3px 3px 0 #121212",
        "hard-md": "6px 6px 0 #121212",
        "hard-lg": "8px 8px 0 #121212",
        "hard-xl": "12px 12px 0 #121212",
        "hard-red": "6px 6px 0 #D02020",
        "hard-blue": "6px 6px 0 #1040C0",
        "hard-yellow": "6px 6px 0 #F0C020",
        "hard-white": "6px 6px 0 #FFFFFF",
      },
      borderWidth: {
        '3': '3px',
      },
    },
  },
  plugins: [],
};
export default config;
