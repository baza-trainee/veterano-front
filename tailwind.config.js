/** @type {import('tailwindcss').Config} */

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      'sm': '320px',
      'md': '768px',
      'lg': '1280px'
    },
    extend: {
      boxShadow: {
        'small': '0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.10)',
        'middle': '0px 4px 6px -2px rgba(16, 24, 40, 0.03), 0px 12px 16px -4px rgba(16, 24, 40, 0.08)',
        'large': '0px 8px 8px -4px rgba(16, 24, 40, 0.03), 0px 20px 24px -4px rgba(16, 24, 40, 0.08)',
      },
      backgroundColor: {
        'whiteBg': '#ECECEC',
      },
      colors: {
        'black': "#151515",
        'white': "#FCFCFC",
        'yellow100': "#F7D67F",
        'yellow50': "#F9E1A1",
        'yellow30': "#FDF5E1",
        'grey100': "#262626",
        'grey50': "#808080",
        'grey30': "#ECECEC",
        'error100': "#D30018",
        'error50': "#FE1F38",
        'error30': "#FF9EA9",
        'success100': "#7ED222"
      },
      fontFamily: {
        'e-Ukraine': ['e-Ukraine', 'sans-serif']
      },
    },
  },
  plugins: [],
}

