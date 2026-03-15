/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
    ],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                primary: "#1D53A0",
                brand: {
                    DEFAULT: "#1D53A0",
                    blue: "#1D53A0",
                },
                "primary-dark": "#153E78",
            },
        },
    },
    plugins: [],
};
