/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#eef3f9',
          100: '#d4e2f0',
          200: '#a8c5e1',
          300: '#7aa7d0',
          400: '#5584b4',
          500: '#385b81',
          600: '#2d4a68',
          700: '#223950',
          800: '#172839',
          900: '#0f1b27',
        },
        beige: {
          50: '#f5f8fc',
          100: '#e8f0f7',
          200: '#d0e1ef',
          300: '#b5cfe4',
          400: '#93b6d7',
        },
        charcoal: {
          DEFAULT: '#1a2a3a',
          light: '#2d4155',
          lighter: '#567089',
        },
        rose: {
          accent: '#c8a96e',
          light: '#e8d9bc',
          dark: '#a8852e',
        },
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'card': '0 4px 25px -5px rgba(0, 0, 0, 0.06)',
        'hover': '0 10px 40px -10px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
