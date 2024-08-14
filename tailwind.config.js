/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",

  ],
  theme: {
    extend: {},
    screens: {
      xs: { max: '897px' }, // Mobile (iPhone 3 - iPhone XS Max).
      md: { min: '898px', max: '1199px' }, // Tablet (matches max: iPad Pro @ 1112px).
      lg: { min: '1200px ' }, // Desktop smallest.
      xl: { min: `1900px` }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}

