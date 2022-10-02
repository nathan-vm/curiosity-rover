/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
    './index.html'
  ],
  theme: {
    extend: {
      backgroundImage: {
        mars: "url('/mars.jpg')",
        'game-gradient': 'radial-gradient(circle, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6530987394957983) 100%)'
      }
    },
  },
  plugins: [],
}
