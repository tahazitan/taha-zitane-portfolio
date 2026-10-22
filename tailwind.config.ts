import type { Config } from "tailwindcss";
export default {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: { ink: "#101918", canvas: "#f0f0e9", acid: "#d1f879", moss: "#23493f" },
    }
  },
  plugins: [],
} satisfies Config;
