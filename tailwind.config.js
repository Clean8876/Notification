/** @type {import('tailwindcss').Config} */
export default {
  content: [   "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors: {
        primaryButton: "#007BFF",
      },
      fontFamily: {

        Poppins:["Poppins", 'sans-serif'],
      },
    },
  },
  plugins: [],
}

