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
      backgroundColor: {
        'whiteBg': '#ECECEC',
      },
      fontSize: {
        'heading-1': '44px',
        'heading-2': '32px',
        'heading-mob': '28px',
        'heading-3': '24px',
        'body-md': '20px',
        'body-lg': '18px',
        'body-default': '16px',
        'body-sm': '14px',
        'body-xs': '12px',
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
        'e-Ukraine': ['e-Ukraine', 'sans']
      },

    },
  },
  plugins: [],
}

