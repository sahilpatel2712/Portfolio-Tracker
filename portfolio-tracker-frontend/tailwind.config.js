/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bgColor: {
          DEFAULT: "#101115",
          custom: "#1E1E1E",
        },
        textColor: {
          danger: "#DC3545",
          success: "#28A745",
          light: "#fff",
        },
      },
    },
  },
  plugins: [],
};
