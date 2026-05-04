/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          400: '#f18279', 500: '#e8524a', 600: '#c8102e',
          700: '#8e0a1f', 800: '#4c0513',
        },
        dark: {
          500: '#3a3a3a', 600: '#2e2e2e', 700: '#242424',
          800: '#1a1a1a', 900: '#0f0f0f',
        },
      },
      fontFamily: {
        sans:  ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        serif: ['Fraunces', 'Georgia', 'serif'],
        mono:  ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
