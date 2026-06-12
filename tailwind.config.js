export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#101828",
        mint: "#19d3a2",
        limepop: "#c8f230",
        coral: "#ff6b6b",
        solar: "#ffc857",
        lagoon: "#1580ff",
        violetpop: "#7c3aed"
      },
      boxShadow: {
        glow: "0 24px 70px rgba(21, 128, 255, 0.22)",
        soft: "0 18px 50px rgba(16, 24, 40, 0.11)"
      }
    }
  },
  plugins: []
};
