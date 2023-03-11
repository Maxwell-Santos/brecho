/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: "var(--font-primary)",
      },
      colors: {
        title: "#34BE82",
        link: "#34BE82",
      },
      backgroundColor: {
        primary: "#fffff7",
        dashboard: "#B1D7B4",
        "plus-less": "#B1D7B4",
        "product-card": "#FFFFFF",
        "btn-primary": "#92B4EC",
      }
    },
  },
  plugins: [],
}
