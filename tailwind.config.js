/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        solar: {
          dark: "#0B0F19",
          card: "#13192B",
          cardHover: "#1A2238",
          border: "#1E293B",
          yellow: "#FACC15",
          orange: "#F97316",
          cyan: "#06B6D4",
          purple: "#A855F7",
          green: "#22C55E",
          red: "#EF4444"
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 10px rgba(250, 204, 21, 0.2)' },
          '100%': { boxShadow: '0 0 25px rgba(250, 204, 21, 0.6)' },
        }
      }
    },
  },
  plugins: [],
}
