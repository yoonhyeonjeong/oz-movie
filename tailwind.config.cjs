/** @type {import('tailwindcss').Config} */
const pxToRem = require("tailwindcss-preset-px-to-rem");
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    presets: [pxToRem],
    theme: {
        colors: {
            transparent: "transparent",
            white: "#ffffff",
            midnightBlack: "#121212",
            metal: "#565584",
            tahiti: "#3ab7bf",
            silver: "#ecebff",
        },
    },
    plugins: [],
};
