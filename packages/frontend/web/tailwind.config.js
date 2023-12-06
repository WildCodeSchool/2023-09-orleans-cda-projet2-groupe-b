/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        secondary: 'var(--secondary)',
        dark: 'var(--dark)',
        grey: 'var(--grey)',
        light: 'var(--light)',
        danger: 'var(--danger)',
      },
    },
    plugins: [],
  },
};
