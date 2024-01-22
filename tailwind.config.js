/** @type {import('tailwindcss').Config} */
module.exports = {
    // other configurations
  theme: {
  extend: {},
  },
  darkMode: 'class',
  variants: {},
  plugins: [],
  content: [
    "./assets/**/*.js",
    "./templates/**/*.html.twig",
    "./assets/react/controllers/*.jsx",
  ],
  theme: {
    extend: {
      colors: {
        'custom-gray': '#38bdf8',
        'custom-black': '#2C2C2C',
        'custom-blue': '#FF4225',
        'custom-red': '#F08080',
        'custom-green-logo': '#9bf0db',
        'custom-light-purple':'#835bbc'
        
        // ... autres couleurs si nécessaire
      },
    },
  },
  plugins: [],
}
