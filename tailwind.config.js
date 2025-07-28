/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['var(--font-inter)', 'sans-serif'],
        'playfair': ['var(--font-playfair)', 'serif'],
      },
      colors: {
        'off-white': '#F5F5DC',
        'sage-green': '#B2AC88',
        'dusty-terracotta': '#E07A5F',
        'near-black': '#121212',
      },
    },
  },
  plugins: [],
};