/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./admin/**/*.html",
    "./pricing/**/*.html",
    "./hostinger-agent/**/*.html",
    "./managed-openclaw/**/*.html",
    "./managed-hermes-agent/**/*.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navy-bg': '#0D1522',
        'navy-card': '#131E2E',
        'navy-card-hover': '#162235',
        'navy-border': '#1E293B',
        'navy-border-light': '#2d3f5a',
        'royal-blue': '#1769FF',
        'royal-cyan': '#48B7FF',
        'brand-purple': '#673de6',
        'brand-accent': '#7b66ff',
        'brand-dark': '#18181a',
        'brand-deep': '#000000',
        'brand-surface': '#101011',
        'brand-gray': '#f5f5f6',
        'brand-muted': '#94A3B8',
        'brand-red': '#ff4646',
      },
      fontFamily: {
        sans: ['"DM Sans"', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        'none': '0px',
        'sm': '2px',
        'DEFAULT': '4px',
        'md': '6px',
        'lg': '8px',
        'xl': '12px',
        '2xl': '16px',
      }
    },
  },
  plugins: [],
}
