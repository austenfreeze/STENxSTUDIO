// nextjs-app/postcss.config.js
module.exports = {
  plugins: {
    // Change 'tailwindcss' to '@tailwindcss/postcss'
    '@tailwindcss/postcss': {}, // This is the new way to include the Tailwind PostCSS plugin
    autoprefixer: {},
  },
};