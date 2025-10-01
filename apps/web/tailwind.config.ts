import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blood: '#C62828',
        darkred: '#8B0000',
        accent: '#E53935',
      },
      borderRadius: { circle: '9999px' },
    },
  },
  plugins: [],
}
export default config