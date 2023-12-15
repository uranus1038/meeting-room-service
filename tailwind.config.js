/** @type {import('tailwindcss').Config} */
export default {
  content: [ './src/**/*.{js,jsx,ts,tsx}', 'node_modules/flowbite-react/lib/esm/**/*.js'],
  theme: {
    extend: { zIndex: {
      '100': '100',
    }},
  },
  plugins: [require('flowbite/plugin')],
}

