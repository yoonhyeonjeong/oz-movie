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
            red: "#bf1b23",
        },
        extend: {
            width: {
                300: "300px", // w-300을 추가
            },
        },
    },
    plugins: [],
};
