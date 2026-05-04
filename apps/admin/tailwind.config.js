/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          400: '#f18279', 500: '#e8524a', 600: '#d4342b',
          700: '#b22820', 800: '#93251f',
        },
        dark: {
          500: '#3a3a3a', 600: '#2e2e2e', 700: '#242424',
          800: '#1a1a1a', 900: '#0f0f0f',
        },
      },
    },
  },
  plugins: [],
}
