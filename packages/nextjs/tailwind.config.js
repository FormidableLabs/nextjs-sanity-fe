const defaultTheme = require("tailwindcss/defaultTheme");

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
      fontFamily: {
        sans: ["Cabinet Grotesk", ...defaultTheme.fontFamily.sans],
        jeanLuc: ["JeanLuc", ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        // converted to data url from Figma export
        "checkbox-checked": `url("data:image/svg+xml,%3Csvg width='12' height='9' viewBox='0 0 12 9' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M11.6533 0.115902C11.8654 0.292684 11.8941 0.607966 11.7173 0.820105L5.05061 8.8201C4.96068 8.92803 4.8295 8.99313 4.68916 8.9995C4.54883 9.00587 4.41229 8.9529 4.31295 8.85357L0.312951 4.85357C0.117688 4.6583 0.117688 4.34172 0.312951 4.14646C0.508213 3.9512 0.824795 3.9512 1.02006 4.14646L4.6329 7.75931L10.9491 0.17992C11.1258 -0.0322181 11.4411 -0.0608801 11.6533 0.115902Z' fill='%238BDDFD'/%3E%3C/svg%3E%0A")`,
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
