/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#14A1F0",
        secondary:{
          100:"#171F26",
          900:"#0C151D"
        }
        
      }
    },
  },
  plugins: [],
}

