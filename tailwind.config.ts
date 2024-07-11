import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './node_modules/flowbite-react/lib/**/*.js',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      colors: {
        secondary: '#F3F2F8',
        tertiary: '#56B665',
        quaternary: '#CD7D48',
        quinary: '#E5F9E8'
      }
    }
  },
  plugins: [require('flowbite/plugin')]
};
export default config;
