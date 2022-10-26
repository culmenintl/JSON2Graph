module.exports = {
    content: ['index.html', './src/**/*.{js,jsx,ts,tsx,vue,html}'],
    theme: {
        extend: {
            animation: {
                'spin-logo': 'spin 2.5s ease-in-out infinite',
            },
        },
    },
    plugins: [require('@tailwindcss/forms')],
};
