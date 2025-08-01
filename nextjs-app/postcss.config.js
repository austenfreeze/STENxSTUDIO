// nextjs-app/postcss.config.js
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {}, // <--- THIS LINE IS CRUCIAL
    autoprefixer: {},
  },
};