/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '400px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        yuv: {
          primary: '#6366f1', // Indigo
          secondary: '#8b5cf6', // Purple
          accent: '#ec4899', // Pink
        }
      }
    },
  },
  plugins: [],
}
