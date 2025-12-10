module.exports = {
    content: [
      "./src/**/*.{html,js}",
      "./src/partials/**/*.html"
    ],
    theme: {
      extend: {
        colors: {
          primary: '#401F3E',
          secondary: '#95C623',
          accent: '#034748'
        },
        fontFamily: {
          sans: ['Open Sans', 'sans-serif'],
          heading: ['Poppins', 'sans-serif']
        }
      },
    },
    plugins: [],
  }