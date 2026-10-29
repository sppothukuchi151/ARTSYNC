/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6A0DAD", // main purple - buttons, links, active states
        indigo: "#2E1065", // deep shape color - the dark folded-paper accent
        lavender: "#E9D5FF", // secondary panels/backgrounds
        violet: "#C4B5FD", // mid-tone shape accent
        card: "#F8F8F8",
        ink: "#27272A", // body text - soft black, not pure #000
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"], // headings - the bold geometric voice
        body: ["Inter", "sans-serif"], // paragraphs, forms, everything else
      },
      boxShadow: {
        soft: "0 4px 20px rgba(106, 13, 173, 0.08)",
        card: "0 2px 12px rgba(0, 0, 0, 0.06)",
      },
      keyframes: {
        unfold: {
          "0%": { opacity: "0", transform: "scale(0.85) rotate(-8deg)" },
          "100%": { opacity: "1", transform: "scale(1) rotate(0deg)" },
        },
        floatUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        unfold: "unfold 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
        floatUp: "floatUp 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};
