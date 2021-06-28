module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#1F263E',
        secondary: '#1B2132',
        info: '#F8F9FA',
        grash: '#13AA52',
      },
      
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}