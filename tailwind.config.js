// tailwind.config.js
module.exports = {
    content: [
        "./index.html",
        "./rules.html",
        "./*.{html,js}",
        "./assets/js/**/*.{html,js}"
    ],
    safelist: [
        'bg-gray-400',
        'disabled:bg-gray-400',
    ],

    theme: {
        extend: {},
    },
    plugins: [],
};