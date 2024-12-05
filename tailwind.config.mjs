/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        'mukta': ['Mukta Vaani', 'sans-serif'],
      },
      colors: {
        primary: '#0066cc',
        secondary: '#004d99',
      },
    },
  },
  plugins: [],
}