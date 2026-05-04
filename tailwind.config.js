/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fef3f2',
          100: '#fde8e6',
          200: '#fbd5d1',
          300: '#f7b3ac',
          400: '#f18279',
          500: '#e8524a',
          600: '#d4342b',
          700: '#b22820',
          800: '#93251f',
          900: '#7a2520',
          950: '#420f0c',
        },
        dark: {
          900: '#0f0f0f',
          800: '#1a1a1a',
          700: '#242424',
          600: '#2e2e2e',
          500: '#3a3a3a',
        }
      },
    },
  },
  plugins: [],
}
