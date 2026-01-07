import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef3f2',
          100: '#fee5e2',
          200: '#fecfca',
          300: '#fcafa5',
          400: '#f87f71',
          500: '#f05344',
          600: '#dd3726',
          700: '#ba291b',
          800: '#9a261a',
          900: '#80261c',
        },
      },
    },
  },
  plugins: [],
};

export default config;
