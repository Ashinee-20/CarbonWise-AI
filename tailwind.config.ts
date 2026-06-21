import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#17211b",
        moss: "#2f6b4f",
        leaf: "#49a078",
        skywise: "#4b8bbe",
        solar: "#f3c14b",
        clay: "#b46a4a"
      },
      boxShadow: {
        soft: "0 18px 50px rgba(23, 33, 27, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
