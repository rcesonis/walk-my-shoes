/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mainBlack: "#040404",
        customBlue: "#1868ed",
        customLightBlue:"#4285F4",
        customGray: "#BCBACF",
      },
      backgroundImage: {
        'bg-image': "url('/assets/img/mountains')"
      }
    },
  },
  plugins: [],
}