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
        title: "#EB6440",
        dashboard: "#497174",
        price: "#497174"
      },
      backgroundColor: {
        primary: "#EFF5F5",
        dashboard: "#EFF5F5",
        "plus-less": "#EB6440",
        "history-item": "#EB6440",
        "product-card": "#FFFFFF",
        "btn-primary": "#497174",
      }
    },
  },
  plugins: [],
}
