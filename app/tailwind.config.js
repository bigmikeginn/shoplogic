export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      spacing: {
        'safe-top': 'max(1rem, env(safe-area-inset-top))',
        'safe-bottom': 'max(1rem, env(safe-area-inset-bottom))',
      },
      backgroundImage: {
        'gradient-warm': 'linear-gradient(135deg, #f97316, #dc2626)',
        'gradient-cool': 'linear-gradient(135deg, #0ea5e9, #14b8a6)',
        'gradient-vibrant': 'linear-gradient(135deg, #a855f7, #6366f1)',
      },
      fontSize: {
        'responsive-sm': 'clamp(0.75rem, 2vw, 0.875rem)',
        'responsive-base': 'clamp(1rem, 2.5vw, 1.125rem)',
        'responsive-lg': 'clamp(1.125rem, 3vw, 1.5rem)',
        'responsive-xl': 'clamp(1.5rem, 4vw, 2rem)',
        'responsive-2xl': 'clamp(1.875rem, 5vw, 2.25rem)',
      },
      animation: {
        'pulse-glow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
