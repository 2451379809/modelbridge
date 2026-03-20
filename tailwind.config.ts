/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        syne: ['var(--font-syne)', 'sans-serif'],
        dm: ['var(--font-dm)', 'sans-serif'],
      },
      colors: {
        bg: '#0d0f14',
        surface: '#13161e',
        surface2: '#1a1e2a',
        surface3: '#222636',
        accent: '#6366f1',
        accent2: '#818cf8',
      },
    },
  },
  plugins: [],
}
