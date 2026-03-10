import type { Config } from 'tailwindcss'

const config: Config = {
  // Enable dark mode with class strategy
  darkMode: 'class',
  
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  
  theme: {
    extend: {
      colors: {
        // Your existing colors
        brand: '#3B82F6',
        'brand-dark': '#1E40AF',
        primary: '#1F2937',
        secondary: '#6B7280',
        
        // Tiger theme colors
        tiger: {
          orange: '#FF8C00',
          red: '#DC2626',
          yellow: '#FBBF24',
          amber: '#F59E0B',
        },
      },
      
      backgroundImage: {
        'gradient-to-br': 'linear-gradient(to bottom right, var(--tw-gradient-stops))',
        'gradient-to-r': 'linear-gradient(to right, var(--tw-gradient-stops))',
        'gradient-to-b': 'linear-gradient(to bottom, var(--tw-gradient-stops))',
        'gradient-to-tr': 'linear-gradient(to top right, var(--tw-gradient-stops))',
      },
      
      fontFamily: {
        rubik: ['Rubik', 'sans-serif'],
        quicksand: ['Quicksand', 'sans-serif'],
        caveat: ['Caveat', 'cursive'],
      },
      
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      
      boxShadow: {
        'glow-orange': '0 0 20px rgba(255, 140, 0, 0.4)',
        'glow-orange-lg': '0 0 40px rgba(255, 140, 0, 0.6)',
        'tiger': '0 4px 20px rgba(255, 140, 0, 0.25)',
        'tiger-lg': '0 20px 60px rgba(255, 140, 0, 0.3)',
      },
      
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  
  plugins: [],
}

export default config
