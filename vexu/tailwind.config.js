/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        porcelain: '#F2F4F1',
        paper: '#FFFFFF',
        mist: '#E7EEE9',
        ink: { DEFAULT: '#10201A', 2: '#172B23', 3: '#22392F' },
        slate: '#57655E',
        line: '#DCE2DE',
        signal: { DEFAULT: '#00C864', deep: '#00824A', soft: '#8BE6B4' },
      },
      fontFamily: {
        sans: ['Archivo', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      maxWidth: { site: '76rem' },
    },
  },
  plugins: [],
};
