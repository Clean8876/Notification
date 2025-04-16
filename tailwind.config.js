/** @type {import('tailwindcss').Config} */
export default {
  content: [   "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors: {
        primaryButton: "#007BFF",
      },
      animation: {
        'step-pulse': 'step-pulse 1.5s ease-in-out infinite',
      },
      keyframes: {
        'step-pulse': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
      },
      fontFamily: {

        Poppins:["Poppins", 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 8px 32px rgba(0,0,0,0.05)',
        'hard': '0 4px 24px rgba(0,0,0,0.1)'
      },
      transitionDuration: {
        '250': '250ms',
        '400': '400ms'
      }
      
    },
  },
  plugins: [],
}

