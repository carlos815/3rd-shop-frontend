const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      pink: "#F4B9B8",
      yellow: "#FFF4BD",
      turquoise: "#73E2E0",
      purple: "#604D99",
      "purple-dark": "#292140",
    },

    fontSize: {
      xs: [
        "0.625rem",
        {
          letterSpacing: "1.5px",
          fontWeight: "400",
        },
      ],
      sm: [
        "0.875rem",
        {
          letterSpacing: "0.25px",
          fontWeight: "400",
        },
      ],
      base: [
        "1rem",
        {
          letterSpacing: "0.5px",
          fontWeight: "400",
        },
      ],
      h6: [
        "21px", {
          letterSpacing: "0.15px",
          fontWeight: "700",
        },
      ],
      lg: [
        "24px",
        {
          letterSpacing: "0.15px",
          fontWeight: "500",
        },
      ],
      xl: [
        "1.625rem",
        {
          letterSpacing: "0px",
          fontWeight: "400",
        },
      ],
      "2xl": [
        "2.25rem",
        {
          letterSpacing: "0.25px",
          fontWeight: "400",
        },
      ],
      "3xl": [
        "3.1875rem",
        {
          letterSpacing: "0px",
          fontWeight: "400",
        },
      ],
      "4xl": [
        "4rem",
        {
          letterSpacing: "-0.5px",
          fontWeight: "300",
        },
      ],
      "5xl": [
        "6.4375",
        {
          letterSpacing: "-1.5px",
          fontWeight: "500",
        },
      ],
    },
    fontFamily: {
      headline: "Lora, serif",
      body: "Noto Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
    },
    dropShadow: {
      lg: "8px 8px 0px #292140",
      xs: "2px 2px 0px #292140",
      inset: "inset 4px 4px 0px #FFF4BD"
    },
    extend: {
      textShadow: {
        "3d": "-3px 0px 0px rgba(198, 115, 226, 0.3), 3px 0px 0px rgba(164, 226, 115, 0.3)",
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") }
      );
    }),
  ],
};