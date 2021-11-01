module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{html,svelte}'],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
