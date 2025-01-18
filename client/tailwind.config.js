/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customBlue: '#076194',
      },
      fontFamily: {
        lora: ['Lora', 'serif'],
      },
    },
  },
  plugins: [],
}

