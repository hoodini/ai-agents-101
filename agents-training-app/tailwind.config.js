/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
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
