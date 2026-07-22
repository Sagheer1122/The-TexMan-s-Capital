/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          light: '#0a2e5c',
          DEFAULT: '#021B3A',
          dark: '#011126',
        },
        brandGreen: {
          light: '#33ff7a',
          DEFAULT: '#00C853',
          dark: '#00963e',
        },
        textColor: '#111827',
        bgLight: '#F8FAFC',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
