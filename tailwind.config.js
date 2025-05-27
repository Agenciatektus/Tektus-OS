/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: '#414b4e',
        ring: '#fffa66',
        background: '#0f1515',
        foreground: '#f4f4f5',
      },
    },
  },
  plugins: [],
} 