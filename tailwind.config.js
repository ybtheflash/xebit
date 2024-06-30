module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ff1616",
        background: "#070707",
      },
      fontFamily: {
        horizon: ["Horizon", "sans-serif"],
        mistrully: ["Mistrully", "sans-serif"],
      },
    },
  },
  plugins: [],
};
