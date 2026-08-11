/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./assets/components/*.html",
    "./js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        'brand-green': '#059669',
      }
    },
  },
  plugins: [],
}