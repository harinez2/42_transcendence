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
        // gray: {
        //   "100": "#8a8a8a",
        //   "200": "#8a898d",
        //   "300": "#808080",
        //   "400": "#777",
        //   "500": "#242424",
        //   "600": "rgba(37, 37, 37, 0.8)",
        // },
        gainsboro: "#d9d9d9",
        whitesmoke: "#f2f2f2",
        silver: {
          "100": "#bdbdbd",
          "200": "#bbb",
          "300": "#bcb9b9",
        },
        black: "#000",
        "gray-200": "#c1c9d2",
        "blue-500": "#5469d4",
        "base-white": "#fff",
        "gray-700": "#3c4257",
        "gray-100": "#e3e8ee",
        "gray-gray-700": "#383c42",
        "light-gray-gray-100": "#f4f5f7",
      },
      fontFamily: {
        body: "Roboto",
        "small-600": "Inter",
        geo: "Geo",
      },
      borderRadius: {
        "8xs": "5px",
        "21xl": "40px",
        "81xl": "100px",
      },
    },
    fontSize: {
      sm :"14px",
      // sm: "0.8rem",
      xs: "12px",
      base: "16px",
      xl: "20px",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "24px",
      "13xl": "32px",
      "17xl": "36px",
      "181xl": "200px",
      "29xl": "48px",
      "77xl": "96px",
      "181xl": "200px",
      inherit: "inherit",
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
  corePlugins: {
    preflight: false,
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
