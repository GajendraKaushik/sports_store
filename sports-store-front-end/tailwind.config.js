/** @type {import('tailwindcss').Config} */

const flowbite = require("flowbite-react/tailwind");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
    
  ],
  theme: {
    extend: {
      boxShadow: {
        '3xl': '-5px 10px 15px 6px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);',
      }
    },
    // screens: {
    //   'tablet': '900px',
 
    // },
  },
  plugins: [
    flowbite.plugin(),
  ],
}

