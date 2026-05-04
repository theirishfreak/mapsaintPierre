/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        western: {
          gold: '#ffd766',
          amber: '#ffaa44',
          brown: '#7a4818',
          dark: '#1a0a05',
        },
      },
    },
  },
  plugins: [],
}

