export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: "Quicksand, sans-serif",
    },
    screens: {
      sm: "760px",
      // => @media (min-width: 576px) { ... }

      md: "1100px",
      // => @media (min-width: 960px) { ... }

      lg: "1440px",
      // => @media (min-width: 1440px) { ... }
    },
    extend: {
      colors: {
        accent: {
          50: "#FAF5F0",
          100: "#F4ECE1",
          200: "#E8D6BF",
          300: "#DDC2A2",
          400: "#D2AF84",
          500: "#C69963",
          600: "#B78343",
          700: "#926835",
          800: "#6C4D28",
          900: "#4B351B",
          950: "#382814",
        },
      },
    },
  },
  plugins: [],
};
