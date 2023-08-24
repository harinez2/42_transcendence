/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite-react/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
       colors: {
        darkslategray: {
          "100": "#464646",
          "200": "#3b3a3a",
          "300": "#323232",
        },
        darkgray: {
          "100": "#aaa9a9",
          "200": "#a4a4a4",
          "300": "#9c9c9c",
        },
        white: "#fff",
        dimgray: {
          "100": "#6c6a6a",
          "200": "#605f5f",
          "300": "#5d5d5d",
        },
        gray: {
          "100": "#8a8a8a",
          "200": "#8a898d",
          "300": "#808080",
          "400": "#777",
          "500": "#242424",
          "600": "rgba(37, 37, 37, 0.8)",
        },
        gainsboro: "#d9d9d9",
        whitesmoke: "#f2f2f2",
        silver: {
          "100": "#bdbdbd",
          "200": "#bbb",
        },
        black: "#000",
      },
      fontFamily: {
        body: "Roboto",
        geo: "Geo",
      },
      borderRadius: {
        "8xs": "5px",
        "21xl": "40px",
        "81xl": "100px",
      },
    },
    fontSize: {
      xl: "20px",
      "29xl": "48px",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "24px",
      base: "16px",
      "13xl": "32px",
      xs: "12px",
      "181xl": "200px",
      "17xl": "36px",
      sm: "0.8rem",
    },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    container: {
      screens: {
        "2xl": "100%",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        /* Chrome, Safari, Edge, Opera */
        ".no-spin::-webkit-inner-spin-button": {
          "-webkit-appearance": "none",
          margin: "0",
        },
        ".no-spin::-webkit-outer-spin-button": {
          "-webkit-appearance": "none",
          margin: "0",
        },
        /* Firefox */
        ".no-spin": {
          "-moz-appearance": "textfield",
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
