module.exports = {
  variants: {
    zIndex: ['hover'],
  },
  theme: {
    extend: {
      fontSize: {
        '2xs': '.625rem',
      },
    },
    fontFamily: {
      mono: [
        'Menlo',
        'Monaco',
        'Consolas',
        'Liberation Mono',
        'Courier New',
        'monospace',
      ],
      sans: [
        'Open Sans',
        'Georgia',
        'Cambria',
        'Times New Roman',
        'Times',
        'serif',
      ],
      serif: ['Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
    },
  },
  purge: false,
};
