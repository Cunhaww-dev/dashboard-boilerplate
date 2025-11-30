/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0D1B2A",
          foreground: "#F1F1F1",
        },
        background: "#F1F1F1",
        accent: "#1B263B",
      },
    },
  },
  plugins: [],
};
