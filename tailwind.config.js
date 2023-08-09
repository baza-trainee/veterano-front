/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "320px",
      md: "768px",
      lg: "1280px",
    },

    extend: {
      fontSize: {
        "h1-lg": [
          "44px",
          {
            lineHeight: " 130%",
            fontWeight: "700",
          },
        ],
        "h1-md": [
          "32px",
          {
            lineHeight: "125%",
            fontWeight: "700",
          },
        ],
        "h1-sm": [
          "32px",
          {
            lineHeight: "125%",
            fontWeight: "700",
          },
        ],
        "h2-lg": [
          "32px",
          {
            fontWeight: "700",
            lineHeight: "125%",
          },
        ],
        "h2-md": [
          "28px",
          {
            fontWeight: "700",
            lineHeight: "142.857%",
          },
        ],
        "h2-sm": [
          "28px",
          {
            fontWeight: "700",
            lineHeight: "142.857%",
          },
        ],
        "h3-lg": [
          "28px",
          {
            fontWeight: "700",
            lineHeight: "142.857%",
          },
        ],
        "h3-md": [
          "28px",
          {
            fontWeight: "700",
            lineHeight: "142.857%",
          },
        ],
        "h3-sm": [
          "28px",
          {
            fontWeight: "700",
            lineHeight: "142.857%",
          },
        ],
        "h4-lg": [
          "24px",
          {
            fontWeight: "500",
            lineHeight: "125%",
          },
        ],
        "h4-md": [
          "24px",
          {
            fontWeight: "500",
            lineHeight: "125%",
          },
        ],
        "h4-sm": [
          "24px",
          {
            fontWeight: "500",
            lineHeight: "125%",
          },
        ],
        "h5-lg": [
          "18px",
          {
            fontWeight: "500",
            lineHeight: "155%",
          },
        ],
        "h5-md": [
          "18px",
          {
            fontWeight: "500",
            lineHeight: "155%",
          },
        ],
        "h5-sm": [
          "18px",
          {
            fontWeight: "500",
            lineHeight: "155%",
          },
        ],
        "p-lg": [
          "18px",
          {
            fontWeight: "300",
            lineHeight: "155%",
          },
        ],
        "p-md": [
          "16px",
          {
            fontWeight: "300",
            lineHeight: "150%",
          },
        ],
        "p-sm": [
          "16px",
          {
            fontWeight: "300",
            lineHeight: "150%",
          },
        ],
      },
      backgroundColor: {
        whiteBg: "#ECECEC",
      },
      colors: {
        black: "#151515",
        white: "#FCFCFC",
        yellow100: "#F7D67F",
        yellow50: "#F9E1A1",
        yellow30: "#FDF5E1",
        grey100: "#262626",
        grey50: "#808080",
        grey30: "#ECECEC",
        error100: "#D30018",
        error50: "#FE1F38",
        error30: "#FF9EA9",
        success100: "#7ED222",
      },
      fontFamily: {
        "e-Ukraine": ["e-Ukraine", "sans-serif"],
      },
    },
  },
  plugins: [],
};
