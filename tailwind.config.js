/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 使用自定义名称，避免覆盖 Tailwind 默认的完整色阶
        // Colors extracted from character image
        'char-navy': '#1B263B',   // Dark Jacket
        'char-blue': '#2E5CFF',   // Vivid Eyes
        'char-silver': '#E2E8F0', // White Hair/Accents
        'char-darkbox': '#0F172A', // Darker background accents

        // Legacy/Base colors (keeping for compatibility or deleting if unused, let's keep nicely named ones)
        'brand-rose': '#f472b6',
        'brand-violet': '#a78bfa',
        'brand-cyan': '#22d3ee',
        'brand-blue': '#60a5fa',
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

