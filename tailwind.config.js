/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      headline: "Lato serif",
      body: "Noto Sans -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
    },
    colors: {
      pink: "#f4b9b8",
      yellow: "#fff4bd",
      turquoise: "#73e2df",
      purple: "#836ec4",
      "purple-dark": "#292140",
      gray: "#aaaba8",
    },
    extend: {

    },
  },
  plugins: [],
}
