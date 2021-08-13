/*
 * @Date: 2021-07-03 12:06:55
 * @LastEditors: wangwenbo
 * @LastEditTime: 2021-07-03 16:40:46
 * @FilePath: \vueTemplate\tailwind.config.js
 */
const Color = require('color')

const PRIMARY_COLOR = '#4e466b'

module.exports = {
  purge: {
    enable: process.env.NODE_ENV === 'production',
    content: ['./public/**/*.html', './src/**/*.vue', './node_modules/vr-commons/**/*.vue'], // !!!vr-commons & purge
    options: {
      whitelist: [],
      // for element-ui (/el-.+$/)
      whitelistPatterns: [ /el-.+$/, /-(leave|enter|appear)(|-(to|from|active))$/, /^(?!(|.*?:)cursor-move).+-move$/, /^router-link(|-exact)-active$/ ],
    }
  },
  darkMode: 'class', // or 'media' or 'class' or false
  theme: {
    extend: {
      colors: {
        'primary': PRIMARY_COLOR,
        'primary-light': Color(PRIMARY_COLOR).lighten(0.2).string(),
        'primary-light-1': Color(PRIMARY_COLOR).lighten(0.4).string(),
        'primary-light-2': Color(PRIMARY_COLOR).lighten(0.6).string(),
        'primary-light-3': Color(PRIMARY_COLOR).lighten(0.8).string(),
        'primary-light-4': Color(PRIMARY_COLOR).lighten(0.9).string(),
        'primary-dark': Color(PRIMARY_COLOR).darken(0.4).string(),
        'primary-fade': Color(PRIMARY_COLOR).fade(0.3).string(),
        'secondary': '#fde48f',
        'secondary-light': Color('#fde48f').lighten(0.2).string(),
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
  ]
}
