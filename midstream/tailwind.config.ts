import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./modules/**/*.{js,ts,jsx,tsx,mdx}",
    "./modules/whiteboard/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  safelist: [
    // Marketplace
    "bg-blue-50",
    "text-blue-600",
    "ring-blue-500/10",
    "bg-green-50",
    "text-green-600",
    "ring-green-500/10",
    "bg-indigo-50",
    "text-indigo-600",
    "ring-indigo-500/10",
    "bg-pink-50",
    "text-pink-600",
    "ring-pink-500/10",
    "bg-yellow-50",
    "text-yellow-600",
    "ring-yellow-500/10",
    "bg-orange-50",
    "text-orange-600",
    "ring-orange-500/10",
    // Ajoutez toutes les autres classes dynamiques nécessaires ici
    // Projects
    "from-pink-600 to-pink-200",
    "from-green-600 to-green-200",
    "border-l-8",
  ],
  plugins: [],
};
export default config;
