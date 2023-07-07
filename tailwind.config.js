module.exports = {
    content: [
        "index.html",
        "./src/**/*.{js,jsx,ts,tsx,vue,html}",
        "node_modules/daisyui/dist/**/*.js",
        "node_modules/react-daisyui/dist/**/*.js",
    ],
    theme: {
        extend: {
            animation: {
                "spin-logo": "spin 2.5s ease-in-out infinite",
            },
        },
    },
    plugins: [require("@tailwindcss/forms"), require("daisyui")],
}
