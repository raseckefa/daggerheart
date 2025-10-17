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
        'dagger': {
          dark: '#0f0f1a',
          card: '#1a1a2e',
          gold: '#d4af37',
          purple: '#6366f1',
          border: '#2d3748',
        }
      },
      boxShadow: {
        'glow-gold': '0 0 20px rgba(212, 175, 55, 0.6)',
        'glow-gold-strong': '0 0 40px rgba(212, 175, 55, 0.9)',
        'glow-purple': '0 0 20px rgba(99, 102, 241, 0.4)',
        'card-hover': '0 20px 40px rgba(0, 0, 0, 0.3)',
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'card-reveal': 'cardReveal 0.3s ease-out',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.6)' },
          '50%': { boxShadow: '0 0 40px rgba(212, 175, 55, 0.9)' },
        },
        cardReveal: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px) rotateX(-10deg)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0) rotateX(0)'
          },
        },
      },
    },
  },
  plugins: [],
}
