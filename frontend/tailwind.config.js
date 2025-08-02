/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // VERY important!
  ],
  theme: {
    extend: {
     keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        float: 'float 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
