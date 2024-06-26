/** @type {import('tailwindcss').Config} */
export default {
  // content: [
  //   './assets/**/*.{vue,js,css}',
  //   './components/**/*.{vue,js}',
  //   './layouts/**/*.vue',
  //   './pages/**/*.vue',
  //   './plugins/**/*.{js,ts}',
  //   './nuxt.config.{js,ts}'
  // ],

  plugins: [require('daisyui')],

  theme: {
    extend: {
      fontFamily: {
        minecraft: ['Minecraft Seven 2'],
        sans: ["Noto Sans", 'sans-serif']
      }
    }
  },

  daisyui: {
    themes: [
      {
        fancy: {
          primary: '#262422',
          secondary: '#0b0b0b',
          accent: '#3d3938',
          neutral: '#313131',
          'base-100': '#262423',
          info: '#1e6ee8',
          success: '#3c8527',
          warning: '#ffa41f',
          error: '#dd1218',

          '--rounded-box': 0,
          '--rounded-btn': 0,
          '--rounded-badge': 0,
          '--tab-radius': 0,
          '--border-btn': '1px',
          '--tab-border': '1px',
        }
      }
    ]
  }
};
