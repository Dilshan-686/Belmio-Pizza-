/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        basebg: 'rgb(17,17,17)', 
        letter: 'rgb(225,225,225)',
        slogan : 'rgb(123,198,221)',
        ouror:'rgb(225,100,0)',
        mygray:'#F4F4F4'
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        passion: ['Passion One', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
