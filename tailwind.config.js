/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blush: {
          50: '#FDF8F7',
          100: '#FBF0EE',
          200: '#F5DDD9',
          300: '#E8CFCB', // brand blush
          400: '#D9B5AF',
          500: '#C6948C',
        },
        roseGold: {
          50: '#FDF7F8',
          100: '#F8E9EB',
          200: '#F1D5D9',
          300: '#E4B5BD',
          400: '#CF8E98',
          500: '#B76E79', // brand rose gold
          600: '#A05763',
          700: '#83424D',
          800: '#69363E',
          900: '#5A2F36',
        },
        ivory: {
          50: '#FDFCF9',
          100: '#FAF6EE',
          200: '#F7F1E8', // brand warm ivory
          300: '#EDE2D1',
          400: '#DDD0BC',
        },
        mauve: {
          50: '#F7F5F6',
          100: '#EDE9EC',
          200: '#DDD5DB',
          300: '#C2B5BF',
          400: '#9E8D9A',
          500: '#81747A', // brand muted text
          600: '#6A5B63',
          700: '#51434A', // brand deep mauve
          800: '#43373D',
          900: '#32292E',
        },
        warmBg: '#FBF8F6',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(81, 67, 74, 0.06), 0 2px 6px -1px rgba(81, 67, 74, 0.04)',
        'premium': '0 12px 36px -4px rgba(81, 67, 74, 0.10), 0 4px 12px -2px rgba(81, 67, 74, 0.05)',
        'glow': '0 0 25px -5px rgba(183, 110, 121, 0.25)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
      }
    },
  },
  plugins: [],
}
