/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        // Michael Okpara University of Agriculture, Umudike (MOUAU) Official Palette
        'mouau-green': '#006b3c',       // MOUAU Green
        'mouau-yellow': '#ffcc00',      // MOUAU Yellow
        'mouau-darkGreen': '#004d29',   // MOUAU Dark Green

        // UI Core Colors (no gradients)
        border: '#e5e7eb',
        input: '#f1f5f9',
        ring: '#006b3c',
        background: '#ffffff',
        foreground: '#000000',

        primary: {
          DEFAULT: '#006b3c', // MOUAU Green
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#ffcc00', // MOUAU Yellow
          foreground: '#000000',
        },
        accent: {
          DEFAULT: '#ffcc00', // MOUAU Yellow
          foreground: '#000000',
        },
        muted: {
          DEFAULT: '#f3f4f6',
          foreground: '#6b7280',
        },
        destructive: {
          DEFAULT: '#ef4444',
          foreground: '#ffffff',
        },
        popover: {
          DEFAULT: '#ffffff',
          foreground: '#111827',
        },
        card: {
          DEFAULT: '#ffffff',
          foreground: '#1f2937',
        },
      },
      borderRadius: {
        lg: '1rem',
        md: '0.75rem',
        sm: '0.5rem',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
