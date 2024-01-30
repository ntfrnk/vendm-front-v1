/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.svelte', './src/**/*.css'],
  content: [],
  theme: {
    extend: {},
    fontFamily: {
      'sans': ['Nunito Sans'],
      'roboto': ['Roboto Condensed'],
    }
  },
  plugins: [],
  important: true,
}