module.exports = {
  theme: {
    extend: {
      colors: {
        change: 'transparent'
      }
    },
    minWidth: {
      0: '0',
      map: '300px',
      full: '100%'
    },
    minHeight: {
      0: '0',
      map: '300px',
      '100vh': '100vh',
      full: '100%'
    }
  },
  variants: {},
  plugins: [
    require('@tailwindcss/typography')
  ],
  content: ['./views/**/*.{md,njk,js}'],
}
