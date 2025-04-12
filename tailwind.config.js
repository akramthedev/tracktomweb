/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'xs': '380px', // Extra petit
      'sm': '640px', // Petit
      'md': '768px', // Moyen
      'lg': '1024px', // Grand
      'xl': '1280px', // Extra grand
      '2xl': '1536px', // Double extra grand
    },
    extend: {
      width: {
        // '200': '200px',
      },
      boxShadow: {
        'xx': '0px 0px 2px rgba(0, 0, 0, 0.5)',
      },
      colors: {
        'blanc':'#dce2e0',
        'green1': '#8dd6a4',
        'green2': '#4c7559',
        'green3':  '#EEF5EC',
        'green4':'#78B044',
        'green5': '#F7FFF5',
        'green6': '#66A66D',
        'green7': '#E7FFE8'


      },
      fontFamily: {
        'sans': ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
}


