/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3b82f6',
          light: '#60a5fa',
          dark: '#2563eb',
        },
        secondary: '#10b981',
        bg: {
          light: '#f9fafb',
          dark: '#111827',
        },
        text: {
          light: '#1f2937',
          dark: '#f3f4f6',
        },
        border: {
          light: '#e5e7eb',
          dark: '#374151',
        },
        error: '#ef4444',
        success: '#22c55e',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        quicksand: ['Quicksand', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
