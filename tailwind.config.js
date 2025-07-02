/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      borderRadius: {
        lg: "10px",
      },
      colors: {
        primary: "#208d60",
        secondary: "#eeeeee",
        muted: "#cccccc",
        accent: "#c1ffe3",
        danger: "#ff5c5c",
      },
    },
  },
  plugins: [],
};
