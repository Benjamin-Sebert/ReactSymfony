/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./assets/**/*.js",
    "./templates/**/*.html.twig",
    "./assets/react/controllers/*.jsx",
  ],
  theme: {
    extend: {
      colors: {
        'custom-green': '#38FF9C',
        'custom-black': '#2C2C2C',
        'custom-blue': '#2559DA',
        'custom-purple': '#7F00FF'
        // ... autres couleurs si nécessaire
      },
    },
  },
  plugins: [],
}
