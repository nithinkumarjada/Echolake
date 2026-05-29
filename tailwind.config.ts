import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#10131a",
        mist: "#edf3f8",
        cyanx: "#52d6ff",
        mintx: "#70f0bb",
        coralx: "#ff8b70"
      },
      boxShadow: {
        glow: "0 0 60px rgba(82, 214, 255, 0.28)",
        premium: "0 24px 80px rgba(0, 0, 0, 0.18)"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-space)", "Inter", "system-ui", "sans-serif"]
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -12px, 0)" }
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        }
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        marquee: "marquee 26s linear infinite"
      }
    }
  },
  plugins: []
};

export default config;
