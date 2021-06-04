import { blue, blueGray } from 'twind/colors';

/** @type {import('twind').Configuration} */
export default {
  mode: 'silent',
  theme: {
    extend: {
      screens: {
        standalone: { raw: '(display-mode:standalone)' },
      },
      colors: {
        gray: {
          ...blueGray,
          warm: '#faf9f7',
        },
        red: {
          100: '#FDEFE5',
          200: '#FBDDCC',
          300: '#F4C2AF',
          400: '#E9A797',
          500: '#DB8175',
          600: '#BC5955',
          700: '#9D3A3F',
          800: '#7F2530',
          900: '#691627',
        },
        green: {
          100: '#CDFDD6',
          200: '#9BFBB7',
          300: '#69F49F',
          400: '#43EA94',
          500: '#0BDD86',
          600: '#08BE84',
          700: '#059F7E',
          800: '#038071',
          900: '#026A68',
        },
        blue: {
          100: '#D4FEF9',
          200: '#A9FDFA',
          300: '#7DF6FB',
          400: '#5DE6F7',
          500: '#29CDF2',
          600: '#1DA1D0',
          700: '#147AAE',
          800: '#0D588C',
          900: '#073F74',
        },
      },
    },
  },
};
