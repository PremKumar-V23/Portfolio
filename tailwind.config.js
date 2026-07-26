/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // enables toggling dark mode via a class instead of only OS preference
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "420px",
      },
    },
  },
  plugins: [],
};
