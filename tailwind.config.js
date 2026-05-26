/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: { extend: {
    fontFamily: {
        almarai: ['Almarai', 'sans-serif'],
      },
      keyframes:{
        moveEcg:{
          '0%': { 'background-position': '0 50%' },
          '100%': { 'background-position': '-300px 50%' },
        },
      },
      animation: {
        'move-ecg': 'moveEcg 2s linear infinite',
      },
        },
      },
  plugins: [],
}