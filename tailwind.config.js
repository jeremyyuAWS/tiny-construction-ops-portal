/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#000000',
        secondary: '#2D2D2D',
        accent: {
          indigo: '#6366F1',
          blue: '#3B82F6',
          green: '#10B981',
        },
        success: '#22C55E',
        warning: '#F59E0B',
        error: '#EF4444',
        muted: '#71717A',
        background: {
          light: '#FFFFFF',
          dark: '#F9FAFB',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};