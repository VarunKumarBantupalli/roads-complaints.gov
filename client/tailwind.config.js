/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gold-light': '#FFD700',
        'gold-medium': '#FFC107',
        'gold-dark': '#FF8C00',
        'bronze': '#CD7F32',
        'champagne': '#F7E7CE',
        'golden-sand': '#DAA520',
        'amber': '#FFBF00',

        // Gradient Color Stops (Moved Inside Colors)
        'gold-start': '#FFD700',
        'gold-end': '#FF8C00',
        'bronze-start': '#CD7F32',
        'bronze-end': '#FFD700',
        'champagne-start': '#F7E7CE',
        'champagne-end': '#FFD700',
        'sand-start': '#DAA520',
        'sand-end': '#FFC107',
        'amber-start': '#FFBF00',
        'amber-end': '#FF8C00',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      animation: {
        scroll: 'scroll 15s linear infinite',
        scrollfast: 'scroll 10s linear infinite',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
  