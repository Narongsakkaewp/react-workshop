/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}",],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        kanit:['Kanit', 'sans-serif'],
      },
      colors: {
        emeraldStart: 'rgb(2, 182, 104)',
        emeraldEnd: 'rgb(1, 111, 65)',
      },
    },
  },
  plugins: [],
}