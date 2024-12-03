module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "src/**/*.{js,jsx,ts,tsx}", // Adjust if your project structure is different
  ],
  theme: {
    extend: {
      keyframes: {
        shake: {
          "0%": {
            transform: "translateX(0px)"
          },
          "33%": {
            transform: "translateX(-3px)"
          },
          "66%": {
            transform: "translateX(3px)"
          },
          "100%": {
            transform: "translateX(0px)"
          }
        },
      },
      animation: {
        shakeOnce: "shake 0.2s linear 2",
      },
    },
  },
  plugins: [],
};
