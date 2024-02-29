/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        light: 'var(--light)',
        dark: 'var(--dark)',
        danger: 'var(--danger)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'custom-background':
          "url('/images/background.svg'), linear-gradient(180deg, #a3b7c8 0%, #5a9891 100%)",
      },
    },
  },
  plugins: [],
};
