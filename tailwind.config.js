/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Opsional: Pastikan font Inter atau default sans tersedia
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // Penting untuk merapikan hasil text prompt (prose class)
  ],
}