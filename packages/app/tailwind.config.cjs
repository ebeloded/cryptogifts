module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{html,svelte}'],
  theme: {
    extend: {},
  },
  plugins: [
    // require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        cryptogifts: {
          'primary': '#73089A',
          'primary-focus': '#8509B2',
          'primary-content': '#ffffff',
          'secondary': '#6C4F85',
          'secondary-focus': '#916AB3',
          'secondary-content': '#ffffff',
          'accent': '#F7B32A',
          'accent-focus': '#b57721',
          'accent-content': '#ffffff',
          'neutral': '#110e0e',
          'neutral-focus': '#060404',
          'neutral-content': '#ffffff',
          'base-100': '#171212',
          'base-200': '#110e0e',
          'base-300': '#060404',
          'base-content': '#ffffff',
          '--rounded-btn': '1.9rem',
          'info': '#66c6ff',
          'success': '#87d039',
          'warning': '#e2d562',
          'error': '#ff6f6f',
          '--border-color': 'var(--b3)',
          '--rounded-box': '1rem',
          '--rounded-btn': '0.5rem',
          '--rounded-badge': '1.9rem',
          '--animation-btn': '0.25s',
          '--animation-input': '.2s',
          '--btn-text-case': 'uppercase',
          '--btn-focus-scale': '0.95',
          '--navbar-padding': '.5rem',
          '--border-btn': '1px',
          '--tab-border': '1px',
          '--tab-radius': '0.5rem',
        },
      },
    ],
  },
}
