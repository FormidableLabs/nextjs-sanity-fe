/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "2rem",
        },
      },
    },
    colors: {
      red: "#F04D21",
      navy: "#1E2852",
      blue: "#364C99",
      yellow: "#FFC951",
      sky: "#8BDDFD",
      gray: "#EBE5DA",
      "light-gray": "#F9F7F3",
      cloud: "#D9D9D9",
      "thunder-cloud": "#888888",
      "dark-thunder-cloud": "#525252",
      black: "#000000",
      white: "#FFFFFF",
    },
    fontSize: {
      h1: [
        "64px",
        {
          lineHeight: "110%",
          letterSpacing: "0px",
        },
      ],
      h2: [
        "56px",
        {
          lineHeight: "110%",
          letterSpacing: "0px",
        },
      ],
      h3: [
        "48px",
        {
          lineHeight: "110%",
          letterSpacing: "0px",
        },
      ],
      h4: [
        "36px",
        {
          lineHeight: "110%",
          letterSpacing: "0px",
        },
      ],
      h5: [
        "24px",
        {
          lineHeight: "110%",
          letterSpacing: "0px",
        },
      ],
      h6: [
        "20px",
        {
          lineHeight: "110%",
          letterSpacing: "0px",
        },
      ],
      eyebrow: [
        "20px",
        {
          lineHeight: "130%",
          letterSpacing: "0px",
        },
      ],
      "body-reg": [
        "16px",
        {
          lineHeight: "130%",
          letterSpacing: "0px",
        },
      ],
      "body-sm": [
        "14px",
        {
          lineHeight: "130%",
          letterSpacing: "0px",
        },
      ],
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
