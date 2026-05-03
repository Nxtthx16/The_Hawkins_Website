/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.html",
    "./**/*.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        serif: ['Lora', 'serif'],
      },
      colors: {
        yellow: {
          500: '#eab308',
          600: '#ca8a04',
        }
      },
      animation: {
        'reveal': 'grandReveal 2.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'sweep': 'sweep 0.5s ease-in-out',
      },
      keyframes: {
        grandReveal: {
          '0%': { opacity: '0', transform: 'translateY(20px) scale(0.98)', letterSpacing: '-0.05em' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)', letterSpacing: '-0.02em' },
        },
        sweep: {
          '0%': { opacity: '0', marginTop: '-10px' },
          '100%': { opacity: '1', marginTop: '0px' },
        }
      }
    },
  },
  plugins: [],
}