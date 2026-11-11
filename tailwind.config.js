/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        night: '#090D18',
        surface: '#111827',
        elevated: '#1A2332',
        brand: '#F97316',
        brandsoft: 'rgba(249, 115, 22, 0.14)',
        iris: '#6366F1',
        irissoft: 'rgba(99, 102, 241, 0.14)',
        muted: '#9CA3AF',
        line: 'rgba(156, 163, 175, 0.14)',
        inputline: 'rgba(156, 163, 175, 0.28)',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        shell: '72rem',
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseglow: {
          '0%, 100%': { opacity: '0.55' },
          '50%': { opacity: '0.9' },
        },
      },
      animation: {
        floaty: 'floaty 7s ease-in-out infinite',
        pulseglow: 'pulseglow 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
